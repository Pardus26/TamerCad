// src/geometry/mesh/Mesh3.ts
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export class Mesh3 {
    id;
    name;
    vertices = [];
    triangles = [];
    normals = [];
    uvs = [];
    boundingBoxCache = null;
    boundingSphereCache = null;
    areaCache = null;
    volumeCache = null;
    constructor(name = "Mesh3") {
        this.name = name;
        this.id =
            Mesh3.generateId();
    }
    // ------------------------------------------------
    // Vertex Management
    // ------------------------------------------------
    addVertex(point) {
        this.vertices.push(point.clone());
        this.invalidateCache();
        return (this.vertices.length - 1);
    }
    getVertex(index) {
        if (index < 0 ||
            index >= this.vertices.length) {
            throw new Error("Vertex index out of range");
        }
        return this.vertices[index];
    }
    getVertices() {
        return this.vertices;
    }
    vertexCount() {
        return this.vertices.length;
    }
    removeVertex(index) {
        if (!this.vertices[index]) {
            return false;
        }
        this.vertices.splice(index, 1);
        this.invalidateCache();
        return true;
    }
    // ------------------------------------------------
    // Triangle Management
    // ------------------------------------------------
    addTriangle(a, b, c) {
        if (!this.validIndex(a) ||
            !this.validIndex(b) ||
            !this.validIndex(c)) {
            throw new Error("Invalid triangle index");
        }
        this.triangles.push({
            a,
            b,
            c
        });
        this.invalidateCache();
    }
    getTriangle(index) {
        if (index < 0 ||
            index >= this.triangles.length) {
            throw new Error("Triangle index out of range");
        }
        return this.triangles[index];
    }
    getTriangles() {
        return this.triangles;
    }
    triangleCount() {
        return this.triangles.length;
    }
    removeTriangle(index) {
        if (index < 0 ||
            index >= this.triangles.length) {
            return false;
        }
        this.triangles.splice(index, 1);
        this.invalidateCache();
        return true;
    }
    // ------------------------------------------------
    // Normal Calculation
    // ------------------------------------------------
    computeNormals() {
        this.normals = [];
        for (let i = 0; i < this.vertices.length; i++) {
            this.normals.push(new Vector3(0, 0, 0));
        }
        for (const tri of this.triangles) {
            const a = this.vertices[tri.a];
            const b = this.vertices[tri.b];
            const c = this.vertices[tri.c];
            const ab = b.subtract(a);
            const ac = c.subtract(a);
            const normal = ab
                .cross(ac)
                .normalize();
            this.normals[tri.a] =
                this.normals[tri.a]
                    .add(normal);
            this.normals[tri.b] =
                this.normals[tri.b]
                    .add(normal);
            this.normals[tri.c] =
                this.normals[tri.c]
                    .add(normal);
        }
        for (let i = 0; i < this.normals.length; i++) {
            this.normals[i] =
                this.normals[i]
                    .normalize();
        }
    }
    getNormals() {
        if (this.normals.length === 0) {
            this.computeNormals();
        }
        return this.normals;
    }
    // ------------------------------------------------
    // Surface Area
    // ------------------------------------------------
    area() {
        if (this.areaCache !== null) {
            return this.areaCache;
        }
        let total = 0;
        for (const tri of this.triangles) {
            const a = this.vertices[tri.a];
            const b = this.vertices[tri.b];
            const c = this.vertices[tri.c];
            total +=
                b
                    .subtract(a)
                    .cross(c.subtract(a))
                    .length()
                    *
                        0.5;
        }
        this.areaCache = total;
        return total;
    }
    surfaceArea() {
        return this.area();
    }
    // ------------------------------------------------
    // Volume
    // ------------------------------------------------
    volume() {
        if (this.volumeCache !== null) {
            return this.volumeCache;
        }
        let volume = 0;
        for (const tri of this.triangles) {
            const a = this.vertices[tri.a];
            const b = this.vertices[tri.b];
            const c = this.vertices[tri.c];
            volume +=
                a.dot(b.cross(c)) / 6;
        }
        this.volumeCache =
            Math.abs(volume);
        return this.volumeCache;
    }
    // ------------------------------------------------
    // Validation Helpers
    // ------------------------------------------------
    validIndex(index) {
        return (index >= 0 &&
            index < this.vertices.length);
    }
    // ------------------------------------------------
    // Bounding Box
    // ------------------------------------------------
    boundingBox() {
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
        for (const p of this.vertices) {
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
    /**
     * MeshBody uyumluluğu
     */
    getBoundingBox() {
        return this.boundingBox();
    }
    // ------------------------------------------------
    // Bounding Sphere
    // ------------------------------------------------
    boundingSphere() {
        if (this.boundingSphereCache) {
            return this.boundingSphereCache;
        }
        const box = this.boundingBox();
        if (!box)
            return null;
        const center = new Point3((box.min.x +
            box.max.x) * 0.5, (box.min.y +
            box.max.y) * 0.5, (box.min.z +
            box.max.z) * 0.5);
        let radius = 0;
        for (const p of this.vertices) {
            radius = Math.max(radius, p.distanceTo(center));
        }
        this.boundingSphereCache = {
            center,
            radius
        };
        return this.boundingSphereCache;
    }
    getBoundingSphere() {
        return this.boundingSphere();
    }
    // ------------------------------------------------
    // Center Of Mass
    // ------------------------------------------------
    centerOfMass() {
        if (this.vertices.length === 0) {
            return new Point3(0, 0, 0);
        }
        let x = 0;
        let y = 0;
        let z = 0;
        for (const p of this.vertices) {
            x += p.x;
            y += p.y;
            z += p.z;
        }
        const count = this.vertices.length;
        return new Point3(x / count, y / count, z / count);
    }
    // ------------------------------------------------
    // Clone
    // ------------------------------------------------
    clone() {
        const mesh = new Mesh3(this.name);
        for (const vertex of this.vertices) {
            mesh.addVertex(vertex);
        }
        for (const triangle of this.triangles) {
            mesh.addTriangle(triangle.a, triangle.b, triangle.c);
        }
        mesh.uvs =
            this.uvs.map(uv => [
                ...uv
            ]);
        mesh.computeNormals();
        return mesh;
    }
    // ------------------------------------------------
    // Serialization
    // ------------------------------------------------
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            vertices: this.vertices.map(v => v.toJSON()),
            triangles: this.triangles.map(t => ({
                a: t.a,
                b: t.b,
                c: t.c
            })),
            normals: this.normals.map(n => ({
                x: n.x,
                y: n.y,
                z: n.z
            })),
            uvs: this.uvs
        };
    }
    static fromJSON(data) {
        if (!data) {
            throw new Error("Invalid mesh data");
        }
        const mesh = new Mesh3(data.name ??
            "Mesh3");
        for (const vertex of data.vertices ?? []) {
            mesh.addVertex(Point3.fromJSON(vertex));
        }
        for (const triangle of data.triangles ?? []) {
            mesh.addTriangle(triangle.a, triangle.b, triangle.c);
        }
        mesh.uvs =
            data.uvs ?? [];
        mesh.computeNormals();
        return mesh;
    }
    // ------------------------------------------------
    // Clear
    // ------------------------------------------------
    clear() {
        this.vertices.length = 0;
        this.triangles.length = 0;
        this.normals.length = 0;
        this.uvs.length = 0;
        this.invalidateCache();
    }
    isEmpty() {
        return (this.vertices.length === 0 ||
            this.triangles.length === 0);
    }
    // ------------------------------------------------
    // Cache
    // ------------------------------------------------
    invalidateCache() {
        this.boundingBoxCache = null;
        this.boundingSphereCache = null;
        this.areaCache = null;
        this.volumeCache = null;
    }
    // ------------------------------------------------
    // Dispose
    // ------------------------------------------------
    dispose() {
        this.clear();
    }
    // ------------------------------------------------
    // Debug
    // ------------------------------------------------
    debugInfo() {
        return {
            id: this.id,
            name: this.name,
            vertices: this.vertices.length,
            triangles: this.triangles.length,
            area: this.area(),
            volume: this.volume()
        };
    }
    static generateId() {
        return ("mesh3_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 1000000));
    }
    toString() {
        return (`Mesh3(${this.name}) ` +
            `Vertices:${this.vertices.length} ` +
            `Triangles:${this.triangles.length}`);
    }
}
//# sourceMappingURL=Mesh3.js.map