import { BRepModel } from "./BRepModel";
import { Solid } from "../core/Solid";
import { Shell } from "../core/Shell";
import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
import { Vertex } from "../core/Vertex";
import { Wire } from "../core/Wire";
import { Point } from "../../geometry/core/Point";
export class BRepSerializer {
    serialize(model) {
        const vertices = [];
        const edges = [];
        const faces = [];
        const shells = [];
        const solids = [];
        const vertexIds = new Map();
        const edgeIds = new Map();
        const faceIds = new Map();
        const shellIds = new Map();
        let counter = 0;
        const id = (prefix) => prefix + (++counter);
        for (const vertex of model.getVertices()) {
            const vid = id("v");
            vertexIds.set(vertex, vid);
            vertices.push({
                id: vid,
                x: vertex.position.x,
                y: vertex.position.y,
                z: vertex.position.z
            });
        }
        for (const edge of model.getEdges()) {
            const eid = id("e");
            edgeIds.set(edge, eid);
            edges.push({
                id: eid,
                start: vertexIds.get(edge.start),
                end: vertexIds.get(edge.end)
            });
        }
        for (const face of model.getFaces()) {
            const fid = id("f");
            faceIds.set(face, fid);
            faces.push({
                id: fid,
                edges: face.getEdges()
                    .map(e => edgeIds.get(e))
            });
        }
        for (const solid of model.getSolids()) {
            for (const shell of solid.getShells()) {
                const sid = id("sh");
                shellIds.set(shell, sid);
                shells.push({
                    id: sid,
                    faces: shell.getFaces()
                        .map(f => faceIds.get(f))
                });
            }
        }
        for (const solid of model.getSolids()) {
            solids.push({
                id: id("so"),
                shells: solid.getShells()
                    .map(sh => shellIds.get(sh))
            });
        }
        return {
            vertices,
            edges,
            faces,
            shells,
            solids
        };
    }
    deserialize(data) {
        const model = new BRepModel();
        const vertexMap = new Map();
        const edgeMap = new Map();
        const faceMap = new Map();
        const shellMap = new Map();
        for (const v of data.vertices) {
            vertexMap.set(v.id, new Vertex(new Point(v.x, v.y, v.z)));
        }
        for (const e of data.edges) {
            const edge = new Edge(vertexMap.get(e.start), vertexMap.get(e.end));
            edgeMap.set(e.id, edge);
        }
        for (const f of data.faces) {
            const wire = new Wire();
            for (const eid of f.edges) {
                wire.addEdge(edgeMap.get(eid));
            }
            wire.close();
            const face = new Face(null, wire);
            faceMap.set(f.id, face);
        }
        for (const sh of data.shells) {
            const shell = new Shell();
            for (const fid of sh.faces) {
                shell.addFace(faceMap.get(fid));
            }
            shellMap.set(sh.id, shell);
        }
        for (const so of data.solids) {
            const solid = new Solid(shellMap.get(so.shells[0]));
            for (let i = 1; i < so.shells.length; i++) {
                solid.addShell(shellMap.get(so.shells[i]));
            }
            model.addSolid(solid);
        }
        return model;
    }
    toJSON(model) {
        return JSON.stringify(this.serialize(model), null, 2);
    }
    fromJSON(json) {
        return this.deserialize(JSON.parse(json));
    }
}
//# sourceMappingURL=BRepSerializer.js.map