export class OptimizationProblem {
    variables = [];
    constraints = [];
    objectiveFunction;
    addVariable(variable) {
        this.variables.push(variable);
    }
    setObjective(objective) {
        this.objectiveFunction =
            objective;
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    evaluate(values) {
        if (!this.objectiveFunction) {
            throw new Error("Objective not defined");
        }
        return this.objectiveFunction(values);
    }
    validate(values) {
        for (let i = 0; i < this.variables.length; i++) {
            const variable = this.variables[i];
            if (variable.min !== undefined &&
                values[i] < variable.min) {
                return false;
            }
            if (variable.max !== undefined &&
                values[i] > variable.max) {
                return false;
            }
        }
        return true;
    }
    getVariables() {
        return [
            ...this.variables
        ];
    }
    getConstraints() {
        return [
            ...this.constraints
        ];
    }
    info() {
        return {
            engine: "OptimizationProblem",
            variables: this.variables.length,
            constraints: this.constraints.length
        };
    }
}
//# sourceMappingURL=OptimizationProblem.js.map