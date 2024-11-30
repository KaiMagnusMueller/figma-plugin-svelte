// global.d.ts
declare global {
	interface SNode {
		id: string;
		name: string;
		node: BaseNode;
		type: NodeType;
		parent?: BaseNode;
	}
}

export {};
