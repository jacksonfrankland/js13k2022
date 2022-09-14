<script lang="ts" context="module">
    import type {RenderFunction} from './renderFunctions'
    import {get} from 'svelte/store'
    type SpriteDetails = {context: CanvasRenderingContext2D, x: number, y: number, renderFunction: RenderFunction, unit: Unit}
    let sprites: Set<SpriteDetails> = new Set([])

    let frameRequest: number

    function renderSprites () {
        sprites.forEach(details => details.context.clearRect(0, 0, details.context.canvas.width, details.context.canvas.height))
        sprites.forEach(details => details.renderFunction (
            details.context,
            details.x,
            details.y,
           get(details.unit)
        ))
        requestAnimationFrame(renderSprites)
    }
</script>

<script lang="ts">
    export let x: number
    export let y: number
    export let renderFunction: RenderFunction

    import {onDestroy, onMount, getContext} from 'svelte'
    import type {CanvasContext, Unit} from '$lib/elements/canvas'
    import {contextSymbol, unitSymbol} from '$lib/elements/canvas'

    const contextStore: CanvasContext = getContext(contextSymbol)
    const unit: Unit = getContext(unitSymbol)
    let details: SpriteDetails = {context: $contextStore, x, y, renderFunction, unit}
    $: details.x = x
    $: details.y = y
    $: details.renderFunction = renderFunction

    $: if ($contextStore) {
        details.context = $contextStore
        sprites.add(details)
    }

    onMount(() => frameRequest = frameRequest ?? requestAnimationFrame(renderSprites))
    onDestroy(() => sprites.delete(details))

</script>
