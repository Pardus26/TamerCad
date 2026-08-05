import { RigidBody } from "./BRepPhysicsWorld";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export declare enum ConstraintType {
    FIXED = "fixed",
    HINGE = "hinge",
    SLIDER = "slider",
    DISTANCE = "distance",
    MOTOR = "motor",
    GEAR = "gear"
}
export interface Constraint {
    id: string;
    type: ConstraintType;
    bodyA: string;
    bodyB: string;
}
export interface MotorConstraint extends Constraint {
    targetSpeed: number;
    torque: number;
}
export interface ConstraintResult {
    solved: boolean;
    corrections: number;
}
export declare class BRepConstraintPhysics {
    constraints: Constraint[];
    iterations: number;
    constructor();
    /**
     * Constraint ekleme
     */
    add(constraint: Constraint): void;
    /**
     * Ana constraint solver
     */
    solve(bodies: RigidBody[]): ConstraintResult;
    /**
     * Fixed joint
     */
    solveFixed(constraint: Constraint, bodies: RigidBody[]): void;
    /**
     * Hinge joint
     */
    solveHinge(constraint: Constraint, bodies: RigidBody[]): void;
    /**
     * Slider joint
     */
    solveSlider(constraint: Constraint, bodies: RigidBody[]): void;
    /**
     * Motor joint
     */
    solveMotor(constraint: Constraint, bodies: RigidBody[]): void;
    /**
     * Distance constraint
     */
    solveDistance(constraint: Constraint, bodies: RigidBody[]): void;
    /**
     * Gear constraint
     */
    solveGear(constraint: Constraint, bodies: RigidBody[]): void;
    /**
     * Body bulucu
     */
    body(id: string, bodies: RigidBody[]): RigidBody | undefined;
    /**
     * Iterative çözüm
     */
    iterate(bodies: RigidBody[]): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        constraints: number;
        iterations: number;
        status: string;
    };
}
