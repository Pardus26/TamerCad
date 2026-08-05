import { SketchConstraint } from "./SketchConstraint";
import { SketchEntity } from "./SketchEntity";

/* ======================================================
 * Solver Options
 * ====================================================== */

export interface Solver2DOptions {

    maxIterations?: number;

    tolerance?: number;

    relaxation?: number;

}

/* ======================================================
 * Solver Result
 * ====================================================== */

export interface Solver2DResult {

    success: boolean;

    error: number;

    iterations: number;

    dof: number;

}

/* ======================================================
 * Solver Statistics
 * ====================================================== */

export interface Solver2DStatistics {

    iterations: number;

    finalError: number;

    converged: boolean;

    degreesOfFreedom: number;

    solveTime: number;

}

/* ======================================================
 * Solver State
 * ====================================================== */

enum SolverState {

    Idle,

    Solving,

    Converged,

    Failed

}

/* ======================================================
 * Solver2D
 * ====================================================== */

export class Solver2D {

    private readonly entities:

        SketchEntity[] = [];

    private readonly constraints:

        SketchConstraint[] = [];

    private readonly maxIterations: number;

    private readonly tolerance: number;

    private readonly relaxation: number;

    private state:

        SolverState = SolverState.Idle;

    private statistics:

        Solver2DStatistics = {

            iterations: 0,

            finalError: 0,

            converged: false,

            degreesOfFreedom: 0,

            solveTime: 0

        };

    constructor(

        options: Solver2DOptions = {}

    ) {

        this.maxIterations =

            options.maxIterations ?? 40;

        this.tolerance =

            options.tolerance ?? 1e-6;

        this.relaxation =

            options.relaxation ?? 1.0;

    }
    /* ======================================================
     * Entity Registration
     * ====================================================== */

    addEntity(

        entity: SketchEntity

    ): void {

        if (

            this.entities.includes(entity)

        ) {

            return;

        }

        this.entities.push(

            entity

        );

    }

    removeEntity(

        entity: SketchEntity

    ): void {

        const index =

            this.entities.indexOf(

                entity

            );

        if (

            index !== -1

        ) {

            this.entities.splice(

                index,

                1

            );

        }

        // Entity'ye bağlı constraintleri de temizle

        this.constraints.splice(

            0,

            this.constraints.length,

            ...this.constraints.filter(

                constraint =>

                    !constraint.entities.includes(

                        entity

                    )

            )

        );

    }

    getEntities():

        readonly SketchEntity[] {

        return this.entities;

    }

    /* ======================================================
     * Constraint Registration
     * ====================================================== */

    addConstraint(

        constraint: SketchConstraint

    ): void {

        if (

            this.constraints.includes(

                constraint

            )

        ) {

            return;

        }

        this.constraints.push(

            constraint

        );

    }

    removeConstraint(

        constraint: SketchConstraint

    ): void {

        const index =

            this.constraints.indexOf(

                constraint

            );

        if (

            index !== -1

        ) {

            this.constraints.splice(

                index,

                1

            );

        }

    }

    getConstraints():

        readonly SketchConstraint[] {

        return this.constraints;

    }

    clear(): void {

        this.entities.length = 0;

        this.constraints.length = 0;

        this.state =

            SolverState.Idle;

    }
    /* ======================================================
     * Solve
     * ====================================================== */

    solve():

        Solver2DResult {

        this.state =

            SolverState.Solving;

        const startTime =

            performance.now();

        let totalError =

            Number.MAX_VALUE;

        let iteration = 0;

        for (

            iteration = 0;

            iteration < this.maxIterations;

            iteration++

        ) {

            totalError = 0;

            for (

                const constraint of this.constraints

            ) {

                if (

                    !constraint.enabled

                ) {

                    continue;

                }

                const error =

                    constraint.solve();

                totalError +=

                    Math.abs(error);

            }

            if (

                totalError <=

                this.tolerance

            ) {

                break;

            }

        }

        const converged =

            totalError <=

            this.tolerance;

        this.state =

            converged

                ? SolverState.Converged

                : SolverState.Failed;

        this.statistics = {

            iterations:

                iteration + 1,

            finalError:

                totalError,

            converged,

            degreesOfFreedom:

                this.calculateDOF(),

            solveTime:

                performance.now() -

                startTime

        };

        return {

            success:

                converged,

            error:

                totalError,

            iterations:

                iteration + 1,

            dof:

                this.statistics

                    .degreesOfFreedom

        };

    }
    /* ======================================================
     * Degrees Of Freedom
     * ====================================================== */

    calculateDOF(): number {

        let variableCount = 0;

        for (

            const entity of this.entities

        ) {

            variableCount +=

                this.entityDOF(

                    entity

                );

        }

        let activeConstraintCount = 0;

        for (

            const constraint of this.constraints

        ) {

            if (

                constraint.enabled

            ) {

                activeConstraintCount++;

            }

        }

        const dof =

            variableCount -

            activeConstraintCount;

        return Math.max(

            dof,

            0

        );

    }

    /* ======================================================
     * Entity DOF
     * ====================================================== */

    private entityDOF(

        entity: SketchEntity

    ): number {

        if (

            entity.fixed

        ) {

            return 0;

        }

        switch (

            entity.type

        ) {

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

        const dof =

            this.calculateDOF();

        return {

            degreesOfFreedom: dof,

            fullyConstrained:

                dof === 0,

            underConstrained:

                dof > 0,

            overConstrained:

                this.statistics.finalError >

                this.tolerance &&

                dof === 0

        };

    }
    /* ======================================================
     * Synchronization
     * ====================================================== */

    synchronize(

        entities: readonly SketchEntity[],

        constraints: readonly SketchConstraint[]

    ): void {

        this.clear();

        for (

            const entity of entities

        ) {

            this.addEntity(

                entity

            );

        }

        for (

            const constraint of constraints

        ) {

            this.addConstraint(

                constraint

            );

        }

    }

    /* ======================================================
     * Rebuild
     * ====================================================== */

    rebuild(): void {

        const entities =

            [...this.entities];

        const constraints =

            [...this.constraints];

        this.clear();

        for (

            const entity of entities

        ) {

            this.addEntity(

                entity

            );

        }

        for (

            const constraint of constraints

        ) {

            this.addConstraint(

                constraint

            );

        }

    }

    /* ======================================================
     * Reset
     * ====================================================== */

    reset(): void {

        this.state =

            SolverState.Idle;

        this.statistics = {

            iterations: 0,

            finalError: 0,

            converged: false,

            degreesOfFreedom:

                this.calculateDOF(),

            solveTime: 0

        };

    }

    /* ======================================================
     * Auto Fix
     * ====================================================== */

    autoFix(): void {

        const validation =

            this.validate();

        if (

            validation.fullyConstrained

        ) {

            return;

        }

        for (

            const entity of this.entities

        ) {

            if (

                !entity.fixed

            ) {

                entity.setFixed(

                    true

                );

                if (

                    this.calculateDOF() === 0

                ) {

                    break;

                }

            }

        }

    }
    /* ======================================================
     * Solver State
     * ====================================================== */

    getState():

        SolverState {

        return this.state;

    }

    isSolved():

        boolean {

        return this.state ===

            SolverState.Converged;

    }

    isSolving():

        boolean {

        return this.state ===

            SolverState.Solving;

    }

    hasFailed():

        boolean {

        return this.state ===

            SolverState.Failed;

    }

    /* ======================================================
     * Statistics
     * ====================================================== */

    getStatistics():

        Readonly<SolverStatistics> {

        return {

            ...this.statistics

        };

    }

    /* ======================================================
     * Counts
     * ====================================================== */

    getEntityCount():

        number {

        return this.entities.length;

    }

    getConstraintCount():

        number {

        return this.constraints.length;

    }

    /* ======================================================
     * Readonly Access
     * ====================================================== */

    getEntities():

        readonly SketchEntity[] {

        return this.entities;

    }

    getConstraints():

        readonly SketchConstraint[] {

        return this.constraints;

    }
    /* ======================================================
     * Diagnostics
     * ====================================================== */

    validate():

        {

            fullyConstrained:boolean;

            underConstrained:boolean;

            overConstrained:boolean;

            degreesOfFreedom:number;

        }{

        const dof =

            this.calculateDOF();

        return {

            fullyConstrained:

                dof===0,

            underConstrained:

                dof>0,

            overConstrained:

                dof<0,

            degreesOfFreedom:

                dof

        };

    }

    /* ======================================================
     * Debug
     * ====================================================== */

    debugInfo(){

        return {

            state:

                SolverState[this.state],

            entityCount:

                this.entities.length,

            constraintCount:

                this.constraints.length,

            statistics:

                {

                    ...this.statistics

                },

            entities:

                this.entities.map(

                    entity=>entity.debugInfo()

                ),

            constraints:

                this.constraints.map(

                    constraint=>constraint.debugInfo()

                )

        };

    }

    /* ======================================================
     * Serialization Helper
     * ====================================================== */

    exportState(){

        return {

            statistics:

                {

                    ...this.statistics

                },

            dof:

                this.calculateDOF(),

            entities:

                this.entities.map(

                    entity=>entity.serialize()

                ),

            constraints:

                this.constraints.map(

                    constraint=>constraint.serialize()

                )

        };

    }

}
/* ======================================================
 * Public API
 * ====================================================== */

    getEntities():

        readonly SketchEntity[]{

        return this.entities;

    }

    getConstraints():

        readonly SketchConstraint[]{

        return this.constraints;

    }

    getConstraintCount():

        number{

        return this.constraints.length;

    }

    getEntityCount():

        number{

        return this.entities.length;

    }

    isBusy():

        boolean{

        return this.state===SolverState.Solving;

    }

    isConverged():

        boolean{

        return this.statistics.converged;

    }

    reset():

        void{

        this.statistics={

            iterations:0,

            finalError:0,

            converged:false,

            degreesOfFreedom:0

        };

        this.state=

            SolverState.Idle;

    }

}

/* ======================================================
 * End Of File
 * ====================================================== */