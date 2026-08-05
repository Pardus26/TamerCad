import { BRepFeature, BRepFeatureType } from "./BRepFeature";
import { BRepFeatureFactory } from "./BRepFeatureFactory";
import { BRepFeatureHistory } from "./BRepFeatureHistory";
import { BRepFeatureConstraint } from "./BRepFeatureConstraint";
import { BRepFeatureSolver } from "./BRepFeatureSolver";
import { BRepFeatureValidator } from "./BRepFeatureValidator";
import { BRepFeatureOptimizer } from "./BRepFeatureOptimizer";
export interface FeatureUpdateRequest {
    featureId: string;
    parameter: string;
    value: any;
}
export interface FeatureOperationResult {
    success: boolean;
    feature?: BRepFeature;
    message: string;
}
export declare class BRepFeatureManager {
    factory: BRepFeatureFactory;
    history: BRepFeatureHistory;
    constraints: BRepFeatureConstraint;
    solver: BRepFeatureSolver;
    validator: BRepFeatureValidator;
    optimizer: BRepFeatureOptimizer;
    features: Map<string, BRepFeature>;
    constructor();
    /**
     * Feature oluştur
     */
    createFeature(type: BRepFeatureType, parameters?: any): FeatureOperationResult;
    /**
     * Feature güncelle
     */
    updateFeature(request: FeatureUpdateRequest): {
        success: boolean;
        message: string;
        feature?: undefined;
    } | {
        success: boolean;
        feature: BRepFeature;
        message?: undefined;
    };
    /**
     * Feature sil
     */
    deleteFeature(id: string): boolean;
    /**
     * Model rebuild
     */
    rebuild(): {
        solved: boolean;
        valid: any;
        score: any;
    };
    /**
     * Snapshot
     */
    snapshot(): {
        version: number;
        features: {
            id: string;
            name: string;
            type: BRepFeatureType;
            status: import("./BRepFeature").BRepFeatureStatus;
            parameters: import("./BRepFeature").FeatureParameter[];
            dependencies: import("./BRepFeature").FeatureDependency[];
        }[];
        timestamp: number;
    };
    /**
     * Undo
     */
    undo(): false | {
        undone: boolean;
        feature: string;
        action: import("./BRepFeatureHistory").HistoryAction;
    };
    /**
     * Redo
     */
    redo(): false | {
        redone: boolean;
        feature: string;
        action: import("./BRepFeatureHistory").HistoryAction;
    };
    /**
     * Optimize model
     */
    optimize(): import("./BRepFeatureOptimizer").OptimizationResult;
    /**
     * Feature getir
     */
    getFeature(id: string): BRepFeature | undefined;
    /**
     * Tüm model
     */
    getFeatures(): BRepFeature[];
    /**
     * Export
     */
    serialize(): {
        features: {
            id: string;
            name: string;
            type: BRepFeatureType;
            status: import("./BRepFeature").BRepFeatureStatus;
            parameters: import("./BRepFeature").FeatureParameter[];
            dependencies: import("./BRepFeature").FeatureDependency[];
        }[];
        history: {
            version: number;
            changes: number;
            snapshots: number;
            timeline: number;
        };
        constraints: {
            constraints: import("./BRepFeatureConstraint").FeatureConstraint[];
            count: number;
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
        history: number;
    };
}
