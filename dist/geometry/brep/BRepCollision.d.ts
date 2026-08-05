import { BRepSolid } from "./BRepSolid";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface BoundingBox {
    min: Vector3;
    max: Vector3;
}
export interface CollisionContact {
    point: Vector3;
    normal: Vector3;
    depth: number;
}
export interface CollisionResult {
    collided: boolean;
    contacts: CollisionContact[];
    distance: number;
}
export interface CollisionBody {
    id: string;
    solid: BRepSolid;
    bounds: BoundingBox;
}
export declare class BRepCollision {
    bodies: CollisionBody[];
    constructor();
    /**
     * Collision body ekleme
     */
    addBody(body: CollisionBody): void;
    /**
     * Ana collision testi
     */
    test(a: CollisionBody, b: CollisionBody): CollisionResult;
    /**
     * AABB collision
     */
    aabb(a: BoundingBox, b: BoundingBox): boolean;
    /**
     * OBB collision
     */
    obb(a: CollisionBody, b: CollisionBody): boolean;
    /**
     * Narrow phase
     */
    narrowPhase(a: CollisionBody, b: CollisionBody): CollisionResult;
    /**
     * Mesh collision
     */
    meshCollision(meshA: any, meshB: any): {
        collided: boolean;
        triangles: number;
    };
    /**
     * Penetration depth
     */
    penetration(a: CollisionBody, b: CollisionBody): {
        depth: number;
        normal: {
            x: number;
            y: number;
            z: number;
        };
    };
    /**
     * Contact üretimi
     */
    generateContact(point: Vector3, normal: Vector3, depth: number): CollisionContact;
    /**
     * Continuous collision detection
     */
    continuous(body: CollisionBody, velocity: Vector3, delta: number): {
        collision: boolean;
        toi: number;
    };
    /**
     * Çift body testi
     */
    checkAll(): CollisionResult[];
    /**
     * Debug
     */
    info(): {
        engine: string;
        bodies: number;
        status: string;
    };
}
