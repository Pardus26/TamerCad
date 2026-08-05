export declare class Tolerance {
    private constructor();
    /**
     * Geometrik mesafe toleransı
     */
    static distance: number;
    /**
     * Açısal tolerans (radyan)
     */
    static angle: number;
    /**
     * Çok küçük değerleri sıfır kabul etme
     */
    static zero: number;
    static equals(a: number, b: number, tolerance?: number): boolean;
    static isZero(value: number): boolean;
    static greater(a: number, b: number, tolerance?: number): boolean;
    static less(a: number, b: number, tolerance?: number): boolean;
    static clampZero(value: number): number;
    static setPrecision(precision: number): void;
    static setAnglePrecision(precision: number): void;
    static info(): {
        distance: number;
        angle: number;
        zero: number;
    };
}
