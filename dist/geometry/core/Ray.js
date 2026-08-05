import { Direction } from "./Direction";
import { Line } from "./Line";
export class Ray {
    origin;
    direction;
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    /**
     * R(t)=P+tD
     * t >= 0
     */
    pointAt(t) {
        if (t < 0) {
            throw new Error("Ray parameter cannot be negative");
        }
        return this.origin.addVector(this.direction
            .toVector()
            .multiply(t));
    }
    closestParameter(point) {
        const vector = point.subtract(this.origin);
        return Math.max(0, vector.dot(this.direction.toVector()));
    }
    projectPoint(point) {
        return this.pointAt(this.closestParameter(point));
    }
    distanceToPoint(point) {
        return point.distanceTo(this.projectPoint(point));
    }
    containsPoint(point, tolerance = 1e-6) {
        return (this.distanceToPoint(point)
            <
                tolerance);
    }
    toLine() {
        return new Line(this.origin.clone(), this.direction);
    }
    reverse() {
        return new Ray(this.origin.clone(), this.direction.reverse());
    }
    transform(transform) {
        return new Ray(transform.applyToPoint(this.origin), new Direction(transform.applyToVector(this.direction.toVector())));
    }
    clone() {
        return new Ray(this.origin.clone(), this.direction);
    }
    static fromPoints(start, through) {
        return new Ray(start.clone(), Direction.fromPoints(start, through));
    }
}
//# sourceMappingURL=Ray.js.map