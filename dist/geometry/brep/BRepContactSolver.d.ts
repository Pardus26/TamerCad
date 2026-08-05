import { RigidBody, ContactManifold } from "./BRepPhysicsWorld";
export interface Impulse {
    x: number;
    y: number;
    z: number;
}
export interface SolverResult {
    solved: boolean;
    impulses: number;
    corrections: number;
}
export declare class BRepContactSolver {
    iterations: number;
    restitution: number;
    friction: number;
    constructor();
    /**
     * Contact çözüm ana fonksiyonu
     */
    solve(contacts: ContactManifold[], bodies: RigidBody[]): SolverResult;
    /**
     * Normal impulse hesabı
     */
    solveNormalImpulse(a: RigidBody, b: RigidBody, contact: ContactManifold): Impulse;
    /**
     * Impulse uygulama
     */
    applyImpulse(a: RigidBody, b: RigidBody, impulse: Impulse): void;
    /**
     * Sürtünme çözümü
     */
    solveFriction(a: RigidBody, b: RigidBody, contact: ContactManifold): Impulse;
    /**
     * Penetration correction
     */
    correctPenetration(a: RigidBody, b: RigidBody, contact: ContactManifold): void;
    /**
     * Iterative solver
     */
    iterate(contacts: ContactManifold[], bodies: RigidBody[]): void;
    /**
     * Stabilization
     */
    stabilize(bodies: RigidBody[]): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        iterations: number;
        status: string;
    };
}
