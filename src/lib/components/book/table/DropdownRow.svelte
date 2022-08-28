<script lang="ts">
    export let label: string
    export let value: string
    export let options: string[]
</script>

<tr>
    <td> {label} </td>
    <td>
        <select bind:value>
            {#each options as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </td>
</tr>
