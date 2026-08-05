import { BRepSolid } from "./BRepSolid";
import { BRepAssembly } from "./BRepAssembly";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface PhysicsBody {
    id: string;
    solid: BRepSolid;
    mass: number;
    position: Vector3;
    velocity: Vector3;
    acceleration: Vector3;
    dynamic: boolean;
}
export interface Force {
    bodyId: string;
    value: Vector3;
}
export interface Contact {
    bodyA: string;
    bodyB: string;
    point: Vector3;
    normal: Vector3;
}
export interface SimulationResult {
    success: boolean;
    time: number;
    bodies: number;
    collisions: number;
}
export declare class BRepSimulation {
    assembly: BRepAssembly | null;
    bodies: PhysicsBody[];
    forces: Force[];
    contacts: Contact[];
    gravity: Vector3;
    time: number;
    constructor(assembly?: BRepAssembly);
    /**
     * Rigid body ekleme
     */
    addBody(body: PhysicsBody): void;
    /**
     * Force uygulama
     */
    applyForce(force: Force): void;
    /**
     * Simulation step
     */
    step(delta: number): SimulationResult;
    /**
     * Physics integration
     */
    integrate(delta: number): void;
    /**
     * Collision detection
     */
    detectCollisions(): void;
    /**
     * Contact çözümü
     */
    resolveContacts(): void;
    /**
     * Gravity değiştirme
     */
    setGravity(gravity: Vector3): void;
    /**
     * Body reset
     */
    reset(): void;
    /**
     * Assembly simulation hazırlığı
     */
    prepare(): {
        ready: boolean;
        bodies: number;
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        bodies: number;
        time: number;
        status: string;
    };
}
