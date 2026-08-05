import { PostProcess, PostProcessType } from "./PostProcess";
export class MotionBlur extends PostProcess {
    /**
     * Bulanıklık yoğunluğu
     */
    intensity = 0.5;
    /**
     * Motion sample sayısı
     *
     * Kalite arttıkça maliyet artar
     */
    samples = 8;
    /**
     * Velocity etkisi
     */
    velocityScale = 1.0;
    velocityTexture = null;
    previousViewProjection = null;
    constructor(options = {}) {
        super({
            type: PostProcessType.None,
            enabled: options.enabled
        });
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
        if (options.samples !== undefined) {
            this.samples =
                options.samples;
        }
        if (options.velocityScale !== undefined) {
            this.velocityScale =
                options.velocityScale;
        }
    }
    initialize(context) {
        super.initialize(context);
        this.createVelocityBuffer();
    }
    createVelocityBuffer() {
        /**
         * Hareket vektörleri buffer
         *
         * Velocity pass sonucu
         */
        this.velocityTexture = {
            type: "VelocityTexture"
        };
    }
    setVelocityTexture(texture) {
        this.velocityTexture =
            texture;
    }
    getVelocityTexture() {
        return this.velocityTexture;
    }
    setPreviousMatrix(matrix) {
        this.previousViewProjection =
            matrix;
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("motionBlurIntensity", this.intensity);
            shader.setUniform("motionBlurSamples", this.samples);
            shader.setUniform("motionBlurVelocityScale", this.velocityScale);
            shader.setUniform("velocityTexture", this.velocityTexture);
            shader.setUniform("previousViewProjection", this.previousViewProjection);
        }
        return super.process(context);
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, value);
    }
    setSamples(value) {
        this.samples =
            Math.max(2, Math.min(32, value));
    }
    setVelocityScale(value) {
        this.velocityScale =
            Math.max(0, value);
    }
    reset() {
        this.intensity =
            0.5;
        this.samples =
            8;
        this.velocityScale =
            1.0;
    }
    getSettings() {
        return {
            intensity: this.intensity,
            samples: this.samples,
            velocityScale: this.velocityScale,
            enabled: this.enabled
        };
    }
    toJSON() {
        return {
            ...super.toJSON(),
            intensity: this.intensity,
            samples: this.samples,
            velocityScale: this.velocityScale
        };
    }
}
//# sourceMappingURL=MotionBlur.js.map