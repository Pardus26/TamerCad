export var VelocityDilateMode;
(function (VelocityDilateMode) {
    VelocityDilateMode["Nearest"] = "Nearest";
    VelocityDilateMode["MaxMagnitude"] = "MaxMagnitude";
    VelocityDilateMode["DepthAware"] = "DepthAware";
})(VelocityDilateMode || (VelocityDilateMode = {}));
export class VelocityDilate {
    enabled = true;
    /**
     * Komşuluk arama yarıçapı
     */
    radius = 1;
    /**
     * Depth fark toleransı
     */
    depthThreshold = 0.01;
    mode = VelocityDilateMode.DepthAware;
    source = null;
    depthTexture = null;
    constructor(options = {}) {
        if (options.radius !== undefined) {
            this.radius =
                options.radius;
        }
        if (options.depthThreshold !== undefined) {
            this.depthThreshold =
                options.depthThreshold;
        }
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
    }
    setVelocitySource(buffer) {
        this.source =
            buffer;
    }
    setDepthTexture(texture) {
        this.depthTexture =
            texture;
    }
    setMode(mode) {
        this.mode =
            mode;
    }
    execute() {
        if (!this.enabled ||
            !this.source) {
            return null;
        }
        /**
         * GPU shader işlemi:
         *
         * Komşu velocity değerleri taranır.
         *
         * En güçlü hareket vektörü seçilir.
         */
        return {
            type: "DilatedVelocity",
            radius: this.radius,
            mode: this.mode
        };
    }
    dilatePixel(center, neighbors) {
        let selected = center;
        let maxLength = 0;
        for (const velocity of neighbors) {
            const length = Math.sqrt(velocity.x *
                velocity.x +
                velocity.y *
                    velocity.y);
            if (length >
                maxLength) {
                maxLength =
                    length;
                selected =
                    velocity;
            }
        }
        return selected;
    }
    reset() {
        this.source =
            null;
        this.depthTexture =
            null;
    }
    debugInfo() {
        return {
            type: "VelocityDilate",
            enabled: this.enabled,
            radius: this.radius,
            mode: this.mode
        };
    }
}
//# sourceMappingURL=VelocityDilate.js.map