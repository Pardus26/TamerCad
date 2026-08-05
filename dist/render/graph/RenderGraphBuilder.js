import { RenderGraphPass } from "./RenderGraphPass";
import { RenderGraphResource } from "./RenderGraphResource";
export class RenderGraphBuilder {
    passes = new Map();
    resources = new Map();
    // ==================================================
    // Pass Creation
    // ==================================================
    createPass(name, priority = 0) {
        const existing = this.passes.get(name);
        if (existing) {
            existing.setPriority(priority);
            return existing;
        }
        const pass = new RenderGraphPass(name);
        pass.setPriority(priority);
        this.passes.set(name, pass);
        return pass;
    }
    // ==================================================
    // Resource Creation
    // ==================================================
    createResource(name, type, descriptor = {}) {
        const existing = this.resources.get(name);
        if (existing) {
            return existing;
        }
        const resource = new RenderGraphResource(name, type, descriptor);
        this.resources.set(name, resource);
        return resource;
    }
    // ==================================================
    // Resource Connections
    // ==================================================
    connectRead(pass, resource) {
        pass.read(resource);
        return this;
    }
    connectWrite(pass, resource) {
        pass.write(resource);
        return this;
    }
    // Alias methods
    // Eski kullanım uyumluluğu
    read(pass, resource) {
        return this.connectRead(pass, resource);
    }
    write(pass, resource) {
        return this.connectWrite(pass, resource);
    }
    // ==================================================
    // Dependency
    // ==================================================
    dependency(before, after) {
        after.dependsOn(before);
        return this;
    }
    // ==================================================
    // Query
    // ==================================================
    getPasses() {
        return [
            ...this.passes.values()
        ];
    }
    getResource(name) {
        return this.resources.get(name);
    }
    getResources() {
        return [
            ...this.resources.values()
        ];
    }
    // ==================================================
    // Validation
    // ==================================================
    validate() {
        for (const pass of this.passes.values()) {
            if (!pass.validate()) {
                return false;
            }
        }
        return true;
    }
    // ==================================================
    // Reset
    // ==================================================
    clear() {
        for (const resource of this.resources.values()) {
            resource.clearUsage();
        }
        this.passes.clear();
        this.resources.clear();
    }
    // ==================================================
    // Debug
    // ==================================================
    debugInfo() {
        return {
            passCount: this.passes.size,
            resourceCount: this.resources.size,
            passes: [
                ...this.passes.values()
            ]
                .map(pass => pass.debugInfo()),
            resources: [
                ...this.resources.values()
            ]
                .map(resource => resource.debugInfo())
        };
    }
}
//# sourceMappingURL=RenderGraphBuilder.js.map