import { ConstraintStatus } from "./BRepConstraint";
export class BRepConstraintSolver {
    constraints;
    variables;
    constructor() {
        this.constraints = [];
        this.variables = [];
    }
    /**
     * Constraint ekleme
     */
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    /**
     * Variable ekleme
     */
    addVariable(variable) {
        this.variables.push(variable);
    }
    /**
     * Ana solver
     */
    solve(options) {
        let solved = 0;
        const failed = [];
        let iteration = 0;
        while (iteration < options.maxIterations) {
            let complete = true;
            for (const constraint of this.constraints) {
                const result = constraint.solve();
                if (result.success) {
                    solved++;
                }
                else {
                    complete = false;
                    failed.push(constraint.id);
                }
            }
            if (complete) {
                break;
            }
            iteration++;
        }
        return {
            success: failed.length === 0,
            iterations: iteration,
            solved,
            failed
        };
    }
    /**
     * Constraint graph oluşturma
     */
    buildGraph() {
        return {
            nodes: this.constraints.length,
            edges: this.constraints
                .reduce((sum, c) => sum + c.entities.length, 0)
        };
    }
    /**
     * Degrees of freedom analizi
     */
    analyzeDOF() {
        const totalVariables = this.variables.length;
        const lockedVariables = this.variables.filter(v => v.locked)
            .length;
        const constraints = this.constraints.length;
        return {
            variables: totalVariables,
            locked: lockedVariables,
            constraints,
            degreesOfFreedom: totalVariables
                -
                    constraints
        };
    }
    /**
     * Conflict detection
     */
    detectConflicts() {
        const conflicts = [];
        for (const constraint of this.constraints) {
            if (constraint.status ===
                ConstraintStatus.FAILED) {
                conflicts.push(constraint.id);
            }
        }
        return conflicts;
    }
    /**
     * Constraint sıfırlama
     */
    reset() {
        for (const constraint of this.constraints) {
            constraint.status =
                ConstraintStatus.UNSOLVED;
        }
    }
    /**
     * Sadece belirli constraint çözme
     */
    solveConstraint(id) {
        const constraint = this.constraints.find(c => c.id === id);
        if (!constraint) {
            return false;
        }
        return constraint.solve().success;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepConstraintSolver",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepConstraintSolver.js.map