import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export interface MeshTriangle {
    a: number;
    b: number;
    c: number;
}
export interface BoundingBox {
    min: Point3;
    max: Point3;
}
export interface BoundingSphere {
    center: Point3;
    radius: number;
}
export declare class Mesh3 {
    readonly id: string;
    name: string;
    private vertices;
    private triangles;
    private normals;
    private uvs;
    private boundingBoxCache;
    private boundingSphereCache;
    private areaCache;
    private volumeCache;
    constructor(name?: string);
    addVertex(point: Point3): number;
    getVertex(index: number): Point3;
    getVertices(): readonly Point3[];
    vertexCount(): number;
    removeVertex(index: number): boolean;
    addTriangle(a: number, b: number, c: number): void;
    getTriangle(index: number): MeshTriangle;
    getTriangles(): readonly MeshTriangle[];
    triangleCount(): number;
    removeTriangle(index: number): boolean;
    computeNormals(): void;
    getNormals(): readonly Vector3[];
    area(): number;
    surfaceArea(): number;
    volume(): number;
    private validIndex;
    boundingBox(): BoundingBox | null;
    /**
     * MeshBody uyumluluğu
     */
    getBoundingBox(): BoundingBox | null;
    boundingSphere(): BoundingSphere | null;
    getBoundingSphere(): BoundingSphere | null;
    centerOfMass(): Point3;
    clone(): Mesh3;
    toJSON(): {
        id: string;
        name: string;
        vertices: import("../point/Point3").Point3JSON[];
        triangles: {
            a: number;
            b: number;
            c: number;
        }[];
        normals: {
            x: number;
            y: number;
            z: number;
        }[];
        uvs: number[][];
    };
    static fromJSON(data: any): Mesh3;
    clear(): void;
    isEmpty(): boolean;
    private invalidateCache;
    dispose(): void;
    debugInfo(): {
        id: string;
        name: string;
        vertices: number;
        triangles: number;
        area: number;
        volume: number;
    };
    private static generateId;
    toString(): string;
}
