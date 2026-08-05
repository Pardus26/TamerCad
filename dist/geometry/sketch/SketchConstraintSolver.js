export class SketchConstraintSolver {
    constraints = [];
    parameterManager;
    maxIterations = 50;
    tolerance = 1e-6;
    constructor(parameterManager) {
        this.parameterManager = parameterManager;
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    removeConstraint(id) {
        this.constraints =
            this.constraints.filter(c => c.id !== id);
    }
    solve() {
        this.parameterManager.evaluate();
        let solved = 0;
        let failed = 0;
        let iterations = 0;
        let changed = true;
        while (changed &&
            iterations < this.maxIterations) {
            changed = false;
            iterations++;
            for (const constraint of this.constraints) {
                if (!constraint.enabled) {
                    continue;
                }
                const ok = constraint.solve();
                if (ok) {
                    solved++;
                    changed = true;
                }
                else {
                    failed++;
                }
            }
        }
        return {
            success: failed === 0,
            iterations,
            solved,
            failed,
            message: failed === 0
                ?
                    "Solved"
                :
                    "Constraint conflicts detected"
        };
    }
    validate() {
        return this.solve().success;
    }
    degreesOfFreedom() {
        let active = 0;
        for (const c of this.constraints) {
            if (c.enabled) {
                active++;
            }
        }
        return Math.max(0, 100 - active);
    }
    clear() {
        this.constraints = [];
    }
    info() {
        return {
            engine: "SketchConstraintSolver",
            constraints: this.constraints.length,
            dof: this.degreesOfFreedom()
        };
    }
}
//# sourceMappingURL=SketchConstraintSolver.js.map