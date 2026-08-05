import { PostProcess, PostProcessType } from "./PostProcess";
export class Vignette extends PostProcess {
    /**
     * Kenar kararma yoğunluğu
     */
    intensity = 0.5;
    /**
     * Geçiş yumuşaklığı
     */
    smoothness = 0.5;
    /**
     * Vinyet şekli
     *
     * 0 = oval
     * 1 = dairesel
     */
    roundness = 0.5;
    constructor(options = {}) {
        super({
            type: PostProcessType.None,
            enabled: options.enabled
        });
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
        if (options.smoothness !== undefined) {
            this.smoothness =
                options.smoothness;
        }
        if (options.roundness !== undefined) {
            this.roundness =
                options.roundness;
        }
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("vignetteIntensity", this.intensity);
            shader.setUniform("vignetteSmoothness", this.smoothness);
            shader.setUniform("vignetteRoundness", this.roundness);
        }
        return super.process(context);
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, Math.min(1, value));
    }
    setSmoothness(value) {
        this.smoothness =
            Math.max(0, Math.min(1, value));
    }
    setRoundness(value) {
        this.roundness =
            Math.max(0, Math.min(1, value));
    }
    reset() {
        this.intensity =
            0.5;
        this.smoothness =
            0.5;
        this.roundness =
            0.5;
    }
    getSettings() {
        return {
            intensity: this.intensity,
            smoothness: this.smoothness,
            roundness: this.roundness,
            enabled: this.enabled
        };
    }
    toJSON() {
        return {
            ...super.toJSON(),
            intensity: this.intensity,
            smoothness: this.smoothness,
            roundness: this.roundness
        };
    }
}
//# sourceMappingURL=Vignette.js.map