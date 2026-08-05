import { SSRComposite } from "../postprocess/SSRComposite";
import { SSRBRDF } from "../postprocess/SSRBRDF";
export var SSRCompositePassMode;
(function (SSRCompositePassMode) {
    SSRCompositePassMode["SSR"] = "SSR";
    SSRCompositePassMode["Probe"] = "Probe";
    SSRCompositePassMode["Hybrid"] = "Hybrid";
})(SSRCompositePassMode || (SSRCompositePassMode = {}));
export class SSRCompositePass {
    enabled = true;
    mode = SSRCompositePassMode.Hybrid;
    reflectionStrength = 1.0;
    fresnelPower = 5.0;
    metallicBoost = 1.2;
    ssrBuffer = null;
    probe = null;
    environment = null;
    composite = null;
    brdf = null;
    initialized = false;
    constructor(options = {}) {
        if (options.enabled !== undefined) {
            this.enabled =
                options.enabled;
        }
        if (options.reflectionStrength !== undefined) {
            this.reflectionStrength =
                options.reflectionStrength;
        }
        if (options.fresnelPower !== undefined) {
            this.fresnelPower =
                options.fresnelPower;
        }
        if (options.metallicBoost !== undefined) {
            this.metallicBoost =
                options.metallicBoost;
        }
    }
    /*
    ====================================================
    Buffer Connections
    ====================================================
    */
    setSSRBuffer(buffer) {
        this.ssrBuffer =
            buffer;
    }
    setReflectionProbe(probe) {
        this.probe =
            probe;
    }
    setEnvironmentMap(environment) {
        this.environment =
            environment;
    }
    setComposite(composite) {
        this.composite =
            composite;
    }
    setBRDF(brdf) {
        this.brdf =
            brdf;
    }
    /*
    ====================================================
    Initialize
    ====================================================
    */
    initialize() {
        if (this.initialized) {
            return;
        }
        if (!this.composite) {
            this.composite =
                new SSRComposite({
                    reflectionStrength: this.reflectionStrength,
                    fresnelPower: this.fresnelPower,
                    metallicBoost: this.metallicBoost
                });
        }
        if (!this.brdf) {
            this.brdf =
                new SSRBRDF();
        }
        this.composite
            .setSSRBuffer(this.ssrBuffer);
        if (this.probe) {
            this.composite
                .setReflectionProbe(this.probe);
        }
        if (this.environment) {
            this.composite
                .setEnvironmentMap(this.environment);
        }
        this.brdf
            .setComposite(this.composite);
        this.initialized =
            true;
    }
    /*
    ====================================================
    Prepare Frame
    ====================================================
    */
    begin() {
        if (!this.enabled) {
            return;
        }
        if (!this.initialized) {
            this.initialize();
        }
    }
    /*
    ====================================================
    Material Preparation
    ====================================================
    */
    prepareMaterial(material) {
        return {
            roughness: material?.roughness ??
                0.0,
            metallic: material?.metallic ??
                0.0,
            baseReflectivity: material?.baseReflectivity ??
                0.04
        };
    }
    /*
    ====================================================
    Reflection Source Resolve
    ====================================================
    */
    resolveReflection(input) {
        if (!this.composite) {
            return input.ssrTexture;
        }
        return this.composite
            .composite(input.ssrTexture, input.probeTexture ?? null, this.prepareMaterial(input.material), input.viewAngle);
    }
    /*
    ====================================================
    BRDF Apply
    ====================================================
    */
    applyBRDF(color, material) {
        if (!this.brdf) {
            return color;
        }
        const result = this.brdf
            .evaluate({
            viewDotNormal: 1.0,
            lightDotNormal: 1.0,
            halfDotNormal: 1.0,
            viewDotHalf: 1.0,
            roughness: material.roughness,
            metallic: material.metallic,
            baseReflectivity: material.baseReflectivity
        });
        return {
            color,
            specular: result.specular,
            reflectionWeight: result.reflectionWeight
        };
    }
    /*
    ====================================================
    Execute Composite
    ====================================================
    */
    execute(input) {
        if (!this.enabled) {
            return {
                color: input.ssrTexture,
                weight: 1.0
            };
        }
        const material = this.prepareMaterial(input.material);
        const reflection = this.resolveReflection(input);
        const result = this.applyBRDF(reflection, material);
        return {
            type: "SSRCompositeResult",
            mode: this.mode,
            reflection: result,
            material
        };
    }
    /*
    ====================================================
    Mode Control
    ====================================================
    */
    setMode(mode) {
        this.mode =
            mode;
        if (this.composite) {
            switch (mode) {
                case SSRCompositePassMode.SSR:
                    this.composite.mode =
                        "SSROnly";
                    break;
                case SSRCompositePassMode.Probe:
                    this.composite.mode =
                        "ProbeOnly";
                    break;
                default:
                    this.composite.mode =
                        "Hybrid";
                    break;
            }
        }
    }
    /*
    ====================================================
    Resize
    ====================================================
    */
    resize(width, height) {
        if (this.ssrBuffer) {
            this.ssrBuffer.resize(width, height);
        }
    }
    /*
    ====================================================
    Clear Resources
    ====================================================
    */
    clear() {
        if (this.ssrBuffer) {
            this.ssrBuffer.clear();
        }
    }
    /*
    ====================================================
    Reset Pass
    ====================================================
    */
    reset() {
        this.initialized =
            false;
        this.ssrBuffer =
            null;
        this.probe =
            null;
        this.environment =
            null;
        this.composite =
            null;
        this.brdf =
            null;
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
    }
    /*
    ====================================================
    Runtime Update
    ====================================================
    */
    update() {
        if (this.composite) {
            this.composite.reflectionStrength =
                this.reflectionStrength;
            this.composite.fresnelPower =
                this.fresnelPower;
            this.composite.metallicBoost =
                this.metallicBoost;
        }
    }
    /*
    ====================================================
    Debug Information
    ====================================================
    */
    debugInfo() {
        return {
            type: "SSRCompositePass",
            enabled: this.enabled,
            initialized: this.initialized,
            mode: this.mode,
            reflectionStrength: this.reflectionStrength,
            fresnelPower: this.fresnelPower,
            metallicBoost: this.metallicBoost,
            resources: {
                ssrBuffer: this.ssrBuffer !== null,
                reflectionProbe: this.probe !== null,
                environment: this.environment !== null,
                composite: this.composite !== null,
                brdf: this.brdf !== null
            }
        };
    }
    /*
    ====================================================
    Pipeline State
    ====================================================
    */
    getState() {
        return {
            pass: "SSRCompositePass",
            active: this.enabled,
            mode: this.mode,
            ready: this.initialized
        };
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
        return true;
    }
    /*
    ====================================================
    Dispose
    ====================================================
    */
    dispose() {
        this.reset();
    }
}
//# sourceMappingURL=SSRCompositePass.js.map