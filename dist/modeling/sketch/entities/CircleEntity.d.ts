import { Point } from "../../../geometry/core/Point";
import { Vector3 } from "../../../geometry/core/Vector3";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity } from "../SketchEntity";
export declare class CircleEntity extends SketchEntity {
    center: Point;
    radius: number;
    constructor(id: string, center: Point, radius: number);
    getPoints(): Point[];
    evaluate(t: number): Point;
    circumference(): number;
    area(): number;
    containsPoint(point: Point, tolerance?: number): boolean;
    translate(vector: Vector3): void;
    scale(factor: number): void;
    toEdge(): Edge;
    clone(): CircleEntity;
}
