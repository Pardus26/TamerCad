export class RenderTarget {
    width = 1;
    height = 1;
    /**
     * MSAA sample sayısı
     */
    samples = 1;
    colorFormat = "RGBA8";
    depthFormat = "DEPTH24";
    useDepth = true;
    framebuffer = null;
    colorTexture = null;
    depthTexture = null;
    initialized = false;
    constructor(options = {}) {
        if (options.width !== undefined) {
            this.width =
                options.width;
        }
        if (options.height !== undefined) {
            this.height =
                options.height;
        }
        if (options.samples !== undefined) {
            this.samples =
                options.samples;
        }
        if (options.colorFormat) {
            this.colorFormat =
                options.colorFormat;
        }
        if (options.depthFormat) {
            this.depthFormat =
                options.depthFormat;
        }
        if (options.useDepth !== undefined) {
            this.useDepth =
                options.useDepth;
        }
    }
    initialize(context) {
        if (this.initialized) {
            return;
        }
        /**
         * GPU framebuffer oluşturma
         */
        this.framebuffer = {
            type: "Framebuffer",
            width: this.width,
            height: this.height
        };
        this.colorTexture = {
            type: "ColorTexture",
            format: this.colorFormat,
            width: this.width,
            height: this.height
        };
        if (this.useDepth) {
            this.depthTexture = {
                type: "DepthTexture",
                format: this.depthFormat,
                width: this.width,
                height: this.height
            };
        }
        this.initialized = true;
    }
    bind(context) {
        if (!this.initialized) {
            this.initialize(context);
        }
        /**
         * Render işlemlerini
         * bu hedefe yönlendirir.
         */
        if (context &&
            context.bindFramebuffer) {
            context.bindFramebuffer(this.framebuffer);
        }
    }
    unbind(context) {
        if (context &&
            context.bindFramebuffer) {
            context.bindFramebuffer(null);
        }
    }
    resize(width, height) {
        this.width =
            width;
        this.height =
            height;
        if (this.initialized) {
            this.dispose();
            this.initialized = false;
        }
    }
    getColorTexture() {
        return this.colorTexture;
    }
    getDepthTexture() {
        return this.depthTexture;
    }
    getFramebuffer() {
        return this.framebuffer;
    }
    setSamples(samples) {
        this.samples =
            Math.max(1, samples);
    }
    getSize() {
        return {
            width: this.width,
            height: this.height
        };
    }
    clear(context) {
        if (!context) {
            return;
        }
        /**
         * Color + depth buffer temizleme
         */
        if (context.clear) {
            context.clear();
        }
    }
    dispose() {
        this.framebuffer = null;
        this.colorTexture = null;
        this.depthTexture = null;
        this.initialized = false;
    }
    toJSON() {
        return {
            width: this.width,
            height: this.height,
            samples: this.samples,
            colorFormat: this.colorFormat,
            depthFormat: this.depthFormat,
            useDepth: this.useDepth
        };
    }
    static fromJSON(data) {
        return new RenderTarget({
            width: data.width,
            height: data.height,
            samples: data.samples,
            colorFormat: data.colorFormat,
            depthFormat: data.depthFormat,
            useDepth: data.useDepth
        });
    }
}
//# sourceMappingURL=RenderTarget.js.map