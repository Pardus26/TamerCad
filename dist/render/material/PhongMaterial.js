import { Material, MaterialType } from "./Material";
export class PhongMaterial extends Material {
    ambient = 0.2;
    diffuse = 0.8;
    specular = 0.5;
    shininess = 32;
    constructor(name = "Phong Material", options = {}) {
        super(name, MaterialType.Phong);
        if (options.color) {
            this.color = {
                ...options.color
            };
        }
        if (options.ambient !== undefined) {
            this.ambient =
                options.ambient;
        }
        if (options.diffuse !== undefined) {
            this.diffuse =
                options.diffuse;
        }
        if (options.specular !== undefined) {
            this.specular =
                options.specular;
        }
        if (options.shininess !== undefined) {
            this.shininess =
                options.shininess;
        }
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
        shader.setUniform("materialAmbient", this.ambient);
        shader.setUniform("materialDiffuse", this.diffuse);
        shader.setUniform("materialSpecular", this.specular);
        shader.setUniform("materialShininess", this.shininess);
    }
    clone() {
        const material = new PhongMaterial(this.name, {
            color: {
                ...this.color
            },
            ambient: this.ambient,
            diffuse: this.diffuse,
            specular: this.specular,
            shininess: this.shininess
        });
        return material;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            ambient: this.ambient,
            diffuse: this.diffuse,
            specular: this.specular,
            shininess: this.shininess
        };
    }
    static fromJSON(data) {
        return new PhongMaterial(data.name, {
            color: data.color,
            ambient: data.ambient,
            diffuse: data.diffuse,
            specular: data.specular,
            shininess: data.shininess
        });
    }
}
//# sourceMappingURL=PhongMaterial.js.map