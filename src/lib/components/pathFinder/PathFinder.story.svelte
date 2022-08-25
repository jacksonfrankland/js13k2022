<script lang="ts">
    import {Addon} from '$lib/components/book'
    import House, {floorPlan} from '$lib/components/house'
    import {Sprite} from '$lib/components'
    import {Canvas} from '$lib/elements'
    import {circle} from '$lib/components/sprite/renderFunctions'
    export const __route = 'components/Path Finder'

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
    <h2> Editor </h2>
    <table>
        <thead><tr><th>Name</th><th>Value</th></tr></thead>
        <tbody>
            <tr> <td> x </td> <td> <input bind:value={x} type="range" min="0" step=".1" max={xMax} /> <span class="absolute right-10">{x}</span></td> </tr>
            <tr> <td> y </td> <td> <input bind:value={y} type="range" min="0" step=".1" max={yMax} /> <span class="absolute right-10">{y}</span></td> </tr>
        </tbody>
    </table>
</Addon>
