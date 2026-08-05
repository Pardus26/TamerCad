import { BRepAssembly } from "./BRepAssembly";
import { BRepKinematics } from "./BRepKinematics";
import { BRepMotion } from "./BRepMotion";
export declare enum RobotType {
    CARTESIAN = "cartesian",
    SCARA = "scara",
    SIX_AXIS = "six_axis",
    COLLABORATIVE = "collaborative"
}
export interface RobotJoint {
    id: string;
    min: number;
    max: number;
    current: number;
}
export interface ToolCenterPoint {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
}
export interface RobotPathPoint {
    x: number;
    y: number;
    z: number;
    speed: number;
}
export interface RobotResult {
    success: boolean;
    position: ToolCenterPoint;
    warnings: string[];
}
export declare class BRepRobot {
    name: string;
    type: RobotType;
    assembly: BRepAssembly;
    kinematics: BRepKinematics;
    motion: BRepMotion;
    joints: RobotJoint[];
    tcp: ToolCenterPoint;
    constructor(name: string, type: RobotType, assembly: BRepAssembly);
    /**
     * Joint ekleme
     */
    addJoint(joint: RobotJoint): void;
    /**
     * TCP ayarlama
     */
    setToolCenterPoint(tcp: ToolCenterPoint): void;
    /**
     * Robot pozisyon çözümü
     */
    moveTo(target: ToolCenterPoint): RobotResult;
    /**
     * Forward robot hareketi
     */
    forward(joints: number[]): import("./BRepKinematics").KinematicResult;
    /**
     * Path çalıştırma
     */
    executePath(path: RobotPathPoint[]): {
        executed: boolean;
        points: number;
    };
    /**
     * Work envelope
     */
    workspace(): {
        radius: number;
        height: number;
    };
    /**
     * Servo hareketi
     */
    servo(jointId: string, value: number): boolean;
    /**
     * Reset robot
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        name: string;
        type: RobotType;
        joints: number;
        status: string;
    };
}
