id = "dependency_node_ts";
export var DependencyNodeType;
(function (DependencyNodeType) {
    DependencyNodeType["Sketch"] = "Sketch";
    DependencyNodeType["Entity"] = "Entity";
    DependencyNodeType["Constraint"] = "Constraint";
    DependencyNodeType["Profile"] = "Profile";
    DependencyNodeType["Feature"] = "Feature";
    DependencyNodeType["Solid"] = "Solid";
})(DependencyNodeType || (DependencyNodeType = {}));
export var DependencyState;
(function (DependencyState) {
    DependencyState["Clean"] = "Clean";
    DependencyState["Dirty"] = "Dirty";
    DependencyState["Updating"] = "Updating";
    DependencyState["Failed"] = "Failed";
})(DependencyState || (DependencyState = {}));
export class DependencyNode {
    type;
    data;
    metadata;
    id;
    dependencies = new Set();
    dependents = new Set();
    state = DependencyState.Clean;
    version = 0;
    constructor(id, type, data, metadata = {}) {
        this.type = type;
        this.data = data;
        this.metadata = metadata;
        this.id = id;
    }
    addDependency(node) {
        if (node === this) {
            throw new Error("Node cannot depend on itself");
        }
        this.dependencies.add(node);
        node.addDependent(this);
        this.markDirty();
    }
    removeDependency(node) {
        this.dependencies.delete(node);
        node.removeDependent(this);
        this.markDirty();
    }
    addDependent(node) {
        this.dependents.add(node);
    }
    removeDependent(node) {
        this.dependents.delete(node);
    }
    getDependencies() {
        return Array.from(this.dependencies);
    }
    getDependents() {
        return Array.from(this.dependents);
    }
    markDirty() {
        this.state =
            DependencyState.Dirty;
        this.version++;
    }
    markClean() {
        this.state =
            DependencyState.Clean;
    }
    isDirty() {
        return (this.state ===
            DependencyState.Dirty);
    }
    getState() {
        return this.state;
    }
    getVersion() {
        return this.version;
    }
    update() {
        this.state =
            DependencyState.Updating;
        try {
            if (this.data &&
                typeof this.data.update ===
                    "function") {
                this.data.update();
            }
            this.markClean();
        }
        catch (error) {
            this.state =
                DependencyState.Failed;
            throw error;
        }
    }
    dependsOn(node) {
        return this.dependencies.has(node);
    }
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            state: this.state,
            version: this.version,
            dependencies: Array.from(this.dependencies)
                .map(x => x.id)
        };
    }
}
//# sourceMappingURL=DependencyNode.js.map