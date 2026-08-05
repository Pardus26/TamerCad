import { PostProcess, PostProcessType } from "./PostProcess";
export class FXAA extends PostProcess {
    /**
     * FXAA kalite seviyesi
     *
     * 1 = hızlı
     * 2 = standart
     * 3 = yüksek kalite
     */
    quality = 2;
    /**
     * Alt piksel düzeltme miktarı
     */
    subpixelQuality = 0.75;
    constructor(options = {}) {
        super({
            type: PostProcessType.FXAA,
            enabled: options.enabled
        });
        if (options.quality !== undefined) {
            this.quality =
                options.quality;
        }
        if (options.subpixelQuality !== undefined) {
            this.subpixelQuality =
                options.subpixelQuality;
        }
    }
    setShader(shader) {
        super.setShader(shader);
    }
    initialize(context) {
        super.initialize(context);
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("fxaaQuality", this.quality);
            shader.setUniform("fxaaSubpixelQuality", this.subpixelQuality);
            shader.setUniform("fxaaResolution", {
                width: 1 /
                    (this.inputTexture?.width ?? 1),
                height: 1 /
                    (this.inputTexture?.height ?? 1)
            });
        }
        return super.process(context);
    }
    setQuality(value) {
        this.quality =
            Math.max(1, Math.min(3, value));
    }
    setSubpixelQuality(value) {
        this.subpixelQuality =
            Math.max(0, Math.min(1, value));
    }
    getSettings() {
        return {
            quality: this.quality,
            subpixelQuality: this.subpixelQuality,
            enabled: this.enabled
        };
    }
    toJSON() {
        return {
            ...super.toJSON(),
            quality: this.quality,
            subpixelQuality: this.subpixelQuality
        };
    }
}
//# sourceMappingURL=FXAA.js.map