import { SketchConstraint } from "./SketchConstraint";
import { Solver2D } from "./Solver2D";
/* ==========================================================
 * Constraint System
 * ========================================================== */
export class ConstraintSystem {
    sketch;
    solver;
    graph = new Map();
    events;
    solving = false;
    constructor(sketch, solver, events) {
        this.sketch = sketch;
        this.solver = solver ?? new Solver2D();
        this.events = events;
        this.initialize();
    }
    /* ======================================================
     * Constraint Registration
     * ====================================================== */
    addConstraint(constraint) {
        this.internalAddConstraint(constraint);
        this.sketch.addConstraint(constraint);
        this.events?.onConstraintAdded?.(constraint);
    }
    removeConstraint(constraint) {
        this.graph.delete(constraint.id);
        this.solver.removeConstraint(constraint);
        this.sketch.removeConstraint(constraint);
        for (const node of this.graph.values()) {
            node.dependencies.delete(constraint.id);
            node.dependents.delete(constraint.id);
        }
        this.events?.onConstraintRemoved?.(constraint);
    }
    internalAddConstraint(constraint) {
        this.solver.addConstraint(constraint);
        const node = {
            constraint,
            dependencies: new Set(),
            dependents: new Set()
        };
        this.graph.set(constraint.id, node);
        this.buildDependencies(constraint);
    }
    /* ======================================================
     * Dependency Graph
     * ====================================================== */
    buildDependencies(constraint) {
        const node = this.graph.get(constraint.id);
        if (!node)
            return;
        for (const other of this.graph.values()) {
            if (other.constraint ===
                constraint)
                continue;
            const shared = this.hasSharedEntity(constraint, other.constraint);
            if (!shared)
                continue;
            node.dependencies.add(other.constraint.id);
            other.dependents.add(constraint.id);
        }
    }
    hasSharedEntity(a, b) {
        for (const ea of a.entities) {
            if (b.entities.includes(ea)) {
                return true;
            }
        }
        return false;
    }
    /* ======================================================
     * Initialization
     * ====================================================== */
    initialize() {
        for (const entity of this.sketch.entities) {
            this.solver.addEntity(entity);
        }
        for (const constraint of this.sketch.constraints) {
            this.internalAddConstraint(constraint);
        }
    }
    /* ======================================================
     * Solver
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
            const orderedConstraints = this.topologicalSort();
            for (const constraint of orderedConstraints) {
                if (!constraint.enabled)
                    continue;
            }
            const result = this.solver.solve();
            this.events?.onSolved?.(result);
            return result;
        }
        finally {
            this.solving = false;
        }
    }
    /* ======================================================
     * Incremental Solve
     * ====================================================== */
    solveConstraint(constraint) {
        if (!this.graph.has(constraint.id)) {
            return this.solve();
        }
        return this.solve();
    }
    /* ======================================================
     * Validation
     * ====================================================== */
    validate() {
        const result = {
            valid: true,
            errors: [],
            warnings: []
        };
        const state = this.solver.validate();
        if (state.overConstrained) {
            result.valid = false;
            result.errors.push("Sketch is over constrained.");
        }
        if (state.underConstrained) {
            result.warnings.push("Sketch is under constrained.");
        }
        for (const constraint of this.sketch.constraints) {
            if (constraint.entities.length === 0) {
                result.errors.push(`Constraint ${constraint.id} has no entities.`);
            }
        }
        return result;
    }
    /* ======================================================
     * Dependency Graph
     * ====================================================== */
    rebuildGraph() {
        this.graph.clear();
        for (const constraint of this.sketch.constraints) {
            this.graph.set(constraint.id, new Set());
        }
        for (const a of this.sketch.constraints) {
            for (const b of this.sketch.constraints) {
                if (a === b)
                    continue;
                if (this.shareEntities(a, b)) {
                    this.graph
                        .get(a.id)
                        .add(b.id);
                }
            }
        }
    }
    shareEntities(a, b) {
        for (const entity of a.entities) {
            if (b.entities.includes(entity)) {
                return true;
            }
        }
        return false;
    }
    /* ======================================================
     * Topological Sort
     * ====================================================== */
    topologicalSort() {
        const visited = new Set();
        const visiting = new Set();
        const result = [];
        const map = new Map(this.sketch.constraints.map(c => [c.id, c]));
        const visit = (id) => {
            if (visited.has(id))
                return;
            if (visiting.has(id))
                return;
            visiting.add(id);
            const deps = this.graph.get(id);
            if (deps) {
                for (const dep of deps) {
                    visit(dep);
                }
            }
            visiting.delete(id);
            visited.add(id);
            const c = map.get(id);
            if (c)
                result.push(c);
        };
        for (const constraint of this.sketch.constraints) {
            visit(constraint.id);
        }
        return result.reverse();
    }
    /* ======================================================
     * Dependency Queries
     * ====================================================== */
    getDependencies(constraint) {
        const ids = this.graph.get(constraint.id);
        if (!ids)
            return [];
        const lookup = new Map(this.sketch.constraints.map(c => [c.id, c]));
        return [
            ...ids
        ]
            .map(id => lookup.get(id))
            .filter((c) => c !== undefined);
    }
    getDependents(constraint) {
        const result = [];
        for (const c of this.sketch.constraints) {
            const deps = this.graph.get(c.id);
            if (deps?.has(constraint.id)) {
                result.push(c);
            }
        }
        return result;
    }
    /* ======================================================
     * Snapshot
     * ====================================================== */
    createSnapshot() {
        return {
            constraints: this.sketch.constraints.map(constraint => constraint.serialize())
        };
    }
    restoreSnapshot(snapshot) {
        this.sketch.constraints.length = 0;
        for (const data of snapshot.constraints) {
            const constraint = SketchConstraint.deserialize(data, this.sketch);
            if (constraint) {
                this.sketch.constraints.push(constraint);
            }
        }
        this.rebuildGraph();
    }
    saveState() {
        this.undoStack.push(this.createSnapshot());
        this.redoStack.length = 0;
    }
    /* ======================================================
     * Undo / Redo
     * ====================================================== */
    undo() {
        const snapshot = this.undoStack.pop();
        if (!snapshot) {
            return false;
        }
        this.redoStack.push(this.createSnapshot());
        this.restoreSnapshot(snapshot);
        this.events?.onSolved?.(this.solver.solve());
        return true;
    }
    redo() {
        const snapshot = this.redoStack.pop();
        if (!snapshot) {
            return false;
        }
        this.undoStack.push(this.createSnapshot());
        this.restoreSnapshot(snapshot);
        this.events?.onSolved?.(this.solver.solve());
        return true;
    }
    clearHistory() {
        this.undoStack.length = 0;
        this.redoStack.length = 0;
    }
    /* ======================================================
     * Batch Update
     * ====================================================== */
    beginUpdate() {
        this.batchMode = true;
        this.saveState();
    }
    endUpdate() {
        this.batchMode = false;
        this.rebuildGraph();
        this.events?.onSolved?.(this.solver.solve());
    }
    requestSolve() {
        if (this.batchMode) {
            return;
        }
        this.rebuildGraph();
        this.events?.onSolved?.(this.solver.solve());
    }
    /* ======================================================
     * Analysis
     * ====================================================== */
    getConstraintCount() {
        return this.sketch.constraints.length;
    }
    getConstraintById(id) {
        return this.sketch.constraints.find(constraint => constraint.id === id);
    }
    hasConstraint(id) {
        return this.getConstraintById(id) !== undefined;
    }
    getConstraintsForEntity(entityId) {
        return this.sketch.constraints.filter(constraint => constraint.entities.some(entity => entity.id === entityId));
    }
    getConnectedEntities(entityId) {
        const connected = new Set();
        const constraints = this.getConstraintsForEntity(entityId);
        for (const constraint of constraints) {
            for (const entity of constraint.entities) {
                if (entity.id !== entityId) {
                    connected.add(entity);
                }
            }
        }
        return [
            ...connected
        ];
    }
    validate() {
        const errors = [];
        for (const constraint of this.sketch.constraints) {
            if (constraint.entities.length === 0) {
                errors.push(`Constraint ${constraint.id} has no entities.`);
            }
            for (const entity of constraint.entities) {
                if (!this.sketch.entities.includes(entity)) {
                    errors.push(`Constraint ${constraint.id} references missing entity ${entity.id}.`);
                }
            }
        }
        return {
            valid: errors.length === 0,
            errors
        };
    }
    /* ======================================================
     * Debug
     * ====================================================== */
    debugInfo() {
        return {
            constraintCount: this.sketch.constraints.length,
            graphNodes: this.constraintGraph.size,
            undo: this.undoStack.length,
            redo: this.redoStack.length,
            batchMode: this.batchMode,
            constraints: this.sketch.constraints.map(constraint => constraint.debugInfo())
        };
    }
}
//# sourceMappingURL=ConstraintSystem.js.map