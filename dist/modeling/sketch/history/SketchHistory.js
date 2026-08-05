export var SketchHistoryEventType;
(function (SketchHistoryEventType) {
    SketchHistoryEventType["Create"] = "Create";
    SketchHistoryEventType["Modify"] = "Modify";
    SketchHistoryEventType["Delete"] = "Delete";
    SketchHistoryEventType["Constraint"] = "Constraint";
    SketchHistoryEventType["Transform"] = "Transform";
})(SketchHistoryEventType || (SketchHistoryEventType = {}));
export class SketchHistory {
    entries = [];
    add(entry) {
        this.entries.push(entry);
    }
    recordCommand(command, entityIds = []) {
        this.add({
            id: crypto.randomUUID(),
            type: SketchHistoryEventType.Modify,
            description: command.getDescription(),
            command,
            entityIds,
            timestamp: new Date()
        });
    }
    recordCreate(description, entityIds) {
        this.add({
            id: crypto.randomUUID(),
            type: SketchHistoryEventType.Create,
            description,
            entityIds,
            timestamp: new Date()
        });
    }
    recordDelete(description, entityIds) {
        this.add({
            id: crypto.randomUUID(),
            type: SketchHistoryEventType.Delete,
            description,
            entityIds,
            timestamp: new Date()
        });
    }
    recordConstraint(description, constraintId) {
        this.add({
            id: crypto.randomUUID(),
            type: SketchHistoryEventType.Constraint,
            description,
            entityIds: [
                constraintId
            ],
            timestamp: new Date()
        });
    }
    query(query) {
        return this.entries.filter(entry => {
            if (query.type &&
                entry.type !== query.type) {
                return false;
            }
            if (query.entityId &&
                !entry.entityIds.includes(query.entityId)) {
                return false;
            }
            return true;
        });
    }
    getEntry(id) {
        return (this.entries.find(x => x.id === id)
            ??
                null);
    }
    getTimeline() {
        return [
            ...this.entries
        ];
    }
    size() {
        return this.entries.length;
    }
    clear() {
        this.entries = [];
    }
    replay() {
        for (const entry of this.entries) {
            if (entry.command) {
                entry.command.redo();
            }
        }
    }
}
//# sourceMappingURL=SketchHistory.js.map