import { OptimizationSolver } from "../../math/optimization/OptimizationSolver";
export class FEMOptimizationManager {
    config;
    problem;
    responseEvaluator;
    constraintEvaluator;
    objectiveFunction;
    constructor(config, problem, responseEvaluator, constraintEvaluator, objectiveFunction) {
        this.config = config;
        this.problem = problem;
        this.responseEvaluator =
            responseEvaluator;
        this.constraintEvaluator =
            constraintEvaluator;
        this.objectiveFunction =
            objectiveFunction;
    }
    optimize() {
        this.prepareProblem();
        const optimizer = this.createOptimizer();
        const result = OptimizationSolver.solve(this.problem, optimizer);
        this.applyResult(result);
        return {
            converged: result.converged,
            iterations: result.iterations,
            objective: result.objective,
            parameters: result.parameters
        };
    }
    info() {
        return {
            engine: "FEMOptimizationManager",
            maxIterations: this.config.maxIterations
        };
    }
}
//# sourceMappingURL=FEMOptimizationManager.js.map