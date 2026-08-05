import { BRepParameterTable } from "./BRepParameterTable";
export interface SolverResult {
    success: boolean;
    evaluated: string[];
    cycles: string[][];
    errors: string[];
}
export declare class BRepParameterSolver {
    readonly table: BRepParameterTable;
    constructor(table: BRepParameterTable);
    solve(): SolverResult;
    private topologicalSort;
    validate(): boolean;
    info(): {
        engine: string;
        parameterCount: number;
        expressionCount: number;
    };
}
