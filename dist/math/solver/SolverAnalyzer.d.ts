import { LinearSystem } from "../linear/LinearSystem";
import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export interface SolverAnalysis {
    sparse: boolean;
    symmetric: boolean;
    spd: boolean;
    dimension: number;
    density: number;
}
export declare class SolverAnalyzer {
    static analyze(system: LinearSystem | SparseLinearSystem): SolverAnalysis;
    static isSparse(system: LinearSystem | SparseLinearSystem): boolean;
    static dimension(system: LinearSystem | SparseLinearSystem): number;
    static density(system: LinearSystem | SparseLinearSystem): number;
    static isSymmetric(system: LinearSystem | SparseLinearSystem): boolean;
    static isSPD(system: LinearSystem | SparseLinearSystem): boolean;
}
