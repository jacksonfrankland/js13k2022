<script lang="ts">
    export let x: number
    export let y: number
    export let targetX: number
    export let targetY: number
    export let targetRange = 4

    import {symbol} from './PathFindingController.svelte'
    import type {ContextType} from './PathFindingController.svelte'
    import {getContext, createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher()

    let id = Symbol()
    let reachedTarget = false

    const setTarget: ContextType = getContext(symbol)
    $: position = setTarget(id, {x, y}, {x: targetX, y: targetY})

    $: if (!reachedTarget && Math.pow($position.x - targetX, 2) + Math.pow($position.y - targetY, 2) <= Math.pow(targetRange, 2)) {
        reachedTarget = true
        console.log('test')
        dispatch('destinationReached', {
            x: $position.x,
            y: $position.y
        })
    } else if (reachedTarget && Math.pow($position.x - targetX, 2) + Math.pow($position.y - targetY, 2) > Math.pow(targetRange, 2)) {
        reachedTarget = false
    }
</script>

<slot x={$position.x} y={$position.y} />
