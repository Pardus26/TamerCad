import { BRepParameter } from "./BRepParameter";
import { BRepParameterExpression } from "./BRepParameterExpression";
import { BRepParameterTable } from "./BRepParameterTable";
import { BRepParameterDependencyGraph } from "./BRepParameterDependencyGraph";
import { BRepParameterSolver } from "./BRepParameterSolver";
import { BRepParametricModel } from "./BRepParametricModel";
export declare class BRepParameterManager {
    readonly table: BRepParameterTable;
    readonly graph: BRepParameterDependencyGraph;
    readonly solver: BRepParameterSolver;
    readonly model: BRepParametricModel;
    constructor(model: BRepParametricModel);
    addParameter(parameter: BRepParameter): void;
    removeParameter(id: string): boolean;
    updateParameter(id: string, value: any): void;
    getParameter(id: string): BRepParameter | undefined;
    registerExpression(parameterId: string, expression: BRepParameterExpression): void;
    evaluate(): boolean;
    rebuild(parameterId: string): void;
    serialize(): {
        parameters: {
            parameters: import("./BRepParameter").SerializedParameter[];
            expressions: {
                parameter: string;
                expression: import("./BRepParameterExpression").SerializedExpression;
            }[];
        };
        graph: {
            engine: string;
            nodes: number;
            edges: number;
        };
    };
    reset(): void;
    info(): {
        engine: string;
        parameters: {
            engine: string;
            parameterCount: number;
            expressionCount: number;
        };
        graph: {
            engine: string;
            nodes: number;
            edges: number;
        };
        solver: {
            engine: string;
            parameterCount: number;
            expressionCount: number;
        };
    };
}
