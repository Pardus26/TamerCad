import { BRepSolid } from "./BRepSolid";
import { BRepFace } from "./BRepFace";
import { BRepEdge } from "./BRepEdge";
import { BRepLoop } from "./BRepLoop";
import { BRepVertex } from "./BRepVertex";
import { Point3 } from "../point/Point3";
export interface SplitResult {
    success: boolean;
    vertices: BRepVertex[];
    edges: BRepEdge[];
    faces: BRepFace[];
    message: string;
}
export declare class BRepSplitter {
    /**
     * Edge bölme
     *
     * Edge üzerine yeni vertex ekler
     */
    static splitEdge(edge: BRepEdge, point: Point3): SplitResult;
    /**
     * Face bölme
     */
    static splitFace(face: BRepFace, splittingEdges: BRepEdge[]): SplitResult;
    /**
     * Loop yeniden oluşturma
     */
    static rebuildLoop(edges: BRepEdge[]): BRepLoop;
    /**
     * Solid split
     *
     * Bir katıyı iki parçaya ayırma
     */
    static splitSolid(solid: BRepSolid, tool: any): BRepSolid[];
    /**
     * Vertex ekleme
     */
    static insertVertex(edge: BRepEdge, point: Point3): BRepVertex;
    /**
     * İki edge kesişimi
     */
    static intersectEdges(a: BRepEdge, b: BRepEdge): Point3[];
    /**
     * Face üzerinde split kontrolü
     */
    static canSplitFace(face: BRepFace): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
