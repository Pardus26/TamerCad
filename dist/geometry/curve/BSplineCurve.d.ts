import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class BSplineCurve extends Curve {
    controlPoints: Point[];
    degree: number;
    knots: number[];
    constructor(controlPoints: Point[], degree: number, knots: number[]);
    get startParameter(): number;
    get endParameter(): number;
    /**
     * Cox-de Boor recursion
     */
    private basis;
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): BSplineCurve;
    transform(transform: Transform): BSplineCurve;
}
