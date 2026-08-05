import { PostProcess, PostProcessType } from "./PostProcess";
export class DepthOfField extends PostProcess {
    /**
     * Kamera odak mesafesi
     */
    focusDistance = 10;
    /**
     * Net alan genişliği
     */
    focusRange = 5;
    /**
     * Lens açıklığı
     *
     * Büyük değer:
     * daha fazla bulanıklık
     */
    aperture = 0.025;
    /**
     * Maksimum blur miktarı
     */
    maxBlur = 1.0;
    depthTexture = null;
    constructor(options = {}) {
        super({
            type: PostProcessType.None,
            enabled: options.enabled
        });
        if (options.focusDistance !== undefined) {
            this.focusDistance =
                options.focusDistance;
        }
        if (options.focusRange !== undefined) {
            this.focusRange =
                options.focusRange;
        }
        if (options.aperture !== undefined) {
            this.aperture =
                options.aperture;
        }
        if (options.maxBlur !== undefined) {
            this.maxBlur =
                options.maxBlur;
        }
    }
    setDepthTexture(texture) {
        this.depthTexture =
            texture;
    }
    getDepthTexture() {
        return this.depthTexture;
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("dofFocusDistance", this.focusDistance);
            shader.setUniform("dofFocusRange", this.focusRange);
            shader.setUniform("dofAperture", this.aperture);
            shader.setUniform("dofMaxBlur", this.maxBlur);
            shader.setUniform("dofDepthTexture", this.depthTexture);
        }
        return super.process(context);
    }
    setFocusDistance(value) {
        this.focusDistance =
            Math.max(0, value);
    }
    setFocusRange(value) {
        this.focusRange =
            Math.max(0, value);
    }
    setAperture(value) {
        this.aperture =
            Math.max(0, value);
    }
    setMaxBlur(value) {
        this.maxBlur =
            Math.max(0, value);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            focusDistance: this.focusDistance,
            focusRange: this.focusRange,
            aperture: this.aperture,
            maxBlur: this.maxBlur
        };
    }
}
//# sourceMappingURL=DepthOfField.js.map