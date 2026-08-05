import { SolverAnalyzer } from "../solver/SolverAnalyzer";
import { SolverFactory } from "../solver/SolverFactory";
import { SolverProfiler } from "../performance/SolverProfiler";
export class SolverExecutor {
    static solve(system) {
        const analysis = SolverAnalyzer.analyze(system);
        const configuration = SolverFactory.create(system);
        const profiler = new SolverProfiler();
        profiler.start();
        let solution = null;
        if ("solver" in configuration) {
            const config = configuration;
            if (config.preconditioner) {
                config.preconditioner.build(system);
            }
            solution =
                config.solver.solve(system);
        }
        else {
            const solver = configuration;
            solution =
                solver.solve(system);
        }
        profiler.stop();
        return {
            analysis,
            profile: profiler.buildReport(),
            solution
        };
    }
}
//# sourceMappingURL=SolverExecutor.js.map