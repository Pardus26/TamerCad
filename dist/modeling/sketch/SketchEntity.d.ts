import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Edge } from "../../topology/core/Edge";
export declare enum SketchEntityType {
    Line = "Line",
    Circle = "Circle",
    Arc = "Arc",
    Ellipse = "Ellipse",
    Bezier = "Bezier",
    BSpline = "BSpline"
}
export declare abstract class SketchEntity {
    id: string;
    type: SketchEntityType;
    construction: boolean;
    visible: boolean;
    protected constraints: string[];
    constructor(id: string, type: SketchEntityType);
    abstract getPoints(): Point[];
    abstract evaluate(t: number): Point;
    abstract toEdge(): Edge;
    abstract clone(): SketchEntity;
    addConstraintReference(constraintId: string): void;
    getConstraintReferences(): string[];
    translate(vector: Vector3): void;
}
