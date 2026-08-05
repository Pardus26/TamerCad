import { BRepFeature } from "./BRepFeature";
export type ValidationStatus = "VALID" | "WARNING" | "ERROR";
export interface ValidationIssue {
    type: string;
    message: string;
    severity: "LOW" | "MEDIUM" | "HIGH";
}
export interface ValidationReport {
    featureId: string;
    status: ValidationStatus;
    score: number;
    issues: ValidationIssue[];
}
export declare class BRepFeatureValidator {
    tolerance: number;
    reports: ValidationReport[];
    constructor();
    /**
     * Feature varlık kontrolü
     */
    validateExistence(feature: BRepFeature): {
        valid: boolean;
        issue: string;
    } | {
        valid: boolean;
        issue?: undefined;
    };
    /**
     * Parametre kontrolü
     */
    validateParameters(feature: BRepFeature): ValidationIssue[];
    /**
     * Feature tipi kontrolü
     */
    validateType(feature: BRepFeature): boolean;
    /**
     * Geometrik doğrulama
     */
    validateGeometry(feature: BRepFeature): ValidationIssue[];
    /**
     * Constraint sonucu kontrolü
     */
    validateConstraints(constraints: any[]): ValidationIssue[];
    /**
     * Topoloji kontrolü
     */
    validateTopology(feature: BRepFeature): {
        valid: boolean;
        issue: string;
    } | {
        valid: boolean;
        issue?: undefined;
    };
    /**
     * Üretilebilirlik kontrolü
     */
    validateManufacturing(feature: BRepFeature): ValidationIssue[];
    /**
     * Ana doğrulama
     */
    validate(feature: BRepFeature, constraints?: any[]): ValidationReport;
    /**
     * Toplu doğrulama
     */
    validateAll(features: BRepFeature[]): ValidationReport[];
    /**
     * Son kalite skoru
     */
    qualityScore(): number;
    /**
     * Serialize
     */
    serialize(): {
        reports: ValidationReport[];
        quality: number;
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
        reports: number;
        quality: number;
    };
}
