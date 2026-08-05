import { Point } from "./Point";
import { Direction } from "./Direction";
import { Transform } from "./Transform";
export declare class Line {
    origin: Point;
    direction: Direction;
    constructor(origin: Point, direction: Direction);
    /**
     * L(t)=P+tD
     */
    pointAt(parameter: number): Point;
    /**
     * Noktanın doğru üzerindeki izdüşümü
     */
    projectPoint(point: Point): Point;
    distanceToPoint(point: Point): number;
    closestParameter(point: Point): number;
    isParallel(other: Line): boolean;
    isCoincident(other: Line): boolean;
    reverse(): Line;
    transform(transform: Transform): Line;
    toString(): string;
    static fromPoints(a: Point, b: Point): Line;
}
