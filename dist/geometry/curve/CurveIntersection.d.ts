import { Curve } from "./Curve";
import { Point } from "../core/Point";
export interface IntersectionPoint {
    point: Point;
    parameterA: number;
    parameterB: number;
    distance: number;
}
export declare class CurveIntersection {
    static intersect(a: Curve, b: Curve): IntersectionPoint[];
    private static intersectLineLine;
    private static intersectLineCircle;
    private static intersectCurveCurve;
}
