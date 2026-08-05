import { BRepSolid } from "./BRepSolid";
import { BRepFace } from "./BRepFace";
import { BRepEdge } from "./BRepEdge";
import { Point3 } from "../point/Point3";
export interface ProjectionPlane {
    origin: Point3;
    normal: Point3;
    xAxis: Point3;
    yAxis: Point3;
}
export interface Point2 {
    x: number;
    y: number;
}
export interface ProjectionResult {
    points: Point2[];
    edges: any[];
    curves: any[];
    success: boolean;
}
export declare class BRepProjection {
    /**
     * Point 3D → 2D projection
     */
    static projectPoint(point: Point3, plane: ProjectionPlane): Point2;
    /**
     * Edge projection
     */
    static projectEdge(edge: BRepEdge, plane: ProjectionPlane): {
        start: Point2;
        end: Point2;
    };
    /**
     * Face projection
     */
    static projectFace(face: BRepFace, plane: ProjectionPlane): ProjectionResult;
    /**
     * Solid görünüş projeksiyonu
     */
    static projectSolid(solid: BRepSolid, plane: ProjectionPlane): ProjectionResult;
    /**
     * Üst görünüş
     */
    static topView(solid: BRepSolid): ProjectionResult;
    /**
     * Ön görünüş
     */
    static frontView(solid: BRepSolid): ProjectionResult;
    /**
     * Yan görünüş
     */
    static sideView(solid: BRepSolid): ProjectionResult;
    /**
     * Sketch için kontur çıkarma
     */
    static extractSketchProfile(solid: BRepSolid, plane: ProjectionPlane): {
        geometry: any[];
        closed: boolean;
    };
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
