import { BRepSolid } from "./BRepSolid";
import { MaterialDefinition } from "./BRepMaterial";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface StressTensor {
    xx: number;
    yy: number;
    zz: number;
    xy: number;
    yz: number;
    zx: number;
}
export interface StrainTensor {
    xx: number;
    yy: number;
    zz: number;
    xy: number;
    yz: number;
    zx: number;
}
export interface LoadCase {
    id: string;
    name: string;
    force: Vector3;
    pressure: number;
    moment: Vector3;
}
export interface StressResult {
    success: boolean;
    maxStress: number;
    vonMises: number;
    safetyFactor: number;
}
export declare class BRepStress {
    solid: BRepSolid | null;
    material: MaterialDefinition | null;
    loads: LoadCase[];
    stress: StressTensor;
    strain: StrainTensor;
    constructor();
    /**
     * Model yükleme
     */
    load(solid: BRepSolid, material: MaterialDefinition): void;
    /**
     * Load case ekleme
     */
    addLoad(load: LoadCase): void;
    /**
     * Stress çözümü
     */
    solve(): StressResult;
    /**
     * Gerilme hesabı
     */
    calculateStress(): void;
    /**
     * Elastik strain hesabı
     */
    calculateStrain(): void;
    /**
     * Von Mises stress
     */
    vonMises(): number;
    /**
     * Maximum stress
     */
    maximumStress(): number;
    /**
     * Safety factor
     */
    safetyFactor(stress: number): number;
    /**
     * Failure kontrolü
     */
    checkFailure(): boolean;
    /**
     * FEM mesh hazırlığı
     */
    prepareFEM(): {
        nodes: number;
        elements: number;
        ready: boolean;
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
        loads: number;
        status: string;
    };
}
