import { Curve } from "./Curve";
import { Vector3 } from "../core/Vector3";
import { Direction } from "../core/Direction";
import { BoundingBox } from "../core/BoundingBox";
export class ArcCurve extends Curve {
    center;
    radius;
    plane;
    startAngle;
    endAngle;
    constructor(center, radius, plane, startAngle, endAngle) {
        super();
        this.center = center;
        this.radius = radius;
        this.plane = plane;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        if (radius <= 0) {
            throw new Error("Arc radius must be positive");
        }
        if (endAngle < startAngle) {
            throw new Error("Invalid arc angle range");
        }
    }
    get startParameter() {
        return this.startAngle;
    }
    get endParameter() {
        return this.endAngle;
    }
    evaluate(t) {
        if (t < this.startAngle ||
            t > this.endAngle) {
            throw new Error("Parameter outside arc domain");
        }
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
        return this.center
            .addVector(xAxis.multiply(Math.cos(t)
            *
                this.radius))
            .addVector(yAxis.multiply(Math.sin(t)
            *
                this.radius));
    }
    derivative(t) {
        const delta = 0.000001;
        return this.evaluate(t + delta)
            .subtract(this.evaluate(t))
            .multiply(1 / delta);
    }
    length() {
        return (this.endAngle -
            this.startAngle)
            *
                this.radius;
    }
    startPoint() {
        return this.evaluate(this.startAngle);
    }
    endPoint() {
        return this.evaluate(this.endAngle);
    }
    boundingBox() {
        const box = BoundingBox.empty();
        const samples = 32;
        for (let i = 0; i <= samples; i++) {
            const t = this.startAngle +
                ((this.endAngle -
                    this.startAngle)
                    *
                        i
                    /
                        samples);
            box.expand(this.evaluate(t));
        }
        return box;
    }
    closestPoint(point) {
        const direction = Direction.fromPoints(this.center, point);
        const projected = this.center.addVector(direction
            .toVector()
            .multiply(this.radius));
        const angle = Math.atan2(projected.y - this.center.y, projected.x - this.center.x);
        if (angle < this.startAngle) {
            return this.startPoint();
        }
        if (angle > this.endAngle) {
            return this.endPoint();
        }
        return projected;
    }
    reverse() {
        return new ArcCurve(this.center.clone(), this.radius, this.plane.reverse(), this.endAngle, this.startAngle);
    }
    transform(transform) {
        return new ArcCurve(transform.applyToPoint(this.center), this.radius, this.plane.transform(transform), this.startAngle, this.endAngle);
    }
}
//# sourceMappingURL=ArcCurve.js.map