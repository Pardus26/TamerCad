export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
    clone(): Vector3;
    add(v: Vector3): Vector3;
    subtract(v: Vector3): Vector3;
    multiply(s: number): Vector3;
    dot(v: Vector3): number;
    cross(v: Vector3): Vector3;
    length(): number;
    normalize(): Vector3;
    distance(v: Vector3): number;
}
