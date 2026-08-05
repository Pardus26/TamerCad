import { FrameBuffer } from "./FrameBuffer";
export var DepthPrepassAttachment;
(function (DepthPrepassAttachment) {
    DepthPrepassAttachment["Depth"] = "depth";
    DepthPrepassAttachment["Normal"] = "normal";
})(DepthPrepassAttachment || (DepthPrepassAttachment = {}));
export class DepthPrepass extends FrameBuffer {
    enabled = true;
    generateNormal = false;
    rendered = false;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: DepthPrepass.createAttachments(options)
        });
        if (options.generateNormal !== undefined) {
            this.generateNormal =
                options.generateNormal;
        }
    }
    static createAttachments(options) {
        const attachments = [
            {
                name: DepthPrepassAttachment.Depth,
                type: "DepthTexture",
                format: options.depthFormat ??
                    "DEPTH32F",
                texture: null
            }
        ];
        if (options.generateNormal) {
            attachments.push({
                name: DepthPrepassAttachment.Normal,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            });
        }
        return attachments;
    }
    getDepthTexture() {
        return this.getTexture(DepthPrepassAttachment.Depth);
    }
    getNormalTexture() {
        return this.getTexture(DepthPrepassAttachment.Normal);
    }
    begin() {
        this.rendered = false;
    }
    end() {
        this.rendered = true;
    }
    isReady() {
        return this.rendered;
    }
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        this.rendered = false;
    }
    resize(width, height) {
        super.resize(width, height);
    }
    debugInfo() {
        return {
            type: "DepthPrepass",
            enabled: this.enabled,
            generated: this.rendered,
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=DepthPrepass.js.map