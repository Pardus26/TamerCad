import { FrameBuffer } from "./FrameBuffer";
export var HistoryBufferAttachment;
(function (HistoryBufferAttachment) {
    HistoryBufferAttachment["Color"] = "historyColor";
    HistoryBufferAttachment["Depth"] = "historyDepth";
    HistoryBufferAttachment["Velocity"] = "historyVelocity";
})(HistoryBufferAttachment || (HistoryBufferAttachment = {}));
export class HistoryBuffer extends FrameBuffer {
    /**
     * Kaç frame tutulduğu
     */
    frameIndex = 0;
    /**
     * Önceki view-projection matrisi
     */
    previousMatrix = null;
    /**
     * Önceki kamera pozisyonu
     */
    previousCameraPosition = null;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: HistoryBuffer.createAttachments(options)
        });
    }
    static createAttachments(options) {
        return [
            {
                name: HistoryBufferAttachment.Color,
                type: "Texture2D",
                format: options.colorFormat ??
                    "RGBA16F",
                texture: null
            },
            {
                name: HistoryBufferAttachment.Depth,
                type: "DepthTexture",
                format: options.depthFormat ??
                    "DEPTH24",
                texture: null
            },
            {
                name: HistoryBufferAttachment.Velocity,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            }
        ];
    }
    getColorTexture() {
        return this.getTexture(HistoryBufferAttachment.Color);
    }
    getDepthTexture() {
        return this.getTexture(HistoryBufferAttachment.Depth);
    }
    getVelocityTexture() {
        return this.getTexture(HistoryBufferAttachment.Velocity);
    }
    updateMatrix(matrix) {
        this.previousMatrix =
            matrix;
    }
    updateCameraPosition(position) {
        this.previousCameraPosition =
            position;
    }
    advanceFrame() {
        this.frameIndex++;
    }
    resetFrame() {
        this.frameIndex =
            0;
        this.previousMatrix =
            null;
        this.previousCameraPosition =
            null;
    }
    swap(other) {
        const currentAttachments = this.getAttachments();
        const otherAttachments = other.getAttachments();
        for (let i = 0; i < currentAttachments.length; i++) {
            const temp = currentAttachments[i].texture;
            currentAttachments[i].texture =
                otherAttachments[i].texture;
            otherAttachments[i].texture =
                temp;
        }
    }
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        this.resetFrame();
    }
    resize(width, height) {
        super.resize(width, height);
    }
    debugInfo() {
        return {
            type: "HistoryBuffer",
            frameIndex: this.frameIndex,
            size: {
                width: this.width,
                height: this.height
            },
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=HistoryBuffer.js.map