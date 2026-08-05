import { BRepAssembly } from "./BRepAssembly";
export declare enum KinematicJointType {
    REVOLUTE = "revolute",
    PRISMATIC = "prismatic",
    FIXED = "fixed"
}
export interface JointNode {
    id: string;
    parent: string | null;
    type: KinematicJointType;
    axis: {
        x: number;
        y: number;
        z: number;
    };
    length: number;
}
export interface TransformMatrix {
    values: number[][];
}
export interface Pose {
    position: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
}
export interface KinematicResult {
    success: boolean;
    pose: Pose;
    iterations: number;
    warnings: string[];
}
export declare class BRepKinematics {
    joints: JointNode[];
    assembly: BRepAssembly | null;
    constructor(assembly?: BRepAssembly);
    /**
     * Joint ekleme
     */
    addJoint(joint: JointNode): void;
    /**
     * Forward Kinematics
     *
     * Joint açıları verilir
     * End pose hesaplanır
     */
    forward(angles: number[]): KinematicResult;
    /**
     * Inverse Kinematics
     *
     * Hedef pozisyon
     */
    inverse(target: {
        x: number;
        y: number;
        z: number;
    }): number[];
    /**
     * Transform matrisi üretimi
     */
    createTransform(pose: Pose): TransformMatrix;
    /**
     * End effector pozisyonu
     */
    endEffector(angles: number[]): Pose;
    /**
     * Degree of freedom
     */
    degreesOfFreedom(): number;
    /**
     * Robot kol zinciri
     */
    chain(): string[];
    /**
     * Collision-aware motion hazırlığı
     */
    prepareMotion(): {
        ready: boolean;
        joints: number;
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        joints: number;
        status: string;
    };
}
