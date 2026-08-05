import { BRepVertex } from "./BRepVertex";
import { BRepEdge } from "./BRepEdge";
import { BRepLoop } from "./BRepLoop";
import { BRepFace } from "./BRepFace";
import { BRepShell } from "./BRepShell";
import { BRepSolid } from "./BRepSolid";
export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
export declare class BRepValidator {
    /**
     * Vertex kontrolü
     */
    static validateVertex(vertex: BRepVertex): ValidationResult;
    /**
     * Edge kontrolü
     */
    static validateEdge(edge: BRepEdge): ValidationResult;
    /**
     * Loop kontrolü
     */
    static validateLoop(loop: BRepLoop): ValidationResult;
    /**
     * Face kontrolü
     */
    static validateFace(face: BRepFace): ValidationResult;
    /**
     * Shell kontrolü
     */
    static validateShell(shell: BRepShell): ValidationResult;
    /**
     * Solid kontrolü
     */
    static validateSolid(solid: BRepSolid): ValidationResult;
    /**
     * Genel validator
     */
    static validate(object: any): ValidationResult;
}
