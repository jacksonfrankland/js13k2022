<script context="module" lang="ts">
    export const symbol = Symbol()
</script>

<script lang="ts">
    export let level: {x: number, y: number, blocked: boolean}[]

    import {setContext} from 'svelte'
</script>
