<script lang="ts">
    import {Addon, Table, SliderRow} from '$lib/components/book'
    import House, {floorPlan} from '$lib/components/house'
    import {Sprite} from '$lib/components'
    import {PathFindingController, PathFinder} from '$lib/components/pathFinding'
    import {Canvas} from '$lib/elements'
    import {circle} from '$lib/components/sprite/renderFunctions'
    export const __route = 'components/Path Finding'

    let plan = floorPlan`
    ..........................................
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddd......................dddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    ..........................................
    `

    $: level = plan.map(tile => ({x: tile.x, y: tile.y, blocked: tile.type === 'WALL'}))
    $: viewBoxWidth = plan.reduce((highest, current) => Math.max(highest, current.x), 0)

    let x = 10
    let y = 10
    let width = 1
    let height = 1
    $: xMax = width > height ? 100 : width / height * 100
    $: yMax = height > width ? 100 : height / width * 100

    let destinations = [
        {x: 3, y: 3},
        {x: 38, y: 25},
        {x: 3, y: 25},
        {x: 38, y: 3},
    ]

    let positions = new Array(4).fill(0).map((_, i) => ({x: 38, y: i * 3 + 2}))
    let targeting = new Array(4).fill(0).map(() => Math.floor(Math.random() * 4))

    function updateTarget (i: number, x: number, y: number) {
        let target = targeting[i]
        while (target === targeting[i]) {
            target = Math.floor(Math.random() * 4)
        }
        targeting[i] = target
        positions[i] = {x, y}
    }
</script>

<House floorPlan={plan}>
    <Canvas zIndex={10} bind:width bind:height {viewBoxWidth}>
        <PathFindingController {level}>
            {#each positions as position, i}
                <PathFinder x={position.x} y={position.y} targetX={destinations[targeting[i]].x} targetY={destinations[targeting[i]].y} let:x let:y on:destinationReached={(event) => updateTarget(i, event.detail.x, event.detail.y)}>
                    <Sprite {x} {y} renderFunction={circle('#ff0000', 1)} />
                </PathFinder>
            {/each}
        </PathFindingController>
    </Canvas>
</House>

<Addon>
    {viewBoxWidth}
    <Table title="Editor" headings={['Name', 'Value']}>
        <SliderRow bind:value={x} label="x" max={xMax} />
        <SliderRow bind:value={y} label="y" max={yMax} />
    </Table>
</Addon>
