export interface DesignVariable {
    id: string;
    value: number;
    min: number;
    max: number;
}
export interface OptimizationConstraint {
    name: string;
    limit: number;
    current: number;
}
export interface OptimizationResult {
    success: boolean;
    iterations: number;
    objective: number;
    improved: boolean;
}
export interface OptimizationObjective {
    type: "mass" | "stress" | "displacement" | "stiffness";
    target: number;
}
export declare class BRepOptimization {
    variables: DesignVariable[];
    constraints: OptimizationConstraint[];
    objective: OptimizationObjective | null;
    iteration: number;
    bestValue: number;
    constructor();
    /**
     * Tasarım değişkeni ekleme
     */
    addVariable(variable: DesignVariable): void;
    /**
     * Constraint ekleme
     */
    addConstraint(constraint: OptimizationConstraint): void;
    /**
     * Objective tanımlama
     */
    setObjective(objective: OptimizationObjective): void;
    /**
     * Ana optimizasyon çözümü
     */
    optimize(iterations: number): OptimizationResult;
    /**
     * Objective değerlendirme
     */
    objectiveValue(): number;
    /**
     * Kütle hesabı
     */
    calculateMass(): number;
    /**
     * Stress objective
     */
    calculateStress(): number;
    /**
     * Displacement objective
     */
    calculateDisplacement(): number;
    /**
     * Stiffness objective
     */
    calculateStiffness(): number;
    /**
     * Tasarım güncelleme
     */
    updateDesign(): void;
    /**
     * Topology optimization
     */
    topologyOptimize(): {
        optimized: boolean;
    };
    /**
     * Shape optimization
     */
    shapeOptimize(): {
        optimized: boolean;
    };
    /**
     * Sensitivity analysis
     */
    sensitivity(): {
        gradients: never[];
    };
    /**
     * Generative design
     */
    generateDesign(): {
        candidates: never[];
        status: string;
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        variables: number;
        constraints: number;
        status: string;
    };
}
