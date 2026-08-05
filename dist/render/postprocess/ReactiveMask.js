import { FrameBuffer } from "./FrameBuffer";
export var ReactiveMaskAttachment;
(function (ReactiveMaskAttachment) {
    ReactiveMaskAttachment["Mask"] = "mask";
    ReactiveMaskAttachment["MaterialID"] = "materialID";
    ReactiveMaskAttachment["Emissive"] = "emissive";
})(ReactiveMaskAttachment || (ReactiveMaskAttachment = {}));
export class ReactiveMask extends FrameBuffer {
    /**
     * TAA history kabul/red maskesi
     *
     * 0 = history kullanılabilir
     *
     * 1 = history reddedilir
     */
    threshold = 0.5;
    enabled = true;
    rendered = false;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: ReactiveMask.createAttachments(options)
        });
        if (options.threshold !== undefined) {
            this.threshold =
                options.threshold;
        }
    }
    static createAttachments(options) {
        return [
            {
                name: ReactiveMaskAttachment.Mask,
                type: "Texture2D",
                format: options.format ??
                    "R8",
                texture: null
            },
            {
                name: ReactiveMaskAttachment.MaterialID,
                type: "Texture2D",
                format: "R16UI",
                texture: null
            },
            {
                name: ReactiveMaskAttachment.Emissive,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            }
        ];
    }
    getMaskTexture() {
        return this.getTexture(ReactiveMaskAttachment.Mask);
    }
    getMaterialIDTexture() {
        return this.getTexture(ReactiveMaskAttachment.MaterialID);
    }
    getEmissiveTexture() {
        return this.getTexture(ReactiveMaskAttachment.Emissive);
    }
    begin() {
        this.rendered = false;
    }
    end() {
        this.rendered = true;
    }
    setReactivePixel(material) {
        /**
         * History reject kararı
         */
        if (material.transparent ||
            material.emissive ||
            material.animated) {
            return 1.0;
        }
        return 0.0;
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
            type: "ReactiveMask",
            enabled: this.enabled,
            threshold: this.threshold,
            rendered: this.rendered,
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=ReactiveMask.js.map