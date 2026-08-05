import { FrameBuffer } from "./FrameBuffer";
export var SSRHistoryAttachment;
(function (SSRHistoryAttachment) {
    SSRHistoryAttachment["Reflection"] = "reflection";
    SSRHistoryAttachment["Confidence"] = "confidence";
    SSRHistoryAttachment["HitDistance"] = "hitDistance";
    SSRHistoryAttachment["Depth"] = "depth";
    SSRHistoryAttachment["Normal"] = "normal";
    SSRHistoryAttachment["Motion"] = "motion";
    SSRHistoryAttachment["Validity"] = "validity";
})(SSRHistoryAttachment || (SSRHistoryAttachment = {}));
export class SSRHistoryBuffer extends FrameBuffer {
    enabled = true;
    /**
     * Ping pong index
     */
    historyIndex = 0;
    /**
     * Tutulan frame sayısı
     */
    historyCount = 2;
    /**
     * Current frame
     */
    frameIndex = 0;
    historyFrames = [];
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: SSRHistoryBuffer.createAttachments(options)
        });
        if (options.historyCount !== undefined) {
            this.historyCount = Math.max(2, options.historyCount);
        }
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
    }
    static createAttachments(options) {
        const format = options.format ??
            "RGBA16F";
        return [
            {
                name: SSRHistoryAttachment.Reflection,
                type: "Texture2D",
                format,
                texture: null
            },
            {
                name: SSRHistoryAttachment.Confidence,
                type: "Texture2D",
                format: "R16F",
                texture: null
            },
            {
                name: SSRHistoryAttachment.HitDistance,
                type: "Texture2D",
                format: "R16F",
                texture: null
            },
            {
                name: SSRHistoryAttachment.Depth,
                type: "Texture2D",
                format: "R32F",
                texture: null
            },
            {
                name: SSRHistoryAttachment.Normal,
                type: "Texture2D",
                format: "RGBA16F",
                texture: null
            },
            {
                name: SSRHistoryAttachment.Motion,
                type: "Texture2D",
                format: "RG16F",
                texture: null
            },
            {
                name: SSRHistoryAttachment.Validity,
                type: "Texture2D",
                format: "R8",
                texture: null
            }
        ];
    }
    /*
    ========================================
    History Frame Creation
    ========================================
    */
    createHistory() {
        this.historyFrames = [];
        for (let i = 0; i < this.historyCount; i++) {
            this.historyFrames.push({
                index: i,
                reflection: null,
                confidence: null,
                hitDistance: null,
                depth: null,
                normal: null,
                motion: null,
                valid: false
            });
        }
    }
    /*
    ========================================
    Initialization
    ========================================
    */
    initialize(context) {
        super.initialize(context);
        this.createHistory();
    }
    /*
    ========================================
    Current History
    ========================================
    */
    getCurrentHistory() {
        return this.historyFrames[this.historyIndex];
    }
    /*
    ========================================
    Previous History
    ========================================
    */
    getPreviousHistory() {
        const index = (this.historyIndex -
            1 +
            this.historyCount)
            %
                this.historyCount;
        return this.historyFrames[index];
    }
    /*
    ========================================
    History By Index
    ========================================
    */
    getHistory(index) {
        if (index < 0 ||
            index >=
                this.historyFrames.length) {
            return null;
        }
        return this.historyFrames[index];
    }
    /*
    ========================================
    GPU Texture Access
    ========================================
    */
    getReflectionTexture() {
        return this.getTexture(SSRHistoryAttachment.Reflection);
    }
    getConfidenceTexture() {
        return this.getTexture(SSRHistoryAttachment.Confidence);
    }
    getHitDistanceTexture() {
        return this.getTexture(SSRHistoryAttachment.HitDistance);
    }
    getDepthTexture() {
        return this.getTexture(SSRHistoryAttachment.Depth);
    }
    getNormalTexture() {
        return this.getTexture(SSRHistoryAttachment.Normal);
    }
    getMotionTexture() {
        return this.getTexture(SSRHistoryAttachment.Motion);
    }
    getValidityTexture() {
        return this.getTexture(SSRHistoryAttachment.Validity);
    }
    /*
    ========================================
    Store Current Frame
    ========================================
    */
    storeCurrent(data) {
        const current = this.getCurrentHistory();
        Object.assign(current, data);
        current.valid =
            true;
    }
    /*
    ========================================
    History Data Setters
    ========================================
    */
    setReflectionHistory(texture) {
        this.getCurrentHistory()
            .reflection =
            texture;
    }
    setConfidenceHistory(texture) {
        this.getCurrentHistory()
            .confidence =
            texture;
    }
    setHitDistanceHistory(texture) {
        this.getCurrentHistory()
            .hitDistance =
            texture;
    }
    setDepthHistory(texture) {
        this.getCurrentHistory()
            .depth =
            texture;
    }
    setNormalHistory(texture) {
        this.getCurrentHistory()
            .normal =
            texture;
    }
    setMotionHistory(texture) {
        this.getCurrentHistory()
            .motion =
            texture;
    }
    /*
    ========================================
    History Validation
    ========================================
    */
    invalidateHistory() {
        for (const frame of this.historyFrames) {
            frame.valid =
                false;
        }
    }
    validateHistory() {
        const previous = this.getPreviousHistory();
        return (previous !== null &&
            previous.valid);
    }
    hasPrevious() {
        return this.validateHistory();
    }
    /*
    ========================================
    Temporal Rejection
    ========================================
    */
    rejectByDepth(currentDepth, historyDepth, threshold = 0.01) {
        return Math.abs(currentDepth -
            historyDepth)
            >
                threshold;
    }
    rejectByNormal(currentNormal, historyNormal, threshold = 0.15) {
        if (!currentNormal ||
            !historyNormal) {
            return true;
        }
        const dot = currentNormal.x *
            historyNormal.x
            +
                currentNormal.y *
                    historyNormal.y
            +
                currentNormal.z *
                    historyNormal.z;
        return (dot <
            1 -
                threshold);
    }
    rejectByMotion(motion, threshold = 0.5) {
        if (!motion) {
            return true;
        }
        const length = Math.sqrt(motion.x *
            motion.x
            +
                motion.y *
                    motion.y);
        return (length >
            threshold);
    }
    /*
    ========================================
    Temporal Acceptance
    ========================================
    */
    canReuseHistory(current) {
        if (!this.enabled) {
            return false;
        }
        if (!this.hasPrevious()) {
            return false;
        }
        const previous = this.getPreviousHistory();
        if (!previous.reflection) {
            return false;
        }
        return true;
    }
    /*
    ========================================
    History Weight
    ========================================
    */
    calculateHistoryWeight(confidence, reactive) {
        let weight = confidence;
        weight *=
            (1 -
                reactive);
        return Math.max(0, Math.min(1, weight));
    }
    /*
    ========================================
    Swap Ping Pong History
    ========================================
    */
    swap() {
        this.historyIndex =
            (this.historyIndex +
                1)
                %
                    this.historyCount;
        this.frameIndex++;
        const current = this.getCurrentHistory();
        current.valid =
            false;
    }
    /*
    ========================================
    Frame Update
    ========================================
    */
    update() {
        if (!this.enabled) {
            return;
        }
        const current = this.getCurrentHistory();
        current.valid =
            true;
    }
    /*
    ========================================
    Copy History Frame
    ========================================
    */
    copyHistory(source) {
        const current = this.getCurrentHistory();
        current.reflection =
            source.reflection;
        current.confidence =
            source.confidence;
        current.hitDistance =
            source.hitDistance;
        current.depth =
            source.depth;
        current.normal =
            source.normal;
        current.motion =
            source.motion;
        current.valid =
            source.valid;
    }
    /*
    ========================================
    Frame Lifecycle
    ========================================
    */
    beginFrame() {
        const current = this.getCurrentHistory();
        current.valid =
            false;
    }
    endFrame() {
        this.swap();
    }
    /*
    ========================================
    Resize
    ========================================
    */
    resize(width, height) {
        super.resize(width, height);
        this.reset();
    }
    /*
    ========================================
    Clear GPU Data
    ========================================
    */
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        for (const frame of this.historyFrames) {
            frame.reflection =
                null;
            frame.confidence =
                null;
            frame.hitDistance =
                null;
            frame.depth =
                null;
            frame.normal =
                null;
            frame.motion =
                null;
            frame.valid =
                false;
        }
    }
    /*
    ========================================
    Bind For Temporal Pass
    ========================================
    */
    bindTemporal() {
        const previous = this.getPreviousHistory();
        const current = this.getCurrentHistory();
        return {
            current,
            previous,
            frame: this.frameIndex
        };
    }
    /*
    ========================================
    Reset
    ========================================
    */
    reset() {
        this.historyIndex =
            0;
        this.frameIndex =
            0;
        for (const frame of this.historyFrames) {
            frame.reflection =
                null;
            frame.confidence =
                null;
            frame.hitDistance =
                null;
            frame.depth =
                null;
            frame.normal =
                null;
            frame.motion =
                null;
            frame.valid =
                false;
        }
    }
    /*
    ========================================
    Release Resources
    ========================================
    */
    release() {
        this.clear();
        this.historyFrames = [];
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
    setHistoryCount(count) {
        this.historyCount =
            Math.max(2, count);
        this.createHistory();
    }
    /*
    ========================================
    Statistics
    ========================================
    */
    getStats() {
        return {
            enabled: this.enabled,
            frame: this.frameIndex,
            historyIndex: this.historyIndex,
            historyCount: this.historyCount,
            validFrames: this.historyFrames
                .filter(frame => frame.valid)
                .length
        };
    }
    /*
    ========================================
    Debug Information
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRHistoryBuffer",
            enabled: this.enabled,
            frameIndex: this.frameIndex,
            historyIndex: this.historyIndex,
            historyCount: this.historyCount,
            size: {
                width: this.width,
                height: this.height
            },
            current: {
                index: this.getCurrentHistory()
                    .index,
                valid: this.getCurrentHistory()
                    .valid
            },
            previous: {
                index: this.getPreviousHistory()
                    .index,
                valid: this.getPreviousHistory()
                    .valid
            }
        };
    }
}
//# sourceMappingURL=SSRHistoryBuffer.js.map