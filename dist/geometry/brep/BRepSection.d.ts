import { BRepSolid } from "./BRepSolid";
import { BRepFace } from "./BRepFace";
import { BRepEdge } from "./BRepEdge";
import { Point3 } from "../point/Point3";
export interface Plane {
    origin: Point3;
    normal: Point3;
}
export interface SectionResult {
    success: boolean;
    curves: BRepEdge[];
    points: Point3[];
    loops: any[];
    message: string;
}
export declare class BRepSection {
    /**
     * Solid ile düzlem kesişimi
     */
    static sectionByPlane(solid: BRepSolid, plane: Plane): SectionResult;
    /**
     * Face-plane intersection
     */
    static intersectFacePlane(face: BRepFace, plane: Plane): {
        points: Point3[];
        edges: BRepEdge[];
    };
    /**
     * Edge-plane intersection
     */
    static intersectEdgePlane(edge: BRepEdge, plane: Plane): Point3 | null;
    /**
     * Kesit eğrilerinden loop oluşturma
     */
    static buildLoops(edges: BRepEdge[]): any[];
    /**
     * Kesit profil çıkarma
     */
    static extractProfile(solid: BRepSolid, plane: Plane): {
        closed: boolean;
        curves: BRepEdge[];
        points: Point3[];
    };
    /**
     * Çoklu düzlem kesiti
     */
    static multipleSections(solid: BRepSolid, planes: Plane[]): SectionResult[];
    /**
     * Alan hesabı için kesit hazırlama
     */
    static prepareAnalysis(result: SectionResult): {
        curveCount: number;
        pointCount: number;
        closedProfiles: number;
    };
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
