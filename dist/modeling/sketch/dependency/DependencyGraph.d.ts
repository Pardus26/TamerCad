import { DependencyNode, DependencyNodeType } from "./DependencyNode";
export declare class DependencyGraph {
    private nodes;
    addNode(node: DependencyNode): void;
    removeNode(id: string): boolean;
    getNode(id: string): DependencyNode | null;
    hasNode(id: string): boolean;
    connect(sourceId: string, targetId: string): void;
    disconnect(sourceId: string, targetId: string): void;
    getNodes(): DependencyNode[];
    getNodesByType(type: DependencyNodeType): DependencyNode[];
    markDirty(id: string): void;
    private propagateDirty;
    rebuildOrder(): DependencyNode[];
    private visit;
    rebuild(): void;
    hasCycle(): boolean;
    private detectCycle;
    toJSON(): object;
}
