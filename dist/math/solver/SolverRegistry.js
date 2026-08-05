export class SolverRegistry {
    static solvers = new Map();
    static preconditioners = new Map();
    static registerSolver(descriptor) {
        this.solvers.set(descriptor.id, descriptor);
    }
    static registerPreconditioner(descriptor) {
        this.preconditioners.set(descriptor.id, descriptor);
    }
    static getSolver(id) {
        return this.solvers.get(id);
    }
    static getPreconditioner(id) {
        return this.preconditioners.get(id);
    }
    static listSolvers() {
        return [...this.solvers.keys()];
    }
    static listPreconditioners() {
        return [...this.preconditioners.keys()];
    }
    static clear() {
        this.solvers.clear();
        this.preconditioners.clear();
    }
    static info() {
        return {
            engine: "SolverRegistry",
            solvers: this.solvers.size,
            preconditioners: this.preconditioners.size
        };
    }
}
//# sourceMappingURL=SolverRegistry.js.map