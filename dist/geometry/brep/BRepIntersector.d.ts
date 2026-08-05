import { BRepSolid } from "./BRepSolid";
import { BRepFace } from "./BRepFace";
import { BRepEdge } from "./BRepEdge";
import { Point3 } from "../point/Point3";
export interface IntersectionResult {
    success: boolean;
    points: Point3[];
    curves: BRepEdge[];
    message: string;
}
export declare class BRepIntersector {
    /**
     * Solid-Solid intersection
     */
    static intersectSolids(a: BRepSolid, b: BRepSolid): IntersectionResult;
    /**
     * Face-Face intersection
     */
    static intersectFaces(a: BRepFace, b: BRepFace): IntersectionResult;
    /**
     * Edge-Edge intersection
     */
    static intersectEdges(a: BRepEdge, b: BRepEdge): Point3[];
    /**
     * Edge-Face intersection
     */
    static intersectEdgeFace(edge: BRepEdge, face: BRepFace): Point3[];
    /**
     * Curve kesişimi
     */
    static intersectCurves(a: any, b: any): Point3[];
    /**
     * Surface kesişimi
     */
    static intersectSurfaces(a: any, b: any): BRepEdge[];
    /**
     * Intersection curve oluşturma
     */
    static buildIntersectionCurve(points: Point3[]): BRepEdge | null;
    /**
     * Boolean öncesi hazırlık
     */
    static prepareBoolean(a: BRepSolid, b: BRepSolid): {
        intersections: IntersectionResult;
        ready: boolean;
    };
    /**
     * Kesişim noktalarını temizleme
     */
    static removeDuplicatePoints(points: Point3[], tolerance?: number): Point3[];
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
