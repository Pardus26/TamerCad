import { Vector2 } from "../../math/vector/Vector2";
import { SketchEntity } from "./SketchEntity";
export declare enum SketchRecognitionType {
    None = 0,
    Point = 1,
    Line = 2,
    Circle = 3,
    Arc = 4,
    Rectangle = 5,
    Polyline = 6,
    ClosedProfile = 7
}
export interface SketchRecognitionResult {
    type: SketchRecognitionType;
    confidence: number;
    entity?: SketchEntity;
    points: Vector2[];
    suggestions: string[];
    constraints: string[];
}
export interface SketchRecognizerOptions {
    lineTolerance?: number;
    circleTolerance?: number;
    arcTolerance?: number;
    simplifyTolerance?: number;
    rectangleTolerance?: number;
}
export declare class SketchRecognizer {
    private readonly lineTolerance;
    private readonly circleTolerance;
    private readonly arcTolerance;
    private readonly simplifyTolerance;
    private readonly rectangleTolerance;
    constructor(options?: SketchRecognizerOptions);
    recognize(inputPoints: Vector2[]): SketchRecognitionResult;
    private detectLine;
    private lineConstraints;
    private isHorizontal;
    private isVertical;
    private detectCircle;
    private detectArc;
    private circleCenterFromThreePoints;
    private detectRectangle;
    private isClosedProfile;
    private polygonArea;
    private validateProfile;
    private generateConstraintSuggestions;
    private detectParallel;
    private detectPerpendicular;
    private detectTangent;
    private closestPointOnLine;
    private pointSegmentDistance;
    private closestPointOnSegment;
    debugInfo(): {
        lineTolerance: number;
        circleTolerance: number;
        arcTolerance: number;
        simplifyTolerance: number;
        rectangleTolerance: number;
    };
}
