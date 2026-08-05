import { BRepSolid } from "./BRepSolid";
export interface BRepSerializedData {
    version: string;
    id: string;
    shells: any[];
    metadata: Record<string, any>;
}
export declare class BRepSerializer {
    private static VERSION;
    /**
     * BRepSolid → JSON
     */
    static serialize(solid: BRepSolid): BRepSerializedData;
    /**
     * Shell export
     */
    private static serializeShell;
    /**
     * Face export
     */
    private static serializeFace;
    /**
     * Loop export
     */
    private static serializeLoop;
    /**
     * Edge export
     */
    private static serializeEdge;
    /**
     * Vertex export
     */
    private static serializeVertex;
    /**
     * JSON string export
     */
    static toJSON(solid: BRepSolid, pretty?: boolean): string;
    /**
     * JSON import
     *
     * Placeholder:
     * Geometry reconstruction
     * sonraki kernel aşamasında genişletilecek.
     */
    static deserialize(data: BRepSerializedData): BRepSolid;
    /**
     * JSON string import
     */
    static fromJSON(json: string): BRepSolid;
    /**
     * Versiyon bilgisi
     */
    static version(): string;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        version: string;
        status: string;
    };
}
