import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Plane } from "../core/Plane";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class EllipseCurve extends Curve {
    center: Point;
    majorRadius: number;
    minorRadius: number;
    plane: Plane;
    constructor(center: Point, majorRadius: number, minorRadius: number, plane?: Plane);
    get startParameter(): number;
    get endParameter(): number;
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): EllipseCurve;
    transform(transform: Transform): EllipseCurve;
}
