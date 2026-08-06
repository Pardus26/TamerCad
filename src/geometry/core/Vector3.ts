import { Transform } from "./Transform";

const EPSILON = 1e-9;

export class Vector3 {

    public readonly x: number;
    public readonly y: number;
    public readonly z: number;

    constructor(
        x: number = 0,
        y: number = 0,
        z: number = 0
    ) {

        this.x = Number.isFinite(x) ? x : 0;
        this.y = Number.isFinite(y) ? y : 0;
        this.z = Number.isFinite(z) ? z : 0;

    }

    clone(): Vector3 {

        return new Vector3(
            this.x,
            this.y,
            this.z
        );

    }

    set(
        x: number,
        y: number,
        z: number
    ): Vector3 {

        return new Vector3(
            x,
            y,
            z
        );

    }

    negate(): Vector3 {

        return new Vector3(
            -this.x,
            -this.y,
            -this.z
        );

    }

    add(
        other: Vector3
    ): Vector3 {

        return new Vector3(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z
        );

    }

    subtract(
        other: Vector3
    ): Vector3 {

        return new Vector3(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z
        );

    }

    multiply(
        scalar: number
    ): Vector3 {

        return new Vector3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );

    }

    divide(
        scalar: number
    ): Vector3 {

        if (Math.abs(scalar) < EPSILON) {
            return Vector3.zero();
        }

        return new Vector3(
            this.x / scalar,
            this.y / scalar,
            this.z / scalar
        );

    }

    hadamard(
        other: Vector3
    ): Vector3 {

        return new Vector3(
            this.x * other.x,
            this.y * other.y,
            this.z * other.z
        );

    }
    lengthSquared(): number {

        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z
        );

    }

    length(): number {

        return Math.sqrt(
            this.lengthSquared()
        );

    }

    isZero(
        tolerance: number = EPSILON
    ): boolean {

        return this.lengthSquared() <= tolerance * tolerance;

    }

    isFinite(): boolean {

        return (
            Number.isFinite(this.x) &&
            Number.isFinite(this.y) &&
            Number.isFinite(this.z)
        );

    }

    normalize(): Vector3 {

        const len = this.length();

        if (len < EPSILON) {
            return Vector3.zero();
        }

        return this.divide(len);

    }

    normalizeSafe(
        fallback: Vector3 = Vector3.zero()
    ): Vector3 {

        const len = this.length();

        if (len < EPSILON) {
            return fallback.clone();
        }

        return this.divide(len);

    }

    dot(
        other: Vector3
    ): number {

        return (
            this.x * other.x +
            this.y * other.y +
            this.z * other.z
        );

    }

    cross(
        other: Vector3
    ): Vector3 {

        return new Vector3(

            this.y * other.z -
            this.z * other.y,

            this.z * other.x -
            this.x * other.z,

            this.x * other.y -
            this.y * other.x

        );

    }

    angleTo(
        other: Vector3
    ): number {

        const a = this.length();
        const b = other.length();

        if (
            a < EPSILON ||
            b < EPSILON
        ) {
            return 0;
        }

        let cosine =
            this.dot(other) / (a * b);

        cosine = Math.max(
            -1,
            Math.min(
                1,
                cosine
            )
        );

        return Math.acos(cosine);

    }

    distanceSquared(
        other: Vector3
    ): number {

        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;

        return (
            dx * dx +
            dy * dy +
            dz * dz
        );

    }

    distanceTo(
        other: Vector3
    ): number {

        return Math.sqrt(
            this.distanceSquared(other)
        );

    }

    projectOn(
        other: Vector3
    ): Vector3 {

        const denom =
            other.lengthSquared();

        if (denom < EPSILON) {
            return Vector3.zero();
        }

        const scale =
            this.dot(other) / denom;

        return other.multiply(scale);

    }

    rejectFrom(
        other: Vector3
    ): Vector3 {

        return this.subtract(
            this.projectOn(other)
        );

    }

    reflect(
        normal: Vector3
    ): Vector3 {

        const n =
            normal.normalize();

        return this.subtract(
            n.multiply(
                2 * this.dot(n)
            )
        );

    }

    lerp(
        target: Vector3,
        t: number
    ): Vector3 {

        return new Vector3(

            this.x +
            (target.x - this.x) * t,

            this.y +
            (target.y - this.y) * t,

            this.z +
            (target.z - this.z) * t

        );

    }

    transform(
        transform: Transform
    ): Vector3 {

        return transform.applyToVector(
            this
        );

    }

    equals(
        other: Vector3,
        tolerance: number = EPSILON
    ): boolean {

        return (

            Math.abs(this.x - other.x) <= tolerance &&
            Math.abs(this.y - other.y) <= tolerance &&
            Math.abs(this.z - other.z) <= tolerance

        );

    }

    min(
        other: Vector3
    ): Vector3 {

        return new Vector3(

            Math.min(this.x, other.x),
            Math.min(this.y, other.y),
            Math.min(this.z, other.z)

        );

    }

    max(
        other: Vector3
    ): Vector3 {

        return new Vector3(

            Math.max(this.x, other.x),
            Math.max(this.y, other.y),
            Math.max(this.z, other.z)

        );

    }

    clamp(
        minimum: Vector3,
        maximum: Vector3
    ): Vector3 {

        return new Vector3(

            Math.min(
                maximum.x,
                Math.max(minimum.x, this.x)
            ),

            Math.min(
                maximum.y,
                Math.max(minimum.y, this.y)
            ),

            Math.min(
                maximum.z,
                Math.max(minimum.z, this.z)
            )

        );

    }

    abs(): Vector3 {

        return new Vector3(

            Math.abs(this.x),
            Math.abs(this.y),
            Math.abs(this.z)

        );

    }

    floor(): Vector3 {

        return new Vector3(

            Math.floor(this.x),
            Math.floor(this.y),
            Math.floor(this.z)

        );

    }

    ceil(): Vector3 {

        return new Vector3(

            Math.ceil(this.x),
            Math.ceil(this.y),
            Math.ceil(this.z)

        );

    }

    round(): Vector3 {

        return new Vector3(

            Math.round(this.x),
            Math.round(this.y),
            Math.round(this.z)

        );

    }

    toArray(): number[] {

        return [
            this.x,
            this.y,
            this.z
        ];

    }

    static fromArray(
        values: ArrayLike<number>
    ): Vector3 {

        return new Vector3(

            values[0] ?? 0,
            values[1] ?? 0,
            values[2] ?? 0

        );

    }

    toString(): string {

        return `Vector3(${this.x}, ${this.y}, ${this.z})`;

    }

    static zero(): Vector3 {

        return new Vector3(
            0,
            0,
            0
        );

    }

    static one(): Vector3 {

        return new Vector3(
            1,
            1,
            1
        );

    }

    static xAxis(): Vector3 {

        return new Vector3(
            1,
            0,
            0
        );

    }

    static yAxis(): Vector3 {

        return new Vector3(
            0,
            1,
            0
        );

    }

    static zAxis(): Vector3 {

        return new Vector3(
            0,
            0,
            1
        );

    }

}