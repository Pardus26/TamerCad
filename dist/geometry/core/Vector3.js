export class Vector3 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(other) {
        return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    divide(scalar) {
        return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
    }
    length() {
        return Math.sqrt(this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }
    lengthSquared() {
        return (this.x * this.x +
            this.y * this.y +
            this.z * this.z);
    }
    normalize() {
        const len = this.length();
        if (len === 0) {
            return new Vector3();
        }
        return this.divide(len);
    }
    dot(other) {
        return (this.x * other.x +
            this.y * other.y +
            this.z * other.z);
    }
    cross(other) {
        return new Vector3(this.y * other.z -
            this.z * other.y, this.z * other.x -
            this.x * other.z, this.x * other.y -
            this.y * other.x);
    }
    angleTo(other) {
        const denominator = this.length() *
            other.length();
        if (denominator === 0) {
            return 0;
        }
        const value = this.dot(other)
            /
                denominator;
        return Math.acos(Math.max(-1, Math.min(1, value)));
    }
    projectOn(other) {
        const denom = other.lengthSquared();
        if (denom === 0) {
            return new Vector3();
        }
        return other.multiply(this.dot(other)
            /
                denom);
    }
    distanceTo(other) {
        return this.subtract(other).length();
    }
    transform(transform) {
        return transform.applyToVector(this);
    }
    equals(other, tolerance = 1e-6) {
        return (Math.abs(this.x - other.x)
            < tolerance
            &&
                Math.abs(this.y - other.y)
                    < tolerance
            &&
                Math.abs(this.z - other.z)
                    < tolerance);
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    static zero() {
        return new Vector3(0, 0, 0);
    }
    static xAxis() {
        return new Vector3(1, 0, 0);
    }
    static yAxis() {
        return new Vector3(0, 1, 0);
    }
    static zAxis() {
        return new Vector3(0, 0, 1);
    }
}
//# sourceMappingURL=Vector3.js.map