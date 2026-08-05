import { BRepFeature } from "./BRepFeature";
export interface EvaluationContext {
    feature: BRepFeature;
    dependencies: any[];
}
export interface FeatureEvaluationResult {
    featureId: string;
    type: string;
    volume: number;
    area: number;
    mass: number;
    boundingBox: any;
    parameters: any;
}
export declare class BRepFeatureEvaluator {
    cache: Map<string, FeatureEvaluationResult>;
    density: number;
    tolerance: number;
    constructor();
    /**
     * Parametre oku
     */
    resolveParameters(feature: BRepFeature): any;
    /**
     * Sketch değerlendirme
     */
    evaluateSketch(context: EvaluationContext): {
        area: number;
        volume: number;
    };
    /**
     * Extrude hesaplama
     */
    evaluateExtrude(context: EvaluationContext): {
        area: any;
        volume: number;
    };
    /**
     * Hole hesaplama
     */
    evaluateHole(context: EvaluationContext): {
        removedVolume: number;
    };
    /**
     * Fillet hesaplama
     */
    evaluateFillet(context: EvaluationContext): {
        radius: any;
        strengthFactor: number;
    };
    /**
     * Chamfer hesaplama
     */
    evaluateChamfer(context: EvaluationContext): {
        distance: any;
    };
    /**
     * Pattern hesaplama
     */
    evaluatePattern(context: EvaluationContext): {
        count: any;
    };
    /**
     * Feature evaluator dispatcher
     */
    calculate(context: EvaluationContext): {};
    /**
     * Bounding box hesaplama
     */
    calculateBoundingBox(result: any): {
        min: number[];
        max: number[];
        size: number[];
    };
    /**
     * Tam değerlendirme
     */
    evaluate(feature: BRepFeature, dependencies?: any[]): FeatureEvaluationResult;
    /**
     * Feature tree evaluation
     */
    evaluateAll(features: BRepFeature[]): FeatureEvaluationResult[];
    /**
     * Cache getir
     */
    getCached(id: string): FeatureEvaluationResult | undefined;
    /**
     * Cache temizle
     */
    invalidate(id: string): void;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        cache: number;
        density: number;
    };
}
