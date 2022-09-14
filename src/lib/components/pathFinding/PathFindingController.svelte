<script context="module" lang="ts">
    export const symbol = Symbol()
    export type ContextType = (id: Symbol, position: {x: number, y: number}, target: {x: number, y: number}) => Spring<{x: number, y: number}>;
</script>

<script lang="ts">
    export let level: {x: number, y: number, blocked: boolean}[]
    export let personalSpace = 2

    import {setContext, onMount, onDestroy} from 'svelte'
    import {spring} from 'svelte/motion'
    import type {Spring} from 'svelte/motion'
    import {get} from 'svelte/store'
    import {normalize} from '$lib/helpers/vectors'

    $: width = level.reduce((width, tile) => Math.max(tile.x, width), 0) + 1
    $: height = level.reduce((height, tile) => Math.max(tile.y, height), 0) + 1
    $: blocked = level.reduce((blocked, tile) => {
        blocked[tile.y * width + tile.x] = tile.blocked
        return blocked
    }, [])

    let pathFinders: Map<Symbol, {
        target: {x: number, y: number},
        position: Spring<{x: number, y: number}>,
        paths: {x: number, y: number}[]
    }> = new Map()

    setContext(symbol, (id: Symbol, position: {x: number, y: number}, target: {x: number, y: number}) => {
        let positionStore = spring(position, {stiffness: .1, damping: 1})
        let distances = new Array<number>(width * height).fill(null)
        let positions = new Array(width * height).fill(0).map((_, i) => ({x: i % width, y: Math.floor(i / width)}))
        let checkingPositions = new Set([
            positions[Math.floor(target.y) * width + Math.floor(target.x)],
            positions[Math.floor(target.y) * width + Math.floor(target.x) + 1],
            positions[(Math.floor(target.y) + 1) * width + Math.floor(target.x)],
            positions[(Math.floor(target.y) + 1) * width + Math.floor(target.x) + 1],
        ])
        checkingPositions.forEach(position => positions[position.y * width + position.x] = null)

        for (let i = 0; checkingPositions.size; i++) {
            let newPositionsToCheck = new Set<{x: number, y: number}>([])
            checkingPositions.forEach(position => {
                if (blocked[position.y * width + position.x]) {
                    distances[position.y * width + position.x] = null
                    return
                }

                distances[position.y * width + position.x] = i

                let above = (position.y - 1) * width + position.x
                if (position.y > 0 && positions[above] !== null) {
                    newPositionsToCheck.add(positions[above])
                    positions[above] = null
                }

                let right = position.y * width + position.x + 1
                if (position.x < width - 1 && positions[right] !== null) {
                    newPositionsToCheck.add(positions[right])
                    positions[right] = null
                }

                let below = (position.y + 1) * width + position.x
                if (position.y < height - 1 && positions[below] !== null) {
                    newPositionsToCheck.add(positions[below])
                    positions[below] = null
                }

                let left = position.y * width + position.x - 1
                if (position.x > 0 && positions[left] !== null) {
                    newPositionsToCheck.add(positions[left])
                    positions[left] = null
                }
            })
            checkingPositions = newPositionsToCheck
        }

        // directions
        let paths = distances.map((distance, i, distances) => {
            if (distance == null) {
                return null
            }
            let x = i % width
            let y = Math.floor(i / width)

            let left = x > 0 && distances[i - 1] ? distances[i - 1] : distance * 10
            let right = x < width - 1 && distances[i + 1] ? distances[i + 1] : distance * 10
            let above = y > 0 && distances[i - width] ? distances[i - width] : distance * 10
            let below = y < height - 1 && distances[i + width] ? distances[i + width] : distance * 10
            let vector: {x: number, y: number}

            vector = { x: left - right, y: above - below }
            let magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2)) || .001
            vector.x /= magnitude
            vector.y /= magnitude
            return vector
        })
        pathFinders.set(id, {
            target,
            position: positionStore,
            paths
        })
        return positionStore
    })

    let animationFrame: number

    function calculatePositions () {
        pathFinders.forEach(({position, paths, target}, id, pathFinders) => {
            position.update(({x, y}) => {

                const clamp = (value: number, min: number, max: number) => Math.max(Math.min(value, max), min)
                // console.log(x, y, width, height)
                let hintedDirection = paths[clamp(Math.floor(y) * width + Math.floor(x), 0, paths.length - 1)]
                    ?? normalize({x: target.x - x, y: target.y - y})

                if (Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2) < Math.pow(personalSpace, 2)) {
                    hintedDirection = {x: 0, y: 0}
                }

                let nearbyPathFinderOpposingDirection = [...pathFinders.entries()].filter(([_id, pathFinder]) => {
                    if (id === _id) {
                        return false
                    }
                    let position = get(pathFinder.position)
                    if (position.x == NaN || position.x == Infinity ||position.y == NaN || position.y == Infinity ) {
                        return false
                    }
                    return Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2) <= Math.pow(personalSpace, 2)
                }).map(([_, pathFinder]) => {
                    let position = get(pathFinder.position)
                    let vector = {x: x - position.x, y: y - position.y}
                    let magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
                    vector.x /= magnitude
                    vector.y /= magnitude
                    return vector
                })

                let direction = nearbyPathFinderOpposingDirection.reduce((overallDirection, currentDirection) => ({
                    x: overallDirection.x + currentDirection.x,
                    y: overallDirection.y + currentDirection.y,
                }), {x: 0, y: 0})
                direction.x /= nearbyPathFinderOpposingDirection.length || 1
                direction.y /= nearbyPathFinderOpposingDirection.length || 1
                return {x: x + direction.x * .2 + hintedDirection.x * .3, y: y + direction.y * .2 + hintedDirection.y * .3}
            })
        })
        animationFrame = requestAnimationFrame(calculatePositions)
    }

    onMount(() => animationFrame = requestAnimationFrame(calculatePositions))
    onDestroy(() => cancelAnimationFrame(animationFrame))

</script>

<slot />
