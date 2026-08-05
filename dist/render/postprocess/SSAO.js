import { PostProcess, PostProcessType } from "./PostProcess";
export class SSAO extends PostProcess {
    /**
     * Occlusion etki yarıçapı
     */
    radius = 0.5;
    /**
     * Karanlık yoğunluğu
     */
    intensity = 1.0;
    /**
     * Self shadow önleme bias değeri
     */
    bias = 0.025;
    /**
     * Sample sayısı
     */
    samples = 16;
    noiseTexture = null;
    kernel = [];
    constructor(options = {}) {
        super({
            type: PostProcessType.SSAO,
            enabled: options.enabled,
            intensity: options.intensity
        });
        if (options.radius !== undefined) {
            this.radius =
                options.radius;
        }
        if (options.bias !== undefined) {
            this.bias =
                options.bias;
        }
        if (options.samples !== undefined) {
            this.samples =
                options.samples;
        }
        this.generateKernel();
    }
    initialize(context) {
        super.initialize(context);
        this.createNoiseTexture();
    }
    generateKernel() {
        this.kernel = [];
        for (let i = 0; i < this.samples; i++) {
            const scale = i /
                this.samples;
            const random = {
                x: Math.random() * 2 - 1,
                y: Math.random() * 2 - 1,
                z: Math.random()
            };
            const factor = 0.1 +
                0.9 *
                    scale *
                    scale;
            this.kernel.push([
                random.x *
                    factor,
                random.y *
                    factor,
                random.z *
                    factor
            ]);
        }
    }
    createNoiseTexture() {
        /**
         * Random rotation noise
         *
         * SSAO örnekleme yönlerini
         * çeşitlendirir.
         */
        this.noiseTexture = {
            type: "NoiseTexture"
        };
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("ssaoRadius", this.radius);
            shader.setUniform("ssaoIntensity", this.intensity);
            shader.setUniform("ssaoBias", this.bias);
            shader.setUniform("ssaoSamples", this.samples);
            shader.setUniform("ssaoKernel", this.kernel);
        }
        return super.process(context);
    }
    setRadius(value) {
        this.radius =
            Math.max(0, value);
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, value);
    }
    setSamples(value) {
        this.samples =
            Math.max(4, Math.min(64, value));
        this.generateKernel();
    }
    getKernel() {
        return this.kernel;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            radius: this.radius,
            intensity: this.intensity,
            bias: this.bias,
            samples: this.samples
        };
    }
}
//# sourceMappingURL=SSAO.js.map