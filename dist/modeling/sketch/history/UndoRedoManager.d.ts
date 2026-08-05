import { Command } from "./Command";
export interface HistoryState {
    index: number;
    size: number;
}
export interface Checkpoint {
    id: string;
    name: string;
    commandIndex: number;
    createdAt: Date;
}
export declare class UndoRedoManager {
    private maxHistory;
    private history;
    private cursor;
    private checkpoints;
    constructor(maxHistory?: number);
    execute(command: Command): boolean;
    undo(): boolean;
    redo(): boolean;
    jumpTo(index: number): boolean;
    createCheckpoint(name: string): Checkpoint;
    restoreCheckpoint(checkpointId: string): boolean;
    clear(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    getState(): HistoryState;
    getHistory(): Command[];
    getCheckpoints(): Checkpoint[];
    private optimize;
}
