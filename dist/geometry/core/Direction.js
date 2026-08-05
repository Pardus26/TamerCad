import { Vector3 } from "./Vector3";
import { Tolerance } from "./Tolerance";
export class Direction {
    vector;
    constructor(vector) {
        const length = vector.length();
        if (Tolerance.isZero(length)) {
            throw new Error("Direction cannot be zero vector");
        }
        this.vector =
            vector.normalize();
    }
    get x() {
        return this.vector.x;
    }
    get y() {
        return this.vector.y;
    }
    get z() {
        return this.vector.z;
    }
    toVector() {
        return this.vector.clone();
    }
    reverse() {
        return new Direction(this.vector.multiply(-1));
    }
    dot(other) {
        return this.vector.dot(other.vector);
    }
    cross(other) {
        return new Direction(this.vector.cross(other.vector));
    }
    angleTo(other) {
        return this.vector.angleTo(other.vector);
    }
    isParallel(other, tolerance = 1e-8) {
        const cross = this.vector.cross(other.vector);
        return (cross.length()
            <
                tolerance);
    }
    isPerpendicular(other, tolerance = 1e-8) {
        return Math.abs(this.dot(other))
            <
                tolerance;
    }
    transform(transform) {
        return new Direction(transform.applyToVector(this.vector));
    }
    equals(other, tolerance = 1e-8) {
        return this.vector.equals(other.vector, tolerance);
    }
    static X() {
        return new Direction(new Vector3(1, 0, 0));
    }
    static Y() {
        return new Direction(new Vector3(0, 1, 0));
    }
    static Z() {
        return new Direction(new Vector3(0, 0, 1));
    }
    static fromPoints(a, b) {
        return new Direction(b.subtract(a));
    }
}
//# sourceMappingURL=Direction.js.map