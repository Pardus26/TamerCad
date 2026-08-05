// src/cad/sketch/ConstraintTypes.ts

import { Vector2 } from "../../math/Vector2";
import { SketchEntity } from "./SketchEntity";

/*
======================================================
Constraint Types
======================================================
*/

export enum ConstraintType {

    Coincident,

    Horizontal,

    Vertical,

    Parallel,

    Perpendicular,

    EqualLength,

    EqualRadius,

    Midpoint,

    Tangent,

    Concentric,

    Symmetry,

    Fix,

    Distance,

    Radius,

    Diameter,

    Angle

}

/*
======================================================
Status
======================================================
*/

export enum ConstraintStatus {

    Active,

    Suppressed,

    Failed

}

/*
======================================================
Dimension Mode
======================================================
*/

export enum DimensionMode {

    Driving,

    Driven

}

/*
======================================================
Constraint Priority
======================================================
*/

export enum ConstraintPriority {

    Low = 0,

    Normal = 1,

    High = 2,

    Critical = 3

}
/* ======================================================
 * Constraint Value
 * ====================================================== */

export type ConstraintValue =

    | number
    | boolean
    | Vector2;

/* ======================================================
 * Constraint Definition
 * ====================================================== */

export interface ConstraintDefinition {

    id: string;

    type: ConstraintType;

    entities: SketchEntity[];

    value?: ConstraintValue;

    status: ConstraintStatus;

    priority: ConstraintPriority;

    driving: boolean;

}

/* ======================================================
 * Constraint Metadata
 * ====================================================== */

export interface ConstraintMetadata {

    name: string;

    displayName: string;

    description: string;

    icon?: string;

    color?: string;

    editable: boolean;

}

/* ======================================================
 * Constraint Creation Options
 * ====================================================== */

export interface ConstraintOptions {

    value?: ConstraintValue;

    priority?: ConstraintPriority;

    driving?: boolean;

    enabled?: boolean;

}

/* ======================================================
 * Constraint Solve Result
 * ====================================================== */

export interface ConstraintSolveResult {

    success: boolean;

    error: number;

    iterations: number;

    changed: boolean;

}
/* ======================================================
 * Constraint Registry
 * ====================================================== */

export const ConstraintRegistry =

new Map<ConstraintType, ConstraintMetadata>([

[
ConstraintType.Coincident,
{
name: "Coincident",
displayName: "Coincident",
description: "Makes two points coincide.",
editable: false
}
],

[
ConstraintType.Horizontal,
{
name: "Horizontal",
displayName: "Horizontal",
description: "Forces a line to be horizontal.",
editable: false
}
],

[
ConstraintType.Vertical,
{
name: "Vertical",
displayName: "Vertical",
description: "Forces a line to be vertical.",
editable: false
}
],

[
ConstraintType.Parallel,
{
name: "Parallel",
displayName: "Parallel",
description: "Keeps two lines parallel.",
editable: false
}
],

[
ConstraintType.Perpendicular,
{
name: "Perpendicular",
displayName: "Perpendicular",
description: "Keeps two lines perpendicular.",
editable: false
}
],

[
ConstraintType.EqualLength,
{
name: "EqualLength",
displayName: "Equal Length",
description: "Makes two line lengths equal.",
editable: false
}
],

[
ConstraintType.EqualRadius,
{
name: "EqualRadius",
displayName: "Equal Radius",
description: "Makes radii equal.",
editable: false
}
],

[
ConstraintType.Midpoint,
{
name: "Midpoint",
displayName: "Midpoint",
description: "Locks a point to the midpoint.",
editable: false
}
],

[
ConstraintType.Tangent,
{
name: "Tangent",
displayName: "Tangent",
description: "Creates tangency.",
editable: false
}
],

[
ConstraintType.Concentric,
{
name: "Concentric",
displayName: "Concentric",
description: "Keeps centers together.",
editable: false
}
],

[
ConstraintType.Distance,
{
name: "Distance",
displayName: "Distance",
description: "Driving distance dimension.",
editable: true
}
],

[
ConstraintType.Angle,
{
name: "Angle",
displayName: "Angle",
description: "Driving angle dimension.",
editable: true
}
],

[
ConstraintType.Radius,
{
name: "Radius",
displayName: "Radius",
description: "Driving radius dimension.",
editable: true
}
],

[
ConstraintType.Diameter,
{
name: "Diameter",
displayName: "Diameter",
description: "Driving diameter dimension.",
editable: true
}
],

[
ConstraintType.Fix,
{
name: "Fix",
displayName: "Fix",
description: "Locks entity in space.",
editable: false
}
]

]);

/* ======================================================
 * Lookup
 * ====================================================== */

export function getConstraintMetadata(

type: ConstraintType

):

ConstraintMetadata {

return (

ConstraintRegistry.get(type)!

);

}
/* ======================================================
 * Validation Helpers
 * ====================================================== */

export function isDimensionalConstraint(

    type: ConstraintType

): boolean {

    switch (type) {

        case ConstraintType.Distance:

        case ConstraintType.Radius:

        case ConstraintType.Diameter:

        case ConstraintType.Angle:

            return true;

        default:

            return false;

    }

}

export function isGeometricConstraint(

    type: ConstraintType

): boolean {

    return !isDimensionalConstraint(

        type

    );

}

export function requiresValue(

    type: ConstraintType

): boolean {

    return isDimensionalConstraint(

        type

    );

}

/* ======================================================
 * Factory Defaults
 * ====================================================== */

export function createConstraintDefinition(

    type: ConstraintType,

    entities: SketchEntity[],

    options: ConstraintOptions = {}

): ConstraintDefinition {

    return {

        id: crypto.randomUUID(),

        type,

        entities,

        value: options.value,

        status: ConstraintStatus.Active,

        priority:

            options.priority ??

            ConstraintPriority.Normal,

        driving:

            options.driving ??

            true

    };

}

/* ======================================================
 * Utility
 * ====================================================== */

export function constraintTypeName(

    type: ConstraintType

): string {

    return ConstraintType[type];

}

export function constraintStatusName(

    status: ConstraintStatus

): string {

    return ConstraintStatus[status];

}

export function constraintPriorityName(

    priority: ConstraintPriority

): string {

    return ConstraintPriority[priority];

}

/* ======================================================
 * Export List
 * ====================================================== */

export const AllConstraintTypes = [

    ConstraintType.Coincident,

    ConstraintType.Horizontal,

    ConstraintType.Vertical,

    ConstraintType.Parallel,

    ConstraintType.Perpendicular,

    ConstraintType.EqualLength,

    ConstraintType.EqualRadius,

    ConstraintType.Midpoint,

    ConstraintType.Tangent,

    ConstraintType.Concentric,

    ConstraintType.Symmetry,

    ConstraintType.Fix,

    ConstraintType.Distance,

    ConstraintType.Radius,

    ConstraintType.Diameter,

    ConstraintType.Angle

] as const;