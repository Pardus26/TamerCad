import { FrameBuffer } from "./FrameBuffer";
export var SSRBufferAttachment;
(function (SSRBufferAttachment) {
    SSRBufferAttachment["Reflection"] = "reflection";
    SSRBufferAttachment["HitDistance"] = "hitDistance";
    SSRBufferAttachment["Confidence"] = "confidence";
    SSRBufferAttachment["RayData"] = "rayData";
    SSRBufferAttachment["Normal"] = "normal";
    SSRBufferAttachment["Roughness"] = "roughness";
    SSRBufferAttachment["HistoryWeight"] = "historyWeight";
    SSRBufferAttachment["Reactive"] = "reactive";
    SSRBufferAttachment["Blur"] = "blur";
})(SSRBufferAttachment || (SSRBufferAttachment = {}));
export class SSRBuffer extends FrameBuffer {
    enabled = true;
    reflectionTexture = null;
    hitData = null;
    rayData = null;
    frameIndex = 0;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: SSRBuffer.createAttachments(options)
        });
        this.enabled =
            options.enabled ??
                this.enabled;
    }
    static createAttachments(options) {
        const colorFormat = options.colorFormat ??
            "RGBA16F";
        const dataFormat = options.dataFormat ??
            "RGBA16F";
        return [
            {
                name: SSRBufferAttachment.Reflection,
                type: "Texture2D",
                format: colorFormat,
                texture: null
            },
            {
                name: SSRBufferAttachment.HitDistance,
                type: "Texture2D",
                format: dataFormat,
                texture: null
            },
            {
                name: SSRBufferAttachment.Confidence,
                type: "Texture2D",
                format: "R16F",
                texture: null
            },
            {
                name: SSRBufferAttachment.RayData,
                type: "Texture2D",
                format: dataFormat,
                texture: null
            },
            {
                name: SSRBufferAttachment.Normal,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            },
            {
                name: SSRBufferAttachment.Roughness,
                type: "Texture2D",
                format: "R8",
                texture: null
            },
            {
                name: SSRBufferAttachment.HistoryWeight,
                type: "Texture2D",
                format: "R16F",
                texture: null
            },
            {
                name: SSRBufferAttachment.Reactive,
                type: "Texture2D",
                format: "R8",
                texture: null
            },
            {
                name: SSRBufferAttachment.Blur,
                type: "Texture2D",
                format: colorFormat,
                texture: null
            }
        ];
    }
    /*
    ========================================
    Texture Accessors
    ========================================
    */
    getReflectionTexture() {
        return this.getTexture(SSRBufferAttachment.Reflection);
    }
    getHitDistanceTexture() {
        return this.getTexture(SSRBufferAttachment.HitDistance);
    }
    getConfidenceTexture() {
        return this.getTexture(SSRBufferAttachment.Confidence);
    }
    getRayDataTexture() {
        return this.getTexture(SSRBufferAttachment.RayData);
    }
    getNormalTexture() {
        return this.getTexture(SSRBufferAttachment.Normal);
    }
    getRoughnessTexture() {
        return this.getTexture(SSRBufferAttachment.Roughness);
    }
    getHistoryWeightTexture() {
        return this.getTexture(SSRBufferAttachment.HistoryWeight);
    }
    getReactiveTexture() {
        return this.getTexture(SSRBufferAttachment.Reactive);
    }
    getBlurTexture() {
        return this.getTexture(SSRBufferAttachment.Blur);
    }
    /*
    ========================================
    Reflection Storage
    ========================================
    */
    setReflectionTexture(texture) {
        this.reflectionTexture =
            texture;
    }
    getStoredReflection() {
        return this.reflectionTexture;
    }
    /*
    ========================================
    Hit Data Management
    ========================================
    */
    setHitData(data) {
        this.hitData = {
            distance: data.distance,
            confidence: Math.max(0, Math.min(1, data.confidence)),
            hit: data.hit
        };
    }
    getHitData() {
        return this.hitData;
    }
    hasHit() {
        return (this.hitData !== null &&
            this.hitData.hit);
    }
    /*
    ========================================
    Ray Data Management
    ========================================
    */
    setRayData(data) {
        this.rayData = {
            origin: data.origin,
            direction: data.direction
        };
    }
    getRayData() {
        return this.rayData;
    }
    /*
    ========================================
    Confidence
    ========================================
    */
    setConfidence(value) {
        const attachment = this.getConfidenceTexture();
        /*
            GPU texture update noktası

        */
    }
    getConfidence() {
        if (!this.hitData) {
            return 0;
        }
        return this.hitData.confidence;
    }
    /*
    ========================================
    Normal Data
    ========================================
    */
    setNormal(normal) {
        /*
            GPU texture update noktası

            Normal buffer:
            xyz -> normal
            w   -> optional data

        */
    }
    getNormal() {
        return this.getNormalTexture();
    }
    /*
    ========================================
    Roughness Data
    ========================================
    */
    setRoughness(value) {
        /*
            Roughness texture update

            0   = smooth
            1   = rough

        */
    }
    getRoughness() {
        return this.getRoughnessTexture();
    }
    /*
    ========================================
    History Weight
    ========================================
    */
    setHistoryWeight(weight) {
        const value = Math.max(0, Math.min(1, weight));
        /*
            Temporal accumulation

            historyWeight texture

            update

        */
    }
    getHistoryWeight() {
        return this.getHistoryWeightTexture();
    }
    /*
    ========================================
    Reactive Mask
    ========================================
    */
    setReactive(value) {
        const reactive = Math.max(0, Math.min(1, value));
        /*
            Dynamic object mask

            0 = stable

            1 = reject history

        */
    }
    getReactive() {
        return this.getReactiveTexture();
    }
    /*
    ========================================
    Temporal Validation Helper
    ========================================
    */
    validateTemporal(confidenceThreshold = 0.2) {
        if (!this.hitData) {
            return false;
        }
        if (!this.hitData.hit) {
            return false;
        }
        return (this.hitData.confidence
            >=
                confidenceThreshold);
    }
    /*
    ========================================
    Denoise Support
    ========================================
    */
    getDenoiseInput() {
        return {
            reflection: this.getReflectionTexture(),
            normal: this.getNormalTexture(),
            roughness: this.getRoughnessTexture(),
            confidence: this.getConfidenceTexture(),
            hitDistance: this.getHitDistanceTexture()
        };
    }
    /*
    ========================================
    Resolve Support
    ========================================
    */
    getResolveInput() {
        return {
            reflection: this.getReflectionTexture(),
            confidence: this.getConfidenceTexture(),
            historyWeight: this.getHistoryWeightTexture(),
            reactive: this.getReactiveTexture()
        };
    }
    /*
    ========================================
    Frame Lifecycle
    ========================================
    */
    begin() {
        this.hitData =
            null;
    }
    end() {
        this.frameIndex++;
    }
    getFrameIndex() {
        return this.frameIndex;
    }
    /*
    ========================================
    GPU Resource Update
    ========================================
    */
    upload() {
        /*
            GPU texture upload noktası


            Reflection

            HitData

            Confidence

            Normal

            Roughness


        */
    }
    bind() {
        return {
            reflection: this.getReflectionTexture(),
            hitDistance: this.getHitDistanceTexture(),
            confidence: this.getConfidenceTexture(),
            normal: this.getNormalTexture(),
            roughness: this.getRoughnessTexture(),
            reactive: this.getReactiveTexture()
        };
    }
    /*
    ========================================
    Clear Buffer
    ========================================
    */
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        this.reflectionTexture =
            null;
        this.hitData =
            null;
        this.rayData =
            null;
    }
    /*
    ========================================
    Resize
    ========================================
    */
    resize(width, height) {
        super.resize(width, height);
    }
    /*
    ========================================
    Copy From Buffer
    ========================================
    */
    copyFrom(source) {
        this.reflectionTexture =
            source.getStoredReflection();
        this.hitData =
            source.getHitData();
        this.rayData =
            source.getRayData();
    }
    /*
    ========================================
    Clone State
    ========================================
    */
    cloneState() {
        return {
            reflection: this.reflectionTexture,
            hitData: this.hitData,
            rayData: this.rayData,
            frame: this.frameIndex
        };
    }
    /*
    ========================================
    Reset
    ========================================
    */
    reset() {
        this.clear();
        this.frameIndex =
            0;
        this.enabled =
            true;
    }
    /*
    ========================================
    Release Resources
    ========================================
    */
    release() {
        this.clear();
    }
    /*
    ========================================
    Runtime Controls
    ========================================
    */
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    isEnabled() {
        return this.enabled;
    }
    /*
    ========================================
    Statistics
    ========================================
    */
    getStats() {
        return {
            width: this.width,
            height: this.height,
            frame: this.frameIndex,
            enabled: this.enabled,
            hasReflection: this.reflectionTexture
                !==
                    null,
            hasHit: this.hasHit()
        };
    }
    /*
    ========================================
    Debug Information
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRBuffer",
            enabled: this.enabled,
            size: {
                width: this.width,
                height: this.height
            },
            frame: this.frameIndex,
            hitData: this.hitData,
            rayData: this.rayData,
            attachments: this.getAttachments()
                .map(attachment => attachment.name)
        };
    }
}
//# sourceMappingURL=SSRBuffer.js.map