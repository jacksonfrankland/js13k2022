<script lang="ts">
    import House, {floorPlan} from './House.svelte'
    import {Addon, CodeBlock} from '$lib/components/book'
    export const __route = 'components/House'

    let plan =
        `..........................\n` +
        `.bbbbbbbbbbbb.ddddddddddd.\n` +
        `.bbbbbbbbbbbb.ddddddddddd.\n` +
        `.bbbbbbbbbbbb.ddddddddddd.\n` +
        `.bbbbbbbbbbbb.ddddddddddd.\n` +
        `..........................`

    $: source =
        `<script lang="ts">\n` +
        `    import House, {floorPlan} from '$lib/components/house'\n` +
        `\n` +
        `    let plan = floorPlan\`\n` +
        `${plan.split('\n').map(line => `       ${line}`).join('\n')}\n` +
        `    \`\n` +
        `<\/script>\n` +
        `\n` +
        `<House floorPlan={plan} />`

</script>

<div class="bg-white w-full">
    <House floorPlan={floorPlan`${plan}`} />
</div>

<Addon>
    <h2>Props</h2>
    <table>
        <thead> <tr>
            <th>Prop</th>
            <th class="w-full">Value</th>
        </tr></thead>
        <tbody>
            <tr>
                <td>floorPlan</td>
                <td class="w-full"><textarea bind:value={plan} class="w-full h-32 font-mono" /></td>
            </tr>
        </tbody>
    </table>
    <h2>Usage</h2>
    <CodeBlock bind:source={source} />
</Addon>
