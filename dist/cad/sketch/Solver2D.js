/* ======================================================
 * Solver State
 * ====================================================== */
var SolverState;
(function (SolverState) {
    SolverState[SolverState["Idle"] = 0] = "Idle";
    SolverState[SolverState["Solving"] = 1] = "Solving";
    SolverState[SolverState["Converged"] = 2] = "Converged";
    SolverState[SolverState["Failed"] = 3] = "Failed";
})(SolverState || (SolverState = {}));
/* ======================================================
 * Solver2D
 * ====================================================== */
export class Solver2D {
    entities = [];
    constraints = [];
    maxIterations;
    tolerance;
    relaxation;
    state = SolverState.Idle;
    statistics = {
        iterations: 0,
        finalError: 0,
        converged: false,
        degreesOfFreedom: 0,
        solveTime: 0
    };
    constructor(options = {}) {
        this.maxIterations =
            options.maxIterations ??
                40;
        this.tolerance =
            options.tolerance ??
                1e-6;
        this.relaxation =
            options.relaxation ??
                1.0;
    }
    /* ======================================================
     * Entity Registration
     * ====================================================== */
    addEntity(entity) {
        if (this.entities.includes(entity)) {
            return;
        }
        this.entities.push(entity);
    }
    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
        this.constraints.splice(0, this.constraints.length, ...this.constraints.filter(constraint => !constraint.entities.includes(entity)));
    }
    getEntities() {
        return this.entities;
    }
    /* ======================================================
     * Constraint Registration
     * ====================================================== */
    addConstraint(constraint) {
        if (this.constraints.includes(constraint)) {
            return;
        }
        this.constraints.push(constraint);
    }
    removeConstraint(constraint) {
        const index = this.constraints.indexOf(constraint);
        if (index !== -1) {
            this.constraints.splice(index, 1);
        }
    }
    getConstraints() {
        return this.constraints;
    }
    clear() {
        this.entities.length = 0;
        this.constraints.length = 0;
        this.state =
            SolverState.Idle;
    }
    /* ======================================================
     * Solve
     * ====================================================== */
    solve() {
        this.state =
            SolverState.Solving;
        const startTime = performance.now();
        let totalError = Number.MAX_VALUE;
        let iteration = 0;
        for (iteration = 0; iteration < this.maxIterations; iteration++) {
            totalError = 0;
            for (const constraint of this.constraints) {
                if (!constraint.enabled) {
                    continue;
                }
                const error = constraint.solve();
                totalError +=
                    Math.abs(error);
            }
            if (totalError <=
                this.tolerance) {
                break;
            }
        }
        const converged = totalError <=
            this.tolerance;
        this.state =
            converged
                ?
                    SolverState.Converged
                :
                    SolverState.Failed;
        this.statistics = {
            iterations: iteration + 1,
            finalError: totalError,
            converged,
            degreesOfFreedom: this.calculateDOF(),
            solveTime: performance.now()
                -
                    startTime
        };
        return {
            success: converged,
            error: totalError,
            iterations: iteration + 1,
            dof: this.statistics
                .degreesOfFreedom
        };
    }
    /* ======================================================
     * Degrees Of Freedom
     * ====================================================== */
    calculateDOF() {
        let variableCount = 0;
        for (const entity of this.entities) {
            variableCount +=
                this.entityDOF(entity);
        }
        let activeConstraintCount = 0;
        for (const constraint of this.constraints) {
            if (constraint.enabled) {
                activeConstraintCount++;
            }
        }
        const dof = variableCount -
            activeConstraintCount;
        return Math.max(dof, 0);
    }
    /* ======================================================
     * Entity DOF
     * ====================================================== */
    entityDOF(entity) {
        if (entity.fixed) {
            return 0;
        }
        switch (entity.type) {
            // Point
            case 0:
                return 2;
            // Line
            case 1:
                return 4;
            // Circle
            case 2:
                return 3;
            // Arc
            case 3:
                return 5;
            default:
                return 0;
        }
    }
    /* ======================================================
     * Validation
     * ====================================================== */
    validate() {
        const dof = this.calculateDOF();
        return {
            degreesOfFreedom: dof,
            fullyConstrained: dof === 0,
            underConstrained: dof > 0,
            overConstrained: this.statistics.finalError >
                this.tolerance &&
                dof === 0
        };
    }
    /* ======================================================
     * Synchronization
     * ====================================================== */
    synchronize(entities, constraints) {
        this.clear();
        for (const entity of entities) {
            this.addEntity(entity);
        }
        for (const constraint of constraints) {
            this.addConstraint(constraint);
        }
    }
    /* ======================================================
     * Rebuild
     * ====================================================== */
    rebuild() {
        const entities = [
            ...this.entities
        ];
        const constraints = [
            ...this.constraints
        ];
        this.clear();
        for (const entity of entities) {
            this.addEntity(entity);
        }
        for (const constraint of constraints) {
            this.addConstraint(constraint);
        }
    }
    /* ======================================================
     * Reset
     * ====================================================== */
    reset() {
        this.state =
            SolverState.Idle;
        this.statistics = {
            iterations: 0,
            finalError: 0,
            converged: false,
            degreesOfFreedom: this.calculateDOF(),
            solveTime: 0
        };
    }
    /* ======================================================
     * Auto Fix
     * ====================================================== */
    autoFix() {
        const validation = this.validate();
        if (validation.fullyConstrained) {
            return;
        }
        for (const entity of this.entities) {
            if (!entity.fixed) {
                entity.setFixed(true);
                if (this.calculateDOF() === 0) {
                    break;
                }
            }
        }
    }
    /* ======================================================
     * Solver State
     * ====================================================== */
    getState() {
        return this.state;
    }
    isSolved() {
        return this.state ===
            SolverState.Converged;
    }
    isSolving() {
        return this.state ===
            SolverState.Solving;
    }
    hasFailed() {
        return this.state ===
            SolverState.Failed;
    }
    /* ======================================================
     * Statistics
     * ====================================================== */
    getStatistics() {
        return {
            ...this.statistics
        };
    }
    /* ======================================================
     * Counts
     * ====================================================== */
    getEntityCount() {
        return this.entities.length;
    }
    getConstraintCount() {
        return this.constraints.length;
    }
    /* ======================================================
     * Diagnostics
     * ====================================================== */
    debugInfo() {
        return {
            state: SolverState[this.state],
            entityCount: this.entities.length,
            constraintCount: this.constraints.length,
            statistics: {
                ...this.statistics
            },
            entities: this.entities.map(entity => entity.debugInfo()),
            constraints: this.constraints.map(constraint => constraint.debugInfo())
        };
    }
    /* ======================================================
     * Serialization Helper
     * ====================================================== */
    exportState() {
        return {
            statistics: {
                ...this.statistics
            },
            dof: this.calculateDOF(),
            entities: this.entities.map(entity => entity.serialize()),
            constraints: this.constraints.map(constraint => constraint.serialize())
        };
    }
}
//# sourceMappingURL=Solver2D.js.map