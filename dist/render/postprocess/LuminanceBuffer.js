import { FrameBuffer } from "./FrameBuffer";
export var LuminanceAttachment;
(function (LuminanceAttachment) {
    LuminanceAttachment["Luminance"] = "luminance";
    LuminanceAttachment["Downsample"] = "downsample";
})(LuminanceAttachment || (LuminanceAttachment = {}));
export class LuminanceBuffer extends FrameBuffer {
    /**
     * Downsample pyramid seviyesi
     *
     * Auto exposure için kullanılır
     */
    levels = 6;
    mipChain = [];
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: LuminanceBuffer.createAttachments(options)
        });
        if (options.levels !== undefined) {
            this.levels =
                Math.max(1, Math.min(10, options.levels));
        }
    }
    static createAttachments(options) {
        return [
            {
                name: LuminanceAttachment.Luminance,
                type: "Texture2D",
                format: options.format ??
                    "R16F",
                texture: null
            },
            {
                name: LuminanceAttachment.Downsample,
                type: "Texture2D",
                format: "R16F",
                texture: null
            }
        ];
    }
    initialize(context) {
        super.initialize(context);
        this.createMipChain();
    }
    createMipChain() {
        this.mipChain = [];
        let width = this.width;
        let height = this.height;
        for (let i = 0; i < this.levels; i++) {
            this.mipChain.push({
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
    getLuminanceTexture() {
        return this.getTexture(LuminanceAttachment.Luminance);
    }
    getDownsampleTexture() {
        return this.getTexture(LuminanceAttachment.Downsample);
    }
    getMipLevel(level) {
        return this.mipChain[level];
    }
    getMipChain() {
        return this.mipChain;
    }
    calculateAverageLuminance() {
        /**
         * GPU tarafında:
         *
         * mip son seviyesi
         * veya histogram reduction
         *
         * kullanılır.
         */
        return 1.0;
    }
    resize(width, height) {
        super.resize(width, height);
        this.createMipChain();
    }
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        for (const mip of this.mipChain) {
            mip.texture =
                null;
        }
    }
    debugInfo() {
        return {
            type: "LuminanceBuffer",
            levels: this.levels,
            size: {
                width: this.width,
                height: this.height
            },
            mipChain: this.mipChain.map(m => ({
                level: m.level,
                width: m.width,
                height: m.height
            }))
        };
    }
}
//# sourceMappingURL=LuminanceBuffer.js.map