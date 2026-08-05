import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Direction } from "../core/Direction";
import { Plane } from "../core/Plane";
import { BoundingBox } from "../core/BoundingBox";
export class CircleCurve extends Curve {
    center;
    radius;
    plane;
    constructor(center, radius, plane = Plane.XY()) {
        super();
        this.center = center;
        this.radius = radius;
        this.plane = plane;
        if (radius <= 0) {
            throw new Error("Circle radius must be positive");
        }
    }
    get startParameter() {
        return 0;
    }
    get endParameter() {
        return Math.PI * 2;
    }
    /**
     * C(t)
     */
    evaluate(t) {
        const normal = this.plane.normal.toVector();
        let xAxis = new Vector3(1, 0, 0);
        if (Math.abs(normal.dot(xAxis))
            >
                0.99) {
            xAxis =
                new Vector3(0, 1, 0);
        }
        const yAxis = normal.cross(xAxis)
            .normalize();
        xAxis =
            yAxis.cross(normal)
                .normalize();
        const point = this.center
            .addVector(xAxis.multiply(Math.cos(t)
            *
                this.radius))
            .addVector(yAxis.multiply(Math.sin(t)
            *
                this.radius));
        return point;
    }
    derivative(t) {
        const delta = 0.000001;
        return this.evaluate(t + delta)
            .subtract(this.evaluate(t))
            .multiply(1 / delta);
    }
    length() {
        return (2 *
            Math.PI *
            this.radius);
    }
    boundingBox() {
        return new BoundingBox(new Point(this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius), new Point(this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius));
    }
    closestPoint(point) {
        const direction = Direction.fromPoints(this.center, point);
        return this.center.addVector(direction
            .toVector()
            .multiply(this.radius));
    }
    reverse() {
        return new CircleCurve(this.center.clone(), this.radius, this.plane.reverse());
    }
    transform(transform) {
        return new CircleCurve(transform.applyToPoint(this.center), this.radius, this.plane.transform(transform));
    }
}
//# sourceMappingURL=CircleCurve.js.map