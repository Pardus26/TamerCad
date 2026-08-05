export interface DensityElement {
    id: number;
    density: number;
    sensitivity: number;
}
export interface VolumeConstraint {
    target: number;
    current: number;
}
export interface TopologyResult {
    success: boolean;
    iterations: number;
    compliance: number;
    volume: number;
}
export interface TopologyOptions {
    penalty: number;
    filterRadius: number;
    maxIterations: number;
}
export declare class BRepTopologyOptimization {
    elements: DensityElement[];
    volume: VolumeConstraint;
    options: TopologyOptions;
    constructor();
    /**
     * Density mesh oluşturma
     */
    initialize(elementCount: number): void;
    /**
     * Ana topology çözümü
     */
    solve(): TopologyResult;
    /**
     * Sensitivity hesabı
     */
    calculateSensitivity(): void;
    /**
     * Sensitivity filter
     */
    filterSensitivity(): void;
    /**
     * Density update
     */
    updateDensity(): void;
    /**
     * Compliance hesabı
     */
    calculateCompliance(): number;
    /**
     * Volume hesabı
     */
    calculateVolume(): number;
    /**
     * Material map üretimi
     */
    generateMaterialMap(): {
        id: number;
        density: number;
    }[];
    /**
     * Lightweight geometry
     */
    generateGeometry(): {
        removedRegions: number;
        optimized: boolean;
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
        elements: number;
        status: string;
    };
}
