import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepFace } from "./BRepFace";
export interface HealReport {
    success: boolean;
    fixedVertices: number;
    fixedEdges: number;
    fixedFaces: number;
    fixedShells: number;
    warnings: string[];
}
export declare class BRepHeal {
    /**
     * Ana healing pipeline
     */
    static heal(solid: BRepSolid): {
        solid: BRepSolid;
        report: HealReport;
    };
    /**
     * Duplicate topology temizleme
     */
    static removeDuplicateTopology(solid: BRepSolid): BRepSolid;
    /**
     * Vertex iyileştirme
     */
    static healVertices(solid: BRepSolid, tolerance?: number): BRepSolid;
    /**
     * Edge onarma
     */
    static healEdges(shell: BRepShell): BRepShell;
    /**
     * Loop kapatma
     */
    static closeLoops(face: BRepFace): boolean;
    /**
     * Face iyileştirme
     */
    static repairFaces(solid: BRepSolid): BRepSolid;
    /**
     * Shell iyileştirme
     */
    static repairShells(solid: BRepSolid): BRepSolid;
    /**
     * Küçük boşluk kapatma
     */
    static closeGaps(solid: BRepSolid, tolerance?: number): BRepSolid;
    /**
     * Healing sonucu kontrol
     */
    static isHealed(solid: BRepSolid): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
