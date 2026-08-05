import { CartesianPoint, Direction, Vector, Axis2Placement3D, Line, Circle, Plane, VertexPoint, EdgeCurve, OrientedEdge, EdgeLoop, FaceBound, AdvancedFace, ClosedShell, ManifoldSolidBrep } from "./StepEntity";
export class StepEntityFactory {
    create(id, type, parameters) {
        switch (type.toUpperCase()) {
            case "CARTESIAN_POINT":
                return new CartesianPoint(id, this.string(parameters[0]), this.number(parameters[1]), this.number(parameters[2]), this.number(parameters[3]));
            case "DIRECTION":
                return new Direction(id, this.string(parameters[0]), this.number(parameters[1]), this.number(parameters[2]), this.number(parameters[3]));
            case "VECTOR":
                return new Vector(id, this.string(parameters[0]), this.reference(parameters[1]), this.number(parameters[2]));
            case "AXIS2_PLACEMENT_3D":
                return new Axis2Placement3D(id, this.string(parameters[0]), this.reference(parameters[1]), this.reference(parameters[2]), this.reference(parameters[3]));
            case "LINE":
                return new Line(id, this.string(parameters[0]), this.reference(parameters[1]), this.reference(parameters[2]));
            case "CIRCLE":
                return new Circle(id, this.string(parameters[0]), this.reference(parameters[1]), this.number(parameters[2]));
            case "PLANE":
                return new Plane(id, this.string(parameters[0]), this.reference(parameters[1]));
            case "VERTEX_POINT":
                return new VertexPoint(id, this.string(parameters[0]), this.reference(parameters[1]));
            case "EDGE_CURVE":
                return new EdgeCurve(id, this.reference(parameters[0]), this.reference(parameters[1]), this.reference(parameters[2]), this.boolean(parameters[3]));
            case "ORIENTED_EDGE":
                return new OrientedEdge(id, this.reference(parameters[3]), this.boolean(parameters[4]));
            case "EDGE_LOOP":
                return new EdgeLoop(id, this.referenceArray(parameters));
            case "FACE_BOUND":
                return new FaceBound(id, this.reference(parameters[1]), this.boolean(parameters[2]));
            case "ADVANCED_FACE":
                return new AdvancedFace(id, this.referenceList(parameters[0]), this.reference(parameters[1]), this.boolean(parameters[2]));
            case "CLOSED_SHELL":
                return new ClosedShell(id, this.referenceList(parameters[1]));
            case "MANIFOLD_SOLID_BREP":
                return new ManifoldSolidBrep(id, this.string(parameters[0]), this.reference(parameters[1]));
            default:
                throw new Error(`Unsupported STEP entity: ${type}`);
        }
    }
    reference(value) {
        return Number(value.replace("#", ""));
    }
    referenceArray(values) {
        return values.map(x => this.reference(x));
    }
    referenceList(value) {
        return value
            .replace("(", "")
            .replace(")", "")
            .split(",")
            .map(x => this.reference(x.trim()));
    }
    number(value) {
        return Number(value);
    }
    boolean(value) {
        return (value
            .trim()
            .toUpperCase()
            ===
                ".T.");
    }
    string(value) {
        return value
            .replace(/'/g, "")
            .trim();
    }
}
//# sourceMappingURL=StepEntityFactory.js.map