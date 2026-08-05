import { Surface } from "../surface/Surface";
import { Point } from "../core/Point";
import { Curve } from "../curve/Curve";
export interface SurfaceIntersectionResult {
    intersect: boolean;
    curves: Curve[];
    points: Point[];
    errors: string[];
}
export declare class SurfaceSurfaceIntersection {
    tolerance: number;
    constructor(tolerance?: number);
    intersect(surfaceA: Surface, surfaceB: Surface): SurfaceIntersectionResult;
    private intersectPlanes;
    private planePlanePoint;
    closestPoints(surfaceA: Surface, surfaceB: Surface): {
        a: Point;
        b: Point;
        distance: number;
    };
    private normalize;
    private vectorLength;
    private vectorLengthSquared;
}
