<script lang="ts">
    import { Addon, CodeBlock, Table, DescriptionRow } from '$lib/components/book'
    import Canvas from './Canvas.svelte'
    export const __route = 'elements/Canvas'

    let context: CanvasRenderingContext2D

    const sourceViaScripting =
        `<script lang="ts">\n` +
        `    import {Canvas} from '$lib/elements'\n` +
        `\n` +
        `    let context: CanvasRenderingContext2D\n` +
        `\n` +
        `    $: if (context) {\n` +
        `        // draw to canvas\n` +
        `    }\n` +
        `<\/script>\n` +
        `\n` +
        `<Canvas bind:context />`

    const sourceViaComponentComposition =
        `<script lang="ts">\n` +
        `    import {Canvas} from '$lib/elements'\n` +
        `<\/script>\n` +
        `\n` +
        `<Canvas let:context>\n` +
        `    <OtherComponent {context} />\n` +
        `</Canvas>`

    const childComponentSource =
        `<script lang="ts">\n` +
        `    import {onMount, getContext, tick} from 'svelte'\n` +
        `    import {symbol} from '$lib/elements/canvas'\n` +
        `\n` +
        `    let context: CanvasRenderingContext2D\n` +
        `    const getCanvasContext = getContext(symbol)\n` +
        `\n` +
        `    onMount(async () => {\n` +
        `        await tick()\n` +
        `        context = getCanvasContext()\n` +
        `        // draw to canvas\n` +
        `    })\n` +
        `<\/script>`

        const sourceWithSetContext =
        `<script lang="ts">\n` +
        `    import {Canvas} from '$lib/elements'\n` +
        `<\/script>\n` +
        `\n` +
        `<Canvas>\n` +
        `    <OtherComponent />\n` +
        `</Canvas>`
</script>

<div class="aspect-video w-full bg-white">
    <Canvas bind:context />
</div>

<Addon>
    <Table title="Props" headings={['Prop', 'Description']}>
        <DescriptionRow name="context*"> Bind to this to use the context in a script </DescriptionRow>
        <DescriptionRow name="unit*"> The longest dimension of the canvas / 100 </DescriptionRow>
        <DescriptionRow name="width*"> Bind to do width base calculations with the context </DescriptionRow>
        <DescriptionRow name="height*"> Bind to do height base calculations with the context </DescriptionRow>
        <DescriptionRow name="zIndex"> The z index of the canvas. Defaults to 0 </DescriptionRow>
    </Table>
    <i><b>*</b> can be used via component composition</i>
    <h2> Usage via scripting </h2>
    <CodeBlock source={sourceViaScripting} />
    <h2> Usage via component composition </h2>
    <CodeBlock source={sourceViaComponentComposition} />
    <h2> Usage via component composition and setContext</h2>
    <p>Setup a component like below</p>
    <CodeBlock source={childComponentSource} />
    <p>Now you can use the component with the Canvas without passing the context</p>
    <CodeBlock source={sourceWithSetContext} />
    <h2> Position and sizing </h2>
    <p> The canvas element will automatically match the position and dimensions of it's parent element </p>
</Addon>
