import { Sketch } from "./Sketch";
import { Solver2D, Solver2DResult } from "./Solver2D";
import { SketchEntity } from "./SketchEntity";
import { SketchConstraint } from "./SketchConstraint";
export interface SketchSolverEvents {
    onSolved?(result: Solver2DResult): void;
    onConstraintAdded?(constraint: SketchConstraint): void;
    onConstraintRemoved?(constraint: SketchConstraint): void;
    onEntityAdded?(entity: SketchEntity): void;
    onEntityRemoved?(entity: SketchEntity): void;
    onUpdated?(): void;
    onError?(error: Error): void;
}
export interface SketchSolverManagerOptions {
    sketch: Sketch;
    events?: SketchSolverEvents;
}
export declare class SketchSolverManager {
    private readonly sketch;
    private readonly solver;
    private readonly events?;
    private readonly undoStack;
    private readonly redoStack;
    private solving;
    constructor(options: SketchSolverManagerOptions);
    private registerSketch;
    addEntity(entity: SketchEntity): void;
    removeEntity(entity: SketchEntity): void;
    getSolver(): Solver2D;
    getSketch(): Sketch;
    addConstraint(constraint: SketchConstraint): void;
    removeConstraint(constraint: SketchConstraint): void;
    solve(): Solver2DResult;
    updateEntityPosition(entity: SketchEntity, x: number, y: number): void;
    beginDrag(): void;
    updateDrag(entity: SketchEntity, x: number, y: number): void;
    endDrag(): void;
    cancelDrag(): void;
    rebuildSolver(): void;
    synchronize(): void;
    private saveState;
    undo(): void;
    redo(): void;
    private createSnapshot;
    private restoreSnapshot;
    getDegreesOfFreedom(): number;
    isSolved(): boolean;
    validate(): {
        degreesOfFreedom: number;
        fullyConstrained: boolean;
        underConstrained: boolean;
        overConstrained: boolean;
    };
    getStatistics(): Readonly<import("./Solver2D").Solver2DStatistics>;
    clearHistory(): void;
    dispose(): void;
    debugInfo(): {
        solving: boolean;
        undo: number;
        redo: number;
        sketch: {
            entities: number;
            constraints: number;
        };
        solver: {
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
    };
}
