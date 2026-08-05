import { Curve } from "../../geometry/curve/Curve";
import { Point } from "../../geometry/core/Point";
import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
export declare enum IntersectionType {
    CURVE = "curve",
    LINE = "line",
    POINT = "point",
    NONE = "none"
}
export interface IntersectionSample {
    parameter: number;
    point: Point;
}
export declare class IntersectionCurve {
    faceA: Face;
    faceB: Face;
    curve: Curve | null;
    samples: IntersectionSample[];
    type: IntersectionType;
    constructor(faceA: Face, faceB: Face, curve?: Curve | null);
    evaluate(t: number): Point | null;
    tangent(t: number): import("../../geometry/core/Direction").Direction | null;
    addSample(parameter: number, point: Point): void;
    getSamples(): IntersectionSample[];
    startPoint(): Point | null;
    endPoint(): Point | null;
    length(): number;
    toEdge(): Edge | null;
    reverse(): IntersectionCurve;
    isValid(): boolean;
    private interpolateSamples;
}
