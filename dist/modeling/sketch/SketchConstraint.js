export var ConstraintType;
(function (ConstraintType) {
    ConstraintType["Coincident"] = "Coincident";
    ConstraintType["Horizontal"] = "Horizontal";
    ConstraintType["Vertical"] = "Vertical";
    ConstraintType["Parallel"] = "Parallel";
    ConstraintType["Perpendicular"] = "Perpendicular";
    ConstraintType["Tangent"] = "Tangent";
    ConstraintType["Concentric"] = "Concentric";
    ConstraintType["Distance"] = "Distance";
    ConstraintType["Length"] = "Length";
    ConstraintType["Radius"] = "Radius";
    ConstraintType["Diameter"] = "Diameter";
    ConstraintType["Angle"] = "Angle";
    ConstraintType["Equal"] = "Equal";
    ConstraintType["Symmetry"] = "Symmetry";
    ConstraintType["Fix"] = "Fix";
})(ConstraintType || (ConstraintType = {}));
export class SketchConstraint {
    id;
    type;
    references;
    value;
    solved = false;
    constructor(id, type, references, value = null) {
        this.id = id;
        this.type = type;
        this.references = references;
        this.value = value;
    }
    solve(geometries) {
        switch (this.type) {
            case ConstraintType.Horizontal:
                return this.solveHorizontal(geometries);
            case ConstraintType.Vertical:
                return this.solveVertical(geometries);
            case ConstraintType.Distance:
                return this.solveDistance(geometries);
            case ConstraintType.Radius:
                return this.solveRadius(geometries);
            case ConstraintType.Coincident:
                return this.solveCoincident(geometries);
            default:
                return false;
        }
    }
    solveHorizontal(geometries) {
        const geo = this.getFirstGeometry(geometries);
        if (!geo ||
            geo.points.length < 2) {
            return false;
        }
        geo.points[1].y =
            geo.points[0].y;
        this.solved = true;
        return true;
    }
    solveVertical(geometries) {
        const geo = this.getFirstGeometry(geometries);
        if (!geo ||
            geo.points.length < 2) {
            return false;
        }
        geo.points[1].x =
            geo.points[0].x;
        this.solved = true;
        return true;
    }
    solveDistance(geometries) {
        // Gerçek kernel'de:
        // nonlinear constraint solver çalışır.
        this.solved = true;
        return true;
    }
    solveRadius(geometries) {
        this.solved = true;
        return true;
    }
    solveCoincident(geometries) {
        const a = this.getFirstGeometry(geometries);
        const b = this.getSecondGeometry(geometries);
        if (!a ||
            !b) {
            return false;
        }
        b.points[0].x =
            a.points[0].x;
        b.points[0].y =
            a.points[0].y;
        b.points[0].z =
            a.points[0].z;
        this.solved = true;
        return true;
    }
    getFirstGeometry(geometries) {
        const ref = this.references[0];
        return geometries.find(g => g.id === ref.geometryId) ?? null;
    }
    getSecondGeometry(geometries) {
        const ref = this.references[1];
        if (!ref) {
            return null;
        }
        return geometries.find(g => g.id === ref.geometryId) ?? null;
    }
}
//# sourceMappingURL=SketchConstraint.js.map