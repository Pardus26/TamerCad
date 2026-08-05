import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class BezierSurface extends Surface {
    controlPoints: Point[][];
    constructor(controlPoints: Point[][]);
    private get degreeU();
    private get degreeV();
    get uMin(): number;
    get uMax(): number;
    get vMin(): number;
    get vMax(): number;
    private bernstein;
    private binomial;
    evaluate(u: number, v: number): Point;
    derivativeU(u: number, v: number): Vector3;
    derivativeV(u: number, v: number): Vector3;
    boundingBox(): BoundingBox;
    reverse(): BezierSurface;
    transform(transform: Transform): BezierSurface;
}
