export class Preconditioner {
    matrix;
    initialized = false;
    build(matrix) {
        this.matrix = matrix;
        this.initialized = true;
        this.onBuild();
    }
    update() {
        if (!this.initialized) {
            return;
        }
        this.onUpdate();
    }
    onUpdate() {
        // optional override
    }
    reset() {
        this.matrix = undefined;
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
}
//# sourceMappingURL=Preconditioner.js.map