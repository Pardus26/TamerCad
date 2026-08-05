import { Point } from "../../../geometry/core/Point";
import { Vector3 } from "../../../geometry/core/Vector3";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity } from "../SketchEntity";
export declare class LineEntity extends SketchEntity {
    start: Point;
    end: Point;
    constructor(id: string, start: Point, end: Point);
    getPoints(): Point[];
    evaluate(t: number): Point;
    length(): number;
    direction(): Vector3;
    midpoint(): Point;
    toEdge(): Edge;
    translate(vector: Vector3): void;
    reverse(): void;
    clone(): LineEntity;
}
