export class BRepFeatureDependency {
    nodes;
    cache;
    constructor() {
        this.nodes =
            new Map();
        this.cache =
            new Map();
    }
    /**
     * Feature node oluştur
     */
    registerFeature(feature) {
        if (!this.nodes.has(feature.id)) {
            this.nodes.set(feature.id, {
                featureId: feature.id,
                parents: [],
                children: []
            });
        }
    }
    /**
     * Dependency ekle
     */
    addDependency(parentId, childId) {
        const parent = this.nodes.get(parentId);
        const child = this.nodes.get(childId);
        if (!parent ||
            !child) {
            throw new Error("Dependency node missing");
        }
        if (!parent.children.includes(childId)) {
            parent.children.push(childId);
        }
        if (!child.parents.includes(parentId)) {
            child.parents.push(parentId);
        }
        this.invalidateCache();
    }
    /**
     * Dependency sil
     */
    removeDependency(parentId, childId) {
        const parent = this.nodes.get(parentId);
        const child = this.nodes.get(childId);
        if (parent) {
            parent.children =
                parent.children.filter(id => id !== childId);
        }
        if (child) {
            child.parents =
                child.parents.filter(id => id !== parentId);
        }
        this.invalidateCache();
    }
    /**
     * Parent getir
     */
    getParents(featureId) {
        return (this.nodes.get(featureId))?.parents || [];
    }
    /**
     * Child getir
     */
    getChildren(featureId) {
        return (this.nodes.get(featureId))?.children || [];
    }
    /**
     * Recursive dependency
     */
    collectDependencies(featureId, visited = new Set()) {
        if (visited.has(featureId)) {
            return [];
        }
        visited.add(featureId);
        const result = [];
        const parents = this.getParents(featureId);
        for (const parent of parents) {
            result.push(parent);
            result.push(...this.collectDependencies(parent, visited));
        }
        return result;
    }
    /**
     * Cycle detection
     */
    detectCycles() {
        const cycles = [];
        const visiting = new Set();
        const visited = new Set();
        const visit = (id, path) => {
            if (visiting.has(id)) {
                const index = path.indexOf(id);
                cycles.push(path.slice(index));
                return;
            }
            if (visited.has(id)) {
                return;
            }
            visiting.add(id);
            const node = this.nodes.get(id);
            for (const child of node?.children || []) {
                visit(child, [
                    ...path,
                    child
                ]);
            }
            visiting.delete(id);
            visited.add(id);
        };
        for (const id of this.nodes.keys()) {
            visit(id, [id]);
        }
        return cycles;
    }
    /**
     * Build sırası
     */
    getBuildOrder() {
        const order = [];
        const visited = new Set();
        const visit = (id) => {
            if (visited.has(id)) {
                return;
            }
            visited.add(id);
            const node = this.nodes.get(id);
            for (const parent of node?.parents || []) {
                visit(parent);
            }
            order.push(id);
        };
        for (const id of this.nodes.keys()) {
            visit(id);
        }
        return order;
    }
    /**
     * Validation
     */
    validate() {
        const cycles = this.detectCycles();
        return {
            valid: cycles.length === 0,
            order: this.getBuildOrder(),
            cycles
        };
    }
    /**
     * Cache reset
     */
    invalidateCache() {
        this.cache.clear();
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            nodes: Array.from(this.nodes.values())
        };
    }
    /**
     * Reset
     */
    reset() {
        this.nodes.clear();
        this.cache.clear();
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureDependency",
            nodes: this.nodes.size,
            order: this.getBuildOrder().length
        };
    }
}
//# sourceMappingURL=BRepFeatureDependency.js.map