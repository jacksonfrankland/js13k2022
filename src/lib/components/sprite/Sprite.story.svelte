<script lang="ts">
    import {Canvas} from '$lib/elements'
    import {Addon, CodeBlock, Table, SliderRow, DropdownRow, ColorRow, DescriptionRow} from '$lib/components/book'
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
    <Table title="Editor" headings={['Name', 'Value']}>
        <SliderRow label="x" bind:value={x} step={.1} max={xMax} />
        <SliderRow label="y" bind:value={y} step={.1} max={yMax} />
        <SliderRow label="size" bind:value={size} step={.1} min={1} max={15} />
        <DropdownRow label="render function" bind:value={renderFunction} options={Object.keys(renderFunctions)} />
        <ColorRow label="color" bind:value={color} />
    </Table>
    <Table title="Props" headings={['Prop', 'Description']}>
        <DescriptionRow name="x"> The x position </DescriptionRow>
        <DescriptionRow name="y"> The y position </DescriptionRow>
        <DescriptionRow name="render function">
            A function that follows the signature
            <code> (context: CanvasRenderingContext2D, x: number, y: number, unit: number) => void </code>
        </DescriptionRow>
    </Table>
    <h2>Usage</h2>
    <CodeBlock {source} />
    <h2> Creating a render function </h2>
    <p> You can import the renderFunction type via <code> import type {`{RenderFunction}`} from '$lib/components/sprite' </code> </p>
    <p> A good way to have extra parameters for how you want to render a sprite is to have a function return a RenderFunction </p>
    <h3> Example </h3>
    <CodeBlock source={renderFunctionSource} language="typescript" />
</Addon>
