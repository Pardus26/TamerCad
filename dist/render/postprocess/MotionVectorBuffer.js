import { FrameBuffer } from "./FrameBuffer";
export var MotionVectorAttachment;
(function (MotionVectorAttachment) {
    MotionVectorAttachment["Velocity"] = "velocity";
    MotionVectorAttachment["ObjectVelocity"] = "objectVelocity";
    MotionVectorAttachment["CameraVelocity"] = "cameraVelocity";
})(MotionVectorAttachment || (MotionVectorAttachment = {}));
export class MotionVectorBuffer extends FrameBuffer {
    /**
     * Obje hareket vektörleri dahil mi?
     */
    includeObjectMotion = true;
    /**
     * Frame zaman bilgisi
     */
    currentTime = 0;
    previousTime = 0;
    rendered = false;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: MotionVectorBuffer.createAttachments(options)
        });
        if (options.includeObjectMotion !== undefined) {
            this.includeObjectMotion =
                options.includeObjectMotion;
        }
    }
    static createAttachments(options) {
        const attachments = [
            {
                name: MotionVectorAttachment.Velocity,
                type: "Texture2D",
                format: options.format ??
                    "RG16F",
                texture: null
            }
        ];
        if (options.includeObjectMotion) {
            attachments.push({
                name: MotionVectorAttachment.ObjectVelocity,
                type: "Texture2D",
                format: "RG16F",
                texture: null
            });
            attachments.push({
                name: MotionVectorAttachment.CameraVelocity,
                type: "Texture2D",
                format: "RG16F",
                texture: null
            });
        }
        return attachments;
    }
    getVelocityTexture() {
        return this.getTexture(MotionVectorAttachment.Velocity);
    }
    getObjectVelocityTexture() {
        return this.getTexture(MotionVectorAttachment.ObjectVelocity);
    }
    getCameraVelocityTexture() {
        return this.getTexture(MotionVectorAttachment.CameraVelocity);
    }
    beginFrame(time) {
        this.previousTime =
            this.currentTime;
        this.currentTime =
            time;
        this.rendered = false;
    }
    endFrame() {
        this.rendered = true;
    }
    calculateScreenVelocity(currentPosition, previousPosition) {
        return {
            x: currentPosition.x -
                previousPosition.x,
            y: currentPosition.y -
                previousPosition.y
        };
    }
    calculateObjectMotion(currentMatrix, previousMatrix) {
        /**
         * Skinned mesh,
         * animation,
         * deformasyon
         */
        return {
            current: currentMatrix,
            previous: previousMatrix
        };
    }
    reset() {
        this.currentTime = 0;
        this.previousTime = 0;
        this.rendered = false;
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
            type: "MotionVectorBuffer",
            size: {
                width: this.width,
                height: this.height
            },
            objectMotion: this.includeObjectMotion,
            rendered: this.rendered,
            attachments: this.getAttachments()
                .map(a => a.name)
        };
    }
}
//# sourceMappingURL=MotionVectorBuffer.js.map