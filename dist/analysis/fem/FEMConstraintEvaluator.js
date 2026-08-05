export class FEMConstraintEvaluator {
    constraints = [];
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    evaluate(response) {
        const values = [];
        const violations = [];
        for (const constraint of this.constraints) {
            const value = constraint.evaluate(response);
            values.push(value);
            if (value > 0) {
                violations.push(value);
            }
        }
        return {
            values,
            satisfied: violations.length === 0,
            violations
        };
    }
    getConstraints() {
        return [
            ...this.constraints
        ];
    }
    info() {
        return {
            engine: "FEMConstraintEvaluator",
            constraints: this.constraints.length
        };
    }
}
//# sourceMappingURL=FEMConstraintEvaluator.js.map