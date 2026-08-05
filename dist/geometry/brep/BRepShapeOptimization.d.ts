export interface ShapeParameter {
    id: string;
    value: number;
    min: number;
    max: number;
}
export interface ShapeConstraint {
    name: string;
    limit: number;
    value: number;
}
export interface SurfaceControlPoint {
    id: number;
    x: number;
    y: number;
    z: number;
}
export interface ShapeOptimizationResult {
    success: boolean;
    iterations: number;
    objective: number;
    geometryUpdated: boolean;
}
export declare class BRepShapeOptimization {
    parameters: ShapeParameter[];
    constraints: ShapeConstraint[];
    controlPoints: SurfaceControlPoint[];
    iteration: number;
    bestObjective: number;
    constructor();
    /**
     * Parametre ekleme
     */
    addParameter(parameter: ShapeParameter): void;
    /**
     * Constraint ekleme
     */
    addConstraint(constraint: ShapeConstraint): void;
    /**
     * Surface control point
     */
    addControlPoint(point: SurfaceControlPoint): void;
    /**
     * Ana optimizasyon
     */
    optimize(iterations: number): ShapeOptimizationResult;
    /**
     * Gradient hesabı
     */
    calculateGradient(): void;
    /**
     * Geometri güncelleme
     */
    updateGeometry(): void;
    /**
     * Constraint projection
     */
    projectConstraints(): void;
    /**
     * Objective değerlendirme
     */
    evaluate(): number;
    /**
     * Fillet optimizasyonu
     */
    optimizeFilletRadius(radius: number): {
        oldRadius: number;
        newRadius: number;
    };
    /**
     * Surface smoothing
     */
    smoothSurface(): void;
    /**
     * BRep export hazırlığı
     */
    generateOptimizedShape(): {
        controlPoints: number;
        optimized: boolean;
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
        parameters: number;
        points: number;
        status: string;
    };
}
