import { Vector3 } from "../../math/vector/Vector3";
import { Matrix4 } from "../../math/matrix/Matrix4";
export interface Point3JSON {
    x: number;
    y: number;
    z: number;
}
export declare class Point3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    static origin(): Point3;
    static fromVector(vector: Vector3): Point3;
    toVector(): Vector3;
    add(vector: Vector3): Point3;
    subtract(point: Point3): Vector3;
    translate(vector: Vector3): void;
    scale(factor: number): Point3;
    lerp(point: Point3, t: number): Point3;
    distanceTo(point: Point3): number;
    distanceSquared(point: Point3): number;
    midpoint(point: Point3): Point3;
    transform(matrix: Matrix4): Point3;
    applyMatrix4(matrix: Matrix4): void;
    equals(point: Point3, tolerance?: number): boolean;
    clone(): Point3;
    toJSON(): Point3JSON;
    static fromJSON(data: any): Point3;
    toString(): string;
}
