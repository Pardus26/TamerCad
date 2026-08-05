import { Face } from "../core/Face";
import { IntersectionCurve } from "./IntersectionCurve";
import { Point } from "../../geometry/core/Point";
import { Curve } from "../../geometry/curve/Curve";
export declare enum FaceIntersectionType {
    NONE = "none",
    POINT = "point",
    CURVE = "curve"
}
export interface FaceIntersectionResult {
    type: FaceIntersectionType;
    curves: IntersectionCurve[];
    points: Point[];
    errors: string[];
}
export declare class FaceIntersector {
    tolerance: number;
    constructor(tolerance?: number);
    intersect(faceA: Face, faceB: Face): FaceIntersectionResult;
    private intersectSurfaces;
    private sampleSurfaceIntersection;
    private removeDuplicatePoints;
    intersectCurveWithFace(curve: Curve, face: Face): Point[];
}
