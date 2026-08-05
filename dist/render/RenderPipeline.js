import { DeferredRenderer } from "./renderer/DeferredRenderer";
import { DepthPass } from "./pass/DepthPass";
import { GeometryPass } from "./pass/GeometryPass";
import { ShadowPass } from "./pass/ShadowPass";
import { LightingPass } from "./pass/LightingPass";
/**
 * RenderPipeline
 *
 * CAD render aşamaları:
 *
 * Depth
 * Geometry
 * Selection
 * Edges
 * Shadows
 * Lighting
 * Overlay
 *
 */
export class RenderPipeline {
    context;
    renderer;
    initialized = false;
    constructor(options) {
        this.context =
            options.context;
        this.renderer =
            options.renderer ??
                new DeferredRenderer({
                    context: this.context
                });
    }
    /**
     * Pipeline başlat
     */
    initialize() {
        if (this.initialized) {
            return;
        }
        this.build();
        this.renderer.initialize();
        this.initialized = true;
    }
    /**
     * Frame render
     */
    render(scene, camera) {
        if (!this.initialized) {
            this.initialize();
        }
        this.context.setCamera(camera);
        this.renderer.render(scene, camera);
    }
    /**
     * Viewport değişimi
     */
    resize(width, height) {
        this.context.resize(width, height);
        this.renderer.resize(width, height);
    }
    /**
     * Pipeline temizleme
     */
    dispose() {
        this.renderer.dispose();
        this.initialized = false;
    }
    /**
     * Hazır mı?
     */
    isInitialized() {
        return this.initialized;
    }
    // ----------------------------------------------------
    // Render Pass Construction
    // ----------------------------------------------------
    build() {
        this.renderer.clearPasses();
        /**
         * Depth Pass
         *
         * Görünürlük ve
         * occlusion hesapları
         */
        this.renderer.addPass(new DepthPass());
        /**
         * Geometry Pass
         *
         * Mesh çizimi
         *
         * Vertex
         * Normal
         * Material
         */
        this.renderer.addPass(new GeometryPass());
        /**
         * Shadow Pass
         *
         * CAD modeli için
         * gerçekçi ışık
         */
        this.renderer.addPass(new ShadowPass());
        /**
         * Lighting Pass
         *
         * Final renk üretimi
         */
        this.renderer.addPass(new LightingPass());
    }
    /**
     * Dışarıdan pass ekleme
     *
     * Örnek:
     *
     * SelectionPass
     *
     * WireframePass
     *
     * MeasurementPass
     */
    addPass(pass) {
        this.renderer.addPass(pass);
    }
    /**
     * Mevcut renderer
     */
    getRenderer() {
        return this.renderer;
    }
    // ----------------------------------------------------
    // Debug / CAD Information
    // ----------------------------------------------------
    wireframeMode = false;
    selectionMode = false;
    /**
     * Wireframe görüntüleme
     *
     * CAD kenar görünümü için
     */
    setWireframeMode(enabled) {
        this.wireframeMode = enabled;
        this.context.invalidate?.();
    }
    isWireframeMode() {
        return this.wireframeMode;
    }
    /**
     * Selection render modu
     *
     * Kalem ile yüzey/kenar seçimi
     */
    setSelectionMode(enabled) {
        this.selectionMode = enabled;
        this.context.invalidate?.();
    }
    isSelectionMode() {
        return this.selectionMode;
    }
    /**
     * Debug bilgileri
     */
    debugInfo() {
        return {
            type: "RenderPipeline",
            initialized: this.initialized,
            wireframeMode: this.wireframeMode,
            selectionMode: this.selectionMode,
            renderer: this.renderer.debugInfo?.() ?? null
        };
    }
    // ----------------------------------------------------
    // CAD Render Extensions
    // ----------------------------------------------------
    /**
     * CAD Selection Pass ekleme noktası
     *
     * Daha sonra:
     *
     * SelectionPass
     * ID Buffer
     * GPU Picking
     *
     * burada bağlanacak.
     */
    enableCADSelection() {
        if (this.selectionMode) {
            return;
        }
        this.selectionMode = true;
    }
    /**
     * CAD Edge / Wireframe desteği
     *
     * Shapr3D benzeri
     * çizgi görünümü
     */
    enableEdges() {
        this.wireframeMode = true;
    }
    /**
     * Solid görünüm
     */
    disableEdges() {
        this.wireframeMode = false;
    }
    /**
     * Render sırası bilgisi
     *
     * Debug için
     */
    getPassOrder() {
        return [
            "DepthPass",
            "GeometryPass",
            "ShadowPass",
            "LightingPass"
        ];
    }
    /**
     * Context erişimi
     */
    getContext() {
        return this.context;
    }
    // ----------------------------------------------------
    // Lifecycle Helpers
    // ----------------------------------------------------
    /**
     * Pipeline temiz reset
     */
    reset() {
        this.renderer.clearPasses();
        this.initialized = false;
    }
    /**
     * Aktif pass sayısı
     */
    getPassCount() {
        return this.renderer.getPassCount?.() ?? 0;
    }
    /**
     * Render backend bilgisi
     */
    getBackendInfo() {
        return {
            backend: this.context.getBackend(),
            initialized: this.initialized
        };
    }
    /**
     * Pipeline hazır mı?
     */
    ensureInitialized() {
        if (!this.initialized) {
            this.initialize();
        }
    }
}
//# sourceMappingURL=RenderPipeline.js.map