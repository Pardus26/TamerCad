export class BRepFatigue {
    snCurve;
    loads;
    damage;
    crack;
    enduranceLimit;
    constructor() {
        this.snCurve = [];
        this.loads = [];
        this.damage = 0;
        this.crack = {
            length: 0,
            growthRate: 0
        };
        this.enduranceLimit = 0;
    }
    /**
     * S-N eğrisi yükleme
     */
    setSNCurve(curve) {
        this.snCurve =
            curve;
    }
    /**
     * Endurance limit
     */
    setEnduranceLimit(value) {
        this.enduranceLimit =
            value;
    }
    /**
     * Döngüsel yük ekleme
     */
    addLoad(load) {
        this.loads.push(load);
    }
    /**
     * Ana fatigue çözümü
     */
    solve() {
        this.calculateDamage();
        this.updateCrack();
        return {
            success: true,
            life: this.predictLife(),
            damage: this.damage,
            failure: this.damage >= 1
        };
    }
    /**
     * Miner damage hesabı
     */
    calculateDamage() {
        this.damage = 0;
        for (const load of this.loads) {
            const life = this.cyclesToFailure(load.amplitude);
            if (life > 0) {
                this.damage +=
                    load.cycles /
                        life;
            }
        }
    }
    /**
     * Stress → Cycle dönüşümü
     */
    cyclesToFailure(stress) {
        if (this.snCurve.length === 0)
            return Infinity;
        let closest = this.snCurve[0];
        for (const point of this.snCurve) {
            if (Math.abs(point.stress - stress)
                <
                    Math.abs(closest.stress - stress)) {
                closest =
                    point;
            }
        }
        return closest.cycles;
    }
    /**
     * Yorulma ömrü tahmini
     */
    predictLife() {
        if (this.damage === 0)
            return Infinity;
        return 1 /
            this.damage;
    }
    /**
     * Çatlak büyümesi
     */
    updateCrack() {
        if (this.damage <= 0)
            return;
        this.crack.growthRate =
            this.damage *
                0.001;
        this.crack.length +=
            this.crack.growthRate;
    }
    /**
     * Paris crack growth modeli
     */
    parisLaw(deltaK, C, m) {
        return C *
            Math.pow(deltaK, m);
    }
    /**
     * Goodman correction
     */
    goodmanCorrection(alternating, mean, ultimate) {
        return alternating /
            (1 -
                mean /
                    ultimate);
    }
    /**
     * Güvenlik kontrolü
     */
    checkFailure() {
        return this.damage >= 1;
    }
    /**
     * Reset
     */
    reset() {
        this.loads = [];
        this.damage = 0;
        this.crack = {
            length: 0,
            growthRate: 0
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFatigue",
            loads: this.loads.length,
            damage: this.damage,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepFatigue.js.map