import { Point } from "./Point";
import { Direction } from "./Direction";
import { Transform } from "./Transform";
import { Line } from "./Line";
export declare class Segment {
    start: Point;
    end: Point;
    constructor(start: Point, end: Point);
    direction(): Direction;
    length(): number;
    midpoint(): Point;
    pointAt(t: number): Point;
    containsPoint(point: Point, tolerance?: number): boolean;
    projectPoint(point: Point): Point;
    parameterOf(point: Point): number;
    toLine(): Line;
    reverse(): Segment;
    transform(transform: Transform): Segment;
    clone(): Segment;
    static fromLine(line: Line, length: number): Segment;
}
