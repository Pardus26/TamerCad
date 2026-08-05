import { BRepSolid } from "./BRepSolid";
export declare enum FeatureType {
    BASE = "base",
    EXTRUDE = "extrude",
    REVOLVE = "revolve",
    LOFT = "loft",
    SWEEP = "sweep",
    FILLET = "fillet",
    CHAMFER = "chamfer",
    BOOLEAN = "boolean",
    PATTERN = "pattern"
}
export declare enum FeatureState {
    CREATED = "created",
    VALID = "valid",
    FAILED = "failed",
    OUTDATED = "outdated"
}
export interface FeatureParameter {
    name: string;
    value: any;
}
export interface FeatureDependency {
    parent: BRepFeature;
    relation: string;
}
export interface FeatureResult {
    success: boolean;
    solid: BRepSolid | null;
    message: string;
}
export declare class BRepFeature {
    id: string;
    name: string;
    type: FeatureType;
    state: FeatureState;
    parameters: FeatureParameter[];
    parents: BRepFeature[];
    children: BRepFeature[];
    result: BRepSolid | null;
    constructor(id: string, name: string, type: FeatureType);
    /**
     * Parametre ekleme
     */
    addParameter(name: string, value: any): void;
    /**
     * Dependency ekleme
     */
    addParent(feature: BRepFeature): void;
    /**
     * Feature çalıştırma
     */
    execute(): FeatureResult;
    /**
     * Regeneration
     */
    regenerate(): FeatureResult;
    /**
     * Child update
     */
    updateChildren(): void;
    /**
     * Feature geçerlilik
     */
    isValid(): boolean;
    /**
     * Parameter değiştirme
     */
    setParameter(name: string, value: any): void;
    /**
     * Feature ağacı bilgisi
     */
    tree(): {
        id: string;
        name: string;
        type: FeatureType;
        children: number;
    };
    /**
     * Clone
     */
    clone(): BRepFeature;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
