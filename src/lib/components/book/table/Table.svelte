<script context="module" lang="ts">
    export const symbol = Symbol()
</script>

<script lang="ts">
    export let title: string
    export let headings: string[]

    import {setContext} from 'svelte'

    let expandColumn: number = null
    setContext(symbol, (column: number) => expandColumn = column)
</script>

<h2> {title} </h2>
<table>
    <thead>
        <tr>
            {#each headings as heading, i}
                <th class:w-full={i === expandColumn}> {heading} </th>
            {/each}
        </tr>
    </thead>
    <tbody>
        <slot />
    </tbody>
</table>
