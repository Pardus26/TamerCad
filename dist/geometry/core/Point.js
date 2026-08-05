import { Vector3 } from "./Vector3";
export class Point {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    distanceTo(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx * dx +
            dy * dy +
            dz * dz);
    }
    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    addVector(vector) {
        return new Point(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    transform(transform) {
        return transform.applyToPoint(this);
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
        return new Point(this.x, this.y, this.z);
    }
    toArray() {
        return [
            this.x,
            this.y,
            this.z
        ];
    }
    static fromArray(values) {
        return new Point(values[0] ?? 0, values[1] ?? 0, values[2] ?? 0);
    }
    toString() {
        return `Point(${this.x}, ${this.y}, ${this.z})`;
    }
}
//# sourceMappingURL=Point.js.map