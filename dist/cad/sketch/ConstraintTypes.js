// src/cad/sketch/ConstraintTypes.ts
/*
======================================================
Constraint Types
======================================================
*/
export var ConstraintType;
(function (ConstraintType) {
    ConstraintType[ConstraintType["Coincident"] = 0] = "Coincident";
    ConstraintType[ConstraintType["Horizontal"] = 1] = "Horizontal";
    ConstraintType[ConstraintType["Vertical"] = 2] = "Vertical";
    ConstraintType[ConstraintType["Parallel"] = 3] = "Parallel";
    ConstraintType[ConstraintType["Perpendicular"] = 4] = "Perpendicular";
    ConstraintType[ConstraintType["EqualLength"] = 5] = "EqualLength";
    ConstraintType[ConstraintType["EqualRadius"] = 6] = "EqualRadius";
    ConstraintType[ConstraintType["Midpoint"] = 7] = "Midpoint";
    ConstraintType[ConstraintType["Tangent"] = 8] = "Tangent";
    ConstraintType[ConstraintType["Concentric"] = 9] = "Concentric";
    ConstraintType[ConstraintType["Symmetry"] = 10] = "Symmetry";
    ConstraintType[ConstraintType["Fix"] = 11] = "Fix";
    ConstraintType[ConstraintType["Distance"] = 12] = "Distance";
    ConstraintType[ConstraintType["Radius"] = 13] = "Radius";
    ConstraintType[ConstraintType["Diameter"] = 14] = "Diameter";
    ConstraintType[ConstraintType["Angle"] = 15] = "Angle";
})(ConstraintType || (ConstraintType = {}));
/*
======================================================
Status
======================================================
*/
export var ConstraintStatus;
(function (ConstraintStatus) {
    ConstraintStatus[ConstraintStatus["Active"] = 0] = "Active";
    ConstraintStatus[ConstraintStatus["Suppressed"] = 1] = "Suppressed";
    ConstraintStatus[ConstraintStatus["Failed"] = 2] = "Failed";
})(ConstraintStatus || (ConstraintStatus = {}));
/*
======================================================
Dimension Mode
======================================================
*/
export var DimensionMode;
(function (DimensionMode) {
    DimensionMode[DimensionMode["Driving"] = 0] = "Driving";
    DimensionMode[DimensionMode["Driven"] = 1] = "Driven";
})(DimensionMode || (DimensionMode = {}));
/*
======================================================
Constraint Priority
======================================================
*/
export var ConstraintPriority;
(function (ConstraintPriority) {
    ConstraintPriority[ConstraintPriority["Low"] = 0] = "Low";
    ConstraintPriority[ConstraintPriority["Normal"] = 1] = "Normal";
    ConstraintPriority[ConstraintPriority["High"] = 2] = "High";
    ConstraintPriority[ConstraintPriority["Critical"] = 3] = "Critical";
})(ConstraintPriority || (ConstraintPriority = {}));
/* ======================================================
 * Constraint Registry
 * ====================================================== */
export const ConstraintRegistry = new Map([
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
export function getConstraintMetadata(type) {
    return (ConstraintRegistry.get(type));
}
/* ======================================================
 * Validation Helpers
 * ====================================================== */
export function isDimensionalConstraint(type) {
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
export function isGeometricConstraint(type) {
    return !isDimensionalConstraint(type);
}
export function requiresValue(type) {
    return isDimensionalConstraint(type);
}
/* ======================================================
 * Factory Defaults
 * ====================================================== */
export function createConstraintDefinition(type, entities, options = {}) {
    return {
        id: crypto.randomUUID(),
        type,
        entities,
        value: options.value,
        status: ConstraintStatus.Active,
        priority: options.priority ??
            ConstraintPriority.Normal,
        driving: options.driving ??
            true
    };
}
/* ======================================================
 * Utility
 * ====================================================== */
export function constraintTypeName(type) {
    return ConstraintType[type];
}
export function constraintStatusName(status) {
    return ConstraintStatus[status];
}
export function constraintPriorityName(priority) {
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
];
//# sourceMappingURL=ConstraintTypes.js.map