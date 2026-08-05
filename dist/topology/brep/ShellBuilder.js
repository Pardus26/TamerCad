import { Shell } from "../core/Shell";
import { EdgeMatcher } from "./EdgeMatcher";
export class ShellBuilder {
    tolerance;
    matcher;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
        this.matcher =
            new EdgeMatcher(tolerance);
    }
    build(faces, options = {}) {
        const errors = [];
        if (faces.length === 0) {
            return {
                shell: new Shell(),
                valid: false,
                errors: [
                    "Cannot build shell without faces"
                ]
            };
        }
        const shell = new Shell(faces);
        if (options.orientFaces !== false) {
            this.orientFaces(shell, errors);
        }
        this.validateConnectivity(shell, errors);
        if (options.requireClosed
            &&
                !this.isClosed(shell)) {
            errors.push("Shell is not closed");
        }
        return {
            shell,
            valid: errors.length === 0,
            errors
        };
    }
    buildClosedShell(faces) {
        const result = this.build(faces, {
            requireClosed: true,
            orientFaces: true
        });
        if (!result.valid) {
            throw new Error(result.errors.join("\n"));
        }
        return result.shell;
    }
    validateConnectivity(shell, errors) {
        const faces = shell.getFaces();
        for (const face of faces) {
            const neighbours = this.getNeighbourFaces(face, shell);
            if (neighbours.length === 0) {
                errors.push("Isolated face detected");
            }
        }
    }
    orientFaces(shell, errors) {
        const faces = shell.getFaces();
        if (faces.length === 0) {
            return;
        }
        const visited = new Set();
        const queue = [];
        queue.push(faces[0]);
        visited.add(faces[0]);
        while (queue.length > 0) {
            const current = queue.shift();
            const neighbours = this.getNeighbourFaces(current, shell);
            for (const neighbour of neighbours) {
                if (visited.has(neighbour)) {
                    continue;
                }
                if (!this.hasConsistentOrientation(current, neighbour, shell)) {
                    neighbour.reversed =
                        !neighbour.reversed;
                }
                visited.add(neighbour);
                queue.push(neighbour);
            }
        }
    }
    hasConsistentOrientation(faceA, faceB, shell) {
        for (const edgeA of faceA.getEdges()) {
            for (const edgeB of faceB.getEdges()) {
                const match = this.matcher.match(edgeA, edgeB);
                if (match.matched) {
                    return (match.type ===
                        "OppositeDirection");
                }
            }
        }
        return true;
    }
    getNeighbourFaces(face, shell) {
        const result = [];
        for (const edge of face.getEdges()) {
            for (const candidate of shell.getFaces()) {
                if (candidate === face) {
                    continue;
                }
                if (candidate.containsEdge(edge)) {
                    if (!result.includes(candidate)) {
                        result.push(candidate);
                    }
                }
            }
        }
        return result;
    }
    isClosed(shell) {
        for (const edge of shell.getEdges()) {
            let count = 0;
            for (const face of shell.getFaces()) {
                if (face.containsEdge(edge)) {
                    count++;
                }
            }
            if (count !== 2) {
                return false;
            }
        }
        return true;
    }
    addFace(shell, face) {
        shell.addFace(face);
    }
    removeFace(shell, face) {
        shell.removeFace(face);
    }
    merge(shellA, shellB) {
        const result = new Shell();
        for (const face of shellA.getFaces()) {
            result.addFace(face);
        }
        for (const face of shellB.getFaces()) {
            result.addFace(face);
        }
        return result;
    }
}
//# sourceMappingURL=ShellBuilder.js.map