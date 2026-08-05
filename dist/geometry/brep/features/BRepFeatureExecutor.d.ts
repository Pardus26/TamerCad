import { BRepFeature } from "./BRepFeature";
import { FeatureEvaluationResult } from "./BRepFeatureEvaluator";
export type ExecutionStatus = "SUCCESS" | "FAILED" | "SKIPPED";
export interface ExecutionResult {
    featureId: string;
    status: ExecutionStatus;
    geometry: any;
    message: string;
}
export interface ExecutionContext {
    feature: BRepFeature;
    evaluation: FeatureEvaluationResult;
    previousGeometry: any;
}
export declare class BRepFeatureExecutor {
    executionHistory: ExecutionResult[];
    operations: Map<string, Function>;
    constructor();
    /**
     * Operasyon kayıtları
     */
    registerDefaultOperations(): void;
    /**
     * Sketch çalıştırma
     */
    executeSketch(context: ExecutionContext): {
        type: string;
        entities: any;
    };
    /**
     * Extrude çalıştırma
     */
    executeExtrude(context: ExecutionContext): {
        type: string;
        operation: string;
        length: any;
        base: any;
    };
    /**
     * Hole operasyonu
     */
    executeHole(context: ExecutionContext): {
        type: string;
        operation: string;
        diameter: any;
        depth: any;
        target: any;
    };
    /**
     * Fillet operasyonu
     */
    executeFillet(context: ExecutionContext): {
        type: string;
        radius: any;
        target: any;
    };
    /**
     * Chamfer operasyonu
     */
    executeChamfer(context: ExecutionContext): {
        type: string;
        distance: any;
        target: any;
    };
    /**
     * Pattern operasyonu
     */
    executePattern(context: ExecutionContext): {
        type: string;
        count: any;
        source: any;
    };
    /**
     * Feature çalıştırıcı
     */
    execute(context: ExecutionContext): ExecutionResult;
    /**
     * Feature zinciri çalıştırma
     */
    executeAll(features: BRepFeature[], evaluations: FeatureEvaluationResult[]): ExecutionResult[];
    /**
     * Son başarılı sonucu getir
     */
    getLastSuccess(): ExecutionResult | undefined;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        operations: number;
        executions: number;
    };
}
