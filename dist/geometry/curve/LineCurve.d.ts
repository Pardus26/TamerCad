import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Direction } from "../core/Direction";
import { Line } from "../core/Line";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class LineCurve extends Curve {
    private line;
    constructor(origin: Point, direction: Direction);
    get startParameter(): number;
    get endParameter(): number;
    evaluate(t: number): Point;
    derivative(t: number): Vector3;
    length(): number;
    boundingBox(): BoundingBox;
    closestPoint(point: Point): Point;
    reverse(): LineCurve;
    transform(transform: Transform): LineCurve;
    getLine(): Line;
    static fromPoints(start: Point, end: Point): LineCurve;
}
