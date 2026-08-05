import { BRepSolid } from "./BRepSolid";
import { BRepEdge } from "./BRepEdge";
import { BRepFace } from "./BRepFace";
import { BRepVertex } from "./BRepVertex";
export interface FilletOptions {
    radius: number;
    smooth: boolean;
    tolerance: number;
}
export interface FilletResult {
    success: boolean;
    solid: BRepSolid | null;
    affectedEdges: number;
    warnings: string[];
}
export declare class BRepFillet {
    /**
     * Ana fillet operasyonu
     */
    static apply(solid: BRepSolid, edges: BRepEdge[], options: FilletOptions): FilletResult;
    /**
     * Tek edge fillet
     */
    static filletEdge(solid: BRepSolid, edge: BRepEdge, radius: number): BRepSolid;
    /**
     * Face-face blend oluşturma
     */
    static createBlendSurface(faceA: BRepFace, faceB: BRepFace, radius: number): BRepFace | null;
    /**
     * Edge uygunluk kontrolü
     */
    static canFillet(edge: BRepEdge, radius: number): boolean;
    /**
     * Çoklu edge fillet
     */
    static filletEdges(solid: BRepSolid, edges: BRepEdge[], radius: number): FilletResult;
    /**
     * Variable radius fillet
     */
    static variableRadius(solid: BRepSolid, edges: BRepEdge[], radii: number[]): FilletResult;
    /**
     * Chamfer benzeri keskin dönüş kontrolü
     */
    static checkCorner(vertex: BRepVertex): boolean;
    /**
     * Son kontrol
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
