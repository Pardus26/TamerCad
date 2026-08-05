import { Solver2D } from "./Solver2D";
/* ======================================================
 * SketchSolverManager
 * ====================================================== */
export class SketchSolverManager {
    sketch;
    solver;
    events;
    undoStack = [];
    redoStack = [];
    solving = false;
    constructor(options) {
        this.sketch =
            options.sketch;
        this.events =
            options.events;
        this.solver =
            new Solver2D();
        this.registerSketch();
    }
    /* ======================================================
     * Initialization
     * ====================================================== */
    registerSketch() {
        this.solver.clear();
        for (const entity of this.sketch.entities) {
            this.solver.addEntity(entity);
        }
        for (const constraint of this.sketch.constraints) {
            this.solver.addConstraint(constraint);
        }
    }
    /* ======================================================
     * Entity Management
     * ====================================================== */
    addEntity(entity) {
        this.saveState();
        this.sketch.addEntity(entity);
        this.solver.addEntity(entity);
        this.events?.onEntityAdded?.(entity);
        this.events?.onUpdated?.();
        this.solve();
    }
    removeEntity(entity) {
        this.saveState();
        this.sketch.removeEntity(entity);
        this.solver.removeEntity(entity);
        this.events?.onEntityRemoved?.(entity);
        this.events?.onUpdated?.();
        this.solve();
    }
    getSolver() {
        return this.solver;
    }
    getSketch() {
        return this.sketch;
    }
    /* ======================================================
     * Constraint Management
     * ====================================================== */
    addConstraint(constraint) {
        this.saveState();
        this.sketch.addConstraint(constraint);
        this.solver.addConstraint(constraint);
        this.events?.onConstraintAdded?.(constraint);
        this.events?.onUpdated?.();
        this.solve();
    }
    removeConstraint(constraint) {
        this.saveState();
        this.sketch.removeConstraint(constraint);
        this.solver.removeConstraint(constraint);
        this.events?.onConstraintRemoved?.(constraint);
        this.events?.onUpdated?.();
        this.solve();
    }
    /* ======================================================
     * Solve
     * ====================================================== */
    solve() {
        if (this.solving) {
            return {
                success: false,
                error: 0,
                iterations: 0,
                dof: this.solver.calculateDOF()
            };
        }
        this.solving = true;
        try {
            const result = this.solver.solve();
            this.events?.onSolved?.(result);
            this.events?.onUpdated?.();
            return result;
        }
        catch (error) {
            const err = error instanceof Error
                ? error
                : new Error(String(error));
            this.events?.onError?.(err);
            throw err;
        }
        finally {
            this.solving = false;
        }
    }
    /* ======================================================
     * Live Update
     * ====================================================== */
    updateEntityPosition(entity, x, y) {
        if (entity.fixed) {
            return;
        }
        entity.setPosition(x, y);
        this.solve();
    }
    /* ======================================================
     * Drag Transaction
     * ====================================================== */
    beginDrag() {
        this.saveState();
    }
    updateDrag(entity, x, y) {
        this.updateEntityPosition(entity, x, y);
    }
    endDrag() {
        this.solve();
        this.events?.onUpdated?.();
    }
    cancelDrag() {
        this.undo();
    }
    /* ======================================================
     * Full Synchronization
     * ====================================================== */
    rebuildSolver() {
        this.registerSketch();
        this.solve();
    }
    synchronize() {
        this.registerSketch();
    }
    /* ======================================================
     * History
     * ====================================================== */
    saveState() {
        this.undoStack.push(this.createSnapshot());
        this.redoStack.length = 0;
    }
    undo() {
        const snapshot = this.undoStack.pop();
        if (!snapshot) {
            return;
        }
        this.redoStack.push(this.createSnapshot());
        this.restoreSnapshot(snapshot);
        this.solve();
        this.events?.onUpdated?.();
    }
    redo() {
        const snapshot = this.redoStack.pop();
        if (!snapshot) {
            return;
        }
        this.undoStack.push(this.createSnapshot());
        this.restoreSnapshot(snapshot);
        this.solve();
        this.events?.onUpdated?.();
    }
    /* ======================================================
     * Snapshot
     * ====================================================== */
    createSnapshot() {
        return {
            entities: this.sketch.entities.map(entity => entity.serialize()),
            constraints: this.sketch.constraints.map(constraint => constraint.serialize())
        };
    }
    restoreSnapshot(snapshot) {
        this.sketch.restore(snapshot.entities, snapshot.constraints);
        this.registerSketch();
    }
    /* ======================================================
     * Analysis
     * ====================================================== */
    getDegreesOfFreedom() {
        return this.solver.calculateDOF();
    }
    isSolved() {
        return this.solver
            .getStatistics()
            .converged;
    }
    validate() {
        return this.solver.validate();
    }
    getStatistics() {
        return this.solver.getStatistics();
    }
    /* ======================================================
     * Utilities
     * ====================================================== */
    clearHistory() {
        this.undoStack.length = 0;
        this.redoStack.length = 0;
    }
    dispose() {
        this.clearHistory();
        this.solver.clear();
    }
    /* ======================================================
     * Debug
     * ====================================================== */
    debugInfo() {
        return {
            solving: this.solving,
            undo: this.undoStack.length,
            redo: this.redoStack.length,
            sketch: {
                entities: this.sketch.entities.length,
                constraints: this.sketch.constraints.length
            },
            solver: this.solver.debugInfo()
        };
    }
}
/* ======================================================
 * End Of File
 * ====================================================== */ 
//# sourceMappingURL=SketchSolverManager.js.map