import { BRepAssembly } from "./BRepAssembly";
export interface SolverTransform {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
}
export interface SolverResult {
    success: boolean;
    solved: boolean;
    iterations: number;
    remainingDOF: number;
    warnings: string[];
}
export interface ConstraintEquation {
    id: string;
    type: string;
    componentA: string;
    componentB: string;
    error: number;
}
export declare class BRepAssemblySolver {
    /**
     * Ana assembly çözümü
     */
    static solve(assembly: BRepAssembly): SolverResult;
    /**
     * Constraint graph oluşturma
     */
    static buildConstraintGraph(assembly: BRepAssembly): ConstraintEquation[];
    /**
     * Equation solver
     */
    static solveEquations(equations: ConstraintEquation[]): {
        iterations: number;
    };
    /**
     * Transform uygulama
     */
    static applyTransforms(assembly: BRepAssembly, solution: any): void;
    /**
     * Degree of Freedom hesabı
     */
    static calculateDOF(assembly: BRepAssembly): number;
    /**
     * Fixed joint çözümü
     */
    static solveFixedJoint(transformA: SolverTransform, transformB: SolverTransform): {
        x: number;
        y: number;
        z: number;
        rx: number;
        ry: number;
        rz: number;
    };
    /**
     * Revolute joint çözümü
     */
    static solveRevoluteJoint(angle: number): {
        rotation: number;
        axis: {
            x: number;
            y: number;
            z: number;
        };
    };
    /**
     * Slider joint
     */
    static solveSliderJoint(distance: number): {
        translation: number;
    };
    /**
     * Çakışma kontrolü
     */
    static detectCollision(assembly: BRepAssembly): {
        collision: boolean;
        pairs: never[];
    };
    /**
     * Motion update
     */
    static updateMotion(assembly: BRepAssembly, delta: number): {
        updated: boolean;
        timestep: number;
    };
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
