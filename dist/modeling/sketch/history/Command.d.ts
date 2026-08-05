export interface CommandResult {
    success: boolean;
    message?: string;
}
export declare abstract class Command {
    description: string;
    readonly id: string;
    readonly createdAt: Date;
    protected executed: boolean;
    constructor(description: string);
    abstract execute(): CommandResult;
    abstract undo(): CommandResult;
    redo(): CommandResult;
    canUndo(): boolean;
    isExecuted(): boolean;
    protected markExecuted(): void;
    protected markUndone(): void;
    mergeWith(command: Command): boolean;
    getDescription(): string;
}
