export class BRepFeatureSolver {
    constraints;
    variables;
    equations;
    tolerance;
    maxIterations;
    iterations;
    constructor() {
        this.constraints = [];
        this.variables = [];
        this.equations = [];
        this.tolerance =
            0.001;
        this.maxIterations =
            100;
        this.iterations = 0;
    }
    /**
     * Constraint ekleme
     */
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    /**
     * Değişken ekleme
     */
    addVariable(variable) {
        this.variables.push(variable);
    }
    /**
     * Denklem ekleme
     */
    addEquation(equation) {
        this.equations.push(equation);
    }
    /**
     * Variable bulma
     */
    getVariable(name) {
        return this.variables.find(variable => variable.name === name);
    }
    /**
     * Distance çözümü
     */
    solveDistance(constraint) {
        if (constraint.type === "DISTANCE") {
            return {
                solved: true,
                value: constraint.value
            };
        }
        return null;
    }
    /**
     * Angle çözümü
     */
    solveAngle(constraint) {
        if (constraint.type === "ANGLE") {
            return {
                solved: true,
                angle: constraint.value
            };
        }
        return null;
    }
    /**
     * Geometrik constraint çözümü
     */
    solveGeometricConstraint(constraint) {
        switch (constraint.type) {
            case "DISTANCE":
                return this.solveDistance(constraint);
            case "ANGLE":
                return this.solveAngle(constraint);
            case "PARALLEL":
                return {
                    solved: true,
                    relation: "parallel"
                };
            case "PERPENDICULAR":
                return {
                    solved: true,
                    relation: "perpendicular"
                };
            case "TANGENT":
                return {
                    solved: true,
                    relation: "tangent"
                };
            default:
                return {
                    solved: false
                };
        }
    }
    /**
     * Denklem iterasyonu
     */
    iterate() {
        let error = 0;
        for (const equation of this.equations) {
            const result = equation.evaluate();
            error +=
                Math.abs(result);
        }
        this.iterations++;
        return error;
    }
    /**
     * Ana solver
     */
    solve() {
        let error = Infinity;
        this.iterations = 0;
        while (error >
            this.tolerance
            &&
                this.iterations <
                    this.maxIterations) {
            error =
                this.iterate();
        }
        const conflicts = [];
        for (const constraint of this.constraints) {
            const result = this.solveGeometricConstraint(constraint);
            if (!result.solved) {
                conflicts.push(constraint.id);
                constraint.status =
                    "CONFLICT";
            }
            else {
                constraint.status =
                    "SOLVED";
            }
        }
        return {
            success: conflicts.length === 0,
            iterations: this.iterations,
            error,
            conflicts
        };
    }
    /**
     * Parametre güncelleme
     */
    propagateParameters() {
        return this.variables.map(variable => ({
            parameter: variable.name,
            value: variable.value
        }));
    }
    /**
     * Constraint çakışma analizi
     */
    detectConflicts() {
        return this.constraints.filter(constraint => constraint.status ===
            "CONFLICT");
    }
    /**
     * Solver reset
     */
    reset() {
        this.constraints = [];
        this.variables = [];
        this.equations = [];
        this.iterations = 0;
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            constraints: this.constraints.length,
            variables: this.variables.length,
            equations: this.equations.length,
            iterations: this.iterations
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureSolver",
            constraints: this.constraints.length,
            variables: this.variables.length
        };
    }
}
//# sourceMappingURL=BRepFeatureSolver.js.map