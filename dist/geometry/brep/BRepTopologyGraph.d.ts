import { BRepSolid } from "./BRepSolid";
import { BRepVertex } from "./BRepVertex";
import { BRepEdge } from "./BRepEdge";
import { BRepFace } from "./BRepFace";
import { BRepShell } from "./BRepShell";
export interface TopologyNode {
    id: string;
    type: "vertex" | "edge" | "face";
}
export declare class BRepTopologyGraph {
    vertices: Map<string, BRepVertex>;
    edges: Map<string, BRepEdge>;
    faces: Map<string, BRepFace>;
    /**
     * Vertex bağlantıları
     */
    vertexGraph: Map<string, string[]>;
    /**
     * Face komşulukları
     */
    faceGraph: Map<string, string[]>;
    constructor();
    /**
     * Solid'den graph oluşturma
     */
    static fromSolid(solid: BRepSolid): BRepTopologyGraph;
    /**
     * Shell ekleme
     */
    addShell(shell: BRepShell): void;
    /**
     * Face ekleme
     */
    addFace(face: BRepFace): void;
    /**
     * Loop işleme
     */
    private processLoop;
    /**
     * Edge ekleme
     */
    addEdge(edge: BRepEdge): void;
    /**
     * Vertex ekleme
     */
    addVertex(vertex: BRepVertex): void;
    /**
     * Vertex bağlantısı
     */
    private connectVertices;
    /**
     * Face adjacency bağlantısı
     */
    private linkFaceEdge;
    /**
     * Vertex komşuları
     */
    vertexNeighbors(vertexId: string): string[];
    /**
     * Face komşuları
     */
    faceNeighbors(faceId: string): string[];
    /**
     * Edge alma
     */
    getEdge(id: string): BRepEdge | undefined;
    /**
     * Face alma
     */
    getFace(id: string): BRepFace | undefined;
    /**
     * Graph node sayıları
     */
    statistics(): {
        vertices: number;
        edges: number;
        faces: number;
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        status: string;
    };
}
