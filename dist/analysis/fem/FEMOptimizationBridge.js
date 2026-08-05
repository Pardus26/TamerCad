import { OptimizationSolver } from "../../math/optimization/OptimizationSolver";
export class FEMOptimizationBridge {
    problem;
    constructor(problem) {
        this.problem = problem;
    }
    solve() {
        this.updateGeometry();
        this.rebuildMesh();
        const femResult = this.solveFEM();
        const objective = this.evaluateObjective(femResult);
        const constraints = this.evaluateConstraints(femResult);
        return {
            objective,
            constraints,
            displacement: femResult.displacement,
            stress: femResult.stress
        };
    }
    optimize() {
        return;
        OptimizationSolver.solve(this.problem, this.createOptimizer());
    }
    info() {
        return {
            engine: "FEMOptimizationBridge"
        };
    }
}
//# sourceMappingURL=FEMOptimizationBridge.js.map