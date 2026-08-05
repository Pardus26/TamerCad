export type ManufacturingProcess = "CNC" | "3D_PRINT" | "CASTING" | "LASER";
export interface MachineCapability {
    axes: number;
    maxSize: number;
    tolerance: number;
}
export interface ManufacturingIssue {
    type: string;
    severity: "LOW" | "MEDIUM" | "HIGH";
    message: string;
}
export interface ManufacturingResult {
    success: boolean;
    feasible: boolean;
    cost: number;
    time: number;
    issues: ManufacturingIssue[];
}
export interface ManufacturingOptions {
    process: ManufacturingProcess;
    tolerance: number;
}
export declare class BRepManufacturing {
    process: ManufacturingProcess;
    machine: MachineCapability;
    issues: ManufacturingIssue[];
    options: ManufacturingOptions;
    constructor();
    /**
     * Üretim prosesi seçimi
     */
    setProcess(process: ManufacturingProcess): void;
    /**
     * Makine tanımlama
     */
    setMachine(capability: MachineCapability): void;
    /**
     * Ana üretilebilirlik analizi
     */
    analyze(): ManufacturingResult;
    /**
     * Geometri kontrolü
     */
    checkGeometry(): boolean;
    /**
     * Takım erişimi
     */
    checkAccess(): void;
    /**
     * Tolerans kontrolü
     */
    checkTolerance(): void;
    /**
     * CNC kontrolü
     */
    validateCNC(): {
        compatible: boolean;
        axes: number;
    };
    /**
     * 3D Print kontrolü
     */
    validate3DPrint(): {
        layerHeight: number;
        supportRequired: boolean;
    };
    /**
     * Overhang analizi
     */
    analyzeOverhang(angle: number): {
        angle: number;
        requiresSupport: boolean;
    };
    /**
     * Minimum duvar kalınlığı
     */
    checkWallThickness(thickness: number): {
        valid: boolean;
        thickness: number;
    };
    /**
     * Maliyet tahmini
     */
    estimateCost(): 30 | 150 | 100 | 200;
    /**
     * Süre tahmini
     */
    estimateTime(): number;
    /**
     * Process planning
     */
    generateProcessPlan(): {
        steps: string[];
    };
    /**
     * Manufacturing report
     */
    report(): {
        process: ManufacturingProcess;
        issues: number;
        machine: MachineCapability;
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        process: ManufacturingProcess;
        status: string;
    };
}
