import { PostProcess, PostProcessType } from "./PostProcess";
export var AntiAliasingMode;
(function (AntiAliasingMode) {
    AntiAliasingMode["None"] = "None";
    AntiAliasingMode["FXAA"] = "FXAA";
    AntiAliasingMode["SMAA"] = "SMAA";
    AntiAliasingMode["TAA"] = "TAA";
})(AntiAliasingMode || (AntiAliasingMode = {}));
export class AntiAliasing extends PostProcess {
    mode = AntiAliasingMode.FXAA;
    /**
     * Kalite seviyesi
     */
    quality = 2;
    /**
     * Temporal jitter aktif mi?
     */
    jitter = true;
    /**
     * TAA sample sayısı
     */
    samples = 8;
    historyTexture = null;
    jitterIndex = 0;
    constructor(options = {}) {
        super({
            type: PostProcessType.FXAA,
            enabled: options.enabled
        });
        if (options.mode) {
            this.mode =
                options.mode;
        }
        if (options.quality !== undefined) {
            this.quality =
                options.quality;
        }
        if (options.jitter !== undefined) {
            this.jitter =
                options.jitter;
        }
        if (options.samples !== undefined) {
            this.samples =
                options.samples;
        }
    }
    initialize(context) {
        super.initialize(context);
        this.createHistoryBuffer();
    }
    createHistoryBuffer() {
        /**
         * Temporal AA için
         * önceki frame saklama
         */
        this.historyTexture = {
            type: "AAHistoryTexture"
        };
    }
    process(context) {
        if (!this.enabled ||
            this.mode ===
                AntiAliasingMode.None) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("aaMode", this.getModeValue());
            shader.setUniform("aaQuality", this.quality);
            shader.setUniform("aaSamples", this.samples);
            shader.setUniform("aaJitter", this.jitter);
            shader.setUniform("aaHistoryTexture", this.historyTexture);
        }
        this.updateJitter();
        return super.process(context);
    }
    updateJitter() {
        if (!this.jitter) {
            return;
        }
        /**
         * Halton sequence benzeri
         * subpixel offset
         */
        this.jitterIndex++;
        if (this.jitterIndex >=
            this.samples) {
            this.jitterIndex =
                0;
        }
    }
    getModeValue() {
        switch (this.mode) {
            case AntiAliasingMode.FXAA:
                return 1;
            case AntiAliasingMode.SMAA:
                return 2;
            case AntiAliasingMode.TAA:
                return 3;
            default:
                return 0;
        }
    }
    setMode(mode) {
        this.mode =
            mode;
    }
    setQuality(value) {
        this.quality =
            Math.max(1, Math.min(3, value));
    }
    setSamples(value) {
        this.samples =
            Math.max(2, Math.min(64, value));
    }
    setJitter(value) {
        this.jitter =
            value;
    }
    getHistoryTexture() {
        return this.historyTexture;
    }
    reset() {
        this.mode =
            AntiAliasingMode.FXAA;
        this.quality = 2;
        this.samples = 8;
        this.jitter = true;
        this.jitterIndex = 0;
    }
    dispose() {
        super.dispose();
        this.historyTexture = null;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            mode: this.mode,
            quality: this.quality,
            jitter: this.jitter,
            samples: this.samples
        };
    }
}
//# sourceMappingURL=AntiAliasing.js.map