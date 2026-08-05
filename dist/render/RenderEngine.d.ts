import { RenderContext } from "./RenderContext";
import { RenderScene } from "./RenderScene";
import { RenderCamera } from "./RenderCamera";
import { RenderPipeline } from "./RenderPipeline";
export interface RenderEngineStatistics {
    frame: number;
    fps: number;
    frameTime: number;
    drawCalls: number;
    triangles: number;
    vertices: number;
}
export declare class RenderEngine {
    readonly context: RenderContext;
    readonly scene: RenderScene;
    readonly camera: RenderCamera;
    readonly pipeline: RenderPipeline;
    private readonly displayCache;
    private frame;
    private fps;
    private frameTime;
    private lastTime;
    private running;
    private initialized;
    private needsRender;
    constructor(context: RenderContext, scene: RenderScene, camera: RenderCamera, pipeline: RenderPipeline);
    /**
     * Engine başlat
     */
    initialize(): void;
    /**
     * Render
     */
    render(width: number, height: number, time?: number): void;
    /**
     * Animation loop
     */
    start(): void;
    /**
     * Stop
     */
    stop(): void;
    /**
     * Resize
     */
    resize(width: number, height: number): void;
    /**
     * Dispose
     */
    dispose(): void;
    getStatistics(): RenderEngineStatistics;
    /**
     * Kamera erişimi
     */
    getCamera(): RenderCamera;
    /**
     * Scene erişimi
     */
    getScene(): RenderScene;
    /**
     * Pipeline erişimi
     */
    getPipeline(): RenderPipeline;
    /**
     * MeshBody için GPU display mesh üretir
     */
    private getDisplayMesh;
    /**
     * Mesh cache sil
     *
     * Model değişince çağrılır.
     */
    invalidateMesh(bodyId: string): void;
    /**
     * Tüm cache temizle
     */
    clearCache(): void;
    /**
     * Cache var mı?
     */
    hasCachedMesh(bodyId: string): boolean;
    /**
     * Cache sayısı
     */
    getCachedMeshCount(): number;
    /**
     * İlk yükleme için meshleri hazırla
     */
    warmup(): void;
    private beginFrame;
    private endFrame;
    /**
     * Yeniden çizim gerekli
     */
    invalidate(): void;
    /**
     * Gerekiyorsa render
     */
    renderIfNeeded(width: number, height: number, time?: number): void;
    /**
     * Kamera değişti
     */
    cameraChanged(): void;
    /**
     * Scene değişti
     */
    sceneChanged(): void;
    /**
     * Selection değişti
     */
    selectionChanged(): void;
    /**
     * Viewport değişti
     */
    viewportChanged(): void;
    /**
     * Stylus hareketi
     *
     * Android tablet kalem desteği
     */
    stylusMoved(x: number, y: number, pressure: number): void;
    resetStatistics(): void;
    saveState(): {
        initialized: boolean;
        frame: number;
        fps: number;
        frameTime: number;
        running: boolean;
        cacheSize: number;
    };
    restoreState(state: any): void;
    getBackendInfo(): {
        engine: string;
        backend: import("./RenderContext").RenderBackend;
        initialized: boolean;
        running: boolean;
        viewport: {
            width: any;
            height: any;
        } | null;
    };
    debugInfo(): {
        type: string;
        initialized: boolean;
        running: boolean;
        frame: number;
        fps: number;
        frameTime: number;
        cache: {
            meshes: number;
        };
        scene: {
            type: string;
            revision: number;
            meshBodies: number;
            objects: number;
            selection: import("./RenderScene").SceneSelection | null;
        };
        pipeline: object;
        backend: {
            engine: string;
            backend: import("./RenderContext").RenderBackend;
            initialized: boolean;
            running: boolean;
            viewport: {
                width: any;
                height: any;
            } | null;
        };
    };
    reload(): void;
}
