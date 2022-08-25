<script lang="ts" context="module">
	declare var Prism: {highlight: (source: string, a: string, b: string) => string, languages: string[]}
</script>

<script lang="ts">
	import 'prismjs'
    import 'prism-svelte'
	import 'prismjs/components/prism-typescript'

	export let source: string
	export let language = 'svelte'

	$: highlighted = Prism.highlight(source, Prism.languages[language], language)
</script>

<pre><code>{@html highlighted}</code></pre>
