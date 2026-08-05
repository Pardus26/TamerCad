import { BRepFeature } from "./BRepFeature";
export type OptimizationGoal = "MINIMIZE_WEIGHT" | "MINIMIZE_COMPLEXITY" | "MAXIMIZE_STRENGTH" | "MANUFACTURABILITY" | "PERFORMANCE";
export interface OptimizationParameter {
    featureId: string;
    parameter: string;
    current: any;
    optimized: any;
    improvement: number;
}
export interface OptimizationResult {
    success: boolean;
    goal: OptimizationGoal;
    improvements: OptimizationParameter[];
    score: number;
}
export declare class BRepFeatureOptimizer {
    features: BRepFeature[];
    history: OptimizationResult[];
    constructor();
    /**
     * Feature ekleme
     */
    addFeature(feature: BRepFeature): void;
    /**
     * Feature karmaşıklığı
     */
    analyzeComplexity(): {
        features: number;
        complexity: number;
    };
    /**
     * Parametre optimizasyonu
     */
    optimizeParameter(feature: BRepFeature, parameter: string, value: any): OptimizationParameter;
    /**
     * Fillet optimizasyonu
     */
    optimizeFillet(feature: BRepFeature): OptimizationParameter | null;
    /**
     * Hole optimizasyonu
     */
    optimizeHole(feature: BRepFeature): OptimizationParameter | null;
    /**
     * Extrude optimizasyonu
     */
    optimizeExtrude(feature: BRepFeature): OptimizationParameter | null;
    /**
     * Feature sırası optimizasyonu
     */
    optimizeOrder(): {
        reordered: boolean;
    };
    /**
     * Hedef bazlı optimizasyon
     */
    optimize(goal: OptimizationGoal): OptimizationResult;
    /**
     * Üretim için optimizasyon
     */
    optimizeManufacturing(): {
        changes: string[];
    };
    /**
     * AI öğrenme çıktısı
     */
    exportOptimizationData(): {
        history: OptimizationResult[];
        complexity: {
            features: number;
            complexity: number;
        };
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        features: number;
        optimizations: number;
    };
}
