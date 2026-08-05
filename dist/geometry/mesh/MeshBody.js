// src/geometry/mesh/MeshBody.ts
import { Mesh } from "./Mesh";
export class MeshBody {
    /**
     * Unique body id
     */
    id;
    /**
     * Display name
     */
    name;
    /**
     * Geometry mesh
     */
    mesh;
    /**
     * Visibility
     */
    visible = true;
    /**
     * Locked for editing
     */
    locked = false;
    /**
     * Selected state
     */
    selected = false;
    /**
     * Transform matrix
     *
     * column-major 4x4
     */
    transform = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
    /**
     * CAD metadata
     */
    metadata = {};
    constructor(mesh, name = "MeshBody") {
        this.mesh = mesh;
        this.name = name;
        this.id =
            MeshBody.generateId();
    }
    // ----------------------------------------
    // Geometry Queries
    // ----------------------------------------
    getVertexCount() {
        return this.mesh.vertexCount();
    }
    getTriangleCount() {
        return this.mesh.triangleCount();
    }
    getSurfaceArea() {
        return this.mesh.computeSurfaceArea();
    }
    getBoundingBox() {
        return this.mesh.getBoundingBox();
    }
    statistics() {
        return {
            vertices: this.getVertexCount(),
            triangles: this.getTriangleCount(),
            surfaceArea: this.getSurfaceArea(),
            visible: this.visible,
            locked: this.locked
        };
    }
    // ----------------------------------------
    // State
    // ----------------------------------------
    setVisible(value) {
        this.visible = value;
    }
    setLocked(value) {
        this.locked = value;
    }
    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
    // ----------------------------------------
    // Clone
    // ----------------------------------------
    clone() {
        const body = new MeshBody(this.mesh.clone(), this.name);
        body.visible =
            this.visible;
        body.locked =
            this.locked;
        body.selected =
            this.selected;
        body.transform = [
            ...this.transform
        ];
        body.metadata = {
            ...this.metadata
        };
        return body;
    }
    // ----------------------------------------
    // Serialization
    // ----------------------------------------
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            visible: this.visible,
            locked: this.locked,
            selected: this.selected,
            transform: this.transform,
            metadata: this.metadata,
            mesh: this.mesh.toJSON()
        };
    }
    static fromJSON(data) {
        const body = new MeshBody(Mesh.fromJSON(data.mesh), data.name);
        body.visible =
            data.visible ?? true;
        body.locked =
            data.locked ?? false;
        body.selected =
            data.selected ?? false;
        body.transform =
            data.transform ??
                [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ];
        body.metadata =
            data.metadata ?? {};
        return body;
    }
    // ----------------------------------------
    // Debug
    // ----------------------------------------
    debugInfo() {
        return {
            type: "MeshBody",
            id: this.id,
            name: this.name,
            vertices: this.getVertexCount(),
            triangles: this.getTriangleCount(),
            selected: this.selected
        };
    }
    static generateId() {
        return ("body_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 1000000));
    }
}
//# sourceMappingURL=MeshBody.js.map