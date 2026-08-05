export class DisplayMesh {
    mesh;
    /**
     * GPU vertex buffer
     * xyz xyz xyz ...
     */
    vertexBuffer = new Float32Array();
    /**
     * GPU normal buffer
     */
    normalBuffer = new Float32Array();
    /**
     * GPU uv buffer
     */
    uvBuffer = new Float32Array();
    /**
     * GPU index buffer
     */
    indexBuffer = new Uint32Array();
    constructor(mesh) {
        this.mesh = mesh;
        this.rebuild();
    }
    rebuild() {
        this.buildVertexBuffer();
        this.buildIndexBuffer();
    }
    getVertexCount() {
        return this.mesh.vertexCount();
    }
    getTriangleCount() {
        return this.mesh.triangleCount();
    }
    buildVertexBuffer() {
        const vertices = this.mesh.getVertices();
        const buffer = new Float32Array(vertices.length * 3);
        let offset = 0;
        for (const vertex of vertices) {
            buffer[offset++] =
                vertex.position.x;
            buffer[offset++] =
                vertex.position.y;
            buffer[offset++] =
                vertex.position.z;
        }
        this.vertexBuffer =
            buffer;
    }
    buildIndexBuffer() {
        const triangles = this.mesh.getTriangles();
        const indices = new Uint32Array(triangles.length * 3);
        let offset = 0;
        for (const triangle of triangles) {
            indices[offset++] =
                triangle.v1;
            indices[offset++] =
                triangle.v2;
            indices[offset++] =
                triangle.v3;
        }
        this.indexBuffer =
            indices;
    }
    computeMemoryUsage() {
        return (this.vertexBuffer.byteLength +
            this.normalBuffer.byteLength +
            this.uvBuffer.byteLength +
            this.indexBuffer.byteLength);
    }
    dispose() {
        this.vertexBuffer =
            new Float32Array();
        this.normalBuffer =
            new Float32Array();
        this.uvBuffer =
            new Float32Array();
        this.indexBuffer =
            new Uint32Array();
    }
}
//# sourceMappingURL=DisplayMesh.js.map