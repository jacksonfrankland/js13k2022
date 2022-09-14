<script context="module" lang="ts">
    import type {Readable, Writable} from 'svelte/store'
    export const contextSymbol = Symbol()
    export const unitSymbol = Symbol()
    export type CanvasContext = Readable<CanvasRenderingContext2D>
    export type Unit = Writable<number>

</script>

<script lang="ts">
    export let context: CanvasRenderingContext2D = null
    export let width = 0
    export let height = 0
    export let viewBoxWidth:number = null
    export let viewBoxHeight: number = null
    export let zIndex: number | 'auto' = 'auto'

    import {onDestroy, onMount, setContext} from 'svelte'
    import {readable, writable} from 'svelte/store'

    let canvas: HTMLCanvasElement
    let resizeObserver: ResizeObserver

    setContext(contextSymbol, readable (context, set => {
        onMount(() => set(canvas.getContext('2d')))
    }))

    const unit = writable(1)
    setContext(unitSymbol, unit)

    $: if (viewBoxWidth) {
        $unit = width / viewBoxWidth
    } else if (viewBoxHeight) {
        $unit = height / viewBoxHeight
    } else {
        $unit = Math.max(width, height) / 100
    }

    onMount(async () => {
        resizeObserver = new ResizeObserver(() => transform(canvas.parentElement.getBoundingClientRect()))
        window.addEventListener('resize', () =>transform(canvas.parentElement.getBoundingClientRect()))
        context = canvas.getContext('2d')
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
        context.scale(devicePixelRatio, devicePixelRatio)
    }

    onDestroy(() => {
        if (resizeObserver) {
            resizeObserver.disconnect()
        }
    })
</script>

<canvas class="fixed" bind:this={canvas} style:left style:top style:z-index={zIndex} style:width={widthStyle} style:height={heightStyle}></canvas>
<slot unit={$unit} {context} {width} {height} />
