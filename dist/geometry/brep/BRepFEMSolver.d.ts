export interface Matrix {
    rows: number;
    cols: number;
    values: number[][];
}
export interface FEMVector {
    values: number[];
}
export interface SolverOptions {
    tolerance: number;
    maxIterations: number;
    nonlinear: boolean;
}
export interface SolverResult {
    solved: boolean;
    iterations: number;
    error: number;
}
export declare class BRepFEMSolver {
    stiffness: Matrix | null;
    force: FEMVector | null;
    displacement: FEMVector | null;
    options: SolverOptions;
    constructor();
    /**
     * Sistem yükleme
     */
    loadSystem(stiffness: Matrix, force: FEMVector): void;
    /**
     * Ana çözüm
     */
    solve(): SolverResult;
    /**
     * Linear FEM solver
     *
     * K u = F
     */
    linearSolve(): SolverResult;
    /**
     * Conjugate Gradient solver
     */
    conjugateGradient(): SolverResult;
    /**
     * Newton-Raphson nonlinear solver
     */
    newtonSolve(): SolverResult;
    /**
     * Residual hesaplama
     */
    calculateResidual(): void;
    /**
     * Tangent stiffness matrix
     */
    updateTangentMatrix(): void;
    /**
     * Modal analysis
     */
    modalAnalysis(): {
        modes: number;
        solved: boolean;
    };
    /**
     * Eigenvalue çözümü
     */
    eigenSolve(): {
        eigenvalues: never[];
    };
    /**
     * Matrix çarpımı
     */
    multiply(matrix: Matrix, vector: FEMVector): {
        values: number[];
    };
    /**
     * Convergence kontrol
     */
    converged(error: number): boolean;
    /**
     * Debug
     */
    info(): {
        engine: string;
        nonlinear: boolean;
        status: string;
    };
}
