<script lang="ts">
    export let label: string
    export let value: string
</script>

<tr>
    <td> {label} </td>
    <td> <input bind:value type="color" /> </td>
</tr>
