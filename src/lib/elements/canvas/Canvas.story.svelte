<script lang="ts">
    import { Addon, CodeBlock } from '$lib/components/book'
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
</script>

<div class="aspect-video w-full bg-white">
    <Canvas bind:context />
</div>

<Addon>
    <h2> Props </h2>
    <table>
        <thead> <tr>
            <th>Prop</th>
            <th>Description</th>
        </tr></thead>
        <tbody>
            <tr>
                <td>context*</td>
                <td>Bind to this to use the context in a script</td>
            </tr>
            <tr>
                <td>unit*</td>
                <td>The longest dimension of the canvas / 100</td>
         </tr>
            <tr>
                <td>width*</td>
                <td>Bind to do width base calculations with the context</td>
            </tr>
            <tr>
                <td>height*</td>
                <td>Bind to do height base calculations with the context</td>
            </tr>
        </tbody>
    </table>
    <i><b>*</b> can be used via component composition</i>
    <h2> Usage via scripting </h2>
    <CodeBlock source={sourceViaScripting} />
    <h2> Usage via component composition </h2>
    <CodeBlock source={sourceViaComponentComposition} />
    <h2> Position and sizing </h2>
    <p> The canvas element will automatically match the position and dimensions of it's parent element </p>
</Addon>
