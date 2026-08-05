export var EnvironmentMapType;
(function (EnvironmentMapType) {
    EnvironmentMapType["Cube"] = "Cube";
    EnvironmentMapType["Equirectangular"] = "Equirectangular";
    EnvironmentMapType["HDR"] = "HDR";
})(EnvironmentMapType || (EnvironmentMapType = {}));
export class EnvironmentMap {
    type = EnvironmentMapType.Cube;
    /**
     * HDR texture
     */
    texture = null;
    /**
     * IBL diffuse irradiance
     */
    irradiance = null;
    /**
     * Prefiltered specular map
     */
    prefiltered = null;
    /**
     * Ortam ışık yoğunluğu
     */
    intensity = 1.0;
    /**
     * Environment rotation
     */
    rotation = 0.0;
    /**
     * HDR exposure
     */
    exposure = 1.0;
    format = "RGBA16F";
    constructor(options = {}) {
        if (options.format) {
            this.format =
                options.format;
        }
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
        if (options.rotation !== undefined) {
            this.rotation =
                options.rotation;
        }
        if (options.exposure !== undefined) {
            this.exposure =
                options.exposure;
        }
    }
    load(source, type = EnvironmentMapType.HDR) {
        this.type =
            type;
        /**
         * Gerçek GPU implementasyonunda:
         *
         * HDR texture upload
         * equirectangular conversion
         * cubemap generation
         */
        this.texture = {
            source,
            type
        };
    }
    generateCubeMap() {
        if (!this.texture) {
            return;
        }
        this.texture = {
            type: "GeneratedCubeMap",
            format: this.format
        };
    }
    generateIrradiance() {
        /**
         * Diffuse convolution
         *
         * Lambertian environment lighting
         */
        this.irradiance = {
            type: "IrradianceCubeMap"
        };
    }
    generatePrefiltered() {
        /**
         * Specular IBL
         *
         * Roughness mip chain
         */
        this.prefiltered = {
            type: "PrefilteredEnvironment"
        };
    }
    getTexture() {
        return this.texture;
    }
    getIrradiance() {
        return this.irradiance;
    }
    getPrefiltered() {
        return this.prefiltered;
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, value);
    }
    setRotation(value) {
        this.rotation =
            value;
    }
    setExposure(value) {
        this.exposure =
            Math.max(0, value);
    }
    bind(shader) {
        if (!shader) {
            return;
        }
        shader.setUniform("environmentMap", this.texture);
        shader.setUniform("irradianceMap", this.irradiance);
        shader.setUniform("prefilteredMap", this.prefiltered);
        shader.setUniform("environmentIntensity", this.intensity);
        shader.setUniform("environmentRotation", this.rotation);
        shader.setUniform("environmentExposure", this.exposure);
    }
    dispose() {
        this.texture = null;
        this.irradiance = null;
        this.prefiltered = null;
    }
    toJSON() {
        return {
            type: this.type,
            format: this.format,
            intensity: this.intensity,
            rotation: this.rotation,
            exposure: this.exposure
        };
    }
}
//# sourceMappingURL=EnvironmentMap.js.map