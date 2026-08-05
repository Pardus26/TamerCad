import { FrameBuffer } from "./FrameBuffer";
export var GBufferAttachmentType;
(function (GBufferAttachmentType) {
    GBufferAttachmentType["Position"] = "position";
    GBufferAttachmentType["Normal"] = "normal";
    GBufferAttachmentType["Albedo"] = "albedo";
    GBufferAttachmentType["Material"] = "material";
    GBufferAttachmentType["Emissive"] = "emissive";
    GBufferAttachmentType["Depth"] = "depth";
})(GBufferAttachmentType || (GBufferAttachmentType = {}));
export class GBuffer extends FrameBuffer {
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            samples: options.samples,
            attachments: GBuffer.createAttachments()
        });
    }
    static createAttachments() {
        return [
            {
                name: GBufferAttachmentType.Position,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            },
            {
                name: GBufferAttachmentType.Normal,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            },
            {
                name: GBufferAttachmentType.Albedo,
                type: "Texture2D",
                format: "RGBA8",
                texture: null
            },
            {
                name: GBufferAttachmentType.Material,
                type: "Texture2D",
                format: "RGBA8",
                texture: null
            },
            {
                name: GBufferAttachmentType.Emissive,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            },
            {
                name: GBufferAttachmentType.Depth,
                type: "DepthTexture",
                format: "DEPTH24",
                texture: null
            }
        ];
    }
    getPositionTexture() {
        return this.getTexture(GBufferAttachmentType.Position);
    }
    getNormalTexture() {
        return this.getTexture(GBufferAttachmentType.Normal);
    }
    getAlbedoTexture() {
        return this.getTexture(GBufferAttachmentType.Albedo);
    }
    getMaterialTexture() {
        return this.getTexture(GBufferAttachmentType.Material);
    }
    getEmissiveTexture() {
        return this.getTexture(GBufferAttachmentType.Emissive);
    }
    getDepthTexture() {
        return this.getTexture(GBufferAttachmentType.Depth);
    }
    clearAttachments() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
    }
    resize(width, height) {
        super.resize(width, height);
    }
    debugInfo() {
        return {
            size: {
                width: this.width,
                height: this.height
            },
            attachments: this.getAttachments().map(a => a.name)
        };
    }
}
//# sourceMappingURL=GBuffer.js.map