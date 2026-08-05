import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Plane } from "../core/Plane";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class CircleCurve extends Curve {
    center: Point;
    radius: number;
    plane: Plane;
    constructor(center: Point, radius: number, plane?: Plane);
    get startParameter(): number;
    get endParameter(): number;
    /**
     * C(t)
     */
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): CircleCurve;
    transform(transform: Transform): CircleCurve;
}
