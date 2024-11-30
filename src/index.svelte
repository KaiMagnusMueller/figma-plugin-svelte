<script lang="ts">
	import '../node_modules/figmakit-plugin-ui-svelte/dist/css/resets.css';
	import '../node_modules/figmakit-plugin-ui-svelte/dist/css/global.css';
	import './lib/css/main.css';
	import { Button } from 'figmakit-plugin-ui-svelte';

	// ---------------------------------
	// MESSAGES FROM FIGMA
	// ---------------------------------
	window.addEventListener('message', (event) => {
		switch (event.data.pluginMessage.type) {
			case 'selection-change':
				selectedNodes = event.data.pluginMessage.data;
				break;
			default:
				console.log('Unknown message type', event.data.pluginMessage.type);
				break;
		}
	});

	let selectedNodes = $state([]);
</script>

<div class="wrapper">
	{#each selectedNodes as node}
		<p>{node.name}</p>
	{/each}

	<Button>Click me</Button>
</div>

<style>
</style>
