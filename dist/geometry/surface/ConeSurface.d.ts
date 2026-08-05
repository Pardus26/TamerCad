import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Direction } from "../core/Direction";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class ConeSurface extends Surface {
    apex: Point;
    axis: Direction;
    angle: number;
    height: number;
    constructor(apex: Point, axis: Direction, angle: number, height: number);
    get uMin(): number;
    get uMax(): number;
    get vMin(): number;
    get vMax(): number;
    private basis;
    evaluate(u: number, v: number): Point;
    derivativeU(u: number, v: number): Vector3;
    derivativeV(u: number, v: number): Vector3;
    boundingBox(): BoundingBox;
    reverse(): ConeSurface;
    transform(transform: Transform): ConeSurface;
}
