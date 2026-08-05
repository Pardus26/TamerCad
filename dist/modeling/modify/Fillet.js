import { Face } from "../../topology/core/Face";
import { PlaneSurface } from "../../geometry/surface/PlaneSurface";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Fillet {
    solid;
    edges;
    radius;
    options;
    constructor(solid, edges, radius, options = {}) {
        this.solid = solid;
        this.edges = edges;
        this.radius = radius;
        this.options = options;
        if (radius <= 0) {
            throw new Error("Fillet radius must be positive");
        }
        if (edges.length === 0) {
            throw new Error("Fillet requires at least one edge");
        }
    }
    build() {
        const builder = new BRepBuilder();
        const faces = [];
        for (const face of this.solid.getFaces()) {
            if (this.isAffected(face)) {
                faces.push(this.createFilletFace(face));
            }
            else {
                faces.push(face);
            }
        }
        const shell = builder.createShell(faces);
        return builder.createSolid(shell);
    }
    isAffected(face) {
        return face
            .getEdges()
            .some(edge => this.edges.includes(edge));
    }
    createFilletFace(face) {
        /*


            Gerçek CAD kernel aşaması:


            1- Edge komşu yüzleri alınır


            2- Edge boyunca tangent hesaplanır


            3- Radius kadar offset alınır


            4- Arc/cylinder blend surface oluşturulur


            5- Trim uygulanır


            6- Yeni Face oluşturulur



            Şimdilik topology korunur.


        */
        const surface = new PlaneSurface();
        return new Face(surface, face.outerWire);
    }
    getAdjacentFaces(edge) {
        const result = [];
        for (const face of this.solid.getFaces()) {
            if (face
                .getEdges()
                .includes(edge)) {
                result.push(face);
            }
        }
        return result;
    }
    getRadius() {
        return this.radius;
    }
    getEdges() {
        return this.edges;
    }
    getSegments() {
        return (this.options.segments ??
            16);
    }
    isSmooth() {
        return (this.options.smooth === true);
    }
    preserveTopology() {
        return (this.options.preserveTopology !== false);
    }
}
//# sourceMappingURL=Fillet.js.map