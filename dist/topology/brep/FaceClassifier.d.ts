import { Face } from "../core/Face";
import { Solid } from "../core/Solid";
import { Point } from "../../geometry/core/Point";
export declare enum FaceClassification {
    INSIDE = "inside",
    OUTSIDE = "outside",
    ON_BOUNDARY = "on_boundary"
}
export interface FaceClassificationResult {
    classification: FaceClassification;
    distance: number;
    point: Point;
}
export declare class FaceClassifier {
    tolerance: number;
    constructor(tolerance?: number);
    classifyPoint(point: Point, face: Face): FaceClassificationResult;
    classifyFaceAgainstSolid(face: Face, solid: Solid): FaceClassification;
    classifyPointInSolid(point: Point, solid: Solid): FaceClassification;
    private isPointOnBoundary;
    private rayCastInside;
    private rayIntersectsFace;
    private getFaceSamplePoint;
    classifyFacePair(faceA: Face, faceB: Face): FaceClassification;
    isCoplanar(faceA: Face, faceB: Face): boolean;
}
