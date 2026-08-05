import { MeshVertex } from "./MeshVertex";
import { MeshTriangle } from "./MeshTriangle";
import { Point3 } from "../point/Point3";
export interface MeshStatistics {
    vertices: number;
    triangles: number;
    area: number;
}
export declare class Mesh {
    readonly id: string;
    name: string;
    private vertices;
    private triangles;
    private triangleCounter;
    private boundingBoxCache;
    private areaCache;
    constructor(name?: string);
    addVertex(vertex: MeshVertex): number;
    createVertex(point: Point3): number;
    getVertex(index: number): MeshVertex;
    getVertices(): readonly MeshVertex[];
    vertexCount(): number;
    addTriangle(v1: number, v2: number, v3: number): MeshTriangle;
    getTriangle(index: number): MeshTriangle;
    getTriangles(): readonly MeshTriangle[];
    triangleCount(): number;
    computeSurfaceArea(): number;
    getBoundingBox(): {
        min: Point3;
        max: Point3;
    } | null;
    removeTriangle(index: number): boolean;
    clear(): void;
    isEmpty(): boolean;
    clone(): Mesh;
    statistics(): MeshStatistics;
    toJSON(): {
        id: string;
        name: string;
        vertices: {
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
        }[];
        triangles: import("./MeshTriangle").MeshTriangleJSON[];
    };
    static fromJSON(data: any): Mesh;
    private invalidate;
    private static generateId;
}
