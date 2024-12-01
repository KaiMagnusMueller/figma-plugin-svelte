<script lang="ts">
	import '../node_modules/figmakit-plugin-ui-svelte/dist/css/resets.css';
	import '../node_modules/figmakit-plugin-ui-svelte/dist/css/global.css';
	import './lib/css/main.css';
	import { Button, Input } from 'figmakit-plugin-ui-svelte';
	import { sendMsgToFigma } from './lib/plugin-utils.svelte';

	// ---------------------------------
	// MESSAGES FROM FIGMA
	// ---------------------------------
	window.addEventListener('message', (event) => {
		console.log('Received message from Figma', event.data.pluginMessage);

		switch (event.data.pluginMessage.type) {
			case 'selection-change':
				selectedNodes = event.data.pluginMessage.data;
				break;
			case 'search-results':
				selectedNodes = event.data.pluginMessage.data;
				break;
			default:
				console.log('Unknown message type', event.data.pluginMessage.type);
				break;
		}
	});

	let selectedNodes = $state([]);
	let searchString = $state('Label');
</script>

<div class="wrapper">
	<header>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				sendMsgToFigma('search-nodes', searchString);
			}}>
			<Input class="flex-grow" placeholder="Enter layer name…" bind:value={searchString} />
			<Button type="submit">Search</Button>
		</form>
	</header>

	<ul>
		{#each selectedNodes as node}
			<li>
				<button onclick={() => sendMsgToFigma('select-nodes', [node.id])}>
					{node.name}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	header {
		display: flex;
		gap: 0.75rem;
		border-bottom: 1px solid var(--figma-color-border);
		padding: 0.75rem;
	}

	form {
		display: contents;
	}

	ul {
		padding-block-end: 0.75rem;
		height: 100%;
		overflow-y: scroll;
		list-style: none;
	}

	li {
		padding: 0.5rem 0.75rem;

		&:hover {
			background-color: var(--figma-color-bg-hover);
		}

		button {
			appearance: none;
			border: none;
			background: none;
			user-select: none;
			text-align: inherit;
		}
	}
</style>
