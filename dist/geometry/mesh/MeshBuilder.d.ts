import { Mesh } from "./Mesh";
export interface TriangleInput {
    vertices: [
        [
            number,
            number,
            number
        ],
        [
            number,
            number,
            number
        ],
        [
            number,
            number,
            number
        ]
    ];
    normal?: [number, number, number];
}
export interface MeshBuildOptions {
    /**
     * Aynı koordinattaki vertexleri birleştir.
     */
    weldVertices?: boolean;
    /**
     * Karşılaştırma toleransı.
     */
    tolerance?: number;
}
export declare class MeshBuilder {
    build(triangles: TriangleInput[], options?: MeshBuildOptions): Mesh;
    private makeKey;
}
