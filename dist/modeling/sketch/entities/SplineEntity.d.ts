import { Point } from "../../../geometry/core/Point";
import { Vector3 } from "../../../geometry/core/Vector3";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity } from "../SketchEntity";
export declare class SplineEntity extends SketchEntity {
    controlPoints: Point[];
    degree: number;
    knots: number[];
    constructor(id: string, controlPoints: Point[], degree?: number, knots?: number[]);
    getPoints(): Point[];
    evaluate(u: number): Point;
    length(samples?: number): number;
    translate(vector: Vector3): void;
    reverse(): void;
    toEdge(): Edge;
    clone(): SplineEntity;
    private generateUniformKnots;
    private basisFunction;
}
