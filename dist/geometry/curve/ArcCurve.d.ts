import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Plane } from "../core/Plane";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class ArcCurve extends Curve {
    center: Point;
    radius: number;
    plane: Plane;
    startAngle: number;
    endAngle: number;
    constructor(center: Point, radius: number, plane: Plane, startAngle: number, endAngle: number);
    get startParameter(): number;
    get endParameter(): number;
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    startPoint(): Point;
    endPoint(): Point;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): ArcCurve;
    transform(transform: Transform): ArcCurve;
}
