import { BRepParameterExpression } from "./BRepParameterExpression";
export class BRepParameterSolver {
    table;
    constructor(table) {
        this.table = table;
    }
    solve() {
        const expressions = (this.table.serialize().expressions ?? []);
        const graph = new Map();
        for (const item of expressions) {
            const expr = BRepParameterExpression.deserialize(item.expression);
            graph.set(item.parameter, expr.getDependencies());
        }
        const order = this.topologicalSort(graph);
        const errors = [];
        const evaluated = [];
        if (order.cycles.length === 0) {
            this.table.evaluateExpressions();
            evaluated.push(...order.order);
        }
        else {
            errors.push("Circular parameter dependency detected");
        }
        return {
            success: order.cycles.length === 0,
            evaluated,
            cycles: order.cycles,
            errors
        };
    }
    topologicalSort(graph) {
        const visited = new Set();
        const visiting = new Set();
        const order = [];
        const cycles = [];
        const dfs = (node, path) => {
            if (visiting.has(node)) {
                cycles.push([...path, node]);
                return;
            }
            if (visited.has(node)) {
                return;
            }
            visiting.add(node);
            const deps = graph.get(node) ?? [];
            for (const dep of deps) {
                if (graph.has(dep)) {
                    dfs(dep, [...path, node]);
                }
            }
            visiting.delete(node);
            visited.add(node);
            order.push(node);
        };
        for (const node of graph.keys()) {
            dfs(node, []);
        }
        return {
            order,
            cycles
        };
    }
    validate() {
        return this.solve().success;
    }
    info() {
        return {
            engine: "BRepParameterSolver",
            parameterCount: this.table.serialize().parameters.length,
            expressionCount: this.table.serialize().expressions.length
        };
    }
}
//# sourceMappingURL=BRepParameterSolver.js.map