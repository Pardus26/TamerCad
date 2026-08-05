import { Point } from "./Point";
import { Direction } from "./Direction";
import { Transform } from "./Transform";
import { Line } from "./Line";
export declare class Ray {
    origin: Point;
    direction: Direction;
    constructor(origin: Point, direction: Direction);
    /**
     * R(t)=P+tD
     * t >= 0
     */
    pointAt(t: number): Point;
    closestParameter(point: Point): number;
    projectPoint(point: Point): Point;
    distanceToPoint(point: Point): number;
    containsPoint(point: Point, tolerance?: number): boolean;
    toLine(): Line;
    reverse(): Ray;
    transform(transform: Transform): Ray;
    clone(): Ray;
    static fromPoints(start: Point, through: Point): Ray;
}
