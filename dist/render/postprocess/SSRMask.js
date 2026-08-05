import { FrameBuffer } from "./FrameBuffer";
export var SSRMaskAttachment;
(function (SSRMaskAttachment) {
    SSRMaskAttachment["Mask"] = "mask";
    SSRMaskAttachment["Roughness"] = "roughness";
    SSRMaskAttachment["Metallic"] = "metallic";
    SSRMaskAttachment["MaterialClass"] = "materialClass";
    SSRMaskAttachment["Reactive"] = "reactive";
})(SSRMaskAttachment || (SSRMaskAttachment = {}));
export var SSRMaterialClass;
(function (SSRMaterialClass) {
    SSRMaterialClass[SSRMaterialClass["Opaque"] = 0] = "Opaque";
    SSRMaterialClass[SSRMaterialClass["Metal"] = 1] = "Metal";
    SSRMaterialClass[SSRMaterialClass["Glass"] = 2] = "Glass";
    SSRMaterialClass[SSRMaterialClass["Coated"] = 3] = "Coated";
    SSRMaterialClass[SSRMaterialClass["Emissive"] = 4] = "Emissive";
    SSRMaterialClass[SSRMaterialClass["Transparent"] = 5] = "Transparent";
})(SSRMaterialClass || (SSRMaterialClass = {}));
export class SSRMask extends FrameBuffer {
    enabled = true;
    roughnessThreshold = 0.75;
    metallicThreshold = 0.5;
    rendered = false;
    shader = null;
    frameIndex = 0;
    constructor(options = {}) {
        super({
            width: options.width,
            height: options.height,
            attachments: SSRMask.createAttachments(options)
        });
        this.roughnessThreshold =
            options.roughnessThreshold ??
                this.roughnessThreshold;
        this.metallicThreshold =
            options.metallicThreshold ??
                this.metallicThreshold;
        this.enabled =
            options.enabled ??
                this.enabled;
    }
    static createAttachments(options) {
        return [
            {
                name: SSRMaskAttachment.Mask,
                type: "Texture2D",
                format: options.format ??
                    "R8",
                texture: null
            },
            {
                name: SSRMaskAttachment.Roughness,
                type: "Texture2D",
                format: "R8",
                texture: null
            },
            {
                name: SSRMaskAttachment.Metallic,
                type: "Texture2D",
                format: "R8",
                texture: null
            },
            {
                name: SSRMaskAttachment.MaterialClass,
                type: "Texture2D",
                format: "R8UI",
                texture: null
            },
            {
                name: SSRMaskAttachment.Reactive,
                type: "Texture2D",
                format: "R8",
                texture: null
            }
        ];
    }
    /*
    ========================================
    Texture Access
    ========================================
    */
    getMaskTexture() {
        return this.getTexture(SSRMaskAttachment.Mask);
    }
    getRoughnessTexture() {
        return this.getTexture(SSRMaskAttachment.Roughness);
    }
    getMetallicTexture() {
        return this.getTexture(SSRMaskAttachment.Metallic);
    }
    getMaterialClassTexture() {
        return this.getTexture(SSRMaskAttachment.MaterialClass);
    }
    getReactiveTexture() {
        return this.getTexture(SSRMaskAttachment.Reactive);
    }
    /*
    ========================================
    Material Classification
    ========================================
    */
    classifyMaterial(material) {
        if (material.emissive) {
            return SSRMaterialClass.Emissive;
        }
        if (material.clearCoat) {
            return SSRMaterialClass.Coated;
        }
        if (material.transparent) {
            return SSRMaterialClass.Glass;
        }
        if (material.metallic >
            this.metallicThreshold) {
            return SSRMaterialClass.Metal;
        }
        return SSRMaterialClass.Opaque;
    }
    /*
    ========================================
    SSR Eligibility Factor
    ========================================
    */
    calculateSSRFactor(material) {
        if (!this.enabled) {
            return 0;
        }
        /*
            Emissive yüzeyler
            reflection üretmez

        */
        if (material.emissive) {
            return 0;
        }
        /*
            Çok rough yüzey

            SSR kapatılır

        */
        if (material.roughness >
            this.roughnessThreshold) {
            return 0;
        }
        /*
            Metal yüzey

            güçlü SSR

        */
        if (material.metallic >
            this.metallicThreshold) {
            return 1.0;
        }
        /*
            Transparent yüzey

        */
        if (material.transparent) {
            return 0.8;
        }
        return 0.35;
    }
    /*
    ========================================
    Roughness Mask
    ========================================
    */
    calculateRoughnessMask(roughness) {
        return Math.max(0, Math.min(1, 1 -
            roughness));
    }
    /*
    ========================================
    Metallic Mask
    ========================================
    */
    calculateMetallicMask(metallic) {
        return Math.max(0, Math.min(1, metallic));
    }
    /*
    ========================================
    Material Evaluation
    ========================================
    */
    evaluateMaterial(material) {
        return {
            factor: this.calculateSSRFactor(material),
            materialClass: this.classifyMaterial(material),
            enabled: this.enabled,
            reactive: material.transparent
                ?
                    1.0
                :
                    0.0
        };
    }
    /*
    ========================================
    Depth Rejection
    ========================================
    */
    depthReject(currentDepth, previousDepth, threshold = 0.01) {
        return Math.abs(currentDepth -
            previousDepth)
            >
                threshold;
    }
    /*
    ========================================
    Normal Rejection
    ========================================
    */
    normalReject(currentNormal, previousNormal, threshold = 0.15) {
        const dot = currentNormal.x *
            previousNormal.x
            +
                currentNormal.y *
                    previousNormal.y
            +
                currentNormal.z *
                    previousNormal.z;
        return (1 -
            dot)
            >
                threshold;
    }
    /*
    ========================================
    Reactive Mask
    ========================================
    */
    calculateReactiveMask(material) {
        if (material.emissive) {
            return 1.0;
        }
        if (material.transparent) {
            return 1.0;
        }
        if (material.clearCoat) {
            return 0.5;
        }
        return 0.0;
    }
    /*
    ========================================
    Temporal History Validation
    ========================================
    */
    validateHistory(currentDepth, previousDepth, currentNormal, previousNormal) {
        if (this.depthReject(currentDepth, previousDepth)) {
            return false;
        }
        if (this.normalReject(currentNormal, previousNormal)) {
            return false;
        }
        return true;
    }
    /*
    ========================================
    Pixel Mask Evaluation
    ========================================
    */
    evaluatePixel(material, depthValid, normalValid) {
        const materialData = this.evaluateMaterial(material);
        let factor = materialData.factor;
        /*
            Temporal rejection

        */
        if (!depthValid ||
            !normalValid) {
            factor = 0;
        }
        return {
            factor,
            materialClass: materialData.materialClass,
            enabled: this.enabled,
            reactive: this.calculateReactiveMask(material)
        };
    }
    /*
    ========================================
    Mask Combination
    ========================================
    */
    combineMasks(ssr, reactive, historyValid) {
        let result = ssr;
        if (reactive >
            0.5) {
            /*
                Dynamic surface

                history azalt

            */
            result *= 0.25;
        }
        if (!historyValid) {
            result = 0;
        }
        return Math.max(0, Math.min(1, result));
    }
    /*
    ========================================
    Shader Setup
    ========================================
    */
    setShader(shader) {
        this.shader = shader;
    }
    /*
    ========================================
    GPU Mask Generation
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
        Mask Parameters
        --------------------------------
        */
        this.shader.setUniform?.("uRoughnessThreshold", this.roughnessThreshold);
        this.shader.setUniform?.("uMetallicThreshold", this.metallicThreshold);
        this.shader.setUniform?.("uFrameIndex", this.frameIndex);
        this.shader.setUniform?.("uEnabled", this.enabled);
        /*
        --------------------------------
        Output Attachments
        --------------------------------
        */
        const mask = this.getMaskTexture();
        const roughness = this.getRoughnessTexture();
        const metallic = this.getMetallicTexture();
        const materialClass = this.getMaterialClassTexture();
        const reactive = this.getReactiveTexture();
        /*
        --------------------------------
        Fullscreen Mask Pass
        --------------------------------
        */
        context.drawFullscreenQuad?.();
        this.rendered = true;
        this.frameIndex++;
        return {
            type: "SSRMaskResult",
            frame: this.frameIndex,
            attachments: {
                mask,
                roughness,
                metallic,
                materialClass,
                reactive
            }
        };
    }
    /*
    ========================================
    Begin / End Render
    ========================================
    */
    begin() {
        this.rendered = false;
    }
    end() {
        this.rendered = true;
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
    Clear Textures
    ========================================
    */
    clear() {
        for (const attachment of this.getAttachments()) {
            attachment.texture =
                null;
        }
        this.rendered = false;
    }
    /*
    ========================================
    Runtime Controls
    ========================================
    */
    setEnabled(enabled) {
        this.enabled = enabled;
    }
    setRoughnessThreshold(value) {
        this.roughnessThreshold =
            Math.max(0, Math.min(1, value));
    }
    setMetallicThreshold(value) {
        this.metallicThreshold =
            Math.max(0, Math.min(1, value));
    }
    /*
    ========================================
    Frame State
    ========================================
    */
    getFrameIndex() {
        return this.frameIndex;
    }
    isRendered() {
        return this.rendered;
    }
    /*
    ========================================
    Reset
    ========================================
    */
    reset() {
        this.rendered = false;
        this.shader = null;
        this.frameIndex = 0;
        this.clear();
    }
    /*
    ========================================
    Release Resources
    ========================================
    */
    release() {
        this.clear();
        this.shader = null;
    }
    /*
    ========================================
    Statistics
    ========================================
    */
    getStats() {
        return {
            enabled: this.enabled,
            rendered: this.rendered,
            frame: this.frameIndex,
            roughnessThreshold: this.roughnessThreshold,
            metallicThreshold: this.metallicThreshold
        };
    }
    /*
    ========================================
    Debug Information
    ========================================
    */
    debugInfo() {
        return {
            type: "SSRMask",
            enabled: this.enabled,
            rendered: this.rendered,
            frame: this.frameIndex,
            roughnessThreshold: this.roughnessThreshold,
            metallicThreshold: this.metallicThreshold,
            resources: {
                shader: this.shader !== null,
                mask: this.getMaskTexture()
                    !==
                        null,
                roughness: this.getRoughnessTexture()
                    !==
                        null,
                metallic: this.getMetallicTexture()
                    !==
                        null,
                materialClass: this.getMaterialClassTexture()
                    !==
                        null,
                reactive: this.getReactiveTexture()
                    !==
                        null
            }
        };
    }
}
//# sourceMappingURL=SSRMask.js.map