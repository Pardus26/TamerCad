import { BRepModel } from "../../topology/brep/BRepModel";
import { Point3 } from "../../geometry/primitives/Point3";
export class StepGeometryBuilder {
    model;
    points = new Map();
    constructor(model = new BRepModel()) {
        this.model = model;
    }
    build(entities) {
        for (const entity of entities) {
            this.dispatch(entity);
        }
        return this.model;
    }
    dispatch(entity) {
        switch (entity.type) {
            case "CARTESIAN_POINT":
                this.buildPoint(entity);
                break;
            case "DIRECTION":
                this.buildDirection(entity);
                break;
            case "VECTOR":
                this.buildVector(entity);
                break;
            case "LINE":
                this.buildLine(entity);
                break;
            case "CIRCLE":
                this.buildCircle(entity);
                break;
            case "PLANE":
                this.buildPlane(entity);
                break;
            case "VERTEX_POINT":
                this.buildVertex(entity);
                break;
            case "EDGE_CURVE":
                this.buildEdge(entity);
                break;
            case "ADVANCED_FACE":
                this.buildFace(entity);
                break;
            case "CLOSED_SHELL":
                this.buildShell(entity);
                break;
            case "MANIFOLD_SOLID_BREP":
                this.buildSolid(entity);
                break;
        }
    }
    buildPoint(entity) {
        this.points.set(entity.id, new Point3(entity.x, entity.y, entity.z));
    }
    buildDirection(entity) {
        // TODO
    }
    buildVector(entity) {
        // TODO
    }
    buildLine(entity) {
        // TODO
    }
    buildCircle(entity) {
        // TODO
    }
    buildPlane(entity) {
        // TODO
    }
}
//# sourceMappingURL=StepGeometryBuilder.js.map