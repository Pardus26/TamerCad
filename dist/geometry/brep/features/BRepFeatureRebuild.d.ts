import { BRepFeature, BRepFeatureType } from "./BRepFeature";
export interface RebuildContext {
    feature: BRepFeature;
    dependencies: BRepFeature[];
    parameters: any;
}
export interface RebuildResult {
    success: boolean;
    featureId: string;
    geometry: any;
    errors: string[];
}
export interface GeneratedGeometry {
    type: string;
    data: any;
}
export declare class BRepFeatureRebuild {
    cache: Map<string, GeneratedGeometry>;
    rebuildHistory: RebuildResult[];
    tolerance: number;
    constructor();
    /**
     * Feature değerlendirme
     */
    evaluateFeature(feature: BRepFeature): {
        id: string;
        type: BRepFeatureType;
        parameters: import("./BRepFeature").FeatureParameter[];
    };
    /**
     * Sketch rebuild
     */
    rebuildSketch(context: RebuildContext): GeneratedGeometry;
    /**
     * Extrude rebuild
     */
    rebuildExtrude(context: RebuildContext): GeneratedGeometry;
    /**
     * Hole rebuild
     */
    rebuildHole(context: RebuildContext): GeneratedGeometry;
    /**
     * Fillet rebuild
     */
    rebuildFillet(context: RebuildContext): GeneratedGeometry;
    /**
     * Chamfer rebuild
     */
    rebuildChamfer(context: RebuildContext): GeneratedGeometry;
    /**
     * Pattern rebuild
     */
    rebuildPattern(context: RebuildContext): GeneratedGeometry;
    /**
     * Operasyon seçici
     */
    executeFeature(context: RebuildContext): GeneratedGeometry;
    /**
     * Dependency çözümü
     */
    resolveDependencies(feature: BRepFeature, allFeatures: BRepFeature[]): BRepFeature[];
    /**
     * Tek feature rebuild
     */
    rebuild(feature: BRepFeature, allFeatures: BRepFeature[]): RebuildResult;
    /**
     * Tüm feature tree rebuild
     */
    rebuildAll(features: BRepFeature[]): RebuildResult[];
    /**
     * Cache temizleme
     */
    invalidate(featureId: string): void;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Serialize
     */
    serialize(): {
        cachedFeatures: number;
        rebuilds: number;
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        cache: number;
        history: number;
    };
}
