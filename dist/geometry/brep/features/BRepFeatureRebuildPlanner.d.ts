import { BRepFeatureDependency } from "./BRepFeatureDependency";
export interface RebuildPlan {
    changedFeature: string;
    affectedFeatures: string[];
    orderedFeatures: string[];
    estimatedCost: number;
}
export interface FeatureChange {
    featureId: string;
    parameter: string;
    oldValue: any;
    newValue: any;
}
export declare class BRepFeatureRebuildPlanner {
    dependency: BRepFeatureDependency;
    cache: Map<string, RebuildPlan>;
    changeQueue: FeatureChange[];
    constructor(dependency: BRepFeatureDependency);
    /**
     * Değişiklik kaydet
     */
    registerChange(change: FeatureChange): void;
    /**
     * Etkilenen feature bul
     */
    collectAffectedFeatures(featureId: string): string[];
    /**
     * Parent dahil et
     */
    includeRoot(featureId: string, affected: string[]): string[];
    /**
     * Yeniden oluşturma sırası
     */
    buildOrder(features: string[]): string[];
    /**
     * Maliyet tahmini
     */
    estimateCost(features: string[]): number;
    /**
     * Plan oluştur
     */
    createPlan(featureId: string): RebuildPlan;
    /**
     * Tüm değişiklikler için plan
     */
    createBatchPlan(): RebuildPlan[];
    /**
     * Plan temizleme
     */
    clearChanges(): void;
    /**
     * Cache reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        cachedPlans: number;
        pendingChanges: number;
    };
}
