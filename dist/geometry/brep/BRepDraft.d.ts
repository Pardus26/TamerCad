import { BRepSolid } from "./BRepSolid";
import { BRepFace } from "./BRepFace";
import { Point3 } from "../point/Point3";
export interface DraftDirection {
    origin: Point3;
    direction: Point3;
}
export interface DraftOptions {
    angle: number;
    direction: DraftDirection;
    tolerance: number;
}
export interface DraftResult {
    success: boolean;
    solid: BRepSolid | null;
    modifiedFaces: number;
    warnings: string[];
}
export declare class BRepDraft {
    /**
     * Ana draft operasyonu
     */
    static apply(solid: BRepSolid, faces: BRepFace[], options: DraftOptions): DraftResult;
    /**
     * Tek face draft
     */
    static draftFace(solid: BRepSolid, face: BRepFace, options: DraftOptions): BRepSolid;
    /**
     * Draft açı kontrolü
     */
    static analyzeDraft(face: BRepFace, direction: Point3): {
        valid: boolean;
        angle: number;
        undercut: boolean;
    };
    /**
     * Çoklu yüz draft
     */
    static draftFaces(solid: BRepSolid, faces: BRepFace[], angle: number, direction: DraftDirection): DraftResult;
    /**
     * Injection molding kontrolü
     */
    static checkMoldability(solid: BRepSolid, direction: DraftDirection): {
        moldable: boolean;
        issues: string[];
    };
    /**
     * Minimum üretim draft kontrolü
     */
    static validateAngle(angle: number): boolean;
    /**
     * Son doğrulama
     */
    static validate(solid: BRepSolid): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
