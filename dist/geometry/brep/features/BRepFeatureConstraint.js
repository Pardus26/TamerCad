export class BRepFeatureConstraint {
    constraints;
    tolerance;
    constructor() {
        this.constraints = [];
        this.tolerance =
            0.001;
    }
    /**
     * Constraint ekle
     */
    addConstraint(constraint) {
        this.constraints.push(constraint);
        return constraint;
    }
    /**
     * Distance constraint
     */
    createDistanceConstraint(entityA, entityB, distance) {
        return this.addConstraint({
            id: crypto.randomUUID(),
            type: "DISTANCE",
            entities: [
                {
                    id: entityA,
                    type: "GEOMETRY"
                },
                {
                    id: entityB,
                    type: "GEOMETRY"
                }
            ],
            value: distance,
            status: "ACTIVE"
        });
    }
    /**
     * Angle constraint
     */
    createAngleConstraint(entityA, entityB, angle) {
        return this.addConstraint({
            id: crypto.randomUUID(),
            type: "ANGLE",
            entities: [
                {
                    id: entityA,
                    type: "GEOMETRY"
                },
                {
                    id: entityB,
                    type: "GEOMETRY"
                }
            ],
            value: angle,
            status: "ACTIVE"
        });
    }
    /**
     * Parallel constraint
     */
    createParallelConstraint(entityA, entityB) {
        return this.addConstraint({
            id: crypto.randomUUID(),
            type: "PARALLEL",
            entities: [
                {
                    id: entityA,
                    type: "EDGE"
                },
                {
                    id: entityB,
                    type: "EDGE"
                }
            ],
            status: "ACTIVE"
        });
    }
    /**
     * Tangent constraint
     */
    createTangentConstraint(entityA, entityB) {
        return this.addConstraint({
            id: crypto.randomUUID(),
            type: "TANGENT",
            entities: [
                {
                    id: entityA,
                    type: "EDGE"
                },
                {
                    id: entityB,
                    type: "SURFACE"
                }
            ],
            status: "ACTIVE"
        });
    }
    /**
     * Constraint çözümü
     */
    solveConstraint(constraint) {
        switch (constraint.type) {
            case "DISTANCE":
                return {
                    success: true,
                    status: "SOLVED"
                };
            case "ANGLE":
                return {
                    success: true,
                    status: "SOLVED"
                };
            case "PARALLEL":
                return {
                    success: true,
                    status: "SOLVED"
                };
            default:
                return {
                    success: false,
                    status: "INVALID",
                    error: "Unsupported constraint"
                };
        }
    }
    /**
     * Tüm constraint çözümü
     */
    solveAll() {
        const results = [];
        for (const constraint of this.constraints) {
            const result = this.solveConstraint(constraint);
            constraint.status =
                result.status;
            results.push(result);
        }
        return results;
    }
    /**
     * Conflict kontrolü
     */
    detectConflicts() {
        const conflicts = [];
        for (const constraint of this.constraints) {
            if (constraint.status === "INVALID") {
                conflicts.push(constraint.id);
            }
        }
        return conflicts;
    }
    /**
     * Parametre değişim yayılımı
     */
    propagateChange(parameter, value) {
        return {
            parameter,
            value,
            affected: this.constraints.length
        };
    }
    /**
     * Constraint ağacı
     */
    dependencyGraph() {
        return this.constraints.map(constraint => ({
            id: constraint.id,
            dependsOn: constraint.entities.map(e => e.id)
        }));
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            constraints: this.constraints,
            count: this.constraints.length
        };
    }
    /**
     * Reset
     */
    reset() {
        this.constraints = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureConstraint",
            constraints: this.constraints.length,
            tolerance: this.tolerance
        };
    }
}
//# sourceMappingURL=BRepFeatureConstraint.js.map