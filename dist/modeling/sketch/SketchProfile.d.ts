import { SketchEntity } from "./SketchEntity";
import { Point } from "../../geometry/core/Point";
import { Wire } from "../../topology/core/Wire";
export declare enum ProfileType {
    Closed = "Closed",
    Open = "Open",
    Invalid = "Invalid"
}
export declare class SketchProfile {
    outerLoop: SketchEntity[];
    innerLoops: SketchEntity[][];
    constructor(outerLoop: SketchEntity[]);
    addInnerLoop(loop: SketchEntity[]): void;
    type(): ProfileType;
    isClosed(): boolean;
    toWire(): Wire;
    area(): number;
    containsPoint(point: Point): boolean;
    private samplePoints;
    private getStartPoint;
    private getEndPoint;
}
