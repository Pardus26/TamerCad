import { FrameBuffer } from "./FrameBuffer";
export var VelocityAttachment;
(function (VelocityAttachment) {
    VelocityAttachment["Velocity"] = "velocity";
})(VelocityAttachment || (VelocityAttachment = {}));
export class VelocityBuffer extends FrameBuffer {
    currentViewProjection = null;
    previousViewProjection = null;
    currentCameraPosition = null;
    previousCameraPosition = null;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: VelocityBuffer.createAttachments(options)
        });
    }
    static createAttachments(options) {
        return [
            {
                name: VelocityAttachment.Velocity,
                type: "Texture2D",
                format: options.format ??
                    "RGBA16F",
                texture: null
            }
        ];
    }
    getVelocityTexture() {
        return this.getTexture(VelocityAttachment.Velocity);
    }
    updateMatrices(current, previous) {
        this.currentViewProjection =
            current;
        this.previousViewProjection =
            previous;
    }
    updateCameraPositions(current, previous) {
        this.currentCameraPosition =
            current;
        this.previousCameraPosition =
            previous;
    }
    calculateVelocity(currentPosition, previousPosition) {
        /**
         * Dünya uzayındaki hareket
         *
         * gerçek shader tarafında
         * reprojection için kullanılır
         */
        return {
            x: currentPosition.x -
                previousPosition.x,
            y: currentPosition.y -
                previousPosition.y,
            z: currentPosition.z -
                previousPosition.z
        };
    }
    reset() {
        this.currentViewProjection =
            null;
        this.previousViewProjection =
            null;
        this.currentCameraPosition =
            null;
        this.previousCameraPosition =
            null;
    }
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        this.reset();
    }
    resize(width, height) {
        super.resize(width, height);
    }
    debugInfo() {
        return {
            type: "VelocityBuffer",
            size: {
                width: this.width,
                height: this.height
            },
            attachment: VelocityAttachment.Velocity
        };
    }
}
//# sourceMappingURL=VelocityBuffer.js.map