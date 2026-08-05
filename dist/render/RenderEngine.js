import { DisplayMesh } from "./display/DisplayMesh";
export class RenderEngine {
    context;
    scene;
    camera;
    pipeline;
    displayCache = new Map();
    frame = 0;
    fps = 0;
    frameTime = 0;
    lastTime = 0;
    running = false;
    initialized = false;
    needsRender = true;
    constructor(context, scene, camera, pipeline) {
        this.context = context;
        this.scene = scene;
        this.camera = camera;
        this.pipeline = pipeline;
    }
    /**
     * Engine başlat
     */
    initialize() {
        if (this.initialized) {
            return;
        }
        this.context.setCamera(this.camera);
        this.pipeline.initialize();
        this.initialized = true;
    }
    /**
     * Render
     */
    render(width, height, time = performance.now()) {
        if (!this.initialized) {
            this.initialize();
        }
        this.beginFrame(time);
        this.context.applyViewport();
        this.context.clear({
            color: true,
            depth: true
        });
        this.pipeline.render(this.scene, this.camera);
        this.endFrame();
    }
    /**
     * Animation loop
     */
    start() {
        if (this.running) {
            return;
        }
        this.running = true;
        const loop = (time) => {
            if (!this.running) {
                return;
            }
            this.render(this.context.viewport?.getWidth() ?? 1, this.context.viewport?.getHeight() ?? 1, time);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
    /**
     * Stop
     */
    stop() {
        this.running = false;
    }
    /**
     * Resize
     */
    resize(width, height) {
        this.context.resize(width, height);
        this.pipeline.resize(width, height);
        this.invalidate();
    }
    /**
     * Dispose
     */
    dispose() {
        this.displayCache.clear();
        this.pipeline.dispose();
        this.initialized = false;
    }
    // ----------------------------------------------------
    // Statistics
    // ----------------------------------------------------
    getStatistics() {
        const rendererStats = this.pipeline
            .getRenderer()
            .getStatistics();
        return {
            frame: this.frame,
            fps: this.fps,
            frameTime: this.frameTime,
            drawCalls: 0,
            triangles: rendererStats.resourceCount,
            vertices: rendererStats.passCount
        };
    }
    /**
     * Kamera erişimi
     */
    getCamera() {
        return this.camera;
    }
    /**
     * Scene erişimi
     */
    getScene() {
        return this.scene;
    }
    /**
     * Pipeline erişimi
     */
    getPipeline() {
        return this.pipeline;
    }
    // ----------------------------------------------------
    // Display Mesh Cache
    // ----------------------------------------------------
    /**
     * MeshBody için GPU display mesh üretir
     */
    getDisplayMesh(body) {
        let displayMesh = this.displayCache.get(body.id);
        if (!displayMesh) {
            displayMesh =
                new DisplayMesh(body.mesh);
            this.displayCache.set(body.id, displayMesh);
        }
        return displayMesh;
    }
    /**
     * Mesh cache sil
     *
     * Model değişince çağrılır.
     */
    invalidateMesh(bodyId) {
        this.displayCache.delete(bodyId);
        this.invalidate();
    }
    /**
     * Tüm cache temizle
     */
    clearCache() {
        this.displayCache.clear();
        this.invalidate();
    }
    /**
     * Cache var mı?
     */
    hasCachedMesh(bodyId) {
        return this.displayCache.has(bodyId);
    }
    /**
     * Cache sayısı
     */
    getCachedMeshCount() {
        return this.displayCache.size;
    }
    /**
     * İlk yükleme için meshleri hazırla
     */
    warmup() {
        for (const body of this.scene.getMeshBodies()) {
            this.getDisplayMesh(body);
        }
    }
    // ----------------------------------------------------
    // Frame Timing
    // ----------------------------------------------------
    beginFrame(time) {
        if (this.lastTime !== 0) {
            const delta = time -
                this.lastTime;
            if (delta > 0) {
                this.fps =
                    1000 /
                        delta;
                this.frameTime =
                    delta /
                        1000;
            }
        }
        this.lastTime = time;
    }
    endFrame() {
        this.frame++;
    }
    // ----------------------------------------------------
    // Render Invalidation
    // ----------------------------------------------------
    /**
     * Yeniden çizim gerekli
     */
    invalidate() {
        this.needsRender = true;
    }
    /**
     * Gerekiyorsa render
     */
    renderIfNeeded(width, height, time = performance.now()) {
        if (!this.needsRender) {
            return;
        }
        this.render(width, height, time);
        this.needsRender = false;
    }
    /**
     * Kamera değişti
     */
    cameraChanged() {
        this.invalidate();
    }
    /**
     * Scene değişti
     */
    sceneChanged() {
        this.invalidate();
    }
    /**
     * Selection değişti
     */
    selectionChanged() {
        this.invalidate();
    }
    /**
     * Viewport değişti
     */
    viewportChanged() {
        this.invalidate();
    }
    /**
     * Stylus hareketi
     *
     * Android tablet kalem desteği
     */
    stylusMoved(x, y, pressure) {
        /*
        
        İleride:
        
        pressure:
        - çizgi kalınlığı
        - seçim hassasiyeti
        - extrusion
        
        için kullanılacak.

        */
        void x;
        void y;
        void pressure;
        this.invalidate();
    }
    // ----------------------------------------------------
    // Statistics Reset
    // ----------------------------------------------------
    resetStatistics() {
        this.frame = 0;
        this.fps = 0;
        this.frameTime = 0;
        this.lastTime = 0;
    }
    // ----------------------------------------------------
    // Save / Restore
    // ----------------------------------------------------
    saveState() {
        return {
            initialized: this.initialized,
            frame: this.frame,
            fps: this.fps,
            frameTime: this.frameTime,
            running: this.running,
            cacheSize: this.displayCache.size
        };
    }
    restoreState(state) {
        this.frame =
            state.frame ?? 0;
        this.fps =
            state.fps ?? 0;
        this.frameTime =
            state.frameTime ?? 0;
        this.running =
            state.running ?? false;
    }
    // ----------------------------------------------------
    // Backend Information
    // ----------------------------------------------------
    getBackendInfo() {
        return {
            engine: "TamerCAD RenderEngine",
            backend: this.context.getBackend(),
            initialized: this.initialized,
            running: this.running,
            viewport: this.context.viewport
                ?
                    {
                        width: this.context.viewport.getWidth(),
                        height: this.context.viewport.getHeight()
                    }
                :
                    null
        };
    }
    // ----------------------------------------------------
    // Debug
    // ----------------------------------------------------
    debugInfo() {
        return {
            type: "RenderEngine",
            initialized: this.initialized,
            running: this.running,
            frame: this.frame,
            fps: this.fps,
            frameTime: this.frameTime,
            cache: {
                meshes: this.displayCache.size
            },
            scene: this.scene.debugInfo(),
            pipeline: this.pipeline.debugInfo(),
            backend: this.getBackendInfo()
        };
    }
    // ----------------------------------------------------
    // Reload
    // ----------------------------------------------------
    reload() {
        const wasInitialized = this.initialized;
        this.pipeline.dispose();
        this.initialized = false;
        if (wasInitialized) {
            this.initialize();
        }
    }
}
//# sourceMappingURL=RenderEngine.js.map