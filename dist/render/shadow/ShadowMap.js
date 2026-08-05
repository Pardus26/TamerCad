export var ShadowMapType;
(function (ShadowMapType) {
    ShadowMapType["Basic"] = "Basic";
    ShadowMapType["PCF"] = "PCF";
    ShadowMapType["VSM"] = "VSM";
})(ShadowMapType || (ShadowMapType = {}));
export class ShadowMap {
    gpuTexture = null;
    depthBuffer = null;
    initialized = false;
    width;
    height;
    type;
    bias = 0.005;
    enabled = true;
    constructor(options = {}) {
        this.width =
            options.width ??
                2048;
        this.height =
            options.height ??
                2048;
        this.type =
            options.type ??
                ShadowMapType.PCF;
        if (options.bias !== undefined) {
            this.bias =
                options.bias;
        }
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
    }
    initialize(context) {
        if (this.initialized) {
            return;
        }
        /**
         * GPU depth texture oluşturma.
         *
         * WebGL:
         *
         * gl.createTexture()
         *
         * gl.texImage2D(
         *    DEPTH_COMPONENT
         * )
         *
         * framebuffer attachment
         *
         */
        if (context.nativeContext) {
            this.gpuTexture = {
                width: this.width,
                height: this.height,
                format: "DEPTH_COMPONENT"
            };
            this.depthBuffer = {
                type: "FramebufferDepth"
            };
        }
        this.initialized = true;
    }
    bind(context) {
        if (!this.initialized) {
            this.initialize(context);
        }
        /**
         * Shadow framebuffer bind.
         *
         * WebGL:
         *
         * gl.bindFramebuffer()
         */
    }
    unbind(context) {
        /**
         * Shadow framebuffer release.
         *
         */
        void context;
    }
    setBias(value) {
        this.bias =
            Math.max(0, value);
    }
    setEnabled(value) {
        this.enabled =
            value;
    }
    isEnabled() {
        return this.enabled;
    }
    getTexture() {
        return this.gpuTexture;
    }
    getSize() {
        return {
            width: this.width,
            height: this.height
        };
    }
    clear() {
        /**
         * Depth buffer temizleme.
         *
         * gl.clear(
         *    DEPTH_BUFFER_BIT
         * )
         */
    }
    dispose() {
        /**
         * GPU kaynak temizleme.
         *
         * gl.deleteTexture()
         * gl.deleteFramebuffer()
         */
        this.gpuTexture = null;
        this.depthBuffer = null;
        this.initialized = false;
    }
    toJSON() {
        return {
            width: this.width,
            height: this.height,
            type: this.type,
            bias: this.bias,
            enabled: this.enabled
        };
    }
    static fromJSON(data) {
        return new ShadowMap({
            width: data.width,
            height: data.height,
            type: data.type,
            bias: data.bias,
            enabled: data.enabled
        });
    }
}
//# sourceMappingURL=ShadowMap.js.map