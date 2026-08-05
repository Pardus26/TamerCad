import { BRepSolid } from "./BRepSolid";
import { BRepEdge } from "./BRepEdge";
import { BRepFace } from "./BRepFace";
import { BRepVertex } from "./BRepVertex";
export declare enum ChamferType {
    DISTANCE = "distance",
    ANGLE = "angle"
}
export interface ChamferOptions {
    type: ChamferType;
    distance: number;
    angle?: number;
    tolerance: number;
}
export interface ChamferResult {
    success: boolean;
    solid: BRepSolid | null;
    affectedEdges: number;
    warnings: string[];
}
export declare class BRepChamfer {
    /**
     * Ana chamfer operasyonu
     */
    static apply(solid: BRepSolid, edges: BRepEdge[], options: ChamferOptions): ChamferResult;
    /**
     * Tek edge chamfer
     */
    static chamferEdge(solid: BRepSolid, edge: BRepEdge, options: ChamferOptions): BRepSolid;
    /**
     * Distance chamfer
     *
     * Örnek:
     *
     * 5mm x 5mm pah
     */
    static distanceChamfer(solid: BRepSolid, edges: BRepEdge[], distance: number): ChamferResult;
    /**
     * Angle chamfer
     *
     * Örnek:
     *
     * 45 derece pah
     */
    static angleChamfer(solid: BRepSolid, edges: BRepEdge[], distance: number, angle: number): ChamferResult;
    /**
     * Edge uygunluk kontrolü
     */
    static canChamfer(edge: BRepEdge, distance: number): boolean;
    /**
     * Chamfer yüzeyi oluşturma
     */
    static createChamferFace(faceA: BRepFace, faceB: BRepFace, distance: number): BRepFace | null;
    /**
     * Vertex köşe temizleme
     */
    static cleanupCorner(vertex: BRepVertex): boolean;
    /**
     * Çoklu edge chamfer
     */
    static chamferEdges(solid: BRepSolid, edges: BRepEdge[], distance: number): ChamferResult;
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
