import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class SphereSurface extends Surface {
    center: Point;
    radius: number;
    constructor(center: Point, radius: number);
    get uMin(): number;
    get uMax(): number;
    get vMin(): number;
    get vMax(): number;
    evaluate(u: number, v: number): Point;
    derivativeU(u: number, v: number): Vector3;
    derivativeV(u: number, v: number): Vector3;
    boundingBox(): BoundingBox;
    reverse(): SphereSurface;
    transform(transform: Transform): SphereSurface;
}
