export var ExposureMode;
(function (ExposureMode) {
    ExposureMode["Manual"] = "Manual";
    ExposureMode["Auto"] = "Auto";
})(ExposureMode || (ExposureMode = {}));
export class ExposureController {
    mode = ExposureMode.Manual;
    /**
     * EV100 exposure değeri
     */
    exposure = 0.0;
    /**
     * Otomatik exposure hedefi
     */
    targetExposure = 0.0;
    minExposure = -10;
    maxExposure = 10;
    /**
     * Eye adaptation hızı
     */
    adaptationSpeed = 2.0;
    /**
     * Ortalama sahne luminance
     */
    averageLuminance = 1.0;
    initialized = false;
    constructor(options = {}) {
        if (options.exposure !== undefined) {
            this.exposure =
                options.exposure;
        }
        if (options.autoExposure) {
            this.mode =
                ExposureMode.Auto;
        }
        if (options.minExposure !== undefined) {
            this.minExposure =
                options.minExposure;
        }
        if (options.maxExposure !== undefined) {
            this.maxExposure =
                options.maxExposure;
        }
        if (options.adaptationSpeed !== undefined) {
            this.adaptationSpeed =
                options.adaptationSpeed;
        }
    }
    initialize() {
        this.initialized = true;
    }
    update(deltaTime) {
        if (this.mode !==
            ExposureMode.Auto) {
            return;
        }
        const difference = this.targetExposure -
            this.exposure;
        this.exposure +=
            difference *
                Math.min(1, deltaTime *
                    this.adaptationSpeed);
        this.exposure =
            Math.max(this.minExposure, Math.min(this.maxExposure, this.exposure));
    }
    setExposure(value) {
        this.mode =
            ExposureMode.Manual;
        this.exposure =
            Math.max(this.minExposure, Math.min(this.maxExposure, value));
    }
    enableAutoExposure() {
        this.mode =
            ExposureMode.Auto;
    }
    disableAutoExposure() {
        this.mode =
            ExposureMode.Manual;
    }
    setAverageLuminance(luminance) {
        this.averageLuminance =
            Math.max(0.0001, luminance);
        /**
         * Basit EV hesabı
         *
         * Gerçek sistemde:
         * histogram + percentile kullanılır
         */
        this.targetExposure =
            -Math.log2(this.averageLuminance);
    }
    getExposure() {
        return this.exposure;
    }
    getExposureMultiplier() {
        /**
         * HDR shader çarpanı
         *
         * 2^EV
         */
        return Math.pow(2, this.exposure);
    }
    setLimits(min, max) {
        this.minExposure =
            min;
        this.maxExposure =
            max;
    }
    bind(shader) {
        if (!shader) {
            return;
        }
        shader.setUniform("exposure", this.getExposureMultiplier());
    }
    reset() {
        this.exposure = 0;
        this.targetExposure = 0;
        this.averageLuminance = 1;
    }
    debugInfo() {
        return {
            mode: this.mode,
            exposure: this.exposure,
            target: this.targetExposure,
            luminance: this.averageLuminance
        };
    }
    toJSON() {
        return {
            mode: this.mode,
            exposure: this.exposure,
            minExposure: this.minExposure,
            maxExposure: this.maxExposure,
            adaptationSpeed: this.adaptationSpeed
        };
    }
}
//# sourceMappingURL=ExposureController.js.map