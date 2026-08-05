export class FrameBuffer {
    width = 1;
    height = 1;
    samples = 1;
    framebuffer = null;
    attachments = new Map();
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
        if (options.attachments) {
            for (const attachment of options.attachments) {
                this.addAttachment(attachment);
            }
        }
    }
    initialize(context) {
        if (this.initialized) {
            return;
        }
        /**
         * GPU framebuffer
         */
        this.framebuffer = {
            type: "Framebuffer",
            width: this.width,
            height: this.height,
            samples: this.samples
        };
        for (const [name, attachment] of this.attachments) {
            attachment.texture = {
                type: attachment.type,
                format: attachment.format,
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
    addAttachment(attachment) {
        this.attachments.set(attachment.name, attachment);
    }
    removeAttachment(name) {
        this.attachments.delete(name);
    }
    getAttachment(name) {
        return this.attachments.get(name);
    }
    getTexture(name) {
        return this.attachments.get(name)?.texture;
    }
    getAttachments() {
        return Array.from(this.attachments.values());
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
    clear(context) {
        if (context &&
            context.clear) {
            context.clear();
        }
    }
    dispose() {
        this.framebuffer = null;
        for (const attachment of this.attachments.values()) {
            attachment.texture =
                null;
        }
        this.initialized = false;
    }
    isInitialized() {
        return this.initialized;
    }
    toJSON() {
        return {
            width: this.width,
            height: this.height,
            samples: this.samples,
            attachments: this.getAttachments().map(a => ({
                name: a.name,
                type: a.type,
                format: a.format
            }))
        };
    }
}
//# sourceMappingURL=FrameBuffer.js.map