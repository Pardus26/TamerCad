export var LUTFormat;
(function (LUTFormat) {
    LUTFormat["RGB8"] = "RGB8";
    LUTFormat["RGB16F"] = "RGB16F";
    LUTFormat["RGBA16F"] = "RGBA16F";
})(LUTFormat || (LUTFormat = {}));
export class ColorGradingLUT {
    /**
     * LUT çözünürlüğü
     *
     * Yaygın:
     * 16x16x16
     * 32x32x32
     * 64x64x64
     */
    size = 32;
    /**
     * LUT uygulanma oranı
     */
    intensity = 1.0;
    enabled = true;
    format = LUTFormat.RGB16F;
    texture = null;
    data = null;
    constructor(options = {}) {
        if (options.size !== undefined) {
            this.size =
                options.size;
        }
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
        this.createEmptyLUT();
    }
    createEmptyLUT() {
        const count = this.size *
            this.size *
            this.size *
            3;
        this.data =
            new Float32Array(count);
        /**
         * Identity LUT
         *
         * renkleri değiştirmez
         */
        let index = 0;
        for (let b = 0; b < this.size; b++) {
            for (let g = 0; g < this.size; g++) {
                for (let r = 0; r < this.size; r++) {
                    this.data[index++] =
                        r /
                            (this.size - 1);
                    this.data[index++] =
                        g /
                            (this.size - 1);
                    this.data[index++] =
                        b /
                            (this.size - 1);
                }
            }
        }
    }
    upload(context) {
        /**
         * GPU 3D texture upload
         */
        this.texture = {
            type: "3DLUT",
            size: this.size,
            format: this.format
        };
    }
    load(lutData) {
        this.data =
            lutData;
    }
    getTexture() {
        return this.texture;
    }
    getData() {
        return this.data;
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, Math.min(1, value));
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    applyColorTransform(color) {
        if (!this.enabled ||
            !this.data) {
            return color;
        }
        /**
         * CPU fallback
         *
         * Gerçek uygulamada shader LUT lookup yapar
         */
        return {
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a
        };
    }
    reset() {
        this.intensity = 1;
        this.enabled = true;
        this.createEmptyLUT();
    }
    dispose() {
        this.texture = null;
        this.data = null;
    }
    toJSON() {
        return {
            size: this.size,
            intensity: this.intensity,
            enabled: this.enabled,
            format: this.format
        };
    }
}
//# sourceMappingURL=ColorGradingLUT.js.map