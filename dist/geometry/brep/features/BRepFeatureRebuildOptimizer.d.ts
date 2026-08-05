import { RebuildPlan } from "./BRepFeatureRebuildPlanner";
import { MonitorReport } from "./BRepFeatureRebuildMonitor";
export interface FeatureCost {
    featureId: string;
    averageTime: number;
    rebuildCount: number;
    costScore: number;
}
export interface OptimizationResult {
    originalOrder: string[];
    optimizedOrder: string[];
    removed: string[];
    estimatedImprovement: number;
}
export interface OptimizationStrategy {
    name: string;
    description: string;
}
export declare class BRepFeatureRebuildOptimizer {
    history: Map<string, FeatureCost>;
    strategies: OptimizationStrategy[];
    constructor();
    /**
     * Monitor verisi öğren
     */
    learn(report: MonitorReport): void;
    /**
     * Feature maliyet tahmini
     */
    estimateFeatureCost(featureId: string): number;
    /**
     * Plan optimize et
     */
    optimizePlan(plan: RebuildPlan): OptimizationResult;
    /**
     * Gereksiz feature temizleme
     */
    prune(features: string[], required: string[]): string[];
    /**
     * İyileştirme tahmini
     */
    calculateImprovement(oldOrder: string[], newOrder: string[]): 0 | 15;
    /**
     * En uygun strateji
     */
    chooseStrategy(featureCount: number): OptimizationStrategy;
    /**
     * Cache önerisi
     */
    shouldCache(featureId: string): boolean;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        learnedFeatures: number;
        strategies: number;
    };
}
