import { BRepParameter } from "./BRepParameter";
import { BRepParameterExpression } from "./BRepParameterExpression";
export declare class BRepParameterTable {
    private parameters;
    private expressions;
    add(parameter: BRepParameter): void;
    remove(id: string): boolean;
    get(id: string): BRepParameter | undefined;
    has(id: string): boolean;
    update(id: string, value: any): void;
    setExpression(parameterId: string, expression: BRepParameterExpression): void;
    evaluateExpressions(): void;
    parametersArray(): BRepParameter[];
    serialize(): {
        parameters: import("./BRepParameter").SerializedParameter[];
        expressions: {
            parameter: string;
            expression: import("./BRepParameterExpression").SerializedExpression;
        }[];
    };
    clear(): void;
    info(): {
        engine: string;
        parameterCount: number;
        expressionCount: number;
    };
}
