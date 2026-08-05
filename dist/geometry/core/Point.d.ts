import { Vector3 } from "./Vector3";
import { Transform } from "./Transform";
export declare class Point {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    distanceTo(other: Point): number;
    subtract(other: Point): Vector3;
    addVector(vector: Vector3): Point;
    transform(transform: Transform): Point;
    equals(other: Point, tolerance?: number): boolean;
    clone(): Point;
    toArray(): number[];
    static fromArray(values: number[]): Point;
    toString(): string;
}
