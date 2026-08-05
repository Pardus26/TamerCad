import { SketchConstraint } from "./SketchConstraint";
import { SketchEntity } from "./SketchEntity";
export interface Solver2DOptions {
    maxIterations?: number;
    tolerance?: number;
    relaxation?: number;
}
export interface Solver2DResult {
    success: boolean;
    error: number;
    iterations: number;
    dof: number;
}
export interface Solver2DStatistics {
    iterations: number;
    finalError: number;
    converged: boolean;
    degreesOfFreedom: number;
    solveTime: number;
}
declare enum SolverState {
    Idle = 0,
    Solving = 1,
    Converged = 2,
    Failed = 3
}
export declare class Solver2D {
    private readonly entities;
    private readonly constraints;
    private readonly maxIterations;
    private readonly tolerance;
    private readonly relaxation;
    private state;
    private statistics;
    constructor(options?: Solver2DOptions);
    addEntity(entity: SketchEntity): void;
    removeEntity(entity: SketchEntity): void;
    getEntities(): readonly SketchEntity[];
    addConstraint(constraint: SketchConstraint): void;
    removeConstraint(constraint: SketchConstraint): void;
    getConstraints(): readonly SketchConstraint[];
    clear(): void;
    solve(): Solver2DResult;
    calculateDOF(): number;
    private entityDOF;
    validate(): {
        degreesOfFreedom: number;
        fullyConstrained: boolean;
        underConstrained: boolean;
        overConstrained: boolean;
    };
    synchronize(entities: readonly SketchEntity[], constraints: readonly SketchConstraint[]): void;
    rebuild(): void;
    reset(): void;
    autoFix(): void;
    getState(): SolverState;
    isSolved(): boolean;
    isSolving(): boolean;
    hasFailed(): boolean;
    getStatistics(): Readonly<Solver2DStatistics>;
    getEntityCount(): number;
    getConstraintCount(): number;
    debugInfo(): {
        state: string;
        entityCount: number;
        constraintCount: number;
        statistics: {
            iterations: number;
            finalError: number;
            converged: boolean;
            degreesOfFreedom: number;
            solveTime: number;
        };
        entities: {
            id: string;
            type: string;
            version: number;
            flags: number;
            visible: boolean;
            selected: boolean;
            fixed: boolean;
            construction: boolean;
            boundingBox: import("./SketchEntity").SketchBoundingBox;
        }[];
        constraints: {
            id: string;
            type: string;
            enabled: boolean;
            driving: boolean;
            temporary: boolean;
            entityCount: number;
            error: number;
        }[];
    };
    exportState(): {
        statistics: {
            iterations: number;
            finalError: number;
            converged: boolean;
            degreesOfFreedom: number;
            solveTime: number;
        };
        dof: number;
        entities: import("./SketchEntity").SerializedSketchEntity[];
        constraints: {
            id: string;
            type: string;
            enabled: boolean;
            driving: boolean;
            temporary: boolean;
            entities: string[];
        }[];
    };
}
export {};
