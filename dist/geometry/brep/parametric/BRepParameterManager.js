import { BRepParameterTable } from "./BRepParameterTable";
import { BRepParameterDependencyGraph } from "./BRepParameterDependencyGraph";
import { BRepParameterSolver } from "./BRepParameterSolver";
export class BRepParameterManager {
    table;
    graph;
    solver;
    model;
    constructor(model) {
        this.model = model;
        this.table = new BRepParameterTable();
        this.graph = new BRepParameterDependencyGraph();
        this.solver = new BRepParameterSolver(this.table);
    }
    addParameter(parameter) {
        this.table.add(parameter);
    }
    removeParameter(id) {
        return this.table.remove(id);
    }
    updateParameter(id, value) {
        this.table.update(id, value);
    }
    getParameter(id) {
        return this.table.get(id);
    }
    registerExpression(parameterId, expression) {
        this.table.setExpression(parameterId, expression);
        for (const dependency of expression.getDependencies()) {
            this.graph.addDependency(dependency, parameterId);
        }
    }
    evaluate() {
        const result = this.solver.solve();
        if (result.success) {
            this.model.revision++;
        }
        return result.success;
    }
    rebuild(parameterId) {
        this.evaluate();
        const affected = this.graph.affectedParameters(parameterId);
        for (const parameter of affected) {
            this.model.rebuild(parameter);
        }
    }
    serialize() {
        return {
            parameters: this.table.serialize(),
            graph: this.graph.info()
        };
    }
    reset() {
        this.table.clear();
        this.graph.clear();
    }
    info() {
        return {
            engine: "BRepParameterManager",
            parameters: this.table.info(),
            graph: this.graph.info(),
            solver: this.solver.info()
        };
    }
}
//# sourceMappingURL=BRepParameterManager.js.map