export class Tolerance {
    constructor() { }
    /**
     * Geometrik mesafe toleransı
     */
    static distance = 1e-6;
    /**
     * Açısal tolerans (radyan)
     */
    static angle = 1e-8;
    /**
     * Çok küçük değerleri sıfır kabul etme
     */
    static zero = 1e-12;
    static equals(a, b, tolerance = Tolerance.distance) {
        return Math.abs(a - b)
            <=
                tolerance;
    }
    static isZero(value) {
        return Math.abs(value)
            <=
                Tolerance.zero;
    }
    static greater(a, b, tolerance = Tolerance.distance) {
        return a > b + tolerance;
    }
    static less(a, b, tolerance = Tolerance.distance) {
        return a < b - tolerance;
    }
    static clampZero(value) {
        return this.isZero(value)
            ?
                0
            :
                value;
    }
    static setPrecision(precision) {
        Tolerance.distance =
            precision;
    }
    static setAnglePrecision(precision) {
        Tolerance.angle =
            precision;
    }
    static info() {
        return {
            distance: Tolerance.distance,
            angle: Tolerance.angle,
            zero: Tolerance.zero
        };
    }
}
//# sourceMappingURL=Tolerance.js.map