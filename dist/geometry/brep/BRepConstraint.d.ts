export declare enum ConstraintType {
    DISTANCE = "distance",
    LENGTH = "length",
    ANGLE = "angle",
    RADIUS = "radius",
    COINCIDENT = "coincident",
    PARALLEL = "parallel",
    PERPENDICULAR = "perpendicular",
    TANGENT = "tangent",
    CONCENTRIC = "concentric"
}
export declare enum ConstraintStatus {
    SOLVED = "solved",
    UNSOLVED = "unsolved",
    FAILED = "failed"
}
export interface ConstraintEntity {
    id: string;
    value: any;
}
export interface ConstraintSolveResult {
    success: boolean;
    status: ConstraintStatus;
    error?: string;
}
export declare class BRepConstraint {
    id: string;
    type: ConstraintType;
    entities: ConstraintEntity[];
    value: any;
    status: ConstraintStatus;
    constructor(id: string, type: ConstraintType, value: any);
    /**
     * Entity ekleme
     */
    addEntity(entity: ConstraintEntity): void;
    /**
     * Constraint çözme
     */
    solve(): ConstraintSolveResult;
    /**
     * Mesafe constraint
     */
    private solveDistance;
    /**
     * Açı constraint
     */
    private solveAngle;
    /**
     * Coincident constraint
     */
    private solveCoincident;
    /**
     * Constraint doğrulama
     */
    validate(): boolean;
    /**
     * Değer değiştirme
     */
    setValue(value: any): void;
    /**
     * Çözülmüş mü?
     */
    isSolved(): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
