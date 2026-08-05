import { BRepSolid } from "./BRepSolid";
import { MaterialDefinition } from "./BRepMaterial";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface TemperatureNode {
    position: Vector3;
    temperature: number;
}
export interface HeatSource {
    id: string;
    position: Vector3;
    power: number;
}
export interface ThermalBoundary {
    type: "fixed_temperature" | "heat_flux" | "convection";
    value: number;
}
export interface ThermalResult {
    success: boolean;
    averageTemperature: number;
    heatFlow: number;
}
export declare class BRepThermal {
    solid: BRepSolid | null;
    material: MaterialDefinition | null;
    nodes: TemperatureNode[];
    sources: HeatSource[];
    boundaries: ThermalBoundary[];
    temperature: number;
    constructor();
    /**
     * Model yükleme
     */
    load(solid: BRepSolid, material: MaterialDefinition): void;
    /**
     * Başlangıç sıcaklığı
     */
    setTemperature(value: number): void;
    /**
     * Heat source ekleme
     */
    addHeatSource(source: HeatSource): void;
    /**
     * Boundary condition
     */
    addBoundary(boundary: ThermalBoundary): void;
    /**
     * Thermal step
     */
    solve(deltaTime: number): ThermalResult;
    /**
     * Heat conduction solver
     */
    solveConduction(): void;
    /**
     * Heat source etkisi
     */
    applyHeatSources(): void;
    /**
     * Boundary uygulanması
     */
    applyBoundary(): void;
    /**
     * Heat flow
     */
    calculateHeatFlow(): number;
    /**
     * Ortalama sıcaklık
     */
    averageTemperature(): number;
    /**
     * Termal genleşme
     */
    expansion(length: number, deltaTemperature: number): number;
    /**
     * Termal stress
     */
    thermalStress(deltaTemperature: number): number;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        temperature: number;
        sources: number;
        status: string;
    };
}
