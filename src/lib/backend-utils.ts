/**
 * Selects the specified nodes in the Figma editor.
 *
 * @param nodeIds - An array of IDs of nodes to be selected.
 * @param zoomIntoView - A boolean indicating whether to zoom into the selected nodes.
 */
export async function selectFigmaNodes(nodes: SceneNode[], zoomIntoView = true) {
	figma.currentPage.selection = nodes;

	if (zoomIntoView) {
		figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
	}
}

/**
 * Retrieves nodes by their IDs.
 *
 * @param nodeIds - An array of IDs of nodes to be retrieved.
 * @returns A promise that resolves to an array of SceneNodes.
 */
export async function getNodesById(nodeIds: string[]): Promise<SceneNode[]> {
	if (!nodeIds || nodeIds.length === 0) {
		console.warn('No node IDs provided');
		return [];
	}

	let nodesToSelect: SceneNode[] = [];
	for (let i = 0; i < nodeIds.length; i++) {
		const node = await figma.getNodeByIdAsync(nodeIds[i]);

		if (!node) {
			console.warn("Node doesn't exist");
			figma.notify("Element doesn't exist");
			continue;
		}
		// Push as SceneNode, because we will only get SceneNodes from getNodeByIdAsync
		nodesToSelect.push(node as SceneNode);
	}
	return nodesToSelect;
}

export function copyNode(node: BaseNode): SNode {
	return {
		id: node.id,
		name: node.name,
		parent: node.parent,
		node: node,
		type: node.type,
	};
}

/**
 * Sends a message to the Figma plugin UI.
 *
 * @param {string} type - The type of the message to send.
 * @param {any} data - The data to send with the message. Defaults to an empty string.
 */
export function sendMsgToPlugin(type: string, data: any = '') {
	figma.ui.postMessage({
		type: type,
		data: data,
	});
}
