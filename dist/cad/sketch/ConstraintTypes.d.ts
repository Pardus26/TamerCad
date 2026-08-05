import { Vector2 } from "../../math/Vector2";
import { SketchEntity } from "./SketchEntity";
export declare enum ConstraintType {
    Coincident = 0,
    Horizontal = 1,
    Vertical = 2,
    Parallel = 3,
    Perpendicular = 4,
    EqualLength = 5,
    EqualRadius = 6,
    Midpoint = 7,
    Tangent = 8,
    Concentric = 9,
    Symmetry = 10,
    Fix = 11,
    Distance = 12,
    Radius = 13,
    Diameter = 14,
    Angle = 15
}
export declare enum ConstraintStatus {
    Active = 0,
    Suppressed = 1,
    Failed = 2
}
export declare enum DimensionMode {
    Driving = 0,
    Driven = 1
}
export declare enum ConstraintPriority {
    Low = 0,
    Normal = 1,
    High = 2,
    Critical = 3
}
export type ConstraintValue = number | boolean | Vector2;
export interface ConstraintDefinition {
    id: string;
    type: ConstraintType;
    entities: SketchEntity[];
    value?: ConstraintValue;
    status: ConstraintStatus;
    priority: ConstraintPriority;
    driving: boolean;
}
export interface ConstraintMetadata {
    name: string;
    displayName: string;
    description: string;
    icon?: string;
    color?: string;
    editable: boolean;
}
export interface ConstraintOptions {
    value?: ConstraintValue;
    priority?: ConstraintPriority;
    driving?: boolean;
    enabled?: boolean;
}
export interface ConstraintSolveResult {
    success: boolean;
    error: number;
    iterations: number;
    changed: boolean;
}
export declare const ConstraintRegistry: Map<ConstraintType, ConstraintMetadata>;
export declare function getConstraintMetadata(type: ConstraintType): ConstraintMetadata;
export declare function isDimensionalConstraint(type: ConstraintType): boolean;
export declare function isGeometricConstraint(type: ConstraintType): boolean;
export declare function requiresValue(type: ConstraintType): boolean;
export declare function createConstraintDefinition(type: ConstraintType, entities: SketchEntity[], options?: ConstraintOptions): ConstraintDefinition;
export declare function constraintTypeName(type: ConstraintType): string;
export declare function constraintStatusName(status: ConstraintStatus): string;
export declare function constraintPriorityName(priority: ConstraintPriority): string;
export declare const AllConstraintTypes: readonly [ConstraintType.Coincident, ConstraintType.Horizontal, ConstraintType.Vertical, ConstraintType.Parallel, ConstraintType.Perpendicular, ConstraintType.EqualLength, ConstraintType.EqualRadius, ConstraintType.Midpoint, ConstraintType.Tangent, ConstraintType.Concentric, ConstraintType.Symmetry, ConstraintType.Fix, ConstraintType.Distance, ConstraintType.Radius, ConstraintType.Diameter, ConstraintType.Angle];
