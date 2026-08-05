import { Point } from "../../../geometry/core/Point";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity, SketchEntityType } from "../SketchEntity";
export class ArcEntity extends SketchEntity {
    center;
    radius;
    startAngle;
    endAngle;
    constructor(id, center, radius, startAngle, endAngle) {
        super(id, SketchEntityType.Arc);
        this.center = center;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
    getPoints() {
        return [
            this.startPoint(),
            this.endPoint()
        ];
    }
    evaluate(t) {
        if (t < 0 ||
            t > 1) {
            throw new Error("Arc parameter must be between 0 and 1");
        }
        const angle = this.startAngle +
            (this.endAngle -
                this.startAngle)
                * t;
        return new Point(this.center.x +
            Math.cos(angle)
                *
                    this.radius, this.center.y +
            Math.sin(angle)
                *
                    this.radius, this.center.z);
    }
    startPoint() {
        return new Point(this.center.x +
            Math.cos(this.startAngle)
                *
                    this.radius, this.center.y +
            Math.sin(this.startAngle)
                *
                    this.radius, this.center.z);
    }
    endPoint() {
        return new Point(this.center.x +
            Math.cos(this.endAngle)
                *
                    this.radius, this.center.y +
            Math.sin(this.endAngle)
                *
                    this.radius, this.center.z);
    }
    sweepAngle() {
        return (this.endAngle -
            this.startAngle);
    }
    length() {
        return Math.abs(this.sweepAngle())
            *
                this.radius;
    }
    midpoint() {
        return this.evaluate(0.5);
    }
    reverse() {
        const temp = this.startAngle;
        this.startAngle =
            this.endAngle;
        this.endAngle =
            temp;
    }
    translate(vector) {
        this.center.x +=
            vector.x;
        this.center.y +=
            vector.y;
        this.center.z +=
            vector.z;
    }
    toEdge() {
        return new Edge(this.startPoint(), this.endPoint());
    }
    clone() {
        return new ArcEntity(this.id, new Point(this.center.x, this.center.y, this.center.z), this.radius, this.startAngle, this.endAngle);
    }
}
//# sourceMappingURL=ArcEntity.js.map