import { Material, MaterialType } from "./Material";
export class PBRMaterial extends Material {
    /**
     * Metallic value
     *
     * 0 = dielectric
     * 1 = metal
     */
    metallic = 0.0;
    /**
     * Surface roughness
     *
     * 0 = mirror
     * 1 = rough
     */
    roughness = 0.5;
    emission = {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    };
    albedoMap = null;
    normalMap = null;
    metallicMap = null;
    roughnessMap = null;
    constructor(name = "PBR Material", options = {}) {
        super(name, MaterialType.PBR);
        if (options.color) {
            this.color = {
                ...options.color
            };
        }
        if (options.metallic !== undefined) {
            this.metallic =
                this.clamp(options.metallic);
        }
        if (options.roughness !== undefined) {
            this.roughness =
                this.clamp(options.roughness);
        }
        if (options.emission) {
            this.emission = {
                ...options.emission
            };
        }
        this.albedoMap =
            options.albedoMap ??
                null;
        this.normalMap =
            options.normalMap ??
                null;
        this.metallicMap =
            options.metallicMap ??
                null;
        this.roughnessMap =
            options.roughnessMap ??
                null;
    }
    setShader(shader) {
        super.setShader(shader);
    }
    apply() {
        super.apply();
        const shader = this.getShader();
        if (!shader) {
            return;
        }
        shader.setUniform("materialMetallic", this.metallic);
        shader.setUniform("materialRoughness", this.roughness);
        shader.setUniform("materialEmission", this.emission);
        shader.setUniform("hasAlbedoMap", this.albedoMap !== null);
        shader.setUniform("hasNormalMap", this.normalMap !== null);
        shader.setUniform("hasMetallicMap", this.metallicMap !== null);
        shader.setUniform("hasRoughnessMap", this.roughnessMap !== null);
    }
    setMetallic(value) {
        this.metallic =
            this.clamp(value);
    }
    setRoughness(value) {
        this.roughness =
            this.clamp(value);
    }
    isMetal() {
        return this.metallic >= 0.5;
    }
    clone() {
        return new PBRMaterial(this.name, {
            color: {
                ...this.color
            },
            metallic: this.metallic,
            roughness: this.roughness,
            emission: {
                ...this.emission
            },
            albedoMap: this.albedoMap ?? undefined,
            normalMap: this.normalMap ?? undefined,
            metallicMap: this.metallicMap ?? undefined,
            roughnessMap: this.roughnessMap ?? undefined
        });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            metallic: this.metallic,
            roughness: this.roughness,
            emission: this.emission,
            albedoMap: this.albedoMap,
            normalMap: this.normalMap,
            metallicMap: this.metallicMap,
            roughnessMap: this.roughnessMap
        };
    }
    static fromJSON(data) {
        return new PBRMaterial(data.name, {
            color: data.color,
            metallic: data.metallic,
            roughness: data.roughness,
            emission: data.emission,
            albedoMap: data.albedoMap,
            normalMap: data.normalMap,
            metallicMap: data.metallicMap,
            roughnessMap: data.roughnessMap
        });
    }
    clamp(value) {
        return Math.max(0, Math.min(1, value));
    }
}
//# sourceMappingURL=PBRMaterial.js.map