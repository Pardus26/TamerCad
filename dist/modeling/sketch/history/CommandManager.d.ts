import { Command, CommandResult } from "./Command";
export interface CommandEvent {
    type: "execute" | "undo" | "redo";
    command: Command;
}
export declare class CommandManager {
    private undoStack;
    private redoStack;
    private listeners;
    private transactionCommands;
    execute(command: Command): CommandResult;
    undo(): CommandResult;
    redo(): CommandResult;
    beginTransaction(): void;
    commitTransaction(): void;
    rollbackTransaction(): void;
    subscribe(listener: (event: CommandEvent) => void): void;
    clear(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    private emit;
}
export declare class CompositeCommand extends Command {
    private commands;
    constructor(commands: Command[]);
    execute(): CommandResult;
    undo(): CommandResult;
}
