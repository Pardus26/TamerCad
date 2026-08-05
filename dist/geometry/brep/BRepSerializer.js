import { BRepSolid } from "./BRepSolid";
export class BRepSerializer {
    static VERSION = "1.0.0";
    /**
     * BRepSolid → JSON
     */
    static serialize(solid) {
        return {
            version: this.VERSION,
            id: solid.id,
            shells: solid.shells.map(shell => this.serializeShell(shell)),
            metadata: {
                ...solid.metadata
            }
        };
    }
    /**
     * Shell export
     */
    static serializeShell(shell) {
        return {
            id: shell.id,
            inner: shell.inner,
            faces: shell.faces.map(face => this.serializeFace(face))
        };
    }
    /**
     * Face export
     */
    static serializeFace(face) {
        return {
            id: face.id,
            surface: {
                type: face.surface.constructor.name
            },
            outerLoop: this.serializeLoop(face.outerLoop),
            innerLoops: face.innerLoops.map(loop => this.serializeLoop(loop)),
            reversed: face.reversed
        };
    }
    /**
     * Loop export
     */
    static serializeLoop(loop) {
        return {
            id: loop.id,
            edges: loop.edges.map(edge => this.serializeEdge(edge)),
            outer: loop.outer
        };
    }
    /**
     * Edge export
     */
    static serializeEdge(edge) {
        return {
            id: edge.id,
            startVertex: this.serializeVertex(edge.startVertex),
            endVertex: this.serializeVertex(edge.endVertex),
            curve: {
                type: edge.curve.constructor.name
            },
            reversed: edge.reversed
        };
    }
    /**
     * Vertex export
     */
    static serializeVertex(vertex) {
        return {
            id: vertex.id,
            point: {
                x: vertex.point.x,
                y: vertex.point.y,
                z: vertex.point.z
            }
        };
    }
    /**
     * JSON string export
     */
    static toJSON(solid, pretty = true) {
        return JSON.stringify(this.serialize(solid), null, pretty
            ?
                4
            :
                0);
    }
    /**
     * JSON import
     *
     * Placeholder:
     * Geometry reconstruction
     * sonraki kernel aşamasında genişletilecek.
     */
    static deserialize(data) {
        const solid = new BRepSolid();
        solid.metadata =
            {
                ...data.metadata
            };
        /*
            İleri aşamada:

            - Vertex registry
            - Edge linking
            - Surface restore
            - Topology rebuild

            yapılacak.
        */
        return solid;
    }
    /**
     * JSON string import
     */
    static fromJSON(json) {
        const data = JSON.parse(json);
        return this.deserialize(data);
    }
    /**
     * Versiyon bilgisi
     */
    static version() {
        return this.VERSION;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepSerializer",
            version: this.VERSION,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepSerializer.js.map