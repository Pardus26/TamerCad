// src/geometry/mesh/Mesh.ts
import { MeshVertex } from "./MeshVertex";
import { MeshTriangle } from "./MeshTriangle";
import { Point3 } from "../point/Point3";
export class Mesh {
    id;
    name;
    vertices = [];
    triangles = [];
    triangleCounter = 0;
    boundingBoxCache = null;
    areaCache = null;
    constructor(name = "Mesh") {
        this.name = name;
        this.id =
            Mesh.generateId();
    }
    // ---------------------------------------
    // Vertex
    // ---------------------------------------
    addVertex(vertex) {
        this.vertices.push(vertex);
        this.invalidate();
        return (this.vertices.length - 1);
    }
    createVertex(point) {
        return this.addVertex(new MeshVertex(Date.now(), point));
    }
    getVertex(index) {
        return this.vertices[index];
    }
    getVertices() {
        return this.vertices;
    }
    vertexCount() {
        return this.vertices.length;
    }
    // ---------------------------------------
    // Triangle
    // ---------------------------------------
    addTriangle(v1, v2, v3) {
        const triangle = new MeshTriangle(this.triangleCounter++, v1, v2, v3);
        if (!triangle.isValid(this.vertices.length)) {
            throw new Error("Invalid triangle");
        }
        this.triangles.push(triangle);
        this.invalidate();
        return triangle;
    }
    getTriangle(index) {
        return this.triangles[index];
    }
    getTriangles() {
        return this.triangles;
    }
    triangleCount() {
        return this.triangles.length;
    }
    // ---------------------------------------
    // Geometry
    // ---------------------------------------
    computeSurfaceArea() {
        if (this.areaCache !== null) {
            return this.areaCache;
        }
        let area = 0;
        for (const triangle of this.triangles) {
            area +=
                triangle.computeArea(this.vertices);
        }
        this.areaCache = area;
        return area;
    }
    getBoundingBox() {
        if (this.boundingBoxCache) {
            return this.boundingBoxCache;
        }
        if (this.vertices.length === 0) {
            return null;
        }
        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;
        for (const vertex of this.vertices) {
            const p = vertex.position;
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
            minZ = Math.min(minZ, p.z);
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
            maxZ = Math.max(maxZ, p.z);
        }
        this.boundingBoxCache = {
            min: new Point3(minX, minY, minZ),
            max: new Point3(maxX, maxY, maxZ)
        };
        return this.boundingBoxCache;
    }
    // ---------------------------------------
    // Editing
    // ---------------------------------------
    removeTriangle(index) {
        if (index < 0 ||
            index >= this.triangles.length) {
            return false;
        }
        this.triangles.splice(index, 1);
        this.invalidate();
        return true;
    }
    clear() {
        this.vertices.length = 0;
        this.triangles.length = 0;
        this.invalidate();
    }
    isEmpty() {
        return (this.vertices.length === 0 ||
            this.triangles.length === 0);
    }
    // ---------------------------------------
    // Clone
    // ---------------------------------------
    clone() {
        const mesh = new Mesh(this.name);
        for (const vertex of this.vertices) {
            mesh.addVertex(vertex.clone());
        }
        for (const triangle of this.triangles) {
            mesh.triangles.push(triangle.clone());
        }
        return mesh;
    }
    // ---------------------------------------
    // Statistics
    // ---------------------------------------
    statistics() {
        return {
            vertices: this.vertexCount(),
            triangles: this.triangleCount(),
            area: this.computeSurfaceArea()
        };
    }
    // ---------------------------------------
    // Serialization
    // ---------------------------------------
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            vertices: this.vertices.map(v => v.toJSON()),
            triangles: this.triangles.map(t => t.toJSON())
        };
    }
    static fromJSON(data) {
        const mesh = new Mesh(data.name);
        for (const vertex of data.vertices ?? []) {
            mesh.vertices.push(MeshVertex.fromJSON(vertex));
        }
        for (const triangle of data.triangles ?? []) {
            mesh.triangles.push(MeshTriangle.fromJSON(triangle));
        }
        mesh.invalidate();
        return mesh;
    }
    // ---------------------------------------
    // Internal
    // ---------------------------------------
    invalidate() {
        this.areaCache = null;
        this.boundingBoxCache = null;
    }
    static generateId() {
        return ("mesh_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 1000000));
    }
}
//# sourceMappingURL=Mesh.js.map