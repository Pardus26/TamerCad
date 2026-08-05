import { DependencyState } from "./DependencyNode";
export class DependencyResolver {
    graph;
    constructor(graph) {
        this.graph = graph;
    }
    resolve() {
        const ordered = this.graph.rebuildOrder();
        const updated = [];
        const failed = [];
        for (const node of ordered) {
            if (!node.isDirty()) {
                continue;
            }
            try {
                node.update();
                updated.push(node);
            }
            catch {
                failed.push(node);
            }
        }
        return {
            success: failed.length === 0,
            updatedNodes: updated,
            failedNodes: failed
        };
    }
    resolveFrom(nodeId) {
        this.graph.markDirty(nodeId);
        return this.resolve();
    }
    rebuildDirty() {
        return this.resolve();
    }
    getDirtyNodes() {
        return this.graph
            .getNodes()
            .filter(node => node.getState() ===
            DependencyState.Dirty);
    }
    validate() {
        return !this.graph.hasCycle();
    }
}
//# sourceMappingURL=DependencyResolver.js.map