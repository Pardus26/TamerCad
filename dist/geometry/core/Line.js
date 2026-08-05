import { Direction } from "./Direction";
export class Line {
    origin;
    direction;
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    /**
     * L(t)=P+tD
     */
    pointAt(parameter) {
        const offset = this.direction
            .toVector()
            .multiply(parameter);
        return this.origin.addVector(offset);
    }
    /**
     * Noktanın doğru üzerindeki izdüşümü
     */
    projectPoint(point) {
        const vector = point.subtract(this.origin);
        const distance = vector.dot(this.direction.toVector());
        return this.pointAt(distance);
    }
    distanceToPoint(point) {
        return point.distanceTo(this.projectPoint(point));
    }
    closestParameter(point) {
        const vector = point.subtract(this.origin);
        return vector.dot(this.direction.toVector());
    }
    isParallel(other) {
        return this.direction.isParallel(other.direction);
    }
    isCoincident(other) {
        if (!this.isParallel(other)) {
            return false;
        }
        return this.distanceToPoint(other.origin)
            <
                1e-6;
    }
    reverse() {
        return new Line(this.origin.clone(), this.direction.reverse());
    }
    transform(transform) {
        return new Line(transform.applyToPoint(this.origin), new Direction(transform.applyToVector(this.direction.toVector())));
    }
    toString() {
        return (`Line(` +
            `${this.origin.toString()}, ` +
            `${this.direction.toVector().toString()}` +
            `)`);
    }
    static fromPoints(a, b) {
        return new Line(a.clone(), new Direction(b.subtract(a)));
    }
}
//# sourceMappingURL=Line.js.map