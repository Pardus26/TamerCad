export class Vector2 {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    // =====================================================
    // Set
    // =====================================================
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    // =====================================================
    // Clone
    // =====================================================
    clone() {
        return new Vector2(this.x, this.y);
    }
    // =====================================================
    // Addition
    // =====================================================
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    // =====================================================
    // Subtraction
    // =====================================================
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    // =====================================================
    // Scalar Multiply
    // =====================================================
    multiplyScalar(value) {
        this.x *= value;
        this.y *= value;
        return this;
    }
    // =====================================================
    // Dot Product
    // =====================================================
    dot(vector) {
        return (this.x *
            vector.x)
            +
                (this.y *
                    vector.y);
    }
    // =====================================================
    // Length
    // =====================================================
    length() {
        return Math.sqrt(this.x * this.x +
            this.y * this.y);
    }
    // =====================================================
    // Distance
    // =====================================================
    distanceTo(vector) {
        const dx = this.x -
            vector.x;
        const dy = this.y -
            vector.y;
        return Math.sqrt(dx * dx +
            dy * dy);
    }
    // =====================================================
    // Normalize
    // =====================================================
    normalize() {
        const length = this.length();
        if (length === 0) {
            return this;
        }
        this.x /= length;
        this.y /= length;
        return this;
    }
    // =====================================================
    // Normalized Copy
    // =====================================================
    normalized() {
        return this.clone()
            .normalize();
    }
    // =====================================================
    // Angle
    // =====================================================
    angle() {
        return Math.atan2(this.y, this.x);
    }
    // =====================================================
    // Angle In Degrees
    // =====================================================
    angleDegrees() {
        return (this.angle()
            *
                180
            /
                Math.PI);
    }
    // =====================================================
    // Rotate
    // =====================================================
    rotate(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const nx = this.x *
            cos
            -
                this.y *
                    sin;
        const ny = this.x *
            sin
            +
                this.y *
                    cos;
        this.x = nx;
        this.y = ny;
        return this;
    }
    // =====================================================
    // Perpendicular
    // =====================================================
    perpendicular() {
        return new Vector2(-this.y, this.x);
    }
    // =====================================================
    // Equals
    // =====================================================
    equals(vector, tolerance = 0.000001) {
        return (Math.abs(this.x -
            vector.x)
            <
                tolerance
            &&
                Math.abs(this.y -
                    vector.y)
                    <
                        tolerance);
    }
    // =====================================================
    // Static Helpers
    // =====================================================
    static zero() {
        return new Vector2(0, 0);
    }
    static fromArray(values) {
        return new Vector2(values[0] ?? 0, values[1] ?? 0);
    }
    // =====================================================
    // Linear Interpolation
    // =====================================================
    lerp(target, amount) {
        this.x +=
            (target.x -
                this.x)
                *
                    amount;
        this.y +=
            (target.y -
                this.y)
                *
                    amount;
        return this;
    }
    // =====================================================
    // Clamp Length
    // =====================================================
    clampLength(min, max) {
        const current = this.length();
        if (current === 0) {
            return this;
        }
        let length = current;
        if (length < min) {
            length = min;
        }
        if (length > max) {
            length = max;
        }
        return this
            .normalize()
            .multiplyScalar(length);
    }
    // =====================================================
    // Distance Squared
    // =====================================================
    distanceSquared(vector) {
        const dx = this.x -
            vector.x;
        const dy = this.y -
            vector.y;
        return (dx * dx)
            +
                (dy * dy);
    }
    // =====================================================
    // Min / Max
    // =====================================================
    min(vector) {
        return new Vector2(Math.min(this.x, vector.x), Math.min(this.y, vector.y));
    }
    max(vector) {
        return new Vector2(Math.max(this.x, vector.x), Math.max(this.y, vector.y));
    }
    // =====================================================
    // Negate
    // =====================================================
    negate() {
        this.x =
            -this.x;
        this.y =
            -this.y;
        return this;
    }
    // =====================================================
    // Serialization
    // =====================================================
    serialize() {
        return {
            x: this.x,
            y: this.y
        };
    }
    // =====================================================
    // Array Conversion
    // =====================================================
    toArray() {
        return [
            this.x,
            this.y
        ];
    }
    // =====================================================
    // Debug
    // =====================================================
    debugInfo() {
        return {
            x: this.x,
            y: this.y,
            length: this.length(),
            angle: this.angleDegrees()
        };
    }
}
//# sourceMappingURL=Vector2.js.map