import { Surface } from "./Surface";
import { Curve } from "../curve/Curve";
export declare class SurfaceIntersection {
    surfaceA: Surface;
    surfaceB: Surface;
    tolerance: number;
    constructor(surfaceA: Surface, surfaceB: Surface, tolerance?: number);
    intersect(): Curve[];
    private sampleSearch;
    private traceCurve;
    private computeTangent;
}
