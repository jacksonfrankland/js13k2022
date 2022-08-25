<script lang="ts">
    import {Canvas} from '$lib/elements'
    import {Addon, CodeBlock} from '$lib/components/book'
    import {circle, square} from './renderFunctions'
    import Sprite from './Sprite.svelte'
    export const __route = 'components/Sprite'

    let x = 20
    let y = 20
    let width: number
    let height: number
    $: xMax = width > height ? 100 : width / height * 100
    $: yMax = height > width ? 100 : height / width * 100
    let renderFunction = 'circle'
    let color = '#ff0000'
    let size = 10
    const renderFunctions = {circle, square}

    $: source =
        `<script lang="ts">\n` +
        `  import {Canvas} from '$lib/elements'\n` +
        `  import {Sprite} from '$lib/components'\n` +
        `  import {${renderFunction}} from '$lib/components/sprite/renderFunctions'\n` +
        `<\/script>\n` +
        `\n` +
        `<Canvas>\n` +
        `  <Sprite x={${x}} y={${y}} renderFunction={${renderFunction}('${color}', ${size})} />\n` +
        `</Canvas>`

    $: renderFunctionSource =
        `import type RenderFunction from './RenderFunction'\n` +
        `\n` +
        `export default function (data): RenderFunction {\n` +
        `   return (context: CanvasRenderingContext2D, x: number, y: number, unit: number) => {\n` +
        `       // Render something\n` +
        `   }\n` +
        `}`

</script>

<div class="bg-white aspect-video w-full">
    <Canvas bind:width bind:height let:context>
        <Sprite {x} {y} renderFunction={renderFunctions[renderFunction](color, size)} />
    </Canvas>
</div>

<Addon>
    <h2> Editor </h2>
    <table>
        <thead><tr>
            <th> Name </th>
            <th> Value </th>
        </tr></thead>
        <tbody>
            <tr> <td> x </td> <td> <input bind:value={x} type="range" min="0" step=".1" max={xMax} /> <span class="absolute right-10">{x}</span></td> </tr>
            <tr> <td> y </td> <td> <input bind:value={y} type="range" min="0" step=".1" max={yMax} /> <span class="absolute right-10">{y}</span></td> </tr>
            <tr> <td> render function </td> <td>
                <select bind:value={renderFunction}>
                    {#each Object.keys(renderFunctions) as renderFunctionName}
                        <option value={renderFunctionName}>{renderFunctionName}</option>
                    {/each}
                </select>
            </td> </tr>
            <tr> <td>size</td> <td><input bind:value={size} step=".1" type="range" min="1" max="15" /> <span class="absolute right-10">{size}</span></td> </tr>
            <tr> <td>color</td> <td> <input bind:value={color} type="color" /> </td> </tr>
        </tbody>
    </table>
    <h2> Props </h2>
    <table>
        <thead><tr>
            <th> Prop </th>
            <th> Value </th>
        </tr></thead>
        <tbody>
            <tr> <td> x </td> <td> The x position </td> </tr>
            <tr> <td> y </td> <td> The y position </td> </tr>
            <tr> <td> render function </td> <td>
                A function that follows the signature
                <code> (context: CanvasRenderingContext2D, x: number, y: number, unit: number) => void </code>
            </td> </tr>
        </tbody>
    </table>
    <h2>Usage</h2>
    <CodeBlock {source} />
    <h2> Creating a render function </h2>
    <p> You can import the renderFunction type via <code> import type {`{RenderFunction}`} from '$lib/components/sprite' </code> </p>
    <p> A good way to have extra parameters for how you want to render a sprite is to have a function return a RenderFunction </p>
    <h3> Example </h3>
    <CodeBlock source={renderFunctionSource} language="typescript" />
</Addon>
