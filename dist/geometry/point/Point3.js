import { Vector3 } from "../../math/vector/Vector3";
export class Point3 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    // ---------------------------------------
    // Factory
    // ---------------------------------------
    static origin() {
        return new Point3(0, 0, 0);
    }
    static fromVector(vector) {
        return new Point3(vector.x, vector.y, vector.z);
    }
    toVector() {
        return new Vector3(this.x, this.y, this.z);
    }
    // ---------------------------------------
    // Arithmetic
    // ---------------------------------------
    add(vector) {
        return new Point3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    subtract(point) {
        return new Vector3(this.x - point.x, this.y - point.y, this.z - point.z);
    }
    translate(vector) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }
    scale(factor) {
        return new Point3(this.x * factor, this.y * factor, this.z * factor);
    }
    lerp(point, t) {
        return new Point3(this.x + (point.x - this.x) * t, this.y + (point.y - this.y) * t, this.z + (point.z - this.z) * t);
    }
    // ---------------------------------------
    // Distance
    // ---------------------------------------
    distanceTo(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        const dz = this.z - point.z;
        return Math.sqrt(dx * dx +
            dy * dy +
            dz * dz);
    }
    distanceSquared(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        const dz = this.z - point.z;
        return (dx * dx +
            dy * dy +
            dz * dz);
    }
    midpoint(point) {
        return new Point3((this.x + point.x) * 0.5, (this.y + point.y) * 0.5, (this.z + point.z) * 0.5);
    }
    // ---------------------------------------
    // Transform
    // ---------------------------------------
    transform(matrix) {
        const result = matrix.transformPoint(this);
        return new Point3(result.x, result.y, result.z);
    }
    applyMatrix4(matrix) {
        const result = this.transform(matrix);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
    }
    // ---------------------------------------
    // Compare
    // ---------------------------------------
    equals(point, tolerance = 1e-6) {
        return (Math.abs(this.x - point.x) <= tolerance &&
            Math.abs(this.y - point.y) <= tolerance &&
            Math.abs(this.z - point.z) <= tolerance);
    }
    // ---------------------------------------
    // Clone
    // ---------------------------------------
    clone() {
        return new Point3(this.x, this.y, this.z);
    }
    // ---------------------------------------
    // Serialization
    // ---------------------------------------
    toJSON() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        };
    }
    static fromJSON(data) {
        return new Point3(data.x ?? 0, data.y ?? 0, data.z ?? 0);
    }
    // ---------------------------------------
    // Debug
    // ---------------------------------------
    toString() {
        return (`Point3(` +
            `${this.x}, ` +
            `${this.y}, ` +
            `${this.z}` +
            `)`);
    }
}
//# sourceMappingURL=Point3.js.map