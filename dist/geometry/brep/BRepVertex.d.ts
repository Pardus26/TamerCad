import { Point3 } from "../point/Point3";
export declare class BRepVertex {
    id: string;
    /**
     * Geometrik konum
     */
    point: Point3;
    /**
     * Bağlı edge listesi
     */
    edges: string[];
    /**
     * Kullanıcı metadata
     */
    metadata: Record<string, any>;
    constructor(point: Point3);
    /**
     * Edge bağlantısı ekleme
     */
    addEdge(edgeId: string): void;
    /**
     * Edge bağlantısı silme
     */
    removeEdge(edgeId: string): void;
    /**
     * Bağlı edge sayısı
     */
    edgeCount(): number;
    /**
     * Nokta güncelleme
     */
    move(point: Point3): void;
    /**
     * Vertex kopyalama
     */
    clone(): BRepVertex;
    /**
     * İki vertex eşit mi?
     */
    equals(other: BRepVertex, tolerance?: number): boolean;
    /**
     * Serialize
     */
    toJSON(): {
        id: string;
        point: {
            x: number;
            y: number;
            z: number;
        };
        edges: string[];
    };
    toString(): string;
}
