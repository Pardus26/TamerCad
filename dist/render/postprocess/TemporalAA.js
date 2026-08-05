export class TemporalAA {
    enabled = true;
    /**
     * Önceki frame katkı oranı
     */
    feedback = 0.95;
    /**
     * Subpixel jitter miktarı
     */
    jitterScale = 1.0;
    /**
     * Ghosting azaltma
     */
    clampStrength = 0.9;
    history = null;
    velocity = null;
    frameIndex = 0;
    jitter = {
        x: 0,
        y: 0
    };
    constructor(options = {}) {
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
        if (options.feedback !== undefined) {
            this.feedback =
                options.feedback;
        }
        if (options.jitterScale !== undefined) {
            this.jitterScale =
                options.jitterScale;
        }
        if (options.clampStrength !== undefined) {
            this.clampStrength =
                options.clampStrength;
        }
    }
    setHistoryBuffer(buffer) {
        this.history =
            buffer;
    }
    setVelocityBuffer(buffer) {
        this.velocity =
            buffer;
    }
    halton(index, base) {
        let result = 0;
        let fraction = 1 / base;
        while (index > 0) {
            result +=
                (index % base) *
                    fraction;
            index =
                Math.floor(index / base);
            fraction /= base;
        }
        return result;
    }
    updateJitter(width, height) {
        this.frameIndex++;
        const x = this.halton(this.frameIndex, 2) - 0.5;
        const y = this.halton(this.frameIndex, 3) - 0.5;
        this.jitter = {
            x: (x *
                this.jitterScale)
                / width,
            y: (y *
                this.jitterScale)
                / height
        };
    }
    getJitter() {
        return this.jitter;
    }
    resolve(currentFrame, historyFrame, velocityTexture) {
        if (!this.enabled) {
            return currentFrame;
        }
        /**
         * Gerçek shader tarafı:
         *
         * previousUV =
         * currentUV - velocity
         *
         * historySample =
         * texture(history, previousUV)
         *
         * blend(current, history)
         */
        return {
            type: "TemporalResolvedFrame",
            current: currentFrame,
            history: historyFrame,
            velocity: velocityTexture,
            feedback: this.feedback
        };
    }
    clampHistory(color) {
        /**
         * Neighborhood clamp
         *
         * ghosting azaltma
         */
        return color;
    }
    reset() {
        this.frameIndex =
            0;
        this.jitter = {
            x: 0,
            y: 0
        };
    }
    dispose() {
        this.history =
            null;
        this.velocity =
            null;
    }
    debugInfo() {
        return {
            enabled: this.enabled,
            feedback: this.feedback,
            jitter: this.jitter,
            frame: this.frameIndex
        };
    }
}
//# sourceMappingURL=TemporalAA.js.map