<script context="module" lang="ts">
    export const symbol = Symbol()
    export type GetCanvasContext = () => CanvasRenderingContext2D
</script>

<script lang="ts">
    import {onDestroy, onMount, setContext} from 'svelte'
    export let context: CanvasRenderingContext2D = null
    export let unit = 0
    export let width = 0
    export let height = 0
    export let zIndex: number | 'auto' = 'auto'

    let canvas: HTMLCanvasElement
    let resizeObserver: ResizeObserver
    setContext(symbol, () => context)

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => transform(canvas.parentElement.getBoundingClientRect()))
        context = canvas.getContext('2d')!
        transform (canvas.parentElement.getBoundingClientRect())
        resizeObserver.observe(canvas.parentElement)
    })

    let left: string
    let top: string
    let widthStyle: string
    let heightStyle: string

    function transform (box: DOMRect) {
        left = `${box.left}px`
        top = `${box.top}px`
        widthStyle = `${box.width}px`
        heightStyle = `${box.height}px`
        canvas.width = box.width * devicePixelRatio
        canvas.height = box.height * devicePixelRatio
        width = canvas.width / devicePixelRatio
        height = canvas.height / devicePixelRatio
        unit = Math.max(width, height) / 100
        context.scale(devicePixelRatio, devicePixelRatio)
    }

    onDestroy(() => {
        if (resizeObserver) {
            resizeObserver.disconnect()
        }
    })
</script>

<canvas class="fixed" bind:this={canvas} style:left style:top style:z-index={zIndex} style:width={widthStyle} style:height={heightStyle}></canvas>
<slot {unit} {context} {width} {height} />
