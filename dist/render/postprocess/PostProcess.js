export var PostProcessType;
(function (PostProcessType) {
    PostProcessType["None"] = "None";
    PostProcessType["FXAA"] = "FXAA";
    PostProcessType["SMAA"] = "SMAA";
    PostProcessType["SSAO"] = "SSAO";
    PostProcessType["Bloom"] = "Bloom";
    PostProcessType["ToneMapping"] = "ToneMapping";
})(PostProcessType || (PostProcessType = {}));
export class PostProcess {
    enabled = true;
    intensity = 1.0;
    shader = null;
    inputTexture = null;
    outputTexture = null;
    type;
    initialized = false;
    constructor(options = {}) {
        this.type =
            options.type ??
                PostProcessType.None;
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
    }
    initialize(context) {
        if (this.initialized) {
            return;
        }
        /**
         * Framebuffer texture
         *
         * GPU post processing için
         * render sonucu alınır.
         */
        if (context.nativeContext) {
            this.inputTexture = {
                type: "ColorTexture"
            };
            this.outputTexture = {
                type: "PostProcessTexture"
            };
        }
        this.initialized = true;
    }
    setShader(shader) {
        this.shader =
            shader;
    }
    getShader() {
        return this.shader;
    }
    setInputTexture(texture) {
        this.inputTexture =
            texture;
    }
    getInputTexture() {
        return this.inputTexture;
    }
    getOutputTexture() {
        return this.outputTexture;
    }
    process(context) {
        if (!this.enabled) {
            return this.inputTexture;
        }
        if (!this.initialized) {
            this.initialize(context);
        }
        /**
         * Full screen quad render
         *
         * Shader uygulanır.
         */
        if (this.shader) {
            this.shader.setUniform("postProcessIntensity", this.intensity);
        }
        return this.outputTexture;
    }
    setEnabled(value) {
        this.enabled =
            value;
    }
    isEnabled() {
        return this.enabled;
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, value);
    }
    dispose() {
        /**
         * GPU kaynak temizleme
         */
        this.inputTexture = null;
        this.outputTexture = null;
        this.shader = null;
        this.initialized = false;
    }
    toJSON() {
        return {
            enabled: this.enabled,
            intensity: this.intensity,
            type: this.type
        };
    }
    static fromJSON(data) {
        return new PostProcess({
            enabled: data.enabled,
            intensity: data.intensity,
            type: data.type
        });
    }
}
//# sourceMappingURL=PostProcess.js.map