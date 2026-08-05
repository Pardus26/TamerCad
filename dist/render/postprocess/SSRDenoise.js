export var SSRDenoiseMode;
(function (SSRDenoiseMode) {
    SSRDenoiseMode["Gaussian"] = "Gaussian";
    SSRDenoiseMode["Bilateral"] = "Bilateral";
    SSRDenoiseMode["EdgeAware"] = "EdgeAware";
})(SSRDenoiseMode || (SSRDenoiseMode = {}));
export class SSRDenoise {
    enabled = true;
    radius = 2;
    iterations = 2;
    normalThreshold = 0.15;
    depthThreshold = 0.01;
    sigma = 2.0;
    mode = SSRDenoiseMode.EdgeAware;
    ssrBuffer = null;
    history = null;
    normal = null;
    depth = null;
    shader = null;
    frameIndex = 0;
    constructor(options = {}) {
        this.radius =
            options.radius ??
                this.radius;
        this.iterations =
            options.iterations ??
                this.iterations;
        this.normalThreshold =
            options.normalThreshold ??
                this.normalThreshold;
        this.depthThreshold =
            options.depthThreshold ??
                this.depthThreshold;
        this.enabled =
            options.enabled ??
                this.enabled;
        this.sigma =
            options.sigma ??
                this.sigma;
    }
    setSSRBuffer(buffer) {
        this.ssrBuffer = buffer;
    }
    setHistoryBuffer(buffer) {
        this.history = buffer;
    }
    setNormalBuffer(buffer) {
        this.normal = buffer;
    }
    setDepthBuffer(buffer) {
        this.depth = buffer;
    }
    setShader(shader) {
        this.shader = shader;
    }
    /*
    ========================================
    Gaussian Kernel
    ========================================
    */
    generateKernel() {
        const kernel = [];
        const size = this.radius * 2 + 1;
        let sum = 0;
        for (let i = -this.radius; i <= this.radius; i++) {
            const weight = Math.exp(-(i * i)
                /
                    (2 *
                        this.sigma *
                        this.sigma));
            kernel.push(weight);
            sum += weight;
        }
        /*
            Normalize
        */
        for (let i = 0; i < kernel.length; i++) {
            kernel[i] /= sum;
        }
        return kernel;
    }
    /*
    ========================================
    Spatial Weight
    ========================================
    */
    spatialWeight(distance) {
        return Math.exp(-(distance *
            distance)
            /
                (2 *
                    this.sigma *
                    this.sigma));
    }
    /*
    ========================================
    Normal Weight
    ========================================
    */
    normalWeight(center, sample) {
        if (!center ||
            !sample) {
            return 0;
        }
        const dot = center.x *
            sample.x +
            center.y *
                sample.y +
            center.z *
                sample.z;
        if (dot <
            this.normalThreshold) {
            return 0;
        }
        return Math.max(0, dot);
    }
    /*
    ========================================
    Depth Weight
    ========================================
    */
    depthWeight(centerDepth, sampleDepth) {
        const difference = Math.abs(centerDepth -
            sampleDepth);
        if (difference >
            this.depthThreshold) {
            return 0;
        }
        return Math.exp(-difference /
            this.depthThreshold);
    }
    /*
    ========================================
    Combined Bilateral Weight
    ========================================
    */
    calculateWeight(center, sample, distance) {
        const spatial = this.spatialWeight(distance);
        const normal = this.normalWeight(center.normal, sample.normal);
        const depth = this.depthWeight(center.depth, sample.depth);
        return (spatial *
            normal *
            depth);
    }
    /*
    ========================================
    Sample Fetch
    ========================================
    */
    sampleNeighborhood(texture, x, y) {
        const samples = [];
        const kernelSize = this.radius * 2 + 1;
        for (let i = -this.radius; i <= this.radius; i++) {
            for (let j = -this.radius; j <= this.radius; j++) {
                /*
                    Gerçek GPU:

                    texture sample

                    burada yapılır
                */
                samples.push({
                    color: texture,
                    normal: {
                        x: 0,
                        y: 0,
                        z: 1
                    },
                    depth: 1.0,
                    weight: this.spatialWeight(Math.sqrt(i * i +
                        j * j))
                });
            }
        }
        return samples;
    }
    /*
    ========================================
    Bilateral Filter
    ========================================
    */
    bilateralFilter(input) {
        const samples = this.sampleNeighborhood(input, 0, 0);
        let totalWeight = 0;
        let result = null;
        const center = samples[0];
        for (const sample of samples) {
            const weight = this.calculateWeight(center, sample, sample.weight);
            totalWeight += weight;
            if (weight > 0) {
                result = {
                    color: sample.color,
                    weight
                };
            }
        }
        if (totalWeight === 0) {
            return input;
        }
        return {
            color: result,
            weight: totalWeight
        };
    }
    /*
    ========================================
    Edge Aware Filter
    ========================================
    */
    edgeAwareFilter(input) {
        const samples = this.sampleNeighborhood(input, 0, 0);
        const filtered = [];
        for (const sample of samples) {
            const weight = this.calculateWeight(samples[0], sample, sample.weight);
            if (weight >
                0) {
                filtered.push({
                    value: sample.color,
                    weight
                });
            }
        }
        return {
            type: "EdgeAwareResult",
            samples: filtered
        };
    }
    /*
    ========================================
    Filter Dispatch
    ========================================
    */
    applyFilter(input) {
        switch (this.mode) {
            case SSRDenoiseMode.Gaussian:
                return this.bilateralFilter(input);
            case SSRDenoiseMode.Bilateral:
                return this.bilateralFilter(input);
            case SSRDenoiseMode.EdgeAware:
            default:
                return this.edgeAwareFilter(input);
        }
    }
    /*
    ========================================
    Multi Iteration Denoise
    ========================================
    */
    denoise(reflection) {
        if (!this.enabled) {
            return reflection;
        }
        let result = reflection;
        for (let i = 0; i < this.iterations; i++) {
            result =
                this.applyFilter(result);
        }
        return {
            type: "DenoisedSSR",
            result,
            iterations: this.iterations,
            mode: this.mode
        };
    }
    /*
    ========================================
    Ping Pong Resolve
    ========================================
    */
    pingPong(input) {
        let current = input;
        for (let i = 0; i < this.iterations; i++) {
            current =
                this.applyFilter(current);
        }
        return current;
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
        this.shader.setUniform?.("uRadius", this.radius);
        this.shader.setUniform?.("uIterations", this.iterations);
        this.shader.setUniform?.("uNormalThreshold", this.normalThreshold);
        this.shader.setUniform?.("uDepthThreshold", this.depthThreshold);
        this.shader.setUniform?.("uSigma", this.sigma);
        this.shader.setUniform?.("uMode", this.mode);
        this.shader.setUniform?.("uFrameIndex", this.frameIndex);
        /*
            SSR texture bind

        */
        this.ssrBuffer?.bind();
        this.history?.bind();
        this.normal?.bind();
        this.depth?.bind();
        context.drawFullscreenQuad?.();
        this.ssrBuffer?.unbind();
        this.frameIndex++;
        return {
            type: "SSRDenoiseResult",
            frame: this.frameIndex
        };
    }
    /*
    ========================================
    Resize
    ========================================
    */
    resize(width, height) {
        this.ssrBuffer?.resize?.(width, height);
        this.history?.resize?.(width, height);
    }
    /*
    ========================================
    Runtime Settings
    ========================================
    */
    setRadius(radius) {
        this.radius =
            Math.max(0, Math.floor(radius));
    }
    setIterations(iterations) {
        this.iterations =
            Math.max(1, Math.floor(iterations));
    }
    setMode(mode) {
        this.mode =
            mode;
    }
    setEnabled(enabled) {
        this.enabled =
            enabled;
    }
    /*
    ========================================
    Invalidate
    ========================================
    */
    invalidateHistory() {
        this.history?.clear?.();
    }
    /*
    ========================================
    Reset
    ========================================
    */
    reset() {
        this.ssrBuffer = null;
        this.history = null;
        this.normal = null;
        this.depth = null;
        this.shader = null;
        this.frameIndex = 0;
    }
    /*
    ========================================
    Debug Information
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRDenoise",
            enabled: this.enabled,
            mode: this.mode,
            radius: this.radius,
            iterations: this.iterations,
            sigma: this.sigma,
            normalThreshold: this.normalThreshold,
            depthThreshold: this.depthThreshold,
            frame: this.frameIndex,
            resources: {
                ssrBuffer: this.ssrBuffer !== null,
                history: this.history !== null,
                normal: this.normal !== null,
                depth: this.depth !== null,
                shader: this.shader !== null
            }
        };
    }
}
//# sourceMappingURL=SSRDenoise.js.map