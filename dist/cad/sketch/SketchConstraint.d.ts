import { SketchEntity } from "./SketchEntity";
export declare enum SketchConstraintType {
    Coincident = 0,
    Horizontal = 1,
    Vertical = 2,
    Parallel = 3,
    Perpendicular = 4,
    Tangent = 5,
    Equal = 6,
    EqualLength = 7,
    EqualRadius = 8,
    Midpoint = 9,
    Symmetry = 10,
    Concentric = 11,
    Fix = 12,
    Distance = 13,
    Radius = 14,
    Diameter = 15,
    Angle = 16
}
export interface SketchConstraintSolveResult {
    error: number;
    solved: boolean;
}
export declare abstract class SketchConstraint {
    readonly id: string;
    readonly type: SketchConstraintType;
    readonly entities: SketchEntity[];
    enabled: boolean;
    driving: boolean;
    temporary: boolean;
    name: string;
    protected constructor(id: string, type: SketchConstraintType, entities: SketchEntity[]);
    /**
     * Solver tarafından çağrılır.
     * Dönen değer residual error'dır.
     */
    abstract solve(): number;
    /**
     * Constraint residual'i.
     */
    abstract error(): number;
    /**
     * Constraint geçerli mi?
     */
    abstract validate(): boolean;
    /**
     * Serialize
     */
    serialize(): {
        id: string;
        type: string;
        enabled: boolean;
        driving: boolean;
        temporary: boolean;
        entities: string[];
    };
    debugInfo(): {
        id: string;
        type: string;
        enabled: boolean;
        driving: boolean;
        temporary: boolean;
        entityCount: number;
        error: number;
    };
}
import { SketchPoint } from "./SketchEntity";
export declare class CoincidentConstraint extends SketchConstraint {
    constructor(id: string, pointA: SketchPoint, pointB: SketchPoint);
    private get p1();
    private get p2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class FixConstraint extends SketchConstraint {
    constructor(id: string, entity: SketchEntity);
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class DistanceConstraint extends SketchConstraint {
    value: number;
    constructor(id: string, pointA: SketchPoint, pointB: SketchPoint, value: number);
    private get p1();
    private get p2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
import { SketchLine } from "./SketchEntity";
export declare class HorizontalConstraint extends SketchConstraint {
    constructor(id: string, line: SketchLine);
    private get line();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class VerticalConstraint extends SketchConstraint {
    constructor(id: string, line: SketchLine);
    private get line();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class ParallelConstraint extends SketchConstraint {
    constructor(id: string, lineA: SketchLine, lineB: SketchLine);
    private get l1();
    private get l2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class PerpendicularConstraint extends SketchConstraint {
    constructor(id: string, lineA: SketchLine, lineB: SketchLine);
    private get l1();
    private get l2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class EqualLengthConstraint extends SketchConstraint {
    constructor(id: string, lineA: SketchLine, lineB: SketchLine);
    private get l1();
    private get l2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class MidpointConstraint extends SketchConstraint {
    constructor(id: string, point: SketchPoint, line: SketchLine);
    private get point();
    private get line();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class EqualRadiusConstraint extends SketchConstraint {
    constructor(id: string, circleA: SketchCircle, circleB: SketchCircle);
    private get c1();
    private get c2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class ConcentricConstraint extends SketchConstraint {
    constructor(id: string, circleA: SketchCircle, circleB: SketchCircle);
    private get c1();
    private get c2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class TangentConstraint extends SketchConstraint {
    constructor(id: string, circle: SketchCircle, line: SketchLine);
    private get circle();
    private get line();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class AngleConstraint extends SketchConstraint {
    targetAngle: number;
    constructor(id: string, lineA: SketchLine, lineB: SketchLine, targetAngle: number);
    private get l1();
    private get l2();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class RadiusConstraint extends SketchConstraint {
    radius: number;
    constructor(id: string, circle: SketchCircle, radius: number);
    private get circle();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class DiameterConstraint extends SketchConstraint {
    diameter: number;
    constructor(id: string, circle: SketchCircle, diameter: number);
    private get circle();
    solve(): number;
    error(): number;
    validate(): boolean;
}
export declare class SketchConstraintFactory {
    static create(type: SketchConstraintType, id: string, entities: SketchEntity[], value?: number): SketchConstraint;
}
export declare const SketchConstraintRegistry: {
    create: typeof SketchConstraintFactory.create;
};
export declare function deserializeConstraint(data: any, entities: SketchEntity[]): SketchConstraint;
