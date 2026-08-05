import { Face } from "../core/Face";
import { Solid } from "../core/Solid";
export type RegionOperation = "union" | "difference" | "intersection";
export interface RegionSelectionResult {
    faces: Face[];
    removed: Face[];
    errors: string[];
}
export declare class RegionSelector {
    private classifier;
    constructor(tolerance?: number);
    select(operation: RegionOperation, facesA: Face[], facesB: Face[], solidA: Solid, solidB: Solid): RegionSelectionResult;
    private selectUnion;
    private selectDifference;
    private selectIntersection;
    private classifyFace;
    private getFaceCenter;
}
