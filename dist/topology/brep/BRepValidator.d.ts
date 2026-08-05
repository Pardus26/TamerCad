import { BRepModel } from "../BRepModel";
import { Solid } from "../core/Solid";
export interface BRepValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
export declare class BRepValidator {
    tolerance: number;
    constructor(tolerance?: number);
    validate(model: BRepModel): BRepValidationResult;
    validateSolid(solid: Solid): BRepValidationResult;
    private validateSolidInternal;
    private validateShells;
    private validateFaces;
    private validateEdges;
    private validateVertices;
    private validateDuplicateTopology;
    private sameEdge;
    isManifold(solid: Solid): boolean;
    checkEuler(solid: Solid): boolean;
    hasOpenBoundary(solid: Solid): boolean;
    validateOrThrow(model: BRepModel): void;
}
