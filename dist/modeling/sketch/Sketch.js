import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Wire } from "../../topology/core/Wire";
import { Edge } from "../../topology/core/Edge";
export var SketchGeometryType;
(function (SketchGeometryType) {
    SketchGeometryType["Line"] = "Line";
    SketchGeometryType["Circle"] = "Circle";
    SketchGeometryType["Arc"] = "Arc";
    SketchGeometryType["Spline"] = "Spline";
})(SketchGeometryType || (SketchGeometryType = {}));
export class Sketch {
    name;
    origin;
    normal;
    geometries = [];
    constraints = [];
    constructor(name, origin = new Point(0, 0, 0), normal = new Vector3(0, 0, 1)) {
        this.name = name;
        this.origin = origin;
        this.normal = normal;
    }
    addGeometry(geometry) {
        this.geometries.push(geometry);
    }
    removeGeometry(id) {
        this.geometries =
            this.geometries.filter(g => g.id !== id);
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    removeConstraint(id) {
        this.constraints =
            this.constraints.filter(c => c.id !== id);
    }
    solve() {
        // Gerçek kernel'de:
        // Constraint solver burada çalışır.
        return true;
    }
    isClosed() {
        if (this.geometries.length === 0) {
            return false;
        }
        return true;
    }
    toWire() {
        const wire = new Wire();
        for (const geometry of this.geometries) {
            const edge = this.geometryToEdge(geometry);
            wire.addEdge(edge);
        }
        return wire;
    }
    geometryToEdge(geometry) {
        const start = geometry.points[0];
        const end = geometry.points[1];
        return new Edge(start, end);
    }
}
//# sourceMappingURL=Sketch.js.map