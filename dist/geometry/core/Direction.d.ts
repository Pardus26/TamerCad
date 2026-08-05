import { Vector3 } from "./Vector3";
import { Transform } from "./Transform";
export declare class Direction {
    private vector;
    constructor(vector: Vector3);
    get x(): number;
    get y(): number;
    get z(): number;
    toVector(): Vector3;
    reverse(): Direction;
    dot(other: Direction): number;
    cross(other: Direction): Direction;
    angleTo(other: Direction): number;
    isParallel(other: Direction, tolerance?: number): boolean;
    isPerpendicular(other: Direction, tolerance?: number): boolean;
    transform(transform: Transform): Direction;
    equals(other: Direction, tolerance?: number): boolean;
    static X(): Direction;
    static Y(): Direction;
    static Z(): Direction;
    static fromPoints(a: Vector3, b: Vector3): Direction;
}
