import { SketchGeometry } from "./Sketch";
export declare enum ConstraintType {
    Coincident = "Coincident",
    Horizontal = "Horizontal",
    Vertical = "Vertical",
    Parallel = "Parallel",
    Perpendicular = "Perpendicular",
    Tangent = "Tangent",
    Concentric = "Concentric",
    Distance = "Distance",
    Length = "Length",
    Radius = "Radius",
    Diameter = "Diameter",
    Angle = "Angle",
    Equal = "Equal",
    Symmetry = "Symmetry",
    Fix = "Fix"
}
export interface ConstraintReference {
    geometryId: string;
    pointIndex?: number;
}
export declare class SketchConstraint {
    id: string;
    type: ConstraintType;
    references: ConstraintReference[];
    value: number | null;
    solved: boolean;
    constructor(id: string, type: ConstraintType, references: ConstraintReference[], value?: number | null);
    solve(geometries: SketchGeometry[]): boolean;
    private solveHorizontal;
    private solveVertical;
    private solveDistance;
    private solveRadius;
    private solveCoincident;
    private getFirstGeometry;
    private getSecondGeometry;
}
