export interface OptimizationVariable {
    name: string;
    value: number;
    min?: number;
    max?: number;
}
export interface OptimizationConstraint {
    name: string;
    evaluate(variables: number[]): number;
}
export declare class OptimizationProblem {
    private variables;
    private constraints;
    private objectiveFunction?;
    addVariable(variable: OptimizationVariable): void;
    setObjective(objective: (variables: number[]) => number): void;
    addConstraint(constraint: OptimizationConstraint): void;
    evaluate(values: number[]): number;
    validate(values: number[]): boolean;
    getVariables(): OptimizationVariable[];
    getConstraints(): OptimizationConstraint[];
    info(): {
        engine: string;
        variables: number;
        constraints: number;
    };
}
