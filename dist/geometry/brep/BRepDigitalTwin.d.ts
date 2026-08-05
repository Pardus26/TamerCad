export interface GeometryState {
    version: string;
    timestamp: number;
    geometryHash: string;
}
export interface SensorData {
    id: string;
    value: number;
    unit: string;
    timestamp: number;
}
export interface TwinState {
    temperature: number;
    stress: number;
    fatigue: number;
    health: number;
}
export interface LifecycleEvent {
    type: "MANUFACTURED" | "ASSEMBLED" | "OPERATING" | "MAINTENANCE";
    timestamp: number;
}
export interface DigitalTwinResult {
    healthy: boolean;
    healthScore: number;
    predictions: string[];
}
export declare class BRepDigitalTwin {
    geometry: GeometryState;
    sensors: SensorData[];
    state: TwinState;
    lifecycle: LifecycleEvent[];
    connected: boolean;
    constructor();
    /**
     * Geometry bağlama
     */
    attachGeometry(hash: string): void;
    /**
     * Sensor bağlama
     */
    addSensor(sensor: SensorData): void;
    /**
     * Canlı veri güncelleme
     */
    updateSensor(id: string, value: number): void;
    /**
     * Fiziksel durum senkronizasyonu
     */
    synchronize(): void;
    /**
     * Health hesaplama
     */
    calculateHealth(): number;
    /**
     * Predictive maintenance
     */
    predictFailure(): string[];
    /**
     * Lifecycle event
     */
    addLifecycleEvent(event: LifecycleEvent): void;
    /**
     * Simulation bağlantısı
     */
    connectSimulation(): void;
    /**
     * Digital twin update loop
     */
    update(): void;
    /**
     * Twin raporu
     */
    report(): DigitalTwinResult;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        sensors: number;
        health: number;
        status: string;
    };
}
