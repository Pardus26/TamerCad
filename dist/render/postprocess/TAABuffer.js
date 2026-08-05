import { FrameBuffer } from "./FrameBuffer";
export var TAAAttachment;
(function (TAAAttachment) {
    TAAAttachment["Accumulation"] = "accumulation";
    TAAAttachment["Resolve"] = "resolve";
    TAAAttachment["History"] = "history";
    TAAAttachment["Moments"] = "moments";
})(TAAAttachment || (TAAAttachment = {}));
export class TAABuffer extends FrameBuffer {
    /**
     * Ping-pong history index
     */
    historyIndex = 0;
    /**
     * Temporal frame sayısı
     */
    frameCount = 0;
    historyTextures = [];
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: TAABuffer.createAttachments(options)
        });
    }
    static createAttachments(options) {
        return [
            {
                name: TAAAttachment.Accumulation,
                type: "Texture2D",
                format: options.format ??
                    "RGBA16F",
                texture: null
            },
            {
                name: TAAAttachment.Resolve,
                type: "Texture2D",
                format: options.format ??
                    "RGBA16F",
                texture: null
            },
            {
                name: TAAAttachment.History,
                type: "Texture2D",
                format: options.format ??
                    "RGBA16F",
                texture: null
            },
            {
                name: TAAAttachment.Moments,
                type: "Texture2D",
                format: "RG16F",
                texture: null
            }
        ];
    }
    initialize(context) {
        super.initialize(context);
        this.createHistoryBuffers();
    }
    createHistoryBuffers() {
        this.historyTextures = [
            {
                index: 0,
                texture: null
            },
            {
                index: 1,
                texture: null
            }
        ];
    }
    getAccumulationTexture() {
        return this.getTexture(TAAAttachment.Accumulation);
    }
    getResolveTexture() {
        return this.getTexture(TAAAttachment.Resolve);
    }
    getHistoryTexture() {
        return this.historyTextures[this.historyIndex];
    }
    getPreviousHistoryTexture() {
        return this.historyTextures[1 -
            this.historyIndex];
    }
    getMomentsTexture() {
        return this.getTexture(TAAAttachment.Moments);
    }
    swapHistory() {
        this.historyIndex =
            1 -
                this.historyIndex;
        this.frameCount++;
    }
    resetHistory() {
        this.historyIndex =
            0;
        this.frameCount =
            0;
        for (const history of this.historyTextures) {
            history.texture =
                null;
        }
    }
    resize(width, height) {
        super.resize(width, height);
        this.resetHistory();
    }
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        this.resetHistory();
    }
    debugInfo() {
        return {
            type: "TAABuffer",
            historyIndex: this.historyIndex,
            frameCount: this.frameCount,
            size: {
                width: this.width,
                height: this.height
            },
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=TAABuffer.js.map