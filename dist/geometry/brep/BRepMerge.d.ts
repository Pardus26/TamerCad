import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepFace } from "./BRepFace";
import { BRepEdge } from "./BRepEdge";
import { BRepVertex } from "./BRepVertex";
export interface MergeResult {
    success: boolean;
    result: BRepSolid;
    mergedVertices: number;
    mergedEdges: number;
    mergedFaces: number;
    message: string;
}
export declare class BRepMerge {
    /**
     * İki solid birleştirme
     */
    static solids(a: BRepSolid, b: BRepSolid): MergeResult;
    /**
     * Shell merge
     */
    static shells(target: BRepShell, source: BRepShell): BRepShell;
    /**
     * Face merge
     */
    static faces(a: BRepFace, b: BRepFace): BRepFace[];
    /**
     * Edge merge
     */
    static edges(a: BRepEdge, b: BRepEdge): BRepEdge;
    /**
     * Vertex merge
     */
    static vertices(a: BRepVertex, b: BRepVertex, tolerance?: number): BRepVertex;
    /**
     * Duplicate vertex temizleme
     */
    static removeDuplicateVertices(vertices: BRepVertex[], tolerance?: number): BRepVertex[];
    /**
     * Nokta mesafesi
     */
    private static distance;
    /**
     * Boolean sonrası cleanup
     */
    static cleanup(solid: BRepSolid): BRepSolid;
    static info(): {
        engine: string;
        status: string;
    };
}
