export var RenderBackend;
(function (RenderBackend) {
    RenderBackend["WebGL"] = "WebGL";
    RenderBackend["WebGPU"] = "WebGPU";
    RenderBackend["Vulkan"] = "Vulkan";
    RenderBackend["OpenGLES"] = "OpenGLES";
    RenderBackend["Software"] = "Software";
})(RenderBackend || (RenderBackend = {}));
export class RenderContext {
    backend;
    nativeContext = null;
    viewport = null;
    camera = null;
    initialized = false;
    dirty = true;
    capabilities = {
        maxTextureSize: 0,
        maxVertexAttributes: 0,
        maxUniformVectors: 0,
        supportsInstancing: false,
        supportsFloatTextures: false,
        supportsDepthTexture: false,
        supportsMSAA: false
    };
    state = {
        depthTest: true,
        blending: false,
        culling: true,
        wireframe: false
    };
    constructor(backend = RenderBackend.Software) {
        this.backend = backend;
    }
    initialize(nativeContext) {
        this.nativeContext = nativeContext ?? null;
        this.detectCapabilities();
        this.initialized = true;
        this.invalidate();
    }
    isInitialized() {
        return this.initialized;
    }
    setViewport(viewport) {
        this.viewport = viewport;
        this.invalidate();
    }
    setCamera(camera) {
        this.camera = camera;
        this.invalidate();
    }
    getAspectRatio() {
        if (!this.viewport)
            return 1;
        return this.viewport.getAspectRatio();
    }
    applyViewport() {
        if (!this.viewport)
            return;
        this.viewport.apply(this.nativeContext);
    }
    setDepthTest(enabled) {
        this.state.depthTest = enabled;
        this.invalidate();
    }
    setBlending(enabled) {
        this.state.blending = enabled;
        this.invalidate();
    }
    setCulling(enabled) {
        this.state.culling = enabled;
        this.invalidate();
    }
    setWireframe(enabled) {
        this.state.wireframe = enabled;
        this.invalidate();
    }
    getRenderState() {
        return {
            ...this.state
        };
    }
    clear(options = {}) {
        if (!this.nativeContext)
            return;
        const color = options.color ?? true;
        const depth = options.depth ?? true;
        const stencil = options.stencil ?? false;
        const gl = this.nativeContext;
        if (gl.clear) {
            let mask = 0;
            if (color && gl.COLOR_BUFFER_BIT)
                mask |= gl.COLOR_BUFFER_BIT;
            if (depth && gl.DEPTH_BUFFER_BIT)
                mask |= gl.DEPTH_BUFFER_BIT;
            if (stencil && gl.STENCIL_BUFFER_BIT)
                mask |= gl.STENCIL_BUFFER_BIT;
            gl.clear(mask);
        }
    }
    resize(width, height) {
        if (this.viewport) {
            this.viewport.resize(width, height);
        }
        if (this.camera) {
            this.camera.setAspectRatio?.(width /
                Math.max(height, 1));
        }
        this.invalidate();
    }
    getCapabilities() {
        return {
            ...this.capabilities
        };
    }
    getBackend() {
        return this.backend;
    }
    getNativeContext() {
        return this.nativeContext;
    }
    invalidate() {
        this.dirty = true;
    }
    needsRender() {
        return this.dirty;
    }
    consumeRenderFlag() {
        this.dirty = false;
    }
    dispose() {
        this.nativeContext = null;
        this.viewport = null;
        this.camera = null;
        this.initialized = false;
        this.dirty = false;
    }
    detectCapabilities() {
        if (this.backend === RenderBackend.WebGL &&
            this.nativeContext) {
            const gl = this.nativeContext;
            this.capabilities = {
                maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) ?? 0,
                maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS) ?? 0,
                maxUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS) ?? 0,
                supportsInstancing: !!gl.drawElementsInstanced,
                supportsFloatTextures: true,
                supportsDepthTexture: true,
                supportsMSAA: true
            };
            return;
        }
        if (this.backend === RenderBackend.WebGPU ||
            this.backend === RenderBackend.Vulkan) {
            this.capabilities = {
                maxTextureSize: 16384,
                maxVertexAttributes: 32,
                maxUniformVectors: 512,
                supportsInstancing: true,
                supportsFloatTextures: true,
                supportsDepthTexture: true,
                supportsMSAA: true
            };
            return;
        }
        if (this.backend === RenderBackend.OpenGLES) {
            this.capabilities = {
                maxTextureSize: 8192,
                maxVertexAttributes: 16,
                maxUniformVectors: 256,
                supportsInstancing: true,
                supportsFloatTextures: true,
                supportsDepthTexture: true,
                supportsMSAA: true
            };
            return;
        }
        this.capabilities = {
            maxTextureSize: 0,
            maxVertexAttributes: 0,
            maxUniformVectors: 0,
            supportsInstancing: false,
            supportsFloatTextures: false,
            supportsDepthTexture: false,
            supportsMSAA: false
        };
    }
}
//# sourceMappingURL=RenderContext.js.map