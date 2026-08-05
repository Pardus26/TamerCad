export var RenderResourceType;
(function (RenderResourceType) {
    RenderResourceType["Texture"] = "Texture";
    RenderResourceType["Buffer"] = "Buffer";
    RenderResourceType["RenderTarget"] = "RenderTarget";
    RenderResourceType["DepthBuffer"] = "DepthBuffer";
})(RenderResourceType || (RenderResourceType = {}));
export class RenderResourceManager {
    resources = new Map();
    nameLookup = new Map();
    nextId = 1;
    initialized = false;
    // ------------------------------------------------
    // Lifecycle
    // ------------------------------------------------
    initialize(context) {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
    }
    dispose(context) {
        for (const resource of this.resources.values()) {
            this.destroyResource(context, resource);
        }
        this.resources.clear();
        this.nameLookup.clear();
        this.initialized = false;
    }
    // ------------------------------------------------
    // Create
    // ------------------------------------------------
    create(context, descriptor) {
        const existing = this.getByName(descriptor.name);
        if (existing) {
            return existing;
        }
        const resource = {
            id: this.nextId++,
            name: descriptor.name,
            type: descriptor.type,
            descriptor,
            handle: this.createBackendResource(context, descriptor),
            created: true
        };
        this.resources.set(resource.id, resource);
        this.nameLookup.set(resource.name, resource.id);
        return resource;
    }
    // ------------------------------------------------
    // Lookup
    // ------------------------------------------------
    get(id) {
        return (this.resources.get(id)
            ??
                null);
    }
    getByName(name) {
        const id = this.nameLookup.get(name);
        if (id === undefined) {
            return null;
        }
        return this.get(id);
    }
    has(name) {
        return this.nameLookup.has(name);
    }
    // ------------------------------------------------
    // Destroy
    // ------------------------------------------------
    destroy(context, id) {
        const resource = this.resources.get(id);
        if (!resource) {
            return;
        }
        this.destroyResource(context, resource);
        this.resources.delete(id);
        this.nameLookup.delete(resource.name);
    }
    destroyResource(context, resource) {
        if (!resource.created) {
            return;
        }
        /*
        
        Backend destroy:

        WebGL:

        deleteTexture()
        deleteBuffer()


        WebGPU:

        texture.destroy()


        Vulkan:

        vkDestroyImage()


        */
        resource.handle = null;
        resource.created = false;
    }
    // ------------------------------------------------
    // Backend
    // ------------------------------------------------
    createBackendResource(context, descriptor) {
        const backend = context.getBackend();
        switch (backend) {
            case "WebGL":
                return this.createWebGLResource(context, descriptor);
            case "WebGPU":
                return this.createWebGPUResource(context, descriptor);
            default:
                return {
                    placeholder: true,
                    descriptor
                };
        }
    }
    createWebGLResource(context, descriptor) {
        const gl = context.getNativeContext();
        if (!gl) {
            return null;
        }
        switch (descriptor.type) {
            case RenderResourceType.Texture:
                return gl.createTexture?.();
            case RenderResourceType.Buffer:
                return gl.createBuffer?.();
            default:
                return {};
        }
    }
    createWebGPUResource(context, descriptor) {
        /*
        
        GPUDevice:

        device.createTexture()

        device.createBuffer()


        */
        return {
            backend: "WebGPU",
            descriptor
        };
    }
    // ------------------------------------------------
    // Access
    // ------------------------------------------------
    getHandle(name) {
        const resource = this.getByName(name);
        return resource?.handle ?? null;
    }
    getAll() {
        return Array.from(this.resources.values());
    }
    // ------------------------------------------------
    // Debug
    // ------------------------------------------------
    debugInfo() {
        return {
            count: this.resources.size,
            resources: Array.from(this.resources.values())
                .map(r => ({
                id: r.id,
                name: r.name,
                type: r.type,
                created: r.created
            }))
        };
    }
}
//# sourceMappingURL=RenderResourceManager.js.map