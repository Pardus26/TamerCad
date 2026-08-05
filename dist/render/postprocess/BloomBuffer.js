import { FrameBuffer } from "./FrameBuffer";
export var BloomBufferAttachment;
(function (BloomBufferAttachment) {
    BloomBufferAttachment["Bright"] = "bright";
})(BloomBufferAttachment || (BloomBufferAttachment = {}));
export class BloomBuffer extends FrameBuffer {
    /**
     * Blur pyramid seviyesi
     */
    levels = 5;
    mipTextures = [];
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: BloomBuffer.createAttachments()
        });
        if (options.levels !== undefined) {
            this.levels =
                Math.max(1, Math.min(8, options.levels));
        }
    }
    static createAttachments() {
        return [
            {
                name: BloomBufferAttachment.Bright,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            }
        ];
    }
    initialize(context) {
        super.initialize(context);
        this.createMipChain();
    }
    createMipChain() {
        this.mipTextures = [];
        let width = this.width;
        let height = this.height;
        for (let i = 0; i < this.levels; i++) {
            this.mipTextures.push({
                level: i,
                width,
                height,
                texture: null
            });
            width =
                Math.max(1, Math.floor(width / 2));
            height =
                Math.max(1, Math.floor(height / 2));
        }
    }
    getBrightTexture() {
        return this.getTexture(BloomBufferAttachment.Bright);
    }
    getMipTexture(level) {
        return this.mipTextures[level];
    }
    getMipChain() {
        return this.mipTextures;
    }
    setLevels(value) {
        this.levels =
            Math.max(1, Math.min(8, value));
        this.createMipChain();
    }
    resize(width, height) {
        super.resize(width, height);
        this.createMipChain();
    }
    clear() {
        const bright = this.getBrightTexture();
        if (bright) {
            bright.texture =
                null;
        }
        for (const mip of this.mipTextures) {
            mip.texture =
                null;
        }
    }
    debugInfo() {
        return {
            type: "BloomBuffer",
            levels: this.levels,
            size: {
                width: this.width,
                height: this.height
            },
            mipChain: this.mipTextures.map(m => ({
                level: m.level,
                width: m.width,
                height: m.height
            }))
        };
    }
}
//# sourceMappingURL=BloomBuffer.js.map