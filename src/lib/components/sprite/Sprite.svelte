<script lang="ts" context="module">
    import type {RenderFunction} from './renderFunctions'
    type SpriteDetails = {context: CanvasRenderingContext2D, x: number, y: number, renderFunction: RenderFunction}
    let sprites: Set<SpriteDetails> = new Set([])

    let frameRequest: number

    function renderSprites () {
        sprites.forEach(details => details.context.clearRect(0, 0, details.context.canvas.width, details.context.canvas.height))
        sprites.forEach(details => details.renderFunction (
            details.context,
            details.x,
            details.y,
            Math.max(details.context.canvas.width, details.context.canvas.height) / 100 / devicePixelRatio
        ))
        requestAnimationFrame(renderSprites)
    }
</script>

<script lang="ts">
    import {onDestroy, onMount, getContext, tick} from 'svelte'
    import {symbol} from '$lib/elements/canvas'
    export let x: number
    export let y: number
    export let renderFunction: RenderFunction

    let details = {context: null, x, y, renderFunction}
    let setup = false
    $: details.x = x
    $: details.y = y
    $: details.renderFunction = renderFunction
    const getCanvasContext: () => CanvasRenderingContext2D = getContext(symbol)


    $: if (details.context && setup === false) {
        sprites.add(details)
        setup = true
    }

    onMount(async () => {
        if (frameRequest === undefined) {
            frameRequest = requestAnimationFrame(renderSprites)
        }
        await tick()
        details.context = getCanvasContext()
    })
    onDestroy(() => {
        sprites.delete(details)
    })
</script>
