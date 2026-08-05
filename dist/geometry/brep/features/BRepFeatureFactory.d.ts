import { BRepFeature, BRepFeatureType } from "./BRepFeature";
import { BRepFeatureValidator } from "./BRepFeatureValidator";
import { BRepFeatureConstraint } from "./BRepFeatureConstraint";
export interface FeatureCreateOptions {
    type: BRepFeatureType;
    name?: string;
    parameters?: any;
    dependencies?: string[];
}
export interface FeatureFactoryResult {
    success: boolean;
    feature?: BRepFeature;
    errors: string[];
}
export interface FeatureTemplate {
    type: BRepFeatureType;
    defaults: any;
}
export declare class BRepFeatureFactory {
    templates: FeatureTemplate[];
    validator: BRepFeatureValidator;
    constraintSystem: BRepFeatureConstraint;
    cache: Map<string, BRepFeature>;
    constructor();
    /**
     * Template bul
     */
    getTemplate(type: BRepFeatureType): FeatureTemplate | undefined;
    /**
     * Default parametre
     */
    buildParameters(type: BRepFeatureType, parameters?: any): any;
    /**
     * Feature instance oluşturma
     */
    create(options: FeatureCreateOptions): FeatureFactoryResult;
    /**
     * Shortcut: Hole
     */
    createHole(diameter: number, depth: number): FeatureFactoryResult;
    /**
     * Shortcut: Extrude
     */
    createExtrude(length: number): FeatureFactoryResult;
    /**
     * Shortcut: Fillet
     */
    createFillet(radius: number): FeatureFactoryResult;
    /**
     * Constraint bağlama
     */
    attachConstraint(featureId: string, constraint: any): void;
    /**
     * Cache'den getir
     */
    get(id: string): BRepFeature | undefined;
    /**
     * Tüm feature listesi
     */
    getAll(): BRepFeature[];
    /**
     * Factory reset
     */
    reset(): void;
    /**
     * Serialize
     */
    serialize(): {
        templates: FeatureTemplate[];
        features: {
            id: string;
            name: string;
            type: BRepFeatureType;
            status: import("./BRepFeature").BRepFeatureStatus;
            parameters: import("./BRepFeature").FeatureParameter[];
            dependencies: import("./BRepFeature").FeatureDependency[];
        }[];
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        templates: number;
        cache: number;
    };
}
