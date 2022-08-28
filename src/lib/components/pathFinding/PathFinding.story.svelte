<script lang="ts">
    import {Addon, Table, SliderRow} from '$lib/components/book'
    import House, {floorPlan} from '$lib/components/house'
    import {Sprite} from '$lib/components'
    import {Canvas} from '$lib/elements'
    import {circle} from '$lib/components/sprite/renderFunctions'
    export const __route = 'components/Path Finding'

    let plan = floorPlan`
    ..........................................
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .ddddddddddddddddddd.dddddddddddddddddddd.
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
    .ddddddddddddddddddd.dddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    .dddddddddddddddddddddddddddddddddddddddd.
    ..........................................
    `

    let x = 10
    let y = 10
    let width = 1
    let height = 1
    $: xMax = width > height ? 100 : width / height * 100
    $: yMax = height > width ? 100 : height / width * 100
</script>
<House floorPlan={plan}>
    <Canvas zIndex={10} bind:width bind:height>
        <Sprite {x} {y} renderFunction={circle('#ff0000', 3)} />
    </Canvas>
</House>

<Addon>
    <Table title="Editor" headings={['Name', 'Value']}>
        <SliderRow bind:value={x} label="x" max={xMax} />
        <SliderRow bind:value={y} label="y" max={yMax} />
    </Table>
</Addon>
