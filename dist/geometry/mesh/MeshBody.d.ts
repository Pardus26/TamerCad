import { Mesh } from "./Mesh";
export interface MeshBodyStatistics {
    vertices: number;
    triangles: number;
    surfaceArea: number;
    visible: boolean;
    locked: boolean;
}
export declare class MeshBody {
    /**
     * Unique body id
     */
    readonly id: string;
    /**
     * Display name
     */
    name: string;
    /**
     * Geometry mesh
     */
    readonly mesh: Mesh;
    /**
     * Visibility
     */
    visible: boolean;
    /**
     * Locked for editing
     */
    locked: boolean;
    /**
     * Selected state
     */
    selected: boolean;
    /**
     * Transform matrix
     *
     * column-major 4x4
     */
    transform: number[];
    /**
     * CAD metadata
     */
    metadata: Record<string, any>;
    constructor(mesh: Mesh, name?: string);
    getVertexCount(): number;
    getTriangleCount(): number;
    getSurfaceArea(): number;
    getBoundingBox(): {
        min: import("../point/Point3").Point3;
        max: import("../point/Point3").Point3;
    } | null;
    statistics(): MeshBodyStatistics;
    setVisible(value: boolean): void;
    setLocked(value: boolean): void;
    select(): void;
    deselect(): void;
    clone(): MeshBody;
    toJSON(): {
        id: string;
        name: string;
        visible: boolean;
        locked: boolean;
        selected: boolean;
        transform: number[];
        metadata: Record<string, any>;
        mesh: {
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
    };
    static fromJSON(data: any): MeshBody;
    debugInfo(): {
        type: string;
        id: string;
        name: string;
        vertices: number;
        triangles: number;
        selected: boolean;
    };
    private static generateId;
}
