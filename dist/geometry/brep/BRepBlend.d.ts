import { BRepFace } from "./BRepFace";
import { BRepEdge } from "./BRepEdge";
import { BRepSolid } from "./BRepSolid";
import { Surface3 } from "../surface/Surface3";
export declare enum BlendContinuity {
    POSITION = "G0",
    TANGENT = "G1",
    CURVATURE = "G2"
}
export interface BlendOptions {
    radius: number;
    continuity: BlendContinuity;
    tolerance: number;
}
export interface BlendResult {
    success: boolean;
    solid: BRepSolid | null;
    surface: Surface3 | null;
    warnings: string[];
}
export declare class BRepBlend {
    /**
     * Ana blend operasyonu
     */
    static apply(solid: BRepSolid, edges: BRepEdge[], options: BlendOptions): BlendResult;
    /**
     * Edge blend
     */
    static blendEdge(solid: BRepSolid, edge: BRepEdge, options: BlendOptions): BRepSolid;
    /**
     * Face-face surface blend
     */
    static blendFaces(faceA: BRepFace, faceB: BRepFace, options: BlendOptions): Surface3 | null;
    /**
     * G1 tangent blend
     */
    static tangentBlend(faceA: BRepFace, faceB: BRepFace, radius: number): Surface3 | null;
    /**
     * G2 curvature blend
     */
    static curvatureBlend(faceA: BRepFace, faceB: BRepFace, radius: number): Surface3 | null;
    /**
     * Loft geçiş yüzeyi
     */
    static loftBlend(sections: any[]): Surface3 | null;
    /**
     * Blend kalite kontrolü
     */
    static analyzeQuality(surface: Surface3): {
        continuity: BlendContinuity;
        smooth: boolean;
        curvatureVariation: number;
    };
    /**
     * Radius kontrolü
     */
    static validateRadius(radius: number): boolean;
    /**
     * Solid doğrulama
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
