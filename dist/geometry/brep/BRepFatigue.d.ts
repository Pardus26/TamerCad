export interface FatiguePoint {
    stress: number;
    cycles: number;
}
export interface FatigueLoad {
    amplitude: number;
    meanStress: number;
    cycles: number;
}
export interface FatigueResult {
    success: boolean;
    life: number;
    damage: number;
    failure: boolean;
}
export interface CrackState {
    length: number;
    growthRate: number;
}
export declare class BRepFatigue {
    snCurve: FatiguePoint[];
    loads: FatigueLoad[];
    damage: number;
    crack: CrackState;
    enduranceLimit: number;
    constructor();
    /**
     * S-N eğrisi yükleme
     */
    setSNCurve(curve: FatiguePoint[]): void;
    /**
     * Endurance limit
     */
    setEnduranceLimit(value: number): void;
    /**
     * Döngüsel yük ekleme
     */
    addLoad(load: FatigueLoad): void;
    /**
     * Ana fatigue çözümü
     */
    solve(): FatigueResult;
    /**
     * Miner damage hesabı
     */
    calculateDamage(): void;
    /**
     * Stress → Cycle dönüşümü
     */
    cyclesToFailure(stress: number): number;
    /**
     * Yorulma ömrü tahmini
     */
    predictLife(): number;
    /**
     * Çatlak büyümesi
     */
    updateCrack(): void;
    /**
     * Paris crack growth modeli
     */
    parisLaw(deltaK: number, C: number, m: number): number;
    /**
     * Goodman correction
     */
    goodmanCorrection(alternating: number, mean: number, ultimate: number): number;
    /**
     * Güvenlik kontrolü
     */
    checkFailure(): boolean;
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
        damage: number;
        status: string;
    };
}
