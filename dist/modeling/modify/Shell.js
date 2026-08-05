import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Shell {
    solid;
    thickness;
    options;
    constructor(solid, thickness, options = {}) {
        this.solid = solid;
        this.thickness = thickness;
        this.options = options;
    }
    build() {
        const builder = new BRepBuilder();
        const outerFaces = this.solid.getFaces();
        const innerFaces = outerFaces.map(face => this.offsetFace(face));
        const wallFaces = this.createWallFaces(outerFaces, innerFaces);
        const allFaces = [
            ...innerFaces,
            ...wallFaces
        ];
        const shell = builder.createShell(allFaces);
        return builder.createSolid(shell);
    }
    offsetFace(face) {
        // Gerçek kernel'de burada:
        // Surface offset algoritması çalışır.
        return face;
    }
    createWallFaces(outer, inner) {
        const walls = [];
        const count = Math.min(outer.length, inner.length);
        for (let i = 0; i < count; i++) {
            walls.push(outer[i]);
        }
        return walls;
    }
}
//# sourceMappingURL=Shell.js.map