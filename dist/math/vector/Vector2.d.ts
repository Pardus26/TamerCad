export declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    set(x: number, y: number): this;
    clone(): Vector2;
    add(vector: Vector2): Vector2;
    subtract(vector: Vector2): Vector2;
    multiplyScalar(value: number): Vector2;
    dot(vector: Vector2): number;
    length(): number;
    distanceTo(vector: Vector2): number;
    normalize(): Vector2;
    normalized(): Vector2;
    angle(): number;
    angleDegrees(): number;
    rotate(radians: number): Vector2;
    perpendicular(): Vector2;
    equals(vector: Vector2, tolerance?: number): boolean;
    static zero(): Vector2;
    static fromArray(values: number[]): Vector2;
    lerp(target: Vector2, amount: number): Vector2;
    clampLength(min: number, max: number): Vector2;
    distanceSquared(vector: Vector2): number;
    min(vector: Vector2): Vector2;
    max(vector: Vector2): Vector2;
    negate(): Vector2;
    serialize(): {
        x: number;
        y: number;
    };
    toArray(): number[];
    debugInfo(): {
        x: number;
        y: number;
        length: number;
        angle: number;
    };
}
