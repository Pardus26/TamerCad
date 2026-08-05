export var SSRHistoryPassMode;
(function (SSRHistoryPassMode) {
    SSRHistoryPassMode["Replace"] = "Replace";
    SSRHistoryPassMode["Accumulate"] = "Accumulate";
    SSRHistoryPassMode["Adaptive"] = "Adaptive";
})(SSRHistoryPassMode || (SSRHistoryPassMode = {}));
export class SSRHistoryPass {
    enabled = true;
    /**
     * Temporal feedback strength
     */
    feedback = 0.92;
    /**
     * Minimum history confidence
     */
    confidenceThreshold = 0.2;
    /**
     * Depth rejection
     */
    depthThreshold = 0.01;
    /**
     * Normal rejection
     */
    normalThreshold = 0.15;
    /**
     * Motion rejection
     */
    motionThreshold = 0.5;
    mode = SSRHistoryPassMode.Adaptive;
    ssrBuffer = null;
    historyBuffer = null;
    output = null;
    frameIndex = 0;
    initialized = false;
    constructor(options = {}) {
        if (options.feedback !== undefined) {
            this.feedback =
                options.feedback;
        }
        if (options.confidenceThreshold !== undefined) {
            this.confidenceThreshold =
                options.confidenceThreshold;
        }
        if (options.depthThreshold !== undefined) {
            this.depthThreshold =
                options.depthThreshold;
        }
        if (options.normalThreshold !== undefined) {
            this.normalThreshold =
                options.normalThreshold;
        }
        if (options.motionThreshold !== undefined) {
            this.motionThreshold =
                options.motionThreshold;
        }
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
    }
    /*
    ====================================================
    Buffer Binding
    ====================================================
    */
    setSSRBuffer(buffer) {
        this.ssrBuffer =
            buffer;
    }
    setHistoryBuffer(buffer) {
        this.historyBuffer =
            buffer;
    }
    setOutput(output) {
        this.output =
            output;
    }
    /*
    ====================================================
    Initialization
    ====================================================
    */
    initialize() {
        if (this.initialized) {
            return;
        }
        if (!this.historyBuffer) {
            throw new Error("SSRHistoryPass requires SSRHistoryBuffer");
        }
        if (this.ssrBuffer) {
            this.historyBuffer.resize(this.ssrBuffer.width, this.ssrBuffer.height);
        }
        this.initialized =
            true;
    }
    /*
    ====================================================
    Frame Begin
    ====================================================
    */
    begin() {
        if (!this.enabled) {
            return;
        }
        if (!this.initialized) {
            this.initialize();
        }
        this.historyBuffer
            ?.beginFrame();
    }
    /*
    ====================================================
    Frame End
    ====================================================
    */
    end() {
        if (!this.enabled) {
            return;
        }
        this.historyBuffer
            ?.endFrame();
        this.historyBuffer
            ?.swap();
        this.frameIndex++;
    }
    /*
    ====================================================
    History Access
    ====================================================
    */
    getPreviousHistory() {
        if (!this.historyBuffer) {
            return null;
        }
        return this.historyBuffer
            .getPreviousHistory();
    }
    getCurrentHistory() {
        if (!this.historyBuffer) {
            return null;
        }
        return this.historyBuffer
            .getCurrentHistory();
    }
    hasHistory() {
        return (this.historyBuffer
            ?
                this.historyBuffer.hasPrevious()
            :
                false);
    }
    /*
    ====================================================
    Feedback Calculation
    ====================================================
    */
    calculateFeedback(confidence) {
        if (confidence <
            this.confidenceThreshold) {
            return 0;
        }
        return Math.max(0, Math.min(1, this.feedback *
            confidence));
    }
    /*
    ====================================================
    Depth Rejection
    ====================================================
    */
    rejectDepth(currentDepth, historyDepth) {
        return (Math.abs(currentDepth -
            historyDepth)
            >
                this.depthThreshold);
    }
    /*
    ====================================================
    Normal Rejection
    ====================================================
    */
    rejectNormal(currentNormal, historyNormal) {
        if (!currentNormal ||
            !historyNormal) {
            return true;
        }
        const similarity = currentNormal.x *
            historyNormal.x
            +
                currentNormal.y *
                    historyNormal.y
            +
                currentNormal.z *
                    historyNormal.z;
        return (similarity <
            1 -
                this.normalThreshold);
    }
    /*
    ====================================================
    Motion Rejection
    ====================================================
    */
    rejectMotion(motion) {
        if (!motion) {
            return true;
        }
        const velocity = Math.sqrt(motion.x *
            motion.x
            +
                motion.y *
                    motion.y);
        return (velocity >
            this.motionThreshold);
    }
    /*
    ====================================================
    History Validation
    ====================================================
    */
    validateHistory(sample, history) {
        let depthValid = true;
        let normalValid = true;
        let motionValid = true;
        if (sample.depth !== undefined &&
            history.depth !== undefined) {
            depthValid =
                !this.rejectDepth(sample.depth, history.depth);
        }
        if (sample.normal &&
            history.normal) {
            normalValid =
                !this.rejectNormal(sample.normal, history.normal);
        }
        if (sample.motion) {
            motionValid =
                !this.rejectMotion(sample.motion);
        }
        return {
            valid: depthValid &&
                normalValid &&
                motionValid,
            depthValid,
            normalValid,
            motionValid
        };
    }
    /*
    ====================================================
    Confidence Adaptation
    ====================================================
    */
    calculateConfidence(sample) {
        let confidence = sample.confidence;
        /*
            Uzak hit noktaları
            daha düşük güvenilirlik
        */
        if (sample.hitDistance >
            50) {
            confidence *=
                0.5;
        }
        return Math.max(0, Math.min(1, confidence));
    }
    /*
    ====================================================
    History Blend
    ====================================================
    */
    blendHistory(current, history, weight) {
        if (!history ||
            weight <= 0) {
            return current;
        }
        return {
            type: "SSRTemporalBlend",
            current,
            history,
            weight
        };
    }
    /*
    ====================================================
    Temporal Accumulation
    ====================================================
    */
    accumulate(sample) {
        if (!this.historyBuffer) {
            return sample.reflection;
        }
        const previous = this.getPreviousHistory();
        let weight = this.calculateFeedback(sample.confidence);
        switch (this.mode) {
            case SSRHistoryPassMode.Replace:
                weight = 0;
                break;
            case SSRHistoryPassMode.Accumulate:
                weight =
                    this.feedback;
                break;
            case SSRHistoryPassMode.Adaptive:
                break;
        }
        const result = this.blendHistory(sample.reflection, previous?.reflection, weight);
        return result;
    }
    /*
    ====================================================
    Temporal Resolve
    ====================================================
    */
    resolveTemporal(sample, validation = true) {
        if (!this.historyBuffer) {
            return sample.reflection;
        }
        if (!validation) {
            this.historyBuffer
                .invalidateHistory();
            return sample.reflection;
        }
        return this.accumulate(sample);
    }
    /*
    ====================================================
    Write History
    ====================================================
    */
    writeHistory(reflection, confidence, hitDistance, extra = {}) {
        if (!this.historyBuffer) {
            return;
        }
        this.historyBuffer
            .storeCurrent({
            reflection,
            confidence,
            hitDistance,
            ...extra
        });
    }
    /*
    ====================================================
    Execute
    ====================================================
    */
    execute(sample) {
        if (!this.enabled) {
            return sample.reflection;
        }
        if (!this.initialized) {
            this.initialize();
        }
        const confidence = this.calculateConfidence(sample);
        const history = this.getPreviousHistory();
        const validation = this.validateHistory(sample, history);
        const result = this.resolveTemporal({
            reflection: sample.reflection,
            confidence,
            hitDistance: sample.hitDistance,
            depth: sample.depth,
            normal: sample.normal,
            motion: sample.motion
        }, validation.valid);
        this.writeHistory(result, confidence, sample.hitDistance, {
            depth: sample.depth,
            normal: sample.normal
        });
        return {
            type: "SSRHistoryResult",
            reflection: result,
            confidence,
            validation,
            frame: this.frameIndex
        };
    }
    /*
    ====================================================
    Render From SSR Buffer
    ====================================================
    */
    render() {
        if (!this.ssrBuffer) {
            return null;
        }
        const sample = {
            reflection: this.ssrBuffer
                .getReflectionTexture(),
            confidence: 1.0,
            hitDistance: 0
        };
        return this.execute(sample);
    }
    /*
    ====================================================
    Resize
    ====================================================
    */
    resize(width, height) {
        this.output
            ?.resize(width, height);
        this.historyBuffer
            ?.resize(width, height);
    }
    /*
    ====================================================
    Clear
    ====================================================
    */
    clear() {
        this.ssrBuffer =
            null;
        this.output =
            null;
        this.historyBuffer
            ?.clear();
    }
    /*
    ====================================================
    Reset
    ====================================================
    */
    reset() {
        this.frameIndex =
            0;
        this.initialized =
            false;
        this.historyBuffer
            ?.reset();
    }
    /*
    ====================================================
    Release
    ====================================================
    */
    release() {
        this.clear();
        this.historyBuffer
            ?.release();
    }
    /*
    ====================================================
    Mode Control
    ====================================================
    */
    setMode(mode) {
        this.mode =
            mode;
    }
    getMode() {
        return this.mode;
    }
    /*
    ====================================================
    Enable Control
    ====================================================
    */
    setEnabled(enabled) {
        this.enabled =
            enabled;
    }
    isEnabled() {
        return this.enabled;
    }
    /*
    ====================================================
    Feedback Control
    ====================================================
    */
    setFeedback(value) {
        this.feedback =
            Math.max(0, Math.min(1, value));
    }
    getFeedback() {
        return this.feedback;
    }
    /*
    ====================================================
    Confidence Threshold
    ====================================================
    */
    setConfidenceThreshold(value) {
        this.confidenceThreshold =
            Math.max(0, Math.min(1, value));
    }
    getConfidenceThreshold() {
        return this.confidenceThreshold;
    }
    /*
    ====================================================
    Frame Information
    ====================================================
    */
    getFrameIndex() {
        return this.frameIndex;
    }
    /*
    ====================================================
    Validation
    ====================================================
    */
    validate() {
        if (!this.enabled) {
            return false;
        }
        if (!this.ssrBuffer) {
            return false;
        }
        if (!this.historyBuffer) {
            return false;
        }
        return true;
    }
    /*
    ====================================================
    Statistics
    ====================================================
    */
    getStats() {
        return {
            type: "SSRHistoryPass",
            enabled: this.enabled,
            initialized: this.initialized,
            mode: this.mode,
            feedback: this.feedback,
            confidenceThreshold: this.confidenceThreshold,
            depthThreshold: this.depthThreshold,
            normalThreshold: this.normalThreshold,
            motionThreshold: this.motionThreshold,
            frame: this.frameIndex,
            hasHistory: this.hasHistory()
        };
    }
    /*
    ====================================================
    Debug Information
    ====================================================
    */
    debugInfo() {
        return {
            type: "SSRHistoryPass",
            mode: this.mode,
            enabled: this.enabled,
            frameIndex: this.frameIndex,
            initialized: this.initialized,
            parameters: {
                feedback: this.feedback,
                confidenceThreshold: this.confidenceThreshold,
                depthThreshold: this.depthThreshold,
                normalThreshold: this.normalThreshold,
                motionThreshold: this.motionThreshold
            },
            buffers: {
                ssr: this.ssrBuffer !== null,
                history: this.historyBuffer !== null,
                output: this.output !== null
            },
            history: this.historyBuffer
                ?.debugInfo()
        };
    }
    /*
    ====================================================
    Dispose Alias
    ====================================================
    */
    dispose() {
        this.release();
    }
}
//# sourceMappingURL=SSRHistoryPass.js.map