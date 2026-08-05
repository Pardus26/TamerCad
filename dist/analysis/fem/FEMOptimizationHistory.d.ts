export interface FEMOptimizationIteration {
    iteration: number;
    objective: number;
    constraints: number[];
    parameters: number[];
    converged: boolean;
}
export declare class FEMOptimizationHistory {
    private iterations;
    add(record: FEMOptimizationIteration): void;
    latest(): FEMOptimizationIteration | undefined;
    best(): FEMOptimizationIteration | undefined;
    hasConverged(): boolean;
    objectiveHistory(): number[];
    rollback(index: number): FEMOptimizationIteration | undefined;
    size(): number;
    clear(): void;
    export(): FEMOptimizationIteration[];
    info(): {
        engine: string;
        iterations: number;
    };
}
