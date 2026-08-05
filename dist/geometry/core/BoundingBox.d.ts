import { Point } from "./Point";
import { Transform } from "./Transform";
export declare class BoundingBox {
    min: Point;
    max: Point;
    constructor(min: Point, max: Point);
    center(): Point;
    size(): {
        x: number;
        y: number;
        z: number;
    };
    containsPoint(point: Point): boolean;
    expand(point: Point): void;
    intersects(other: BoundingBox): boolean;
    union(other: BoundingBox): BoundingBox;
    transform(transform: Transform): BoundingBox;
    static empty(): BoundingBox;
}
