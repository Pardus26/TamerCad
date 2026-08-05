import { Sketch } from "./Sketch";

import {

    Solver2D,

    Solver2DResult

} from "./Solver2D";

import { SketchEntity } from "./SketchEntity";

import { SketchConstraint } from "./SketchConstraint";

/* ======================================================
 * Solver Events
 * ====================================================== */

export interface SketchSolverEvents {

    onSolved?(

        result: Solver2DResult

    ): void;

    onConstraintAdded?(

        constraint: SketchConstraint

    ): void;

    onConstraintRemoved?(

        constraint: SketchConstraint

    ): void;

    onEntityAdded?(

        entity: SketchEntity

    ): void;

    onEntityRemoved?(

        entity: SketchEntity

    ): void;

    onUpdated?(): void;

    onError?(

        error: Error

    ): void;

}

/* ======================================================
 * Snapshot
 * ====================================================== */

interface SolverSnapshot {

    entities: any[];

    constraints: any[];

}

/* ======================================================
 * Options
 * ====================================================== */

export interface SketchSolverManagerOptions {

    sketch: Sketch;

    events?: SketchSolverEvents;

}

/* ======================================================
 * SketchSolverManager
 * ====================================================== */

export class SketchSolverManager {

    private readonly sketch:

        Sketch;

    private readonly solver:

        Solver2D;

    private readonly events?:

        SketchSolverEvents;

    private readonly undoStack:

        SolverSnapshot[] = [];

    private readonly redoStack:

        SolverSnapshot[] = [];

    private solving = false;

    constructor(

        options: SketchSolverManagerOptions

    ) {

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

    private registerSketch(): void {

        this.solver.clear();

        for (

            const entity of this.sketch.entities

        ) {

            this.solver.addEntity(

                entity

            );

        }

        for (

            const constraint of this.sketch.constraints

        ) {

            this.solver.addConstraint(

                constraint

            );

        }

    }

    /* ======================================================
     * Entity Management
     * ====================================================== */

    addEntity(

        entity: SketchEntity

    ): void {

        this.saveState();

        this.sketch.addEntity(

            entity

        );

        this.solver.addEntity(

            entity

        );

        this.events?.onEntityAdded?.(

            entity

        );

        this.events?.onUpdated?.();

        this.solve();

    }

    removeEntity(

        entity: SketchEntity

    ): void {

        this.saveState();

        this.sketch.removeEntity(

            entity

        );

        this.solver.removeEntity(

            entity

        );

        this.events?.onEntityRemoved?.(

            entity

        );

        this.events?.onUpdated?.();

        this.solve();

    }

    getSolver():

        Solver2D {

        return this.solver;

    }

    getSketch():

        Sketch {

        return this.sketch;

    }
    /* ======================================================
     * Constraint Management
     * ====================================================== */

    addConstraint(

        constraint: SketchConstraint

    ): void {

        this.saveState();

        this.sketch.addConstraint(

            constraint

        );

        this.solver.addConstraint(

            constraint

        );

        this.events?.onConstraintAdded?.(

            constraint

        );

        this.events?.onUpdated?.();

        this.solve();

    }

    removeConstraint(

        constraint: SketchConstraint

    ): void {

        this.saveState();

        this.sketch.removeConstraint(

            constraint

        );

        this.solver.removeConstraint(

            constraint

        );

        this.events?.onConstraintRemoved?.(

            constraint

        );

        this.events?.onUpdated?.();

        this.solve();

    }

    /* ======================================================
     * Solve
     * ====================================================== */

    solve():

        Solver2DResult {

        if (

            this.solving

        ) {

            return {

                success: false,

                error: 0,

                iterations: 0,

                dof:

                    this.solver.calculateDOF()

            };

        }

        this.solving = true;

        try {

            const result =

                this.solver.solve();

            this.events?.onSolved?.(

                result

            );

            this.events?.onUpdated?.();

            return result;

        }

        catch (error) {

            const err =

                error instanceof Error

                    ? error

                    : new Error(

                        String(error)

                    );

            this.events?.onError?.(

                err

            );

            throw err;

        }

        finally {

            this.solving = false;

        }

    }
    /* ======================================================
     * Live Update
     * ====================================================== */

    updateEntityPosition(

        entity: SketchEntity,

        x: number,

        y: number

    ): void {

        if (

            entity.fixed

        ) {

            return;

        }

        entity.setPosition(

            x,

            y

        );

        this.solve();

    }

    /* ======================================================
     * Drag Transaction
     * ====================================================== */

    beginDrag(): void {

        this.saveState();

    }

    updateDrag(

        entity: SketchEntity,

        x: number,

        y: number

    ): void {

        this.updateEntityPosition(

            entity,

            x,

            y

        );

    }

    endDrag(): void {

        this.solve();

        this.events?.onUpdated?.();

    }

    cancelDrag(): void {

        this.undo();

    }

    /* ======================================================
     * Full Synchronization
     * ====================================================== */

    rebuildSolver(): void {

        this.registerSketch();

        this.solve();

    }

    synchronize(): void {

        this.registerSketch();

    }
    /* ======================================================
     * History
     * ====================================================== */

    private saveState(): void {

        this.undoStack.push(

            this.createSnapshot()

        );

        this.redoStack.length = 0;

    }

    undo(): void {

        const snapshot =

            this.undoStack.pop();

        if (

            !snapshot

        ) {

            return;

        }

        this.redoStack.push(

            this.createSnapshot()

        );

        this.restoreSnapshot(

            snapshot

        );

        this.solve();

        this.events?.onUpdated?.();

    }

    redo(): void {

        const snapshot =

            this.redoStack.pop();

        if (

            !snapshot

        ) {

            return;

        }

        this.undoStack.push(

            this.createSnapshot()

        );

        this.restoreSnapshot(

            snapshot

        );

        this.solve();

        this.events?.onUpdated?.();

    }

    /* ======================================================
     * Snapshot
     * ====================================================== */

    private createSnapshot():

        SolverSnapshot {

        return {

            entities:

                this.sketch.entities.map(

                    entity =>

                        entity.serialize()

                ),

            constraints:

                this.sketch.constraints.map(

                    constraint =>

                        constraint.serialize()

                )

        };

    }

    private restoreSnapshot(

        snapshot: SolverSnapshot

    ): void {

        this.sketch.restore(

            snapshot.entities,

            snapshot.constraints

        );

        this.registerSketch();

    }
    /* ======================================================
     * Analysis
     * ====================================================== */

    getDegreesOfFreedom():

        number {

        return this.solver.calculateDOF();

    }

    isSolved():

        boolean {

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

    clearHistory(): void {

        this.undoStack.length = 0;

        this.redoStack.length = 0;

    }

    dispose(): void {

        this.clearHistory();

        this.solver.clear();

    }

    /* ======================================================
     * Debug
     * ====================================================== */

    debugInfo() {

        return {

            solving:

                this.solving,

            undo:

                this.undoStack.length,

            redo:

                this.redoStack.length,

            sketch: {

                entities:

                    this.sketch.entities.length,

                constraints:

                    this.sketch.constraints.length

            },

            solver:

                this.solver.debugInfo()

        };

    }

}

/* ======================================================
 * End Of File
 * ====================================================== */