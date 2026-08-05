import { Vector3 } from "../../geometry/core/Vector3";
import { Point } from "../../geometry/core/Point";
import { Wire } from "../../topology/core/Wire";
import { Face } from "../../topology/core/Face";
import { Edge } from "../../topology/core/Edge";
import { Vertex } from "../../topology/core/Vertex";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Extrude {
    profile;
    direction;
    distance;
    options;
    normalizedDirection;
    constructor(profile, direction, distance, options = {}) {
        this.profile = profile;
        this.direction = direction;
        this.distance = distance;
        this.options = options;
        if (distance <= 0) {
            throw new Error("Extrude distance must be positive");
        }
        if (!profile.isClosed()) {
            throw new Error("Extrude profile must be closed");
        }
        this.normalizedDirection =
            this.normalizeDirection(direction);
    }
    build() {
        const builder = new BRepBuilder();
        const startWire = this.cloneWire(this.profile);
        const endWire = this.translateWire(this.profile);
        const faces = [];
        if (this.options.capStart !== false) {
            faces.push(this.createFace(startWire));
        }
        faces.push(...this.createSideFaces(startWire, endWire));
        if (this.options.capEnd !== false) {
            faces.push(this.createFace(endWire));
        }
        const shell = builder.createShell(faces);
        return builder.createSolid(shell);
    }
    createFace(wire) {
        return new Face(null, wire);
    }
    translatePoint(point) {
        return new Point(point.x +
            this.normalizedDirection.x *
                this.distance, point.y +
            this.normalizedDirection.y *
                this.distance, point.z +
            this.normalizedDirection.z *
                this.distance);
    }
    normalizeDirection(vector) {
        const length = Math.sqrt(vector.x *
            vector.x +
            vector.y *
                vector.y +
            vector.z *
                vector.z);
        if (length === 0) {
            throw new Error("Extrude direction cannot be zero");
        }
        return new Vector3(vector.x /
            length, vector.y /
            length, vector.z /
            length);
    }
    cloneWire(wire) {
        const result = new Wire();
        for (const edge of wire.getEdges()) {
            const start = new Vertex(new Point(edge.start.position.x, edge.start.position.y, edge.start.position.z));
            const end = new Vertex(new Point(edge.end.position.x, edge.end.position.y, edge.end.position.z));
            result.addEdge(new Edge(start, end));
        }
        return result;
    }
    translateWire(wire) {
        const result = new Wire();
        for (const edge of wire.getEdges()) {
            const start = new Vertex(this.translatePoint(edge.start.position));
            const end = new Vertex(this.translatePoint(edge.end.position));
            result.addEdge(new Edge(start, end));
        }
        return result;
    }
    createSideFaces(source, target) {
        const faces = [];
        const sourceEdges = source.getEdges();
        const targetEdges = target.getEdges();
        const count = Math.min(sourceEdges.length, targetEdges.length);
        for (let i = 0; i < count; i++) {
            const bottom = sourceEdges[i];
            const top = targetEdges[i];
            const sideWire = new Wire();
            sideWire.addEdge(bottom);
            sideWire.addEdge(new Edge(bottom.end, top.end));
            sideWire.addEdge(new Edge(top.end, top.start));
            sideWire.addEdge(new Edge(top.start, bottom.start));
            faces.push(new Face(null, sideWire));
        }
        return faces;
    }
    getDirection() {
        return this.normalizedDirection;
    }
    getDistance() {
        return this.distance;
    }
    getProfile() {
        return this.profile;
    }
}
//# sourceMappingURL=Extrude.js.map