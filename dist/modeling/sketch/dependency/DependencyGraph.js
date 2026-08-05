id = "dependency_graph_ts";
export class DependencyGraph {
    nodes = new Map();
    addNode(node) {
        if (this.nodes.has(node.id)) {
            throw new Error(`Node already exists: ${node.id}`);
        }
        this.nodes.set(node.id, node);
    }
    removeNode(id) {
        const node = this.nodes.get(id);
        if (!node) {
            return false;
        }
        for (const dependency of node.getDependencies()) {
            node.removeDependency(dependency);
        }
        for (const dependent of node.getDependents()) {
            dependent.removeDependency(node);
        }
        return this.nodes.delete(id);
    }
    getNode(id) {
        return (this.nodes.get(id)
            ??
                null);
    }
    hasNode(id) {
        return this.nodes.has(id);
    }
    connect(sourceId, targetId) {
        const source = this.getNode(sourceId);
        const target = this.getNode(targetId);
        if (!source ||
            !target) {
            throw new Error("Dependency node missing");
        }
        target.addDependency(source);
        if (this.hasCycle()) {
            target.removeDependency(source);
            throw new Error("Dependency cycle detected");
        }
    }
    disconnect(sourceId, targetId) {
        const source = this.getNode(sourceId);
        const target = this.getNode(targetId);
        if (source &&
            target) {
            target.removeDependency(source);
        }
    }
    getNodes() {
        return Array.from(this.nodes.values());
    }
    getNodesByType(type) {
        return this.getNodes()
            .filter(node => node.type === type);
    }
    markDirty(id) {
        const node = this.getNode(id);
        if (!node) {
            return;
        }
        const visited = new Set();
        this.propagateDirty(node, visited);
    }
    propagateDirty(node, visited) {
        if (visited.has(node.id)) {
            return;
        }
        visited.add(node.id);
        node.markDirty();
        for (const child of node.getDependents()) {
            this.propagateDirty(child, visited);
        }
    }
    rebuildOrder() {
        const visited = new Set();
        const result = [];
        for (const node of this.nodes.values()) {
            this.visit(node, visited, result);
        }
        return result.reverse();
    }
    visit(node, visited, result) {
        if (visited.has(node.id)) {
            return;
        }
        visited.add(node.id);
        for (const dependency of node.getDependencies()) {
            this.visit(dependency, visited, result);
        }
        result.push(node);
    }
    rebuild() {
        const order = this.rebuildOrder();
        for (const node of order) {
            if (node.isDirty()) {
                node.update();
            }
        }
    }
    hasCycle() {
        const visited = new Set();
        const recursion = new Set();
        for (const node of this.nodes.values()) {
            if (this.detectCycle(node, visited, recursion)) {
                return true;
            }
        }
        return false;
    }
    detectCycle(node, visited, recursion) {
        if (recursion.has(node.id)) {
            return true;
        }
        if (visited.has(node.id)) {
            return false;
        }
        visited.add(node.id);
        recursion.add(node.id);
        for (const dependency of node.getDependencies()) {
            if (this.detectCycle(dependency, visited, recursion)) {
                return true;
            }
        }
        recursion.delete(node.id);
        return false;
    }
    toJSON() {
        return {
            nodes: this.getNodes()
                .map(node => node.toJSON())
        };
    }
}
//# sourceMappingURL=DependencyGraph.js.map