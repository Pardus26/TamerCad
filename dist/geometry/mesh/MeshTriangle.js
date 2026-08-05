// src/geometry/mesh/MeshTriangle.ts
import { Point3 } from "../point/Point3";
export class MeshTriangle {
    /**
     * Triangle id
     */
    id;
    /**
     * Vertex indices
     */
    v1;
    v2;
    v3;
    /**
     * Normal reference
     */
    normalIndex = null;
    /**
     * Material reference
     */
    materialIndex = null;
    constructor(id, v1, v2, v3) {
        this.id = id;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    // -----------------------------------------
    // Vertex Access
    // -----------------------------------------
    getVertexIndices() {
        return [
            this.v1,
            this.v2,
            this.v3
        ];
    }
    containsVertex(index) {
        return (this.v1 === index ||
            this.v2 === index ||
            this.v3 === index);
    }
    replaceVertex(oldIndex, newIndex) {
        if (this.v1 === oldIndex)
            this.v1 = newIndex;
        if (this.v2 === oldIndex)
            this.v2 = newIndex;
        if (this.v3 === oldIndex)
            this.v3 = newIndex;
    }
    // -----------------------------------------
    // Geometry
    // -----------------------------------------
    computeArea(vertices) {
        const a = vertices[this.v1]
            .position;
        const b = vertices[this.v2]
            .position;
        const c = vertices[this.v3]
            .position;
        return (b.subtract(a)
            .cross(c.subtract(a))
            .length()
            *
                0.5);
    }
    computeNormal(vertices) {
        const a = vertices[this.v1]
            .position;
        const b = vertices[this.v2]
            .position;
        const c = vertices[this.v3]
            .position;
        return (b.subtract(a)
            .cross(c.subtract(a))
            .normalize());
    }
    center(vertices) {
        const a = vertices[this.v1]
            .position;
        const b = vertices[this.v2]
            .position;
        const c = vertices[this.v3]
            .position;
        return new Point3((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3, (a.z + b.z + c.z) / 3);
    }
    // -----------------------------------------
    // Validation
    // -----------------------------------------
    isDegenerate() {
        return (this.v1 === this.v2 ||
            this.v2 === this.v3 ||
            this.v3 === this.v1);
    }
    isValid(vertexCount) {
        return (!this.isDegenerate() &&
            this.v1 >= 0 &&
            this.v2 >= 0 &&
            this.v3 >= 0 &&
            this.v1 < vertexCount &&
            this.v2 < vertexCount &&
            this.v3 < vertexCount);
    }
    // -----------------------------------------
    // Orientation
    // -----------------------------------------
    reverse() {
        const temp = this.v2;
        this.v2 = this.v3;
        this.v3 = temp;
    }
    // -----------------------------------------
    // Clone
    // -----------------------------------------
    clone() {
        const triangle = new MeshTriangle(this.id, this.v1, this.v2, this.v3);
        triangle.normalIndex =
            this.normalIndex;
        triangle.materialIndex =
            this.materialIndex;
        return triangle;
    }
    // -----------------------------------------
    // Serialization
    // -----------------------------------------
    toJSON() {
        return {
            id: this.id,
            vertices: [
                this.v1,
                this.v2,
                this.v3
            ],
            normalIndex: this.normalIndex,
            materialIndex: this.materialIndex
        };
    }
    static fromJSON(data) {
        const triangle = new MeshTriangle(data.id, data.vertices[0], data.vertices[1], data.vertices[2]);
        triangle.normalIndex =
            data.normalIndex ?? null;
        triangle.materialIndex =
            data.materialIndex ?? null;
        return triangle;
    }
    toString() {
        return (`Triangle(${this.id}) ` +
            `[${this.v1},${this.v2},${this.v3}]`);
    }
}
//# sourceMappingURL=MeshTriangle.js.map