import { RenderContext } from "./RenderContext";
import { RenderScene } from "./RenderScene";
import { RenderCamera } from "./RenderCamera";
import { DeferredRenderer } from "./renderer/DeferredRenderer";
import { RenderPass } from "./pass/RenderPass";
/**
 * Pipeline ayarları
 */
export interface RenderPipelineOptions {
    context: RenderContext;
    renderer?: DeferredRenderer;
}
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
export declare class RenderPipeline {
    private readonly context;
    private readonly renderer;
    private initialized;
    constructor(options: RenderPipelineOptions);
    /**
     * Pipeline başlat
     */
    initialize(): void;
    /**
     * Frame render
     */
    render(scene: RenderScene, camera: RenderCamera): void;
    /**
     * Viewport değişimi
     */
    resize(width: number, height: number): void;
    /**
     * Pipeline temizleme
     */
    dispose(): void;
    /**
     * Hazır mı?
     */
    isInitialized(): boolean;
    private build;
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
    addPass(pass: RenderPass): void;
    /**
     * Mevcut renderer
     */
    getRenderer(): DeferredRenderer;
    private wireframeMode;
    private selectionMode;
    /**
     * Wireframe görüntüleme
     *
     * CAD kenar görünümü için
     */
    setWireframeMode(enabled: boolean): void;
    isWireframeMode(): boolean;
    /**
     * Selection render modu
     *
     * Kalem ile yüzey/kenar seçimi
     */
    setSelectionMode(enabled: boolean): void;
    isSelectionMode(): boolean;
    /**
     * Debug bilgileri
     */
    debugInfo(): object;
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
    enableCADSelection(): void;
    /**
     * CAD Edge / Wireframe desteği
     *
     * Shapr3D benzeri
     * çizgi görünümü
     */
    enableEdges(): void;
    /**
     * Solid görünüm
     */
    disableEdges(): void;
    /**
     * Render sırası bilgisi
     *
     * Debug için
     */
    getPassOrder(): string[];
    /**
     * Context erişimi
     */
    getContext(): RenderContext;
    /**
     * Pipeline temiz reset
     */
    reset(): void;
    /**
     * Aktif pass sayısı
     */
    getPassCount(): number;
    /**
     * Render backend bilgisi
     */
    getBackendInfo(): object;
    /**
     * Pipeline hazır mı?
     */
    ensureInitialized(): void;
}
