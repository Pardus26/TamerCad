export class BRepFeatureHistory {
    changes;
    snapshots;
    undoStack;
    redoStack;
    timeline;
    version;
    constructor() {
        this.changes = [];
        this.snapshots = [];
        this.undoStack = [];
        this.redoStack = [];
        this.timeline = [];
        this.version = 0;
    }
    /**
     * Değişiklik kaydet
     */
    recordChange(change) {
        this.changes.push(change);
        this.undoStack.push(change);
        this.redoStack = [];
        this.version++;
        this.timeline.push({
            version: this.version,
            description: change.action,
            features: [
                change.featureId
            ]
        });
    }
    /**
     * Snapshot oluştur
     */
    createSnapshot(features) {
        const snapshot = {
            version: this.version,
            features: features.map(feature => feature.serialize()),
            timestamp: Date.now()
        };
        this.snapshots.push(snapshot);
        return snapshot;
    }
    /**
     * Undo
     */
    undo() {
        const change = this.undoStack.pop();
        if (!change) {
            return false;
        }
        this.redoStack.push(change);
        return {
            undone: true,
            feature: change.featureId,
            action: change.action
        };
    }
    /**
     * Redo
     */
    redo() {
        const change = this.redoStack.pop();
        if (!change) {
            return false;
        }
        this.undoStack.push(change);
        return {
            redone: true,
            feature: change.featureId,
            action: change.action
        };
    }
    /**
     * Belirli versiyona git
     */
    restoreVersion(version) {
        const snapshot = this.snapshots.find(s => s.version === version);
        if (!snapshot) {
            return false;
        }
        this.version =
            version;
        return {
            restored: true,
            version
        };
    }
    /**
     * Feature geçmişi
     */
    getFeatureHistory(featureId) {
        return this.changes.filter(change => change.featureId === featureId);
    }
    /**
     * Timeline
     */
    getTimeline() {
        return this.timeline;
    }
    /**
     * Değişiklik analizi
     */
    analyzeEvolution() {
        const created = this.changes.filter(c => c.action === "CREATE").length;
        const updates = this.changes.filter(c => c.action === "UPDATE").length;
        return {
            versions: this.version,
            created,
            updates,
            evolutionRate: updates /
                Math.max(created, 1)
        };
    }
    /**
     * AI öğrenme verisi
     */
    exportLearningData() {
        return {
            history: this.changes,
            snapshots: this.snapshots,
            timeline: this.timeline
        };
    }
    /**
     * Geçmiş temizleme
     */
    clear() {
        this.changes = [];
        this.snapshots = [];
        this.undoStack = [];
        this.redoStack = [];
        this.timeline = [];
        this.version = 0;
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            version: this.version,
            changes: this.changes.length,
            snapshots: this.snapshots.length,
            timeline: this.timeline.length
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureHistory",
            version: this.version,
            changes: this.changes.length
        };
    }
}
//# sourceMappingURL=BRepFeatureHistory.js.map