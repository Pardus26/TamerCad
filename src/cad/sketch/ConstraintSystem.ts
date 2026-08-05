import { Sketch } from "./Sketch";
import {
    SketchConstraint,
    deserializeConstraint
} from "./SketchConstraint";
import {
    SketchEntity
} from "./SketchEntity";
import {
    Solver2D,
    Solver2DResult
} from "./Solver2D";

/* ==========================================================
 * Constraint Graph Node
 * ========================================================== */

interface ConstraintNode {

    constraint: SketchConstraint;

    dependencies: Set<string>;

    dependents: Set<string>;

}

/* ==========================================================
 * Constraint Statistics
 * ========================================================== */

export interface ConstraintStatistics {

    entityCount: number;

    constraintCount: number;

    degreesOfFreedom: number;

    solved: boolean;

    iterations: number;

    error: number;

}

/* ==========================================================
 * Constraint Validation
 * ========================================================== */

export interface ConstraintValidationResult {

    valid: boolean;

    errors: string[];

    warnings: string[];

}

/* ==========================================================
 * Constraint Events
 * ========================================================== */

export interface ConstraintSystemEvents {

    onSolved?(
        result: Solver2DResult
    ): void;

    onConstraintAdded?(
        constraint: SketchConstraint
    ): void;

    onConstraintRemoved?(
        constraint: SketchConstraint
    ): void;

    onConstraintModified?(
        constraint: SketchConstraint
    ): void;

}

/* ==========================================================
 * Constraint System
 * ========================================================== */

export class ConstraintSystem {

    private readonly sketch: Sketch;

    private readonly solver: Solver2D;

    private readonly graph =
        new Map<string, ConstraintNode>();

    private readonly events?: ConstraintSystemEvents;

    private solving = false;

    constructor(

        sketch: Sketch,

        solver?: Solver2D,

        events?: ConstraintSystemEvents

    ) {

        this.sketch = sketch;

        this.solver = solver ?? new Solver2D();

        this.events = events;

        this.initialize();

    }
    /* ======================================================
     * Constraint Registration
     * ====================================================== */

    addConstraint(

        constraint: SketchConstraint

    ): void {

        this.internalAddConstraint(

            constraint

        );

        this.sketch.addConstraint(

            constraint

        );

        this.events?.onConstraintAdded?.(

            constraint

        );

    }

    removeConstraint(

        constraint: SketchConstraint

    ): void {

        this.graph.delete(

            constraint.id

        );

        this.solver.removeConstraint(

            constraint

        );

        this.sketch.removeConstraint(

            constraint

        );

        for (

            const node of this.graph.values()

        ) {

            node.dependencies.delete(

                constraint.id

            );

            node.dependents.delete(

                constraint.id

            );

        }

        this.events?.onConstraintRemoved?.(

            constraint

        );

    }

    private internalAddConstraint(

        constraint: SketchConstraint

    ): void {

        this.solver.addConstraint(

            constraint

        );

        const node: ConstraintNode = {

            constraint,

            dependencies: new Set(),

            dependents: new Set()

        };

        this.graph.set(

            constraint.id,

            node

        );

        this.buildDependencies(

            constraint

        );

    }

    /* ======================================================
     * Dependency Graph
     * ====================================================== */

    private buildDependencies(

        constraint: SketchConstraint

    ): void {

        const node = this.graph.get(

            constraint.id

        );

        if (!node)

            return;

        for (

            const other of this.graph.values()

        ) {

            if (

                other.constraint ===

                constraint

            )

                continue;

            const shared =

                this.hasSharedEntity(

                    constraint,

                    other.constraint

                );

            if (

                !shared

            )

                continue;

            node.dependencies.add(

                other.constraint.id

            );

            other.dependents.add(

                constraint.id

            );

        }

    }

    private hasSharedEntity(

        a: SketchConstraint,

        b: SketchConstraint

    ): boolean {

        for (

            const ea of a.entities

        ) {

            if (

                b.entities.includes(

                    ea

                )

            ) {

                return true;

            }

        }

        return false;

    }

    /* ======================================================
     * Initialization
     * ====================================================== */

    private initialize(): void {

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

    solve(): Solver2DResult {

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

            const orderedConstraints =

                this.topologicalSort();

            for (

                const constraint of orderedConstraints

            ) {

                if (!constraint.enabled)

                    continue;

            }

            const result =

                this.solver.solve();

            this.events?.onSolved?.(

                result

            );

            return result;

        }

        finally {

            this.solving = false;

        }

    }

    /* ======================================================
     * Incremental Solve
     * ====================================================== */

    solveConstraint(

        constraint: SketchConstraint

    ): Solver2DResult {

        if (

            !this.graph.has(

                constraint.id

            )

        ) {

            return this.solve();

        }

        return this.solve();

    }

    /* ======================================================
     * Validation
     * ====================================================== */

    validate():

        ConstraintValidationResult {

        const result:

            ConstraintValidationResult = {

            valid: true,

            errors: [],

            warnings: []

        };

        const state =

            this.solver.validate();

        if (

            state.overConstrained

        ) {

            result.valid = false;

            result.errors.push(

                "Sketch is over constrained."

            );

        }

        if (

            state.underConstrained

        ) {

            result.warnings.push(

                "Sketch is under constrained."

            );

        }

        for (

            const constraint of

            this.sketch.constraints

        ) {

            if (

                constraint.entities.length === 0

            ) {

                result.errors.push(

                    `Constraint ${constraint.id} has no entities.`

                );

            }

        }

        return result;

    }
    /* ======================================================
     * Dependency Graph
     * ====================================================== */

    private rebuildGraph(): void {

        this.graph.clear();

        for (

            const constraint of

            this.sketch.constraints

        ) {

            this.graph.set(

                constraint.id,

                new Set<string>()

            );

        }

        for (

            const a of this.sketch.constraints

        ) {

            for (

                const b of this.sketch.constraints

            ) {

                if (a === b)

                    continue;

                if (

                    this.shareEntities(

                        a,

                        b

                    )

                ) {

                    this.graph

                        .get(a.id)!

                        .add(b.id);

                }

            }

        }

    }

    private shareEntities(

        a: SketchConstraint,

        b: SketchConstraint

    ): boolean {

        for (

            const entity of a.entities

        ) {

            if (

                b.entities.includes(

                    entity

                )

            ) {

                return true;

            }

        }

        return false;

    }

    /* ======================================================
     * Topological Sort
     * ====================================================== */

    private topologicalSort():

        SketchConstraint[] {

        const visited =

            new Set<string>();

        const visiting =

            new Set<string>();

        const result:

            SketchConstraint[] = [];

        const map =

            new Map(

                this.sketch.constraints.map(

                    c => [c.id, c]

                )

            );

        const visit =

            (

                id: string

            ) => {

                if (

                    visited.has(id)

                )

                    return;

                if (

                    visiting.has(id)

                )

                    return;

                visiting.add(id);

                const deps =

                    this.graph.get(id);

                if (deps) {

                    for (

                        const dep of deps

                    ) {

                        visit(dep);

                    }

                }

                visiting.delete(id);

                visited.add(id);

                const c =

                    map.get(id);

                if (c)

                    result.push(c);

            };

        for (

            const constraint of

            this.sketch.constraints

        ) {

            visit(

                constraint.id

            );

        }

        return result.reverse();

    }

    /* ======================================================
     * Dependency Queries
     * ====================================================== */

    getDependencies(

        constraint:

        SketchConstraint

    ): SketchConstraint[] {

        const ids =

            this.graph.get(

                constraint.id

            );

        if (!ids)

            return [];

        const lookup =

            new Map(

                this.sketch.constraints.map(

                    c => [c.id, c]

                )

            );

        return [

            ...ids

        ]

            .map(

                id => lookup.get(id)

            )

            .filter(

                (

                    c

                ): c is SketchConstraint =>

                    c !== undefined

            );

    }

    getDependents(

        constraint:

        SketchConstraint

    ): SketchConstraint[] {

        const result:

            SketchConstraint[] = [];

        for (

            const c of

            this.sketch.constraints

        ) {

            const deps =

                this.graph.get(

                    c.id

                );

            if (

                deps?.has(

                    constraint.id

                )

            ) {

                result.push(c);

            }

        }

        return result;

    }
    /* ======================================================
     * Snapshot
     * ====================================================== */

    private createSnapshot():

        ConstraintSnapshot {

        return {

            constraints:

                this.sketch.constraints.map(

                    constraint =>

                        constraint.serialize()

                )

        };

    }

    private restoreSnapshot(

        snapshot:

        ConstraintSnapshot

    ): void {

        this.sketch.constraints.length = 0;

        for (

            const data of

            snapshot.constraints

        ) {

            const constraint =

                SketchConstraint.deserialize(

                    data,

                    this.sketch

                );

            if (

                constraint

            ) {

                this.sketch.constraints.push(

                    constraint

                );

            }

        }

        this.rebuildGraph();

    }

    private saveState():

        void {

        this.undoStack.push(

            this.createSnapshot()

        );

        this.redoStack.length = 0;
    }

    /* ======================================================
     * Undo / Redo
     * ====================================================== */

    undo():

        boolean {

        const snapshot =

            this.undoStack.pop();

        if (

            !snapshot

        ) {

            return false;

        }

        this.redoStack.push(

            this.createSnapshot()

        );

        this.restoreSnapshot(

            snapshot

        );

        this.events?.onSolved?.(

            this.solver.solve()

        );

        return true;

    }

    redo():

        boolean {

        const snapshot =

            this.redoStack.pop();

        if (

            !snapshot

        ) {

            return false;

        }

        this.undoStack.push(

            this.createSnapshot()

        );

        this.restoreSnapshot(

            snapshot

        );

        this.events?.onSolved?.(

            this.solver.solve()

        );

        return true;

    }

    clearHistory():

        void {

        this.undoStack.length = 0;

        this.redoStack.length = 0;

    }

    /* ======================================================
     * Batch Update
     * ====================================================== */

    beginUpdate():

        void {

        this.batchMode = true;

        this.saveState();

    }

    endUpdate():

        void {

        this.batchMode = false;

        this.rebuildGraph();

        this.events?.onSolved?.(

            this.solver.solve()

        );

    }

    private requestSolve():

        void {

        if (

            this.batchMode

        ) {

            return;

        }

        this.rebuildGraph();

        this.events?.onSolved?.(

            this.solver.solve()

        );

    }
    /* ======================================================
     * Analysis
     * ====================================================== */

    getConstraintCount():

        number {

        return this.sketch.constraints.length;

    }

    getConstraintById(

        id: string

    ):

        SketchConstraint | undefined {

        return this.sketch.constraints.find(

            constraint =>

                constraint.id === id

        );

    }

    hasConstraint(

        id: string

    ):

        boolean {

        return this.getConstraintById(

            id

        ) !== undefined;

    }

    getConstraintsForEntity(

        entityId: string

    ):

        SketchConstraint[] {

        return this.sketch.constraints.filter(

            constraint =>

                constraint.entities.some(

                    entity =>

                        entity.id === entityId

                )

        );

    }

    getConnectedEntities(

        entityId: string

    ):

        SketchEntity[] {

        const connected =

            new Set<SketchEntity>();

        const constraints =

            this.getConstraintsForEntity(

                entityId

            );

        for (

            const constraint of

            constraints

        ) {

            for (

                const entity of

                constraint.entities

            ) {

                if (

                    entity.id !== entityId

                ) {

                    connected.add(

                        entity

                    );

                }

            }

        }

        return [

            ...connected

        ];

    }

    validate():

        {

            valid: boolean;

            errors: string[];

        } {

        const errors:

            string[] = [];

        for (

            const constraint of

            this.sketch.constraints

        ) {

            if (

                constraint.entities.length === 0

            ) {

                errors.push(

                    `Constraint ${constraint.id} has no entities.`

                );

            }

            for (

                const entity of

                constraint.entities

            ) {

                if (

                    !this.sketch.entities.includes(

                        entity

                    )

                ) {

                    errors.push(

                        `Constraint ${constraint.id} references missing entity ${entity.id}.`

                    );

                }

            }

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }

    /* ======================================================
     * Debug
     * ====================================================== */

    debugInfo() {

        return {

            constraintCount:

                this.sketch.constraints.length,

            graphNodes:

                this.constraintGraph.size,

            undo:

                this.undoStack.length,

            redo:

                this.redoStack.length,

            batchMode:

                this.batchMode,

            constraints:

                this.sketch.constraints.map(

                    constraint =>

                        constraint.debugInfo()

                )

        };

    }

}