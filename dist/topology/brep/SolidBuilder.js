import { Solid } from "../core/Solid";
import { ShellBuilder } from "./ShellBuilder";
export class SolidBuilder {
    shellBuilder;
    constructor(shellBuilder = new ShellBuilder()) {
        this.shellBuilder = shellBuilder;
    }
    build(shells, options = {}) {
        const errors = [];
        if (shells.length === 0) {
            return {
                solid: null,
                valid: false,
                errors: [
                    "Solid requires at least one shell"
                ]
            };
        }
        const solid = new Solid(shells[0]);
        for (let i = 1; i < shells.length; i++) {
            solid.addShell(shells[i]);
        }
        if (options.orientShells !== false) {
            this.orientShells(solid, errors);
        }
        if (options.validateManifold !== false) {
            if (!this.isManifold(solid)) {
                errors.push("Solid is not manifold");
            }
        }
        if (options.requireClosed) {
            if (!this.isClosed(solid)) {
                errors.push("Solid contains open shell");
            }
        }
        return {
            solid,
            valid: errors.length === 0,
            errors
        };
    }
    buildFromFaces(faces, options = {}) {
        const shellResult = this.shellBuilder.build(faces, {
            requireClosed: options.requireClosed,
            orientFaces: true
        });
        if (!shellResult.valid) {
            return {
                solid: null,
                valid: false,
                errors: shellResult.errors
            };
        }
        return this.build([
            shellResult.shell
        ], options);
    }
    createSolid(shell) {
        return new Solid(shell);
    }
    addShell(solid, shell) {
        solid.addShell(shell);
    }
    removeShell(solid, shell) {
        solid.removeShell(shell);
    }
    isClosed(solid) {
        for (const shell of solid.getShells()) {
            if (!shell.isClosed()) {
                return false;
            }
        }
        return true;
    }
    isManifold(solid) {
        for (const edge of solid.getEdges()) {
            let usage = 0;
            for (const face of solid.getFaces()) {
                if (face.containsEdge(edge)) {
                    usage++;
                }
            }
            if (usage !== 2) {
                return false;
            }
        }
        return true;
    }
    orientShells(solid, errors) {
        const shells = solid.getShells();
        if (shells.length === 0) {
            return;
        }
        const outer = shells[0];
        for (let i = 1; i < shells.length; i++) {
            const shell = shells[i];
            if (this.isSameOrientation(outer, shell)) {
                this.reverseShell(shell);
            }
        }
    }
    isSameOrientation(shellA, shellB) {
        const faceA = shellA.getFaces()[0];
        const faceB = shellB.getFaces()[0];
        if (!faceA
            ||
                !faceB) {
            return false;
        }
        return (faceA.reversed ===
            faceB.reversed);
    }
    reverseShell(shell) {
        const faces = shell.getFaces();
        for (const face of faces) {
            face.reversed =
                !face.reversed;
        }
    }
    getVolume(solid) {
        /*

            Gerçek BRep kernel:

            ∑ face signed tetrahedron volume

            burada hesaplanır.

        */
        return solid.volume();
    }
    getSurfaceArea(solid) {
        return solid.surfaceArea();
    }
    validate(solid) {
        return (solid.isValid()
            &&
                this.isManifold(solid));
    }
}
//# sourceMappingURL=SolidBuilder.js.map