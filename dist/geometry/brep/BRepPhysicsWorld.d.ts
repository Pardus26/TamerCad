import { BRepSolid } from "./BRepSolid";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface Material {
    name: string;
    density: number;
    friction: number;
    restitution: number;
}
export interface RigidBody {
    id: string;
    solid: BRepSolid;
    mass: number;
    position: Vector3;
    rotation: Vector3;
    velocity: Vector3;
    angularVelocity: Vector3;
    material: Material;
    static: boolean;
}
export interface ContactManifold {
    bodyA: string;
    bodyB: string;
    points: Vector3[];
    normal: Vector3;
    penetration: number;
}
export interface PhysicsWorldResult {
    success: boolean;
    timestep: number;
    bodies: number;
    contacts: number;
}
export declare class BRepPhysicsWorld {
    bodies: RigidBody[];
    materials: Material[];
    contacts: ContactManifold[];
    gravity: Vector3;
    time: number;
    constructor();
    /**
     * Material ekleme
     */
    addMaterial(material: Material): void;
    /**
     * Body ekleme
     */
    addBody(body: RigidBody): void;
    /**
     * Dünya simülasyonu
     */
    step(dt: number): PhysicsWorldResult;
    /**
     * Gravity
     */
    applyGravity(): void;
    /**
     * Broad phase collision
     *
     * AABB filtering
     */
    broadPhase(): void;
    /**
     * Narrow phase collision
     *
     * Precise geometry test
     */
    narrowPhase(): void;
    /**
     * Contact solver
     */
    solveContacts(): void;
    /**
     * Motion integration
     */
    integrate(dt: number): void;
    /**
     * Friction modeli
     */
    friction(a: Material, b: Material): number;
    /**
     * Restitution
     */
    bounce(a: Material, b: Material): number;
    /**
     * Dünya reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        bodies: number;
        materials: number;
        status: string;
    };
}
