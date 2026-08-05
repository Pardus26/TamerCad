// src/render/graph/RenderGraphPass.ts
export class RenderGraphPass {
    name;
    priority = 0;
    reads = [];
    writes = [];
    dependencies = [];
    executeCallback = null;
    constructor(name) {
        this.name = name;
    }
    // =====================================================
    // Priority
    // =====================================================
    setPriority(priority) {
        this.priority = priority;
        return this;
    }
    // =====================================================
    // Resource Read
    // =====================================================
    read(resource) {
        if (!this.reads.includes(resource)) {
            this.reads.push(resource);
            resource.addConsumer(this.name);
        }
        return this;
    }
    // =====================================================
    // Resource Write
    // =====================================================
    write(resource) {
        if (!this.writes.includes(resource)) {
            this.writes.push(resource);
            resource.setProducer(this.name);
        }
        return this;
    }
    // =====================================================
    // Dependencies
    // =====================================================
    dependsOn(pass) {
        if (pass === this) {
            throw new Error(`RenderGraphPass '${this.name}' cannot depend on itself.`);
        }
        if (!this.dependencies.includes(pass)) {
            this.dependencies.push(pass);
        }
        return this;
    }
    getDependencies() {
        return this.dependencies;
    }
    // =====================================================
    // Execute Callback
    // =====================================================
    setExecute(callback) {
        this.executeCallback = callback;
        return this;
    }
    // =====================================================
    // Execute
    // =====================================================
    execute(context, scene, camera) {
        if (!this.executeCallback) {
            return;
        }
        this.executeCallback(context, scene, camera);
    }
    // =====================================================
    // Resource Access
    // =====================================================
    getReads() {
        return this.reads;
    }
    getWrites() {
        return this.writes;
    }
    hasReads() {
        return this.reads.length > 0;
    }
    hasWrites() {
        return this.writes.length > 0;
    }
    hasDependencies() {
        return this.dependencies.length > 0;
    }
    clearResources() {
        this.reads.length = 0;
        this.writes.length = 0;
    }
    clearDependencies() {
        this.dependencies.length = 0;
    }
    // =====================================================
    // Compiler Compatibility
    // =====================================================
    get resources() {
        return {
            reads: this.reads.map(resource => resource.name),
            writes: this.writes.map(resource => resource.name)
        };
    }
    // =====================================================
    // Debug
    // =====================================================
    debugInfo() {
        return {
            name: this.name,
            priority: this.priority,
            reads: this.reads.map(resource => resource.name),
            writes: this.writes.map(resource => resource.name),
            dependencies: this.dependencies.map(dependency => dependency.name),
            producerResources: this.writes.length,
            consumerResources: this.reads.length
        };
    }
}
//# sourceMappingURL=RenderGraphPass.js.map