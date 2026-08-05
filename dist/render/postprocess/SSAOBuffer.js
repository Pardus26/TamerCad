import { FrameBuffer } from "./FrameBuffer";
export var SSAOBufferAttachment;
(function (SSAOBufferAttachment) {
    SSAOBufferAttachment["Occlusion"] = "occlusion";
    SSAOBufferAttachment["Blur"] = "blur";
})(SSAOBufferAttachment || (SSAOBufferAttachment = {}));
export class SSAOBuffer extends FrameBuffer {
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: SSAOBuffer.createAttachments()
        });
    }
    static createAttachments() {
        return [
            {
                name: SSAOBufferAttachment.Occlusion,
                type: "Texture2D",
                format: "R8",
                texture: null
            },
            {
                name: SSAOBufferAttachment.Blur,
                type: "Texture2D",
                format: "R8",
                texture: null
            }
        ];
    }
    getOcclusionTexture() {
        return this.getTexture(SSAOBufferAttachment.Occlusion);
    }
    getBlurTexture() {
        return this.getTexture(SSAOBufferAttachment.Blur);
    }
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
    }
    debugInfo() {
        return {
            type: "SSAOBuffer",
            width: this.width,
            height: this.height,
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=SSAOBuffer.js.map