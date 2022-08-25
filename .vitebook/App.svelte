<script>
  export let component;
  import '../src/index.css'
  import 'prismjs';
  import 'prism-svelte';
</script>

<svelte:head>
  <title> JS13k2022</title>
</svelte:head>

<svelte:component this={component} />
