import { Point } from "../../../geometry/core/Point";
import { Vector3 } from "../../../geometry/core/Vector3";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity } from "../SketchEntity";
export declare class ArcEntity extends SketchEntity {
    center: Point;
    radius: number;
    startAngle: number;
    endAngle: number;
    constructor(id: string, center: Point, radius: number, startAngle: number, endAngle: number);
    getPoints(): Point[];
    evaluate(t: number): Point;
    startPoint(): Point;
    endPoint(): Point;
    sweepAngle(): number;
    length(): number;
    midpoint(): Point;
    reverse(): void;
    translate(vector: Vector3): void;
    toEdge(): Edge;
    clone(): ArcEntity;
}
