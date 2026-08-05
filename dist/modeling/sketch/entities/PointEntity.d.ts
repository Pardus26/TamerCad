import { Point } from "../../../geometry/core/Point";
import { Vector3 } from "../../../geometry/core/Vector3";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity } from "../SketchEntity";
export declare class PointEntity extends SketchEntity {
    position: Point;
    constructor(id: string, position: Point);
    getPoints(): Point[];
    evaluate(t?: number): Point;
    moveTo(point: Point): void;
    translate(vector: Vector3): void;
    distanceTo(point: Point): number;
    toEdge(): Edge;
    clone(): PointEntity;
}
