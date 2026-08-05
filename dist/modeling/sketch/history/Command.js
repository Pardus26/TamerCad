export class Command {
    description;
    id;
    createdAt;
    executed = false;
    constructor(description) {
        this.description = description;
        this.id =
            crypto.randomUUID();
        this.createdAt =
            new Date();
    }
    redo() {
        return this.execute();
    }
    canUndo() {
        return this.executed;
    }
    isExecuted() {
        return this.executed;
    }
    markExecuted() {
        this.executed = true;
    }
    markUndone() {
        this.executed = false;
    }
    mergeWith(command) {
        return false;
    }
    getDescription() {
        return this.description;
    }
}
//# sourceMappingURL=Command.js.map