import { Point } from "../../../geometry/core/Point";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity, SketchEntityType } from "../SketchEntity";
export class CircleEntity extends SketchEntity {
    center;
    radius;
    constructor(id, center, radius) {
        super(id, SketchEntityType.Circle);
        this.center = center;
        this.radius = radius;
    }
    getPoints() {
        return [
            this.center
        ];
    }
    evaluate(t) {
        const angle = t * Math.PI * 2;
        return new Point(this.center.x +
            Math.cos(angle)
                *
                    this.radius, this.center.y +
            Math.sin(angle)
                *
                    this.radius, this.center.z);
    }
    circumference() {
        return 2 *
            Math.PI *
            this.radius;
    }
    area() {
        return Math.PI *
            this.radius *
            this.radius;
    }
    containsPoint(point, tolerance = 1e-6) {
        const dx = point.x -
            this.center.x;
        const dy = point.y -
            this.center.y;
        const distance = Math.sqrt(dx * dx +
            dy * dy);
        return Math.abs(distance -
            this.radius)
            < tolerance;
    }
    translate(vector) {
        this.center.x +=
            vector.x;
        this.center.y +=
            vector.y;
        this.center.z +=
            vector.z;
    }
    scale(factor) {
        this.radius *=
            factor;
    }
    toEdge() {
        return new Edge(this.center, this.evaluate(0));
    }
    clone() {
        return new CircleEntity(this.id, new Point(this.center.x, this.center.y, this.center.z), this.radius);
    }
}
//# sourceMappingURL=CircleEntity.js.map