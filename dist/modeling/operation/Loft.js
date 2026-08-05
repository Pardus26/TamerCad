import { Wire } from "../../topology/core/Wire";
import { Edge } from "../../topology/core/Edge";
import { Face } from "../../topology/core/Face";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Loft {
    profiles;
    options;
    constructor(profiles, options = {}) {
        this.profiles = profiles;
        this.options = options;
        if (profiles.length < 2) {
            throw new Error("Loft requires at least two profiles");
        }
        this.validateProfiles();
    }
    build() {
        const builder = new BRepBuilder();
        const faces = [];
        faces.push(...this.createFaces());
        if (this.options.closed) {
            faces.push(...this.createClosingFaces());
        }
        else {
            if (this.options.capStart !== false) {
                faces.push(new Face(null, this.profiles[0]));
            }
            if (this.options.capEnd !== false) {
                faces.push(new Face(null, this.profiles[this.profiles.length - 1]));
            }
        }
        const shell = builder.createShell(faces);
        return builder.createSolid(shell);
    }
    validateProfiles() {
        const firstCount = this.profiles[0]
            .getEdges()
            .length;
        for (const profile of this.profiles) {
            if (!profile.isClosed()) {
                throw new Error("Loft profiles must be closed");
            }
            if (profile.getEdges().length !== firstCount) {
                throw new Error("All loft profiles must have same edge count");
            }
        }
    }
    createFaces() {
        const faces = [];
        for (let i = 0; i < this.profiles.length - 1; i++) {
            const current = this.profiles[i];
            const next = this.profiles[i + 1];
            const currentEdges = current.getEdges();
            const nextEdges = next.getEdges();
            for (let j = 0; j < currentEdges.length; j++) {
                faces.push(this.createLoftFace(currentEdges[j], nextEdges[j]));
            }
        }
        return faces;
    }
    createLoftFace(edgeA, edgeB) {
        const wire = new Wire();
        wire.addEdge(edgeA);
        wire.addEdge(new Edge(edgeA.end, edgeB.end));
        wire.addEdge(edgeB);
        wire.addEdge(new Edge(edgeB.start, edgeA.start));
        return new Face(null, wire);
    }
    createClosingFaces() {
        const faces = [];
        const first = this.profiles[0];
        const last = this.profiles[this.profiles.length - 1];
        const firstEdges = first.getEdges();
        const lastEdges = last.getEdges();
        for (let i = 0; i < firstEdges.length; i++) {
            faces.push(this.createLoftFace(lastEdges[i], firstEdges[i]));
        }
        return faces;
    }
    getProfiles() {
        return this.profiles;
    }
    isSmooth() {
        return this.options.smooth === true;
    }
    isClosed() {
        return this.options.closed === true;
    }
}
//# sourceMappingURL=Loft.js.map