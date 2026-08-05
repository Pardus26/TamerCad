import { PostProcess, PostProcessType } from "./PostProcess";
export class Outline extends PostProcess {
    /**
     * CAD seçim rengi
     */
    color = {
        r: 1,
        g: 0.65,
        b: 0.1,
        a: 1
    };
    /**
     * Kenar piksel kalınlığı
     */
    thickness = 2;
    /**
     * Highlight kuvveti
     */
    intensity = 1;
    /**
     * Object ID / selection mask
     */
    maskTexture = null;
    /**
     * Depth edge detection
     */
    depthTexture = null;
    constructor(options = {}) {
        super({
            type: PostProcessType.None,
            enabled: options.enabled
        });
        if (options.color) {
            this.color = {
                ...this.color,
                ...options.color
            };
        }
        if (options.thickness !== undefined) {
            this.setThickness(options.thickness);
        }
        if (options.intensity !== undefined) {
            this.setIntensity(options.intensity);
        }
    }
    setMaskTexture(texture) {
        this.maskTexture =
            texture;
    }
    setDepthTexture(texture) {
        this.depthTexture =
            texture;
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        const shader = this.getShader();
        if (shader) {
            shader.setUniform("outlineColor", this.color);
            shader.setUniform("outlineThickness", this.thickness);
            shader.setUniform("outlineIntensity", this.intensity);
            shader.setUniform("outlineMaskTexture", this.maskTexture);
            shader.setUniform("outlineDepthTexture", this.depthTexture);
        }
        return super.process(context);
    }
    setColor(color) {
        this.color = {
            ...this.color,
            ...color
        };
    }
    setThickness(value) {
        this.thickness =
            Math.max(1, Math.min(10, value));
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, Math.min(5, value));
    }
    reset() {
        this.color = {
            r: 1,
            g: 0.65,
            b: 0.1,
            a: 1
        };
        this.thickness = 2;
        this.intensity = 1;
    }
    getSettings() {
        return {
            color: this.color,
            thickness: this.thickness,
            intensity: this.intensity,
            enabled: this.enabled
        };
    }
    toJSON() {
        return {
            ...super.toJSON(),
            color: this.color,
            thickness: this.thickness,
            intensity: this.intensity
        };
    }
}
//# sourceMappingURL=Outline.js.map