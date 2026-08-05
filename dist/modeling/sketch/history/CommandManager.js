import { Command } from "./Command";
export class CommandManager {
    undoStack = [];
    redoStack = [];
    listeners = [];
    transactionCommands = null;
    execute(command) {
        const result = command.execute();
        if (!result.success) {
            return result;
        }
        if (this.transactionCommands) {
            this.transactionCommands
                .push(command);
        }
        else {
            this.undoStack.push(command);
            this.redoStack = [];
        }
        this.emit({
            type: "execute",
            command
        });
        return result;
    }
    undo() {
        const command = this.undoStack.pop();
        if (!command) {
            return {
                success: false,
                message: "Nothing to undo"
            };
        }
        const result = command.undo();
        if (result.success) {
            this.redoStack.push(command);
            this.emit({
                type: "undo",
                command
            });
        }
        return result;
    }
    redo() {
        const command = this.redoStack.pop();
        if (!command) {
            return {
                success: false,
                message: "Nothing to redo"
            };
        }
        const result = command.redo();
        if (result.success) {
            this.undoStack.push(command);
            this.emit({
                type: "redo",
                command
            });
        }
        return result;
    }
    beginTransaction() {
        this.transactionCommands = [];
    }
    commitTransaction() {
        if (!this.transactionCommands) {
            return;
        }
        const commands = this.transactionCommands;
        this.transactionCommands =
            null;
        if (commands.length === 1) {
            this.undoStack.push(commands[0]);
        }
        else if (commands.length > 1) {
            this.undoStack.push(new CompositeCommand(commands));
        }
        this.redoStack = [];
    }
    rollbackTransaction() {
        if (!this.transactionCommands) {
            return;
        }
        for (let i = this.transactionCommands.length - 1; i >= 0; i--) {
            this.transactionCommands[i]
                .undo();
        }
        this.transactionCommands =
            null;
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    clear() {
        this.undoStack = [];
        this.redoStack = [];
    }
    canUndo() {
        return (this.undoStack.length
            >
                0);
    }
    canRedo() {
        return (this.redoStack.length
            >
                0);
    }
    emit(event) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}
export class CompositeCommand extends Command {
    commands;
    constructor(commands) {
        super("Composite Command");
        this.commands = commands;
    }
    execute() {
        for (const command of this.commands) {
            command.redo();
        }
        return {
            success: true
        };
    }
    undo() {
        for (let i = this.commands.length - 1; i >= 0; i--) {
            this.commands[i]
                .undo();
        }
        return {
            success: true
        };
    }
}
//# sourceMappingURL=CommandManager.js.map