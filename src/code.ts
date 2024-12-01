import { copyNode, getNodesById, selectFigmaNodes, sendMsgToPlugin } from './lib/backend-utils';

console.clear();
figma.showUI(__html__, { width: 280, height: 420, themeColors: true });
figma.skipInvisibleInstanceChildren = true;

// figma.on('selectionchange', handleSelectionChange);

handleSelectionChange();

// ---------------------------------
// MESSAGES FROM UI
// ---------------------------------
figma.ui.onmessage = async (msg) => {
	console.log('Received message"', msg);

	switch (msg.type) {
		case 'select-nodes':
			await handleSelectNodes(msg.data);
			break;
		case 'search-nodes':
			const searchResults = figma.currentPage.findAll((node) => {
				return node.name.toLowerCase().includes(msg.data.toLowerCase());
			});
			const searchResultsData = searchResults.map((node) => copyNode(node));
			// console.log('Search results:', searchResultsData);
			sendMsgToPlugin('search-results', searchResultsData);
			break;
		default:
			break;
	}
};

function handleSelectionChange() {
	const selectedNodes = figma.currentPage.selection.map((node) => copyNode(node));
	sendMsgToPlugin('selection-change', selectedNodes);
}

async function handleSelectNodes(data) {
	console.log('Selecting nodes by ID:', data);
	const nodesToSelect = await getNodesById(data);
	selectFigmaNodes(nodesToSelect, true);
}
