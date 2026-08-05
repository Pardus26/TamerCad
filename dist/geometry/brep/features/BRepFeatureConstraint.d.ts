export type ConstraintType = "DIMENSION" | "DISTANCE" | "ANGLE" | "COINCIDENT" | "PARALLEL" | "PERPENDICULAR" | "TANGENT" | "CONCENTRIC" | "SYMMETRIC" | "EQUAL" | "FIXED";
export type ConstraintStatus = "ACTIVE" | "SOLVED" | "CONFLICT" | "INVALID";
export interface ConstraintEntity {
    id: string;
    type: string;
    value?: any;
}
export interface ConstraintSolveResult {
    success: boolean;
    status: ConstraintStatus;
    error?: string;
}
export interface FeatureConstraint {
    id: string;
    type: ConstraintType;
    entities: ConstraintEntity[];
    value?: number;
    status: ConstraintStatus;
}
export declare class BRepFeatureConstraint {
    constraints: FeatureConstraint[];
    tolerance: number;
    constructor();
    /**
     * Constraint ekle
     */
    addConstraint(constraint: FeatureConstraint): FeatureConstraint;
    /**
     * Distance constraint
     */
    createDistanceConstraint(entityA: string, entityB: string, distance: number): FeatureConstraint;
    /**
     * Angle constraint
     */
    createAngleConstraint(entityA: string, entityB: string, angle: number): FeatureConstraint;
    /**
     * Parallel constraint
     */
    createParallelConstraint(entityA: string, entityB: string): FeatureConstraint;
    /**
     * Tangent constraint
     */
    createTangentConstraint(entityA: string, entityB: string): FeatureConstraint;
    /**
     * Constraint çözümü
     */
    solveConstraint(constraint: FeatureConstraint): ConstraintSolveResult;
    /**
     * Tüm constraint çözümü
     */
    solveAll(): ConstraintSolveResult[];
    /**
     * Conflict kontrolü
     */
    detectConflicts(): string[];
    /**
     * Parametre değişim yayılımı
     */
    propagateChange(parameter: string, value: any): {
        parameter: string;
        value: any;
        affected: number;
    };
    /**
     * Constraint ağacı
     */
    dependencyGraph(): {
        id: string;
        dependsOn: string[];
    }[];
    /**
     * Serialize
     */
    serialize(): {
        constraints: FeatureConstraint[];
        count: number;
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
        constraints: number;
        tolerance: number;
    };
}
