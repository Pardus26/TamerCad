import { Transform } from "./Transform";
export declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    add(other: Vector3): Vector3;
    subtract(other: Vector3): Vector3;
    multiply(scalar: number): Vector3;
    divide(scalar: number): Vector3;
    length(): number;
    lengthSquared(): number;
    normalize(): Vector3;
    dot(other: Vector3): number;
    cross(other: Vector3): Vector3;
    angleTo(other: Vector3): number;
    projectOn(other: Vector3): Vector3;
    distanceTo(other: Vector3): number;
    transform(transform: Transform): Vector3;
    equals(other: Vector3, tolerance?: number): boolean;
    clone(): Vector3;
    static zero(): Vector3;
    static xAxis(): Vector3;
    static yAxis(): Vector3;
    static zAxis(): Vector3;
}
