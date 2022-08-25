<script lang="ts" context="module">
    export type FloorPlanType = {
        x: number,
        y: number,
        type: 'WALL' | 'BED_ROOM' | 'DINING_ROOM'
    }[]

    export function floorPlan (strings: TemplateStringsArray, ...values: any[]) {
        const planString = String.raw({ raw: strings }, ...values)
        return planString.split('\n').map(line => line.trim()).filter(line => line.length > 0).reduce((collection, line, y) => {
            return [...collection, ...line.split('').map((letter, x) => ({x, y, type: {
                b: 'BED_ROOM',
                d: 'DINING_ROOM',
                ".": 'WALL'
        }[letter]}))]
        }, []) as FloorPlanType
    }
</script>

<script lang="ts">
    import Canvas from '$lib/elements/canvas'

    export let floorPlan: FloorPlanType = []

    let context: CanvasRenderingContext2D
    let canvasWidth: number
    let canvasHeight: number

    $: width = floorPlan.reduce((width, tile) => Math.max(tile.x, width), 0) + 1
    $: height = floorPlan.reduce((height, tile) => Math.max(tile.y, height), 0) + 1
    $: aspect = `${width} / ${height}`

    async function rerender () {
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        floorPlan.forEach(block => {
            context.save()
            context.fillStyle = {
                'BED_ROOM': '#ff0000',
                'DINING_ROOM': '#00ff00',
                'WALL': '#000',
            }[block.type] ?? '#000'
            context.fillRect(block.x * (canvasWidth / width), block.y * (canvasHeight / height), canvasWidth / width + 1, canvasHeight / height + 1)
            context.restore()
        })
    }

    $: if (floorPlan && canvasWidth && canvasHeight) {
        setTimeout(rerender, 100)
    }
</script>

<div class="w-full" style:aspect-ratio={aspect}>
    <slot />
    <Canvas bind:context={context} bind:width={canvasWidth} bind:height={canvasHeight} />
</div>
