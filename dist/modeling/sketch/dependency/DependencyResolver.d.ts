import { DependencyGraph } from "./DependencyGraph";
import { DependencyNode } from "./DependencyNode";
export interface ResolveResult {
    success: boolean;
    updatedNodes: DependencyNode[];
    failedNodes: DependencyNode[];
}
export declare class DependencyResolver {
    private graph;
    constructor(graph: DependencyGraph);
    resolve(): ResolveResult;
    resolveFrom(nodeId: string): ResolveResult;
    rebuildDirty(): ResolveResult;
    getDirtyNodes(): DependencyNode[];
    validate(): boolean;
}
