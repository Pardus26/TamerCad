import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class NURBSCurve extends Curve {
    controlPoints: Point[];
    weights: number[];
    degree: number;
    knots: number[];
    constructor(controlPoints: Point[], weights: number[], degree: number, knots: number[]);
    get startParameter(): number;
    get endParameter(): number;
    private binomial;
    private basis;
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): NURBSCurve;
    transform(transform: Transform): NURBSCurve;
}
