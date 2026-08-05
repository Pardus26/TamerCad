import { Sketch } from "./Sketch";
import { SketchConstraint } from "./SketchConstraint";
import { SketchEntity } from "./SketchEntity";
import { Solver2D, Solver2DResult } from "./Solver2D";
export interface ConstraintStatistics {
    entityCount: number;
    constraintCount: number;
    degreesOfFreedom: number;
    solved: boolean;
    iterations: number;
    error: number;
}
export interface ConstraintValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
export interface ConstraintSystemEvents {
    onSolved?(result: Solver2DResult): void;
    onConstraintAdded?(constraint: SketchConstraint): void;
    onConstraintRemoved?(constraint: SketchConstraint): void;
    onConstraintModified?(constraint: SketchConstraint): void;
}
export declare class ConstraintSystem {
    private readonly sketch;
    private readonly solver;
    private readonly graph;
    private readonly events?;
    private solving;
    constructor(sketch: Sketch, solver?: Solver2D, events?: ConstraintSystemEvents);
    addConstraint(constraint: SketchConstraint): void;
    removeConstraint(constraint: SketchConstraint): void;
    private internalAddConstraint;
    private buildDependencies;
    private hasSharedEntity;
    private initialize;
    solve(): Solver2DResult;
    solveConstraint(constraint: SketchConstraint): Solver2DResult;
    private rebuildGraph;
    private shareEntities;
    private topologicalSort;
    getDependencies(constraint: SketchConstraint): SketchConstraint[];
    getDependents(constraint: SketchConstraint): SketchConstraint[];
    private createSnapshot;
    private restoreSnapshot;
    private saveState;
    undo(): boolean;
    redo(): boolean;
    clearHistory(): void;
    beginUpdate(): void;
    endUpdate(): void;
    private requestSolve;
    getConstraintCount(): number;
    getConstraintById(id: string): SketchConstraint | undefined;
    hasConstraint(id: string): boolean;
    getConstraintsForEntity(entityId: string): SketchConstraint[];
    getConnectedEntities(entityId: string): SketchEntity[];
    debugInfo(): {
        constraintCount: number;
        graphNodes: any;
        undo: any;
        redo: any;
        batchMode: any;
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
}
