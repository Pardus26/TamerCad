export var SSRTemporalFilterMode;
(function (SSRTemporalFilterMode) {
    SSRTemporalFilterMode["TemporalOnly"] = "TemporalOnly";
    SSRTemporalFilterMode["TemporalSpatial"] = "TemporalSpatial";
    SSRTemporalFilterMode["VarianceGuided"] = "VarianceGuided";
})(SSRTemporalFilterMode || (SSRTemporalFilterMode = {}));
export class SSRTemporalFilter {
    enabled = true;
    feedback = 0.92;
    varianceClamp = 0.25;
    spatialRadius = 1;
    useMotionVectors = true;
    mode = SSRTemporalFilterMode.VarianceGuided;
    history = null;
    resolve = null;
    shader = null;
    frameIndex = 0;
    constructor(options = {}) {
        this.feedback =
            options.feedback ??
                this.feedback;
        this.varianceClamp =
            options.varianceClamp ??
                this.varianceClamp;
        this.spatialRadius =
            options.spatialRadius ??
                this.spatialRadius;
        this.enabled =
            options.enabled ??
                this.enabled;
        this.useMotionVectors =
            options.useMotionVectors ??
                this.useMotionVectors;
    }
    setHistoryBuffer(buffer) {
        this.history = buffer;
    }
    setResolve(resolve) {
        this.resolve = resolve;
    }
    setShader(shader) {
        this.shader = shader;
    }
    setMode(mode) {
        this.mode = mode;
    }
    /*
    ========================================
    History Reprojection
    ========================================
    */
    calculateHistoryUV(currentUV, velocity) {
        if (!this.useMotionVectors) {
            return {
                x: currentUV.x,
                y: currentUV.y
            };
        }
        return {
            x: currentUV.x -
                velocity.x,
            y: currentUV.y -
                velocity.y
        };
    }
    /*
    ========================================
    History Validity
    ========================================
    */
    isValidHistoryUV(uv) {
        return (uv.x >= 0 &&
            uv.x <= 1 &&
            uv.y >= 0 &&
            uv.y <= 1);
    }
    /*
    ========================================
    Neighborhood Sampling
    ========================================
    */
    collectNeighborhood(samples) {
        const result = [];
        const radius = this.spatialRadius;
        /*
            Gerçek GPU tarafında:

            texture offsets

            kullanılır.


            Burada CPU tarafı

            veri hazırlığıdır.
        */
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                const index = samples.length > 0
                    ?
                        Math.abs((x +
                            y))
                            %
                                samples.length
                    :
                        0;
                if (samples[index] !== undefined) {
                    result.push(samples[index]);
                }
            }
        }
        return result;
    }
    /*
    ========================================
    Neighborhood Average
    ========================================
    */
    calculateNeighborhoodAverage(samples) {
        if (samples.length === 0) {
            return null;
        }
        return samples[0];
    }
    /*
    ========================================
    History Sample
    ========================================
    */
    sampleHistory(uv) {
        if (!this.history ||
            !this.isValidHistoryUV(uv)) {
            return null;
        }
        /*
            Gerçek uygulama:

            history texture fetch
        */
        return {
            uv,
            valid: true
        };
    }
    /*
    ========================================
    Variance Estimation
    ========================================
    */
    estimateVariance(values) {
        if (values.length === 0) {
            return 0;
        }
        let mean = 0;
        for (const value of values) {
            mean += value;
        }
        mean /= values.length;
        let variance = 0;
        for (const value of values) {
            const delta = value -
                mean;
            variance +=
                delta *
                    delta;
        }
        return (variance /
            values.length);
    }
    /*
    ========================================
    Neighborhood Min
    ========================================
    */
    calculateMin(values) {
        if (values.length === 0) {
            return 0;
        }
        let min = values[0];
        for (const value of values) {
            if (value < min) {
                min = value;
            }
        }
        return min;
    }
    /*
    ========================================
    Neighborhood Max
    ========================================
    */
    calculateMax(values) {
        if (values.length === 0) {
            return 0;
        }
        let max = values[0];
        for (const value of values) {
            if (value > max) {
                max = value;
            }
        }
        return max;
    }
    /*
    ========================================
    History Clamp
    ========================================
    */
    clampHistory(historyValue, neighborhood) {
        if (neighborhood.length === 0) {
            return historyValue;
        }
        const min = this.calculateMin(neighborhood);
        const max = this.calculateMax(neighborhood);
        return Math.max(min, Math.min(max, historyValue));
    }
    /*
    ========================================
    Variance Guided Clamp
    ========================================
    */
    varianceClampHistory(historyValue, neighborhood) {
        const variance = this.estimateVariance(neighborhood);
        if (variance <
            this.varianceClamp) {
            return this.clampHistory(historyValue, neighborhood);
        }
        /*
            yüksek variance:

            daha agresif clamp
        */
        const center = this.calculateNeighborhoodAverage(neighborhood);
        return center ?? historyValue;
    }
    /*
    ========================================
    Disocclusion Detection
    ========================================
    */
    detectDisocclusion(currentDepth, historyDepth) {
        const difference = Math.abs(currentDepth -
            historyDepth);
        return (difference >
            0.01);
    }
    /*
    ========================================
    History Rejection
    ========================================
    */
    rejectHistory(input) {
        if (input.reactive >
            0.5) {
            return true;
        }
        if (input.variance >
            this.varianceClamp) {
            return true;
        }
        return false;
    }
    /*
    ========================================
    Temporal Only
    ========================================
    */
    temporalOnly(input, history) {
        const rejected = this.rejectHistory(input);
        if (rejected ||
            history === null) {
            return {
                color: input.color,
                historyUsed: false,
                weight: 0,
                rejected: true
            };
        }
        return {
            color: {
                current: input.color,
                history,
                mix: this.feedback
            },
            historyUsed: true,
            weight: this.feedback,
            rejected: false
        };
    }
    /*
    ========================================
    Temporal Spatial
    ========================================
    */
    temporalSpatial(input, history, neighborhood) {
        const spatial = this.calculateNeighborhoodAverage(neighborhood);
        const rejected = this.rejectHistory(input);
        if (rejected ||
            history === null) {
            return {
                color: input.color,
                historyUsed: false,
                weight: 0,
                rejected: true
            };
        }
        return {
            color: {
                current: input.color,
                history: spatial ?? history,
                mix: this.feedback
            },
            historyUsed: true,
            weight: this.feedback,
            rejected: false
        };
    }
    /*
    ========================================
    Variance Guided
    ========================================
    */
    varianceGuided(input, history, neighborhood) {
        const rejected = this.rejectHistory(input);
        if (rejected ||
            history === null) {
            return {
                color: input.color,
                historyUsed: false,
                weight: 0,
                rejected: true
            };
        }
        const clampedHistory = this.varianceClampHistory(history, neighborhood);
        let weight = this.feedback;
        const variance = input.variance;
        if (variance >
            this.varianceClamp) {
            weight *= 0.5;
        }
        return {
            color: {
                current: input.color,
                history: clampedHistory,
                mix: weight
            },
            historyUsed: true,
            weight,
            rejected: false
        };
    }
    /*
    ========================================
    Main Filter
    ========================================
    */
    filter(input, history = null, neighborhood = []) {
        if (!this.enabled) {
            return {
                color: input.color,
                historyUsed: false,
                weight: 0,
                rejected: false
            };
        }
        switch (this.mode) {
            case SSRTemporalFilterMode.TemporalOnly:
                return this.temporalOnly(input, history);
            case SSRTemporalFilterMode.TemporalSpatial:
                return this.temporalSpatial(input, history, neighborhood);
            case SSRTemporalFilterMode.VarianceGuided:
            default:
                return this.varianceGuided(input, history, neighborhood);
        }
    }
    /*
    ========================================
    GPU Execute
    ========================================
    */
    execute(context) {
        if (!this.enabled) {
            return null;
        }
        if (!this.shader) {
            return null;
        }
        this.shader.bind();
        this.shader.setUniform?.("uFeedback", this.feedback);
        this.shader.setUniform?.("uVarianceClamp", this.varianceClamp);
        this.shader.setUniform?.("uSpatialRadius", this.spatialRadius);
        this.shader.setUniform?.("uFrameIndex", this.frameIndex);
        this.shader.setUniform?.("uMode", this.mode);
        this.shader.setUniform?.("uUseMotionVectors", this.useMotionVectors);
        /*
            Temporal resolve shader çalışır
        */
        context.drawFullscreenQuad?.();
        this.frameIndex++;
        return {
            type: "SSRTemporalResult",
            frame: this.frameIndex,
            mode: this.mode
        };
    }
    /*
    ========================================
    History Update
    ========================================
    */
    updateHistory(current) {
        if (!this.history) {
            return;
        }
        /*
            Gerçek GPU:

            current SSR output

            history buffer içine kopyalanır
        */
        this.history.update?.(current);
    }
    /*
    ========================================
    Resize
    ========================================
    */
    resize(width, height) {
        this.history?.resize?.(width, height);
    }
    /*
    ========================================
    Frame Begin
    ========================================
    */
    beginFrame() {
        this.frameIndex++;
    }
    /*
    ========================================
    Reset
    ========================================
    */
    reset() {
        this.frameIndex = 0;
        this.history = null;
        this.resolve = null;
        this.shader = null;
    }
    /*
    ========================================
    History Invalidate
    ========================================
    */
    invalidateHistory() {
        this.history?.clear?.();
    }
    /*
    ========================================
    Debug
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRTemporalFilter",
            enabled: this.enabled,
            mode: this.mode,
            feedback: this.feedback,
            varianceClamp: this.varianceClamp,
            spatialRadius: this.spatialRadius,
            useMotionVectors: this.useMotionVectors,
            frame: this.frameIndex,
            resources: {
                history: this.history !== null,
                resolve: this.resolve !== null,
                shader: this.shader !== null
            }
        };
    }
}
//# sourceMappingURL=SSRTemporalFilter.js.map