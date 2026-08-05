import { Solid } from "../core/Solid";
import { Point } from "../../geometry/core/Point";
export declare enum SolidClassification {
    INSIDE = "inside",
    OUTSIDE = "outside",
    ON_BOUNDARY = "on_boundary",
    INTERSECTING = "intersecting"
}
export interface SolidClassificationResult {
    classification: SolidClassification;
    point?: Point;
    details?: string[];
}
export declare class SolidClassifier {
    tolerance: number;
    private faceClassifier;
    constructor(tolerance?: number);
    classifyPoint(point: Point, solid: Solid): SolidClassificationResult;
    classifySolid(source: Solid, target: Solid): SolidClassificationResult;
    contains(container: Solid, object: Solid): boolean;
    intersects(a: Solid, b: Solid): boolean;
    private isPointInside;
    private isPointOnBoundary;
    private rayIntersectsFace;
    private pointInsideFaceBoundary;
    private boundingBoxesOverlap;
    private getBoundingBox;
}
