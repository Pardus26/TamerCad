import { Point3 } from "../point/Point3";
export declare class MeshVertex {
    /**
     * Vertex unique identifier
     */
    readonly id: number;
    /**
     * Position
     */
    position: Point3;
    /**
     * Optional normal index
     */
    normalIndex: number | null;
    /**
     * Optional texture coordinate index
     */
    uvIndex: number | null;
    /**
     * Optional vertex color
     */
    color?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    constructor(id: number, position: Point3);
    /**
     * Position değiştirme
     */
    setPosition(position: Point3): void;
    /**
     * Vertex taşıma
     */
    translate(x: number, y: number, z: number): void;
    /**
     * Clone
     */
    clone(): MeshVertex;
    /**
     * Geometrik eşitlik
     */
    equals(other: MeshVertex, tolerance?: number): boolean;
    /**
     * Mesafe
     */
    distanceTo(other: MeshVertex): number;
    /**
     * JSON
     */
    toJSON(): {
        id: number;
        position: {
            x: number;
            y: number;
            z: number;
        };
        normalIndex: number | null;
        uvIndex: number | null;
        color: {
            r: number;
            g: number;
            b: number;
            a: number;
        } | undefined;
    };
    /**
     * JSON yükleme
     */
    static fromJSON(data: any): MeshVertex;
    private static generateId;
}
