export class FEMOptimizationHistory {
    iterations = [];
    add(record) {
        this.iterations.push({
            ...record,
            constraints: [
                ...record.constraints
            ],
            parameters: [
                ...record.parameters
            ]
        });
    }
    latest() {
        return (this.iterations[this.iterations.length - 1]);
    }
    best() {
        if (this.iterations.length === 0) {
            return undefined;
        }
        return this.iterations.reduce((best, current) => {
            return current.objective
                <
                    best.objective
                ?
                    current
                :
                    best;
        });
    }
    hasConverged() {
        const last = this.latest();
        return last ?
            last.converged
            :
                false;
    }
    objectiveHistory() {
        return this.iterations.map(x => x.objective);
    }
    rollback(index) {
        return this.iterations[index];
    }
    size() {
        return this.iterations.length;
    }
    clear() {
        this.iterations = [];
    }
    export() {
        return [
            ...this.iterations
        ];
    }
    info() {
        return {
            engine: "FEMOptimizationHistory",
            iterations: this.iterations.length
        };
    }
}
//# sourceMappingURL=FEMOptimizationHistory.js.map