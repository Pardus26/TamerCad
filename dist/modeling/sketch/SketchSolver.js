export var SolverStatus;
(function (SolverStatus) {
    SolverStatus["Solved"] = "Solved";
    SolverStatus["UnderConstrained"] = "UnderConstrained";
    SolverStatus["OverConstrained"] = "OverConstrained";
    SolverStatus["Failed"] = "Failed";
})(SolverStatus || (SolverStatus = {}));
export class SketchSolver {
    geometries;
    constraints;
    constructor(geometries, constraints) {
        this.geometries = geometries;
        this.constraints = constraints;
    }
    solve(maxIterations = 50) {
        let error = Number.MAX_VALUE;
        let iteration = 0;
        for (iteration = 0; iteration < maxIterations; iteration++) {
            error = 0;
            for (const constraint of this.constraints) {
                const solved = constraint.solve(this.geometries);
                if (!solved) {
                    return {
                        status: SolverStatus.Failed,
                        iterations: iteration,
                        error
                    };
                }
                error +=
                    this.constraintError(constraint);
            }
            if (error < 1e-6) {
                return {
                    status: SolverStatus.Solved,
                    iterations: iteration + 1,
                    error
                };
            }
        }
        return {
            status: SolverStatus.UnderConstrained,
            iterations: iteration,
            error
        };
    }
    constraintError(constraint) {
        if (constraint.solved) {
            return 0;
        }
        return 1;
    }
    getDegreesOfFreedom() {
        let dof = 0;
        for (const geometry of this.geometries) {
            dof +=
                geometry.points.length * 2;
        }
        for (const constraint of this.constraints) {
            dof -=
                this.constraintReduction(constraint);
        }
        return Math.max(0, dof);
    }
    constraintReduction(constraint) {
        switch (constraint.type) {
            case "Horizontal":
            case "Vertical":
                return 1;
            case "Coincident":
                return 2;
            case "Distance":
            case "Length":
                return 1;
            case "Radius":
                return 1;
            default:
                return 0;
        }
    }
}
//# sourceMappingURL=SketchSolver.js.map