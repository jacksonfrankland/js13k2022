<script lang="ts">
    export let label: string
    export let value: string
    export let height = 32
    export let mono = false

    import {symbol} from './Table.svelte'
    import {getContext} from 'svelte'

    const expandColumn: (column: number) => void = getContext(symbol)
    expandColumn(1)
</script>

<tr>
    <td>{label}</td>
    <td class="w-full">
        <textarea bind:value class:font-mono={mono} style:height={`${height / 4}rem`} class="w-full" />
    </td>
</tr>
