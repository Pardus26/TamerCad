import { SolverProfiler } from "../performance/SolverProfiler";
export class OptimizationSolver {
    constructor() { }
    static solve(problem, optimizer) {
        const profiler = new SolverProfiler();
        profiler.start();
        const result = optimizer.optimize();
        profiler.stop();
        const parameters = this.extractParameters(optimizer);
        return {
            converged: result.converged,
            iterations: result.iterations,
            objective: problem.evaluate(parameters),
            parameters,
            profile: profiler.buildReport()
        };
    }
    static extractParameters(optimizer) {
        const object = optimizer;
        if (object.getParameters) {
            return object.getParameters();
        }
        return [];
    }
    static info() {
        return {
            engine: "OptimizationSolver"
        };
    }
}
//# sourceMappingURL=OptimizationSolver.js.map