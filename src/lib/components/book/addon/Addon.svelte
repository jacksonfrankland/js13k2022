<script lang="ts" context="module">
    import { writable } from 'svelte/store'
    export const debug = writable('')
</script>

<script lang="ts">
    import { Addon } from '@vitebook/client/addons'
    import { onMount } from 'svelte'

    let darkMode = localStorage.getItem('@vitebook/color-scheme') === 'dark'
    onMount(() => {
        document.querySelector('button.theme-switch').addEventListener('click', () => darkMode = !darkMode)
        $debug = ''
    })
</script>

<Addon
    title="info"
    icon={`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`}
    >
    <div class="prose prose-sm {darkMode ? 'prose-invert' : ''}">
        <slot />
        {#if $debug.length}
            <pre><code>{$debug}</code></pre>
        {/if}
    </div>
</Addon>
