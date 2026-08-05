import { Solid } from "../core/Solid";
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
export declare class TopologyValidator {
    validate(solid: Solid): ValidationResult;
    private validateSolid;
    private validateShells;
    private validateFaces;
    private validateWire;
    private validateEdges;
    private validateVertices;
    private validateEuler;
    isManifold(solid: Solid): boolean;
    hasOpenEdges(solid: Solid): boolean;
}
