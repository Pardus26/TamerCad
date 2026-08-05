export var MaterialType;
(function (MaterialType) {
    MaterialType["Basic"] = "Basic";
    MaterialType["Phong"] = "Phong";
    MaterialType["PBR"] = "PBR";
    MaterialType["Line"] = "Line";
})(MaterialType || (MaterialType = {}));
export class Material {
    id;
    type;
    name;
    color = {
        r: 0.8,
        g: 0.8,
        b: 0.8,
        a: 1.0
    };
    opacity = 1.0;
    transparent = false;
    wireframe = false;
    shader = null;
    uniforms = new Map();
    constructor(name = "Material", type = MaterialType.Basic) {
        this.id =
            Material.generateId();
        this.name = name;
        this.type = type;
    }
    setShader(shader) {
        this.shader = shader;
    }
    getShader() {
        return this.shader;
    }
    setColor(color) {
        this.color = {
            ...color
        };
    }
    setOpacity(opacity) {
        this.opacity = Math.max(0, Math.min(1, opacity));
    }
    setTransparent(value) {
        this.transparent = value;
    }
    setWireframe(value) {
        this.wireframe = value;
    }
    setUniform(name, value) {
        this.uniforms.set(name, value);
    }
    getUniform(name) {
        return this.uniforms.get(name);
    }
    apply() {
        if (!this.shader) {
            return;
        }
        this.shader.setUniform("materialColor", this.color);
        this.shader.setUniform("opacity", this.opacity);
        for (const [name, value] of this.uniforms) {
            this.shader.setUniform(name, value);
        }
    }
    clone() {
        const material = new Material(this.name, this.type);
        material.color = {
            ...this.color
        };
        material.opacity =
            this.opacity;
        material.transparent =
            this.transparent;
        material.wireframe =
            this.wireframe;
        material.shader =
            this.shader;
        material.uniforms =
            new Map(this.uniforms);
        return material;
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            color: this.color,
            opacity: this.opacity,
            transparent: this.transparent,
            wireframe: this.wireframe,
            uniforms: Object.fromEntries(this.uniforms)
        };
    }
    static fromJSON(data) {
        const material = new Material(data.name, data.type);
        material.color =
            data.color;
        material.opacity =
            data.opacity;
        material.transparent =
            data.transparent;
        material.wireframe =
            data.wireframe;
        material.uniforms =
            new Map(Object.entries(data.uniforms ?? {}));
        return material;
    }
    static generateId() {
        return ("material_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 100000));
    }
}
//# sourceMappingURL=Material.js.map