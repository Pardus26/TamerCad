export var ValidationSeverity;
(function (ValidationSeverity) {
    ValidationSeverity["Error"] = "Error";
    ValidationSeverity["Warning"] = "Warning";
})(ValidationSeverity || (ValidationSeverity = {}));
export class SketchValidator {
    tolerance;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
    }
    validateSketch(sketch) {
        const issues = [];
        if (sketch.entities.length === 0) {
            issues.push({
                severity: ValidationSeverity.Warning,
                message: "Sketch is empty"
            });
            return issues;
        }
        issues.push(...this.checkDuplicateEntities(sketch.entities));
        issues.push(...this.checkZeroLengthEntities(sketch.entities));
        issues.push(...this.checkConstraintState(sketch));
        return issues;
    }
    validateProfile(profile) {
        const issues = [];
        if (!profile.isClosed()) {
            issues.push({
                severity: ValidationSeverity.Error,
                message: "Profile is not closed"
            });
        }
        issues.push(...this.checkSelfIntersection(profile));
        return issues;
    }
    isValidSketch(sketch) {
        return this.validateSketch(sketch)
            .filter(x => x.severity ===
            ValidationSeverity.Error)
            .length === 0;
    }
    isValidProfile(profile) {
        return this.validateProfile(profile)
            .filter(x => x.severity ===
            ValidationSeverity.Error)
            .length === 0;
    }
    checkDuplicateEntities(entities) {
        const issues = [];
        for (let i = 0; i < entities.length; i++) {
            for (let j = i + 1; j < entities.length; j++) {
                if (entities[i].id ===
                    entities[j].id) {
                    issues.push({
                        severity: ValidationSeverity.Error,
                        message: "Duplicate entity id",
                        entityId: entities[i].id
                    });
                }
            }
        }
        return issues;
    }
    checkZeroLengthEntities(entities) {
        const issues = [];
        for (const entity of entities) {
            const points = entity.getPoints();
            if (points.length < 2) {
                continue;
            }
            const a = points[0];
            const b = points[1];
            const length = Math.sqrt(Math.pow(a.x - b.x, 2)
                +
                    Math.pow(a.y - b.y, 2));
            if (length <
                this.tolerance) {
                issues.push({
                    severity: ValidationSeverity.Error,
                    message: "Zero length geometry",
                    entityId: entity.id
                });
            }
        }
        return issues;
    }
    checkConstraintState(sketch) {
        const issues = [];
        if (sketch.solverStatus ===
            "Failed") {
            issues.push({
                severity: ValidationSeverity.Error,
                message: "Constraint solver failed"
            });
        }
        return issues;
    }
    checkSelfIntersection(profile) {
        const issues = [];
        // Gerçek kernel'de:
        // curve-curve intersection
        // algoritmaları çalışır.
        return issues;
    }
}
//# sourceMappingURL=SketchValidator.js.map