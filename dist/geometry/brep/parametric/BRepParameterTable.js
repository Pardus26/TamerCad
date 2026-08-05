export class BRepParameterTable {
    parameters = new Map();
    expressions = new Map();
    add(parameter) {
        this.parameters.set(parameter.id, parameter);
    }
    remove(id) {
        this.expressions.delete(id);
        return this.parameters.delete(id);
    }
    get(id) {
        return this.parameters.get(id);
    }
    has(id) {
        return this.parameters.has(id);
    }
    update(id, value) {
        const p = this.parameters.get(id);
        if (!p) {
            throw new Error(`Unknown parameter: ${id}`);
        }
        p.value = value;
    }
    setExpression(parameterId, expression) {
        if (!this.parameters.has(parameterId)) {
            throw new Error(`Unknown parameter: ${parameterId}`);
        }
        this.expressions.set(parameterId, expression);
    }
    evaluateExpressions() {
        const context = {
            parameters: this.parameters
        };
        for (const [parameterId, expr] of this.expressions) {
            const parameter = this.parameters.get(parameterId);
            if (!parameter) {
                continue;
            }
            const value = expr.evaluate(context);
            parameter.setValue(value);
            parameter.clearDirty();
        }
    }
    parametersArray() {
        return Array.from(this.parameters.values());
    }
    serialize() {
        return {
            parameters: this.parametersArray()
                .map(p => p.serialize()),
            expressions: Array.from(this.expressions.entries()).map(([id, e]) => ({
                parameter: id,
                expression: e.serialize()
            }))
        };
    }
    clear() {
        this.parameters.clear();
        this.expressions.clear();
    }
    info() {
        return {
            engine: "BRepParameterTable",
            parameterCount: this.parameters.size,
            expressionCount: this.expressions.size
        };
    }
}
//# sourceMappingURL=BRepParameterTable.js.map