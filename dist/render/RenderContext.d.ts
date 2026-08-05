import { RenderViewport } from "./RenderViewport";
import { RenderCamera } from "./RenderCamera";
export declare enum RenderBackend {
    WebGL = "WebGL",
    WebGPU = "WebGPU",
    Vulkan = "Vulkan",
    OpenGLES = "OpenGLES",
    Software = "Software"
}
export interface RenderCapabilities {
    maxTextureSize: number;
    maxVertexAttributes: number;
    maxUniformVectors: number;
    supportsInstancing: boolean;
    supportsFloatTextures: boolean;
    supportsDepthTexture: boolean;
    supportsMSAA: boolean;
}
export interface RenderState {
    depthTest: boolean;
    blending: boolean;
    culling: boolean;
    wireframe: boolean;
}
export declare class RenderContext {
    backend: RenderBackend;
    nativeContext: any;
    viewport: RenderViewport | null;
    camera: RenderCamera | null;
    private initialized;
    private dirty;
    capabilities: RenderCapabilities;
    state: RenderState;
    constructor(backend?: RenderBackend);
    initialize(nativeContext?: any): void;
    isInitialized(): boolean;
    setViewport(viewport: RenderViewport): void;
    setCamera(camera: RenderCamera): void;
    getAspectRatio(): number;
    applyViewport(): void;
    setDepthTest(enabled: boolean): void;
    setBlending(enabled: boolean): void;
    setCulling(enabled: boolean): void;
    setWireframe(enabled: boolean): void;
    getRenderState(): RenderState;
    clear(options?: {
        color?: boolean;
        depth?: boolean;
        stencil?: boolean;
    }): void;
    resize(width: number, height: number): void;
    getCapabilities(): RenderCapabilities;
    getBackend(): RenderBackend;
    getNativeContext(): any;
    invalidate(): void;
    needsRender(): boolean;
    consumeRenderFlag(): void;
    dispose(): void;
    private detectCapabilities;
}
