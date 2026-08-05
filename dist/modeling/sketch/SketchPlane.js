import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Transform } from "../../geometry/core/Transform";
export var SketchPlaneType;
(function (SketchPlaneType) {
    SketchPlaneType["XY"] = "XY";
    SketchPlaneType["XZ"] = "XZ";
    SketchPlaneType["YZ"] = "YZ";
    SketchPlaneType["Custom"] = "Custom";
})(SketchPlaneType || (SketchPlaneType = {}));
export class SketchPlane {
    type;
    origin;
    normal;
    xAxis;
    yAxis;
    constructor(type, origin, normal, xAxis, yAxis) {
        this.type = type;
        this.origin = origin;
        this.normal = normal;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
    }
    static XY() {
        return new SketchPlane(SketchPlaneType.XY, new Point(0, 0, 0), new Vector3(0, 0, 1), new Vector3(1, 0, 0), new Vector3(0, 1, 0));
    }
    static XZ() {
        return new SketchPlane(SketchPlaneType.XZ, new Point(0, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0), new Vector3(0, 0, 1));
    }
    static YZ() {
        return new SketchPlane(SketchPlaneType.YZ, new Point(0, 0, 0), new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1));
    }
    toWorld(u, v) {
        return new Point(this.origin.x
            +
                this.xAxis.x * u
            +
                this.yAxis.x * v, this.origin.y
            +
                this.xAxis.y * u
            +
                this.yAxis.y * v, this.origin.z
            +
                this.xAxis.z * u
            +
                this.yAxis.z * v);
    }
    projectPoint(point) {
        const dx = point.x -
            this.origin.x;
        const dy = point.y -
            this.origin.y;
        const dz = point.z -
            this.origin.z;
        return {
            u: dx * this.xAxis.x
                +
                    dy * this.xAxis.y
                +
                    dz * this.xAxis.z,
            v: dx * this.yAxis.x
                +
                    dy * this.yAxis.y
                +
                    dz * this.yAxis.z
        };
    }
    normalVector() {
        return this.normal;
    }
    transform() {
        return new Transform();
    }
}
//# sourceMappingURL=SketchPlane.js.map