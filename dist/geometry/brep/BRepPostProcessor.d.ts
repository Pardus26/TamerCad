import { BRepToolPath } from "./BRepToolPath";
export declare enum CNCDialect {
    GENERIC = "generic",
    FANUC = "fanuc",
    HAAS = "haas",
    SIEMENS = "siemens",
    LINUXCNC = "linuxcnc"
}
export interface MachineProfile {
    name: string;
    dialect: CNCDialect;
    units: string;
    maxRPM: number;
    rapidSpeed: number;
}
export interface PostOptions {
    coolant: boolean;
    toolChange: boolean;
    compensation: boolean;
}
export interface GCodeResult {
    success: boolean;
    code: string;
    lines: number;
}
export declare class BRepPostProcessor {
    machine: MachineProfile;
    options: PostOptions;
    constructor(machine: MachineProfile);
    /**
     * Ana post process
     */
    process(toolPath: BRepToolPath): GCodeResult;
    /**
     * CNC header
     */
    header(): string;
    /**
     * Tool setup
     */
    toolSetup(): string;
    /**
     * Motion command üretimi
     */
    motion(toolPath: BRepToolPath): string;
    /**
     * Spindle
     */
    spindle(rpm: number): string;
    /**
     * Coolant
     */
    coolant(enabled: boolean): "M09" | "M08";
    /**
     * Tool compensation
     */
    compensation(radius: number): string;
    /**
     * Feed optimization
     */
    optimizeFeed(feed: number): number;
    /**
     * CNC footer
     */
    footer(): string;
    /**
     * Debug
     */
    info(): {
        engine: string;
        machine: string;
        dialect: CNCDialect;
        status: string;
    };
}
