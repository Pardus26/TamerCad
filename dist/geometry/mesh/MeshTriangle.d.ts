import { MeshVertex } from "./MeshVertex";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export interface MeshTriangleJSON {
    id: number;
    vertices: number[];
    normalIndex: number | null;
    materialIndex: number | null;
}
export declare class MeshTriangle {
    /**
     * Triangle id
     */
    readonly id: number;
    /**
     * Vertex indices
     */
    v1: number;
    v2: number;
    v3: number;
    /**
     * Normal reference
     */
    normalIndex: number | null;
    /**
     * Material reference
     */
    materialIndex: number | null;
    constructor(id: number, v1: number, v2: number, v3: number);
    getVertexIndices(): number[];
    containsVertex(index: number): boolean;
    replaceVertex(oldIndex: number, newIndex: number): void;
    computeArea(vertices: MeshVertex[]): number;
    computeNormal(vertices: MeshVertex[]): Vector3;
    center(vertices: MeshVertex[]): Point3;
    isDegenerate(): boolean;
    isValid(vertexCount: number): boolean;
    reverse(): void;
    clone(): MeshTriangle;
    toJSON(): MeshTriangleJSON;
    static fromJSON(data: any): MeshTriangle;
    toString(): string;
}
