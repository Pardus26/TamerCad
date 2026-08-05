import { Light, LightType } from "./Light";
import { Point3 } from "../../geometry/primitives/Point3";
export class DirectionalLight extends Light {
    /**
     * Işık yönü
     *
     * Normalize edilecek yön vektörü
     */
    direction = new Point3(0, -1, 0);
    constructor(name = "Directional Light", options = {}) {
        super(LightType.Directional, name);
        if (options.direction) {
            this.direction =
                options.direction;
        }
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
        if (options.color) {
            this.color = {
                ...options.color
            };
        }
    }
    setDirection(direction) {
        this.direction =
            direction;
    }
    getDirection() {
        return new Point3(this.direction.x, this.direction.y, this.direction.z);
    }
    getLightData() {
        return {
            ...super.getLightData(),
            direction: this.direction
        };
    }
    clone() {
        return new DirectionalLight(this.id, {
            direction: this.getDirection(),
            intensity: this.intensity,
            color: {
                ...this.color
            }
        });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            direction: this.direction
        };
    }
    static fromJSON(data) {
        return new DirectionalLight(data.name, {
            direction: data.direction,
            intensity: data.intensity,
            color: data.color
        });
    }
}
//# sourceMappingURL=DirectionalLight.js.map