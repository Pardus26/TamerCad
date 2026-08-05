import { Mesh } from "../../geometry/mesh/Mesh";
export declare class DisplayMesh {
    readonly mesh: Mesh;
    /**
     * GPU vertex buffer
     * xyz xyz xyz ...
     */
    vertexBuffer: Float32Array;
    /**
     * GPU normal buffer
     */
    normalBuffer: Float32Array;
    /**
     * GPU uv buffer
     */
    uvBuffer: Float32Array;
    /**
     * GPU index buffer
     */
    indexBuffer: Uint32Array;
    constructor(mesh: Mesh);
    rebuild(): void;
    getVertexCount(): number;
    getTriangleCount(): number;
    private buildVertexBuffer;
    private buildIndexBuffer;
    computeMemoryUsage(): number;
    dispose(): void;
}
