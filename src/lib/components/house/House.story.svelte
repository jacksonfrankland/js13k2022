<script lang="ts">
    import House, {floorPlan} from './House.svelte'
    import {Addon, CodeBlock, Table, TextAreaRow} from '$lib/components/book'
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
    <Table title="Props" headings={['Prop', 'Value']}>
        <TextAreaRow label="floorPlan" bind:value={plan} mono />
    </Table>
    <h2>Usage</h2>
    <CodeBlock bind:source={source} />
</Addon>
