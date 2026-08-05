export class UndoRedoManager {
    maxHistory;
    history = [];
    cursor = -1;
    checkpoints = [];
    constructor(maxHistory = 500) {
        this.maxHistory = maxHistory;
    }
    execute(command) {
        const result = command.execute();
        if (!result.success) {
            return false;
        }
        // ileri tarih temizlenir
        this.history =
            this.history.slice(0, this.cursor + 1);
        this.history.push(command);
        this.cursor++;
        this.optimize();
        return true;
    }
    undo() {
        if (!this.canUndo()) {
            return false;
        }
        const command = this.history[this.cursor];
        const result = command.undo();
        if (result.success) {
            this.cursor--;
            return true;
        }
        return false;
    }
    redo() {
        if (!this.canRedo()) {
            return false;
        }
        const command = this.history[this.cursor + 1];
        const result = command.redo();
        if (result.success) {
            this.cursor++;
            return true;
        }
        return false;
    }
    jumpTo(index) {
        if (index < -1 ||
            index >= this.history.length) {
            return false;
        }
        while (this.cursor >
            index) {
            this.undo();
        }
        while (this.cursor <
            index) {
            this.redo();
        }
        return true;
    }
    createCheckpoint(name) {
        const checkpoint = {
            id: crypto.randomUUID(),
            name,
            commandIndex: this.cursor,
            createdAt: new Date()
        };
        this.checkpoints.push(checkpoint);
        return checkpoint;
    }
    restoreCheckpoint(checkpointId) {
        const checkpoint = this.checkpoints.find(c => c.id === checkpointId);
        if (!checkpoint) {
            return false;
        }
        return this.jumpTo(checkpoint.commandIndex);
    }
    clear() {
        this.history = [];
        this.cursor = -1;
        this.checkpoints = [];
    }
    canUndo() {
        return (this.cursor >= 0);
    }
    canRedo() {
        return (this.cursor <
            this.history.length - 1);
    }
    getState() {
        return {
            index: this.cursor,
            size: this.history.length
        };
    }
    getHistory() {
        return [
            ...this.history
        ];
    }
    getCheckpoints() {
        return [
            ...this.checkpoints
        ];
    }
    optimize() {
        if (this.history.length
            >
                this.maxHistory) {
            const removeCount = this.history.length
                -
                    this.maxHistory;
            this.history.splice(0, removeCount);
            this.cursor -=
                removeCount;
        }
    }
}
//# sourceMappingURL=UndoRedoManager.js.map