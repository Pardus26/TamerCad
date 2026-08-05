import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class NURBSSurface extends Surface {
    controlPoints: Point[][];
    weights: number[][];
    degreeU: number;
    degreeV: number;
    knotsU: number[];
    knotsV: number[];
    constructor(controlPoints: Point[][], weights: number[][], degreeU: number, degreeV: number, knotsU: number[], knotsV: number[]);
    get uMin(): number;
    get uMax(): number;
    get vMin(): number;
    get vMax(): number;
    private basis;
    evaluate(u: number, v: number): Point;
    derivativeU(u: number, v: number): Vector3;
    derivativeV(u: number, v: number): Vector3;
    boundingBox(): BoundingBox;
    reverse(): NURBSSurface;
    transform(transform: Transform): NURBSSurface;
}
