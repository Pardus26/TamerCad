import { FrameBuffer } from "./FrameBuffer";
export var NormalPrepassAttachment;
(function (NormalPrepassAttachment) {
    NormalPrepassAttachment["Normal"] = "normal";
    NormalPrepassAttachment["Depth"] = "depth";
})(NormalPrepassAttachment || (NormalPrepassAttachment = {}));
export class NormalPrepass extends FrameBuffer {
    enabled = true;
    /**
     * View space veya world space normal
     */
    encodeViewSpace = true;
    rendered = false;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: NormalPrepass.createAttachments(options)
        });
        if (options.encodeViewSpace !== undefined) {
            this.encodeViewSpace =
                options.encodeViewSpace;
        }
    }
    static createAttachments(options) {
        return [
            {
                name: NormalPrepassAttachment.Normal,
                type: "Texture2D",
                format: options.format ??
                    "RGBA16F",
                texture: null
            },
            {
                name: NormalPrepassAttachment.Depth,
                type: "DepthTexture",
                format: "DEPTH32F",
                texture: null
            }
        ];
    }
    getNormalTexture() {
        return this.getTexture(NormalPrepassAttachment.Normal);
    }
    getDepthTexture() {
        return this.getTexture(NormalPrepassAttachment.Depth);
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
    encodeNormal(normal) {
        /**
         * GPU tarafında:
         *
         * normal * 0.5 + 0.5
         *
         * ile texture'a yazılır
         */
        return {
            r: normal.x *
                0.5 +
                0.5,
            g: normal.y *
                0.5 +
                0.5,
            b: normal.z *
                0.5 +
                0.5,
            a: 1.0
        };
    }
    decodeNormal(encoded) {
        return {
            x: encoded.r *
                2.0 -
                1.0,
            y: encoded.g *
                2.0 -
                1.0,
            z: encoded.b *
                2.0 -
                1.0
        };
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
            type: "NormalPrepass",
            enabled: this.enabled,
            viewSpace: this.encodeViewSpace,
            rendered: this.rendered,
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=NormalPrepass.js.map