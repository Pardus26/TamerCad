import { HalfEdge } from "../core/HalfEdge";
import { Shell } from "../core/Shell";
import { Solid } from "../core/Solid";
import { EdgeMatcher } from "./EdgeMatcher";
export class FaceSewing {
    tolerance;
    matcher;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
        this.matcher =
            new EdgeMatcher(tolerance);
    }
    sewFaces(faces) {
        const shell = new Shell(faces);
        const errors = [];
        const halfEdges = [];
        this.createHalfEdges(faces, halfEdges);
        this.connectTwins(halfEdges, errors);
        this.connectLoops(halfEdges);
        return {
            shell,
            halfEdges,
            sewn: errors.length === 0,
            errors
        };
    }
    createSolid(faces) {
        const result = this.sewFaces(faces);
        if (!result.sewn) {
            throw new Error(result.errors.join("\n"));
        }
        return new Solid(result.shell);
    }
    createHalfEdges(faces, output) {
        for (const face of faces) {
            for (const wire of face.getWires()) {
                const hes = [];
                for (const edge of wire.getEdges()) {
                    const he = new HalfEdge(edge, edge.start, edge.end);
                    hes.push(he);
                    output.push(he);
                }
                wire.clear();
                for (const he of hes) {
                    wire.addHalfEdge(he);
                }
            }
        }
    }
    connectTwins(halfEdges, errors) {
        for (let i = 0; i < halfEdges.length; i++) {
            const a = halfEdges[i];
            if (a.twin) {
                continue;
            }
            for (let j = i + 1; j < halfEdges.length; j++) {
                const b = halfEdges[j];
                if (b.twin) {
                    continue;
                }
                const match = this.matcher.match(a.edge, b.edge);
                if (match.type ===
                    "OppositeDirection") {
                    a.setTwin(b);
                    break;
                }
            }
        }
        for (const he of halfEdges) {
            if (!he.twin) {
                errors.push("Unsewn boundary edge");
            }
        }
    }
    connectLoops(halfEdges) {
        const outgoing = new Map();
        for (const he of halfEdges) {
            if (!outgoing.has(he.start)) {
                outgoing.set(he.start, []);
            }
            outgoing.get(he.start)
                .push(he);
        }
        for (const he of halfEdges) {
            const candidates = outgoing.get(he.end);
            if (!candidates) {
                continue;
            }
            const next = candidates.find(candidate => candidate !== he.twin);
            if (next) {
                he.setNext(next);
                next.setPrevious(he);
            }
        }
    }
    getBoundaryEdges(shell) {
        const result = [];
        for (const edge of shell.getEdges()) {
            let uses = 0;
            for (const face of shell.getFaces()) {
                for (const candidate of face.getEdges()) {
                    if (this.matcher.equals(edge, candidate)) {
                        uses++;
                    }
                }
            }
            if (uses === 1) {
                result.push(edge);
            }
        }
        return result;
    }
    isClosed(shell) {
        return (this.getBoundaryEdges(shell)
            .length === 0);
    }
}
//# sourceMappingURL=FaceSewing.js.map