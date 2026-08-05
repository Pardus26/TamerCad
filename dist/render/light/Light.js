export var LightType;
(function (LightType) {
    LightType["Ambient"] = "Ambient";
    LightType["Directional"] = "Directional";
    LightType["Point"] = "Point";
    LightType["Spot"] = "Spot";
})(LightType || (LightType = {}));
export class Light {
    type;
    id;
    enabled = true;
    color = {
        r: 1,
        g: 1,
        b: 1,
        a: 1
    };
    intensity = 1.0;
    constructor(type, name = "Light") {
        this.type = type;
        this.id =
            Light.generateId();
    }
    setColor(color) {
        this.color = {
            ...color
        };
    }
    setIntensity(value) {
        this.intensity =
            Math.max(0, value);
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    isEnabled() {
        return this.enabled;
    }
    getLightData() {
        return {
            id: this.id,
            type: this.type,
            color: this.color,
            intensity: this.intensity,
            enabled: this.enabled
        };
    }
    clone() {
        const light = new Light(this.type);
        light.color = {
            ...this.color
        };
        light.intensity =
            this.intensity;
        light.enabled =
            this.enabled;
        return light;
    }
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            color: this.color,
            intensity: this.intensity,
            enabled: this.enabled
        };
    }
    static fromJSON(data) {
        const light = new Light(data.type);
        light.color =
            data.color;
        light.intensity =
            data.intensity;
        light.enabled =
            data.enabled;
        return light;
    }
    static generateId() {
        return ("light_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 100000));
    }
}
//# sourceMappingURL=Light.js.map