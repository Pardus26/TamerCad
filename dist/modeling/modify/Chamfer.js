import { Face } from "../../topology/core/Face";
import { PlaneSurface } from "../../geometry/surface/PlaneSurface";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Chamfer {
    solid;
    edges;
    distance;
    options;
    constructor(solid, edges, distance, options = {}) {
        this.solid = solid;
        this.edges = edges;
        this.distance = distance;
        this.options = options;
        if (distance <= 0) {
            throw new Error("Chamfer distance must be positive");
        }
        if (edges.length === 0) {
            throw new Error("Chamfer requires at least one edge");
        }
        if (this.getAngle() <= 0 ||
            this.getAngle() >= Math.PI) {
            throw new Error("Chamfer angle must be between 0 and PI");
        }
    }
    build() {
        const builder = new BRepBuilder();
        const faces = [];
        for (const face of this.solid.getFaces()) {
            if (this.isAffected(face)) {
                faces.push(this.createChamferFace(face));
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
    createChamferFace(face) {
        /*


            Gerçek CAD kernel aşaması:


            1- Edge komşu yüzleri bulunur


            2- Distance offset hesaplanır


            3- İki yüz arasında planar chamfer surface oluşturulur


            4- Trim işlemi yapılır


            5- Yeni Face topology'ye bağlanır



            Şimdilik mevcut topology korunur.


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
    getDistance() {
        return this.distance;
    }
    getAngle() {
        return (this.options.angle ??
            Math.PI / 4);
    }
    getEdges() {
        return this.edges;
    }
    getSegments() {
        return (this.options.segments ??
            1);
    }
    preserveTopology() {
        return (this.options.preserveTopology !== false);
    }
}
//# sourceMappingURL=Chamfer.js.map