export class SolverProfiler {
    startTime = 0;
    endTime = 0;
    iterations = 0;
    residualHistory = [];
    start() {
        this.startTime = performance.now();
        this.endTime = 0;
        this.iterations = 0;
        this.residualHistory = [];
    }
    stop() {
        this.endTime = performance.now();
    }
    recordIteration(residual) {
        this.iterations++;
        this.residualHistory.push(residual);
    }
    buildReport() {
        return {
            elapsedMilliseconds: this.endTime - this.startTime,
            iterations: this.iterations,
            finalResidual: this.residualHistory.length > 0
                ? this.residualHistory[this.residualHistory.length - 1]
                : 0,
            residualHistory: [...this.residualHistory]
        };
    }
    reset() {
        this.startTime = 0;
        this.endTime = 0;
        this.iterations = 0;
        this.residualHistory = [];
    }
}
//# sourceMappingURL=SolverProfiler.js.map