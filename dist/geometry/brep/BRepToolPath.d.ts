import { BRepSolid } from "./BRepSolid";
export declare enum ToolPathType {
    RAPID = "rapid",
    LINEAR = "linear",
    ARC = "arc",
    DRILL = "drill",
    POCKET = "pocket",
    CONTOUR = "contour"
}
export declare enum MachiningOperation {
    MILLING = "milling",
    DRILLING = "drilling",
    TURNING = "turning",
    ADDITIVE = "additive"
}
export interface Tool {
    diameter: number;
    length: number;
    feed: number;
    speed: number;
}
export interface PathPoint {
    x: number;
    y: number;
    z: number;
    feed: number;
}
export interface ToolPathResult {
    success: boolean;
    points: PathPoint[];
    length: number;
    warnings: string[];
}
export declare class BRepToolPath {
    points: PathPoint[];
    tool: Tool | null;
    operation: MachiningOperation;
    constructor(operation: MachiningOperation);
    /**
     * Tool tanımlama
     */
    setTool(tool: Tool): void;
    /**
     * Nokta ekleme
     */
    addPoint(point: PathPoint): void;
    /**
     * Linear path oluşturma
     */
    linear(start: PathPoint, end: PathPoint): void;
    /**
     * Drill path
     */
    drill(position: {
        x: number;
        y: number;
        z: number;
    }, depth: number): void;
    /**
     * Pocket toolpath
     */
    pocket(solid: BRepSolid): {
        generated: boolean;
    };
    /**
     * Contour path
     */
    contour(profile: any): {
        generated: boolean;
        profile: any;
    };
    /**
     * Toplam yol uzunluğu
     */
    length(): number;
    /**
     * Collision kontrolü
     */
    checkCollision(solid: BRepSolid): {
        collision: boolean;
        contacts: never[];
    };
    /**
     * G-Code üretimi
     */
    exportGCode(): string;
    /**
     * Robot path export
     */
    exportRobotPath(): {
        position: PathPoint;
        command: string;
    }[];
    /**
     * Debug
     */
    info(): {
        engine: string;
        points: number;
        operation: MachiningOperation;
        status: string;
    };
}
