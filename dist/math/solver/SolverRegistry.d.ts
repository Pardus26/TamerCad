export interface SolverDescriptor {
    id: string;
    category: "direct" | "iterative";
    create(): unknown;
}
export interface PreconditionerDescriptor {
    id: string;
    create(): unknown;
}
export declare class SolverRegistry {
    private static solvers;
    private static preconditioners;
    static registerSolver(descriptor: SolverDescriptor): void;
    static registerPreconditioner(descriptor: PreconditionerDescriptor): void;
    static getSolver(id: string): SolverDescriptor | undefined;
    static getPreconditioner(id: string): PreconditionerDescriptor | undefined;
    static listSolvers(): string[];
    static listPreconditioners(): string[];
    static clear(): void;
    static info(): {
        engine: string;
        solvers: number;
        preconditioners: number;
    };
}
