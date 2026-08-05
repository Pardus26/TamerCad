import { BRepSolid } from "./BRepSolid";
import { BRepToolPath } from "./BRepToolPath";
export declare enum MachineType {
    CNC_3_AXIS = "3_axis",
    CNC_5_AXIS = "5_axis",
    LATHE = "lathe",
    ROBOT_CELL = "robot_cell"
}
export declare enum CAMOperation {
    FACE_MILL = "face_mill",
    POCKET = "pocket",
    CONTOUR = "contour",
    DRILL = "drill",
    THREAD = "thread"
}
export interface MachineSetup {
    machine: MachineType;
    origin: {
        x: number;
        y: number;
        z: number;
    };
    tolerance: number;
}
export interface CAMTool {
    id: string;
    diameter: number;
    length: number;
    feed: number;
    rpm: number;
}
export interface CAMOperationResult {
    operation: CAMOperation;
    toolpath: BRepToolPath;
    estimatedTime: number;
}
export interface CAMResult {
    success: boolean;
    operations: number;
    gcode: string;
    warnings: string[];
}
export declare class BRepCAM {
    setup: MachineSetup;
    tools: CAMTool[];
    operations: CAMOperationResult[];
    part: BRepSolid | null;
    constructor();
    /**
     * Manufacturing setup
     */
    configure(setup: MachineSetup): void;
    /**
     * Parça yükleme
     */
    loadPart(solid: BRepSolid): void;
    /**
     * Tool ekleme
     */
    addTool(tool: CAMTool): void;
    /**
     * Face milling
     */
    faceMill(depth: number): void;
    /**
     * Pocket operasyonu
     */
    pocket(depth: number): void;
    /**
     * Drill operasyonu
     */
    drill(positions: any[]): void;
    /**
     * Contour machining
     */
    contour(): {
        generated: boolean;
    };
    /**
     * Toolpath oluşturma
     */
    generateToolPaths(): BRepToolPath[];
    /**
     * Süre tahmini
     */
    estimateTime(): number;
    /**
     * Post processor
     */
    postProcess(): string;
    /**
     * CAM çalıştır
     */
    build(): CAMResult;
    /**
     * Debug
     */
    info(): {
        engine: string;
        operations: number;
        tools: number;
        status: string;
    };
}
