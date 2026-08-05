import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Plane } from "../core/Plane";
import { BoundingBox } from "../core/BoundingBox";
export class EllipseCurve extends Curve {
    center;
    majorRadius;
    minorRadius;
    plane;
    constructor(center, majorRadius, minorRadius, plane = Plane.XY()) {
        super();
        this.center = center;
        this.majorRadius = majorRadius;
        this.minorRadius = minorRadius;
        this.plane = plane;
        if (majorRadius <= 0 ||
            minorRadius <= 0) {
            throw new Error("Ellipse radii must be positive");
        }
    }
    get startParameter() {
        return 0;
    }
    get endParameter() {
        return Math.PI * 2;
    }
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
        return this.center
            .addVector(xAxis.multiply(Math.cos(t)
            *
                this.majorRadius))
            .addVector(yAxis.multiply(Math.sin(t)
            *
                this.minorRadius));
    }
    derivative(t) {
        return (new Vector3(-Math.sin(t)
            *
                this.majorRadius, Math.cos(t)
            *
                this.minorRadius, 0));
    }
    length() {
        // Ramanujan approximation
        const a = this.majorRadius;
        const b = this.minorRadius;
        const h = Math.pow(a - b, 2)
            /
                Math.pow(a + b, 2);
        return (Math.PI
            *
                (a + b)
            *
                (1
                    +
                        (3 * h)
                            /
                                (10
                                    +
                                        Math.sqrt(4 - 3 * h))));
    }
    boundingBox() {
        return new BoundingBox(new Point(this.center.x - this.majorRadius, this.center.y - this.minorRadius, this.center.z - this.majorRadius), new Point(this.center.x + this.majorRadius, this.center.y + this.minorRadius, this.center.z + this.majorRadius));
    }
    closestPoint(point) {
        const local = point.subtract(this.center);
        const angle = Math.atan2(local.y /
            this.minorRadius, local.x /
            this.majorRadius);
        return this.evaluate(angle);
    }
    reverse() {
        return new EllipseCurve(this.center.clone(), this.majorRadius, this.minorRadius, this.plane.reverse());
    }
    transform(transform) {
        return new EllipseCurve(transform.applyToPoint(this.center), this.majorRadius, this.minorRadius, this.plane.transform(transform));
    }
}
//# sourceMappingURL=EllipseCurve.js.map