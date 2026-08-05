import { Light, LightType } from "./Light";
export class AmbientLight extends Light {
    constructor(name = "Ambient Light", options = {}) {
        super(LightType.Ambient, name);
        if (options.color) {
            this.color = {
                ...options.color
            };
        }
        if (options.intensity !== undefined) {
            this.intensity =
                Math.max(0, options.intensity);
        }
    }
    setAmbientColor(color) {
        this.color = {
            ...color
        };
    }
    setAmbientIntensity(intensity) {
        this.intensity =
            Math.max(0, intensity);
    }
    applyToShader(shader) {
        if (!shader) {
            return;
        }
        /**
         * Ambient lighting uniform
         *
         * Shader tarafında:
         *
         * finalColor =
         * materialColor *
         * ambientLight
         */
        if (typeof shader.setUniform ===
            "function") {
            shader.setUniform("ambientLightColor", this.color);
            shader.setUniform("ambientLightIntensity", this.intensity);
        }
    }
    getLightData() {
        return {
            ...super.getLightData(),
            ambient: true
        };
    }
    clone() {
        return new AmbientLight("Ambient Light Copy", {
            color: {
                ...this.color
            },
            intensity: this.intensity
        });
    }
    toJSON() {
        return {
            ...super.toJSON()
        };
    }
    static fromJSON(data) {
        return new AmbientLight(data.name, {
            color: data.color,
            intensity: data.intensity
        });
    }
}
//# sourceMappingURL=AmbientLight.js.map