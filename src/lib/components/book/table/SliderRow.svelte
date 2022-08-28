<script lang="ts">
    export let label: string
    export let value: number
    export let min = 0
    export let max = 100
    export let step = 1
</script>

<tr>
    <td> {label} </td>
    <td>
        <input bind:value type="range" {min} {max} {step} />
        <span class="absolute right-10">{value}</span>
    </td>
</tr>
