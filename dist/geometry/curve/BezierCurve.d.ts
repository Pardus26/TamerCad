import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class BezierCurve extends Curve {
    controlPoints: Point[];
    constructor(controlPoints: Point[]);
    get degree(): number;
    get startParameter(): number;
    get endParameter(): number;
    /**
     * Bernstein polynomial
     */
    private bernstein;
    private binomial;
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): BezierCurve;
    transform(transform: Transform): BezierCurve;
}
