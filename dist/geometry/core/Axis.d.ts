import { Point } from "./Point";
import { Direction } from "./Direction";
import { Transform } from "./Transform";
export declare class Axis {
    origin: Point;
    direction: Direction;
    constructor(origin: Point, direction: Direction);
    pointAt(distance: number): Point;
    projectPoint(point: Point): Point;
    distanceToPoint(point: Point): number;
    reverse(): Axis;
    transform(transform: Transform): Axis;
    equals(other: Axis): boolean;
    static X_AXIS(): Axis;
    static Y_AXIS(): Axis;
    static Z_AXIS(): Axis;
}
