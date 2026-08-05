export var SSRCompositeMode;
(function (SSRCompositeMode) {
    SSRCompositeMode["SSROnly"] = "SSROnly";
    SSRCompositeMode["ProbeOnly"] = "ProbeOnly";
    SSRCompositeMode["Hybrid"] = "Hybrid";
})(SSRCompositeMode || (SSRCompositeMode = {}));
export class SSRComposite {
    enabled = true;
    fresnelPower = 5.0;
    reflectionStrength = 1.0;
    roughnessBlend = 1.0;
    metallicBoost = 1.2;
    energyConservation = true;
    mode = SSRCompositeMode.Hybrid;
    ssr = null;
    history = null;
    probe = null;
    environment = null;
    shader = null;
    frameIndex = 0;
    constructor(options = {}) {
        this.fresnelPower =
            options.fresnelPower ??
                this.fresnelPower;
        this.reflectionStrength =
            options.reflectionStrength ??
                this.reflectionStrength;
        this.roughnessBlend =
            options.roughnessBlend ??
                this.roughnessBlend;
        this.metallicBoost =
            options.metallicBoost ??
                this.metallicBoost;
        this.enabled =
            options.enabled ??
                this.enabled;
        this.energyConservation =
            options.energyConservation ??
                this.energyConservation;
    }
    setSSRBuffer(buffer) {
        this.ssr = buffer;
    }
    setHistoryBuffer(buffer) {
        this.history = buffer;
    }
    setReflectionProbe(buffer) {
        this.probe = buffer;
    }
    setEnvironmentMap(environment) {
        this.environment = environment;
    }
    setShader(shader) {
        this.shader = shader;
    }
    /*
    ========================================
    Fresnel Schlick
    ========================================
    */
    fresnelSchlick(cosTheta, f0 = 0.04) {
        const oneMinus = 1 -
            Math.max(0, Math.min(1, cosTheta));
        return (f0 +
            (1 -
                f0)
                *
                    Math.pow(oneMinus, 5));
    }
    /*
    ========================================
    Custom Fresnel
    ========================================
    */
    fresnel(viewAngle) {
        return Math.pow(1 -
            Math.max(0, viewAngle), this.fresnelPower);
    }
    /*
    ========================================
    Roughness Response
    ========================================
    */
    calculateRoughnessFactor(roughness) {
        const factor = 1 -
            (roughness *
                this.roughnessBlend);
        return Math.max(0, Math.min(1, factor));
    }
    /*
    ========================================
    Metallic Response
    ========================================
    */
    calculateMetallicFactor(metallic) {
        if (metallic <= 0) {
            return 1.0;
        }
        return 1.0 +
            (metallic *
                this.metallicBoost);
    }
    /*
    ========================================
    Confidence Factor
    ========================================
    */
    calculateConfidence(confidence) {
        return Math.max(0, Math.min(1, confidence));
    }
    /*
    ========================================
    SSR Weight
    ========================================
    */
    calculateSSRWeight(material, viewAngle, confidence) {
        let weight = this.reflectionStrength;
        /*
            Fresnel
        */
        weight *=
            this.fresnelSchlick(viewAngle);
        /*
            Roughness
        */
        weight *=
            this.calculateRoughnessFactor(material.roughness);
        /*
            Metallic
        */
        weight *=
            this.calculateMetallicFactor(material.metallic);
        /*
            SSR confidence
        */
        weight *=
            this.calculateConfidence(confidence);
        return Math.max(0, weight);
    }
    /*
    ========================================
    Probe Weight
    ========================================
    */
    calculateProbeWeight(material, viewAngle) {
        let weight = this.reflectionStrength;
        weight *=
            this.fresnelSchlick(viewAngle);
        weight *=
            this.calculateRoughnessFactor(material.roughness);
        return Math.max(0, weight);
    }
    /*
    ========================================
    Environment Weight
    ========================================
    */
    calculateEnvironmentWeight(material, confidence) {
        let weight = 1.0;
        /*
            SSR güveni düşükse

            environment artar
        */
        weight *=
            (1 -
                this.calculateConfidence(confidence));
        /*
            Rough surface

            environment daha görünür
        */
        weight *=
            material.roughness;
        return Math.max(0, weight);
    }
    /*
    ========================================
    Energy Conservation
    ========================================
    */
    applyEnergyConservation(reflection, diffuse) {
        if (!this.energyConservation) {
            return reflection;
        }
        return Math.min(reflection, 1 -
            diffuse);
    }
    /*
    ========================================
    BRDF Reflection Combine
    ========================================
    */
    combineReflection(ssr, probe, environment, ssrWeight, probeWeight, environmentWeight) {
        return {
            ssr: {
                value: ssr,
                weight: ssrWeight
            },
            probe: {
                value: probe,
                weight: probeWeight
            },
            environment: {
                value: environment,
                weight: environmentWeight
            }
        };
    }
    /*
    ========================================
    Hybrid Resolve
    ========================================
    */
    resolveHybrid(input) {
        const ssrWeight = this.calculateSSRWeight(input.material, input.viewAngle, input.confidence);
        const probeWeight = this.calculateProbeWeight(input.material, input.viewAngle);
        const environmentWeight = this.calculateEnvironmentWeight(input.material, input.confidence);
        const color = this.combineReflection(input.ssr, input.probe, input.environment, ssrWeight, probeWeight, environmentWeight);
        return {
            color,
            ssrWeight,
            probeWeight,
            environmentUsed: environmentWeight > 0
        };
    }
    /*
    ========================================
    SSR Only Resolve
    ========================================
    */
    resolveSSROnly(input) {
        const weight = this.calculateSSRWeight(input.material, input.viewAngle, input.confidence);
        return {
            color: {
                ssr: input.ssr,
                weight
            },
            ssrWeight: weight,
            probeWeight: 0,
            environmentUsed: false
        };
    }
    /*
    ========================================
    Probe Only Resolve
    ========================================
    */
    resolveProbeOnly(input) {
        const weight = this.calculateProbeWeight(input.material, input.viewAngle);
        return {
            color: {
                probe: input.probe,
                weight
            },
            ssrWeight: 0,
            probeWeight: weight,
            environmentUsed: false
        };
    }
    /*
    ========================================
    Main Composite
    ========================================
    */
    composite(input) {
        if (!this.enabled) {
            return {
                color: input.ssr,
                ssrWeight: 1,
                probeWeight: 0,
                environmentUsed: false
            };
        }
        switch (this.mode) {
            case SSRCompositeMode.SSROnly:
                return this.resolveSSROnly(input);
            case SSRCompositeMode.ProbeOnly:
                return this.resolveProbeOnly(input);
            case SSRCompositeMode.Hybrid:
            default:
                return this.resolveHybrid(input);
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
        /*
        --------------------------------
        Composite Parameters
        --------------------------------
        */
        this.shader.setUniform?.("uFresnelPower", this.fresnelPower);
        this.shader.setUniform?.("uReflectionStrength", this.reflectionStrength);
        this.shader.setUniform?.("uRoughnessBlend", this.roughnessBlend);
        this.shader.setUniform?.("uMetallicBoost", this.metallicBoost);
        this.shader.setUniform?.("uEnergyConservation", this.energyConservation);
        this.shader.setUniform?.("uMode", this.mode);
        this.shader.setUniform?.("uFrameIndex", this.frameIndex);
        /*
        --------------------------------
        Input Buffers
        --------------------------------
        */
        this.ssr?.bind();
        this.history?.bind();
        this.probe?.bind();
        this.environment?.bind();
        /*
        --------------------------------
        Fullscreen Composite
        --------------------------------
        */
        context.drawFullscreenQuad?.();
        this.ssr?.unbind();
        this.frameIndex++;
        return {
            type: "SSRCompositeResult",
            frame: this.frameIndex,
            mode: this.mode
        };
    }
    /*
    ========================================
    Runtime Controls
    ========================================
    */
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    setFresnelPower(value) {
        this.fresnelPower =
            Math.max(0.1, value);
    }
    setReflectionStrength(value) {
        this.reflectionStrength =
            Math.max(0, value);
    }
    setRoughnessBlend(value) {
        this.roughnessBlend =
            Math.max(0, value);
    }
    setMetallicBoost(value) {
        this.metallicBoost =
            Math.max(0, value);
    }
    /*
    ========================================
    Resize
    ========================================
    */
    resize(width, height) {
        this.ssr?.resize?.(width, height);
        this.history?.resize?.(width, height);
        this.probe?.resize?.(width, height);
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
    Reset Resources
    ========================================
    */
    reset() {
        this.ssr = null;
        this.history = null;
        this.probe = null;
        this.environment = null;
        this.shader = null;
        this.frameIndex = 0;
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
    Mode Change
    ========================================
    */
    setMode(mode) {
        this.mode = mode;
    }
    /*
    ========================================
    Energy Conservation Toggle
    ========================================
    */
    setEnergyConservation(enabled) {
        this.energyConservation = enabled;
    }
    /*
    ========================================
    Runtime Statistics
    ========================================
    */
    getStats() {
        return {
            frame: this.frameIndex,
            enabled: this.enabled,
            mode: this.mode,
            energyConservation: this.energyConservation,
            reflectionStrength: this.reflectionStrength
        };
    }
    /*
    ========================================
    Debug Information
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRComposite",
            enabled: this.enabled,
            mode: this.mode,
            fresnelPower: this.fresnelPower,
            reflectionStrength: this.reflectionStrength,
            roughnessBlend: this.roughnessBlend,
            metallicBoost: this.metallicBoost,
            energyConservation: this.energyConservation,
            frame: this.frameIndex,
            resources: {
                ssr: this.ssr !== null,
                history: this.history !== null,
                probe: this.probe !== null,
                environment: this.environment !== null,
                shader: this.shader !== null
            }
        };
    }
}
//# sourceMappingURL=SSRComposite.js.map