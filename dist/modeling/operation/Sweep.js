import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Wire } from "../../topology/core/Wire";
import { Vertex } from "../../topology/core/Vertex";
import { Edge } from "../../topology/core/Edge";
import { Face } from "../../topology/core/Face";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Sweep {
    profile;
    path;
    options;
    constructor(profile, path, options = {}) {
        this.profile = profile;
        this.path = path;
        this.options = options;
        if (!profile.isClosed()) {
            throw new Error("Sweep profile must be closed");
        }
    }
    build() {
        const builder = new BRepBuilder();
        const sections = Math.max(this.options.sections ?? 32, 2);
        const profileSections = [];
        for (let i = 0; i <= sections; i++) {
            const t = i /
                sections;
            const position = this.path.evaluate(t);
            const tangent = this.normalize(this.path.tangent(t));
            profileSections.push(this.placeProfile(this.profile, position, tangent, this.getScale(t)));
        }
        const faces = [];
        faces.push(...this.createFaces(profileSections));
        if (this.options.capStart !== false) {
            faces.push(new Face(null, profileSections[0]));
        }
        if (this.options.capEnd !== false) {
            faces.push(new Face(null, profileSections[profileSections.length - 1]));
        }
        const shell = builder.createShell(faces);
        return builder.createSolid(shell);
    }
    getScale(t) {
        if (this.options.scale === undefined) {
            return 1;
        }
        return (1 +
            (this.options.scale - 1)
                *
                    t);
    }
    placeProfile(profile, origin, tangent, scale) {
        const result = new Wire();
        const frame = this.createFrame(tangent);
        for (const edge of profile.getEdges()) {
            const start = this.transformPoint(edge.start.position, origin, frame.normal, frame.binormal, frame.tangent, scale);
            const end = this.transformPoint(edge.end.position, origin, frame.normal, frame.binormal, frame.tangent, scale);
            result.addEdge(new Edge(new Vertex(start), new Vertex(end)));
        }
        return result;
    }
    transformPoint(point, origin, normal, binormal, tangent, scale) {
        const x = point.x *
            scale;
        const y = point.y *
            scale;
        const z = point.z *
            scale;
        return new Point(origin.x +
            normal.x * x +
            binormal.x * y +
            tangent.x * z, origin.y +
            normal.y * x +
            binormal.y * y +
            tangent.y * z, origin.z +
            normal.z * x +
            binormal.z * y +
            tangent.z * z);
    }
    createFrame(tangent) {
        let reference = new Vector3(0, 0, 1);
        if (Math.abs(tangent.z) > 0.9) {
            reference =
                new Vector3(1, 0, 0);
        }
        const normal = this.normalize(tangent.cross(reference));
        const binormal = this.normalize(tangent.cross(normal));
        return {
            normal,
            binormal,
            tangent
        };
    }
    createFaces(sections) {
        const faces = [];
        for (let i = 0; i < sections.length - 1; i++) {
            const current = sections[i];
            const next = sections[i + 1];
            const currentEdges = current.getEdges();
            const nextEdges = next.getEdges();
            const count = Math.min(currentEdges.length, nextEdges.length);
            for (let j = 0; j < count; j++) {
                const a = currentEdges[j];
                const b = nextEdges[j];
                const wire = new Wire();
                wire.addEdge(a);
                wire.addEdge(new Edge(a.end, b.end));
                wire.addEdge(b);
                wire.addEdge(new Edge(b.start, a.start));
                faces.push(new Face(null, wire));
            }
        }
        return faces;
    }
    normalize(vector) {
        const length = Math.sqrt(vector.x * vector.x +
            vector.y * vector.y +
            vector.z * vector.z);
        if (length === 0) {
            throw new Error("Zero vector");
        }
        return new Vector3(vector.x / length, vector.y / length, vector.z / length);
    }
    getProfile() {
        return this.profile;
    }
    getPath() {
        return this.path;
    }
    getSections() {
        return this.options.sections ?? 32;
    }
}
//# sourceMappingURL=Sweep.js.map