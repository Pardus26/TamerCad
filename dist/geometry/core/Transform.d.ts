import { Point } from "./Point";
import { Vector3 } from "./Vector3";
export declare class Transform {
    private matrix;
    constructor(matrix?: number[][]);
    applyToPoint(point: Point): Point;
    applyToVector(vector: Vector3): Vector3;
    multiply(other: Transform): Transform;
    inverse(): Transform;
    static identity(): Transform;
    static translation(x: number, y: number, z: number): Transform;
    static scale(x: number, y: number, z: number): Transform;
    getMatrix(): number[][];
}
