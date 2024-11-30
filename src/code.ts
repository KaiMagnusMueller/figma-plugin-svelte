import { copyNode, getNodesById, selectFigmaNodes, sendMsgToPlugin } from './lib/backend-utils';

console.clear();
figma.showUI(__html__, { width: 680, height: 420, themeColors: true });
figma.skipInvisibleInstanceChildren = true;

figma.on('selectionchange', handleSelectionChange);

let documentNode = figma.root;

handleSelectionChange();

// ---------------------------------
// MESSAGES FROM UI
// ---------------------------------
figma.ui.onmessage = async (msg) => {
	switch (msg.type) {
		case 'select-nodes':
			await handleSelectNodes(msg.data);
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
