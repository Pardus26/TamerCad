import { Sketch } from "./Sketch";
import { SketchProfile } from "./SketchProfile";
export declare enum ValidationSeverity {
    Error = "Error",
    Warning = "Warning"
}
export interface ValidationIssue {
    severity: ValidationSeverity;
    message: string;
    entityId?: string;
}
export declare class SketchValidator {
    tolerance: number;
    constructor(tolerance?: number);
    validateSketch(sketch: Sketch): ValidationIssue[];
    validateProfile(profile: SketchProfile): ValidationIssue[];
    isValidSketch(sketch: Sketch): boolean;
    isValidProfile(profile: SketchProfile): boolean;
    private checkDuplicateEntities;
    private checkZeroLengthEntities;
    private checkConstraintState;
    private checkSelfIntersection;
}
