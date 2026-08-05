import { Light, LightType } from "./Light";
import { Point3 } from "../../geometry/primitives/Point3";
export class SpotLight extends Light {
    /**
     * Işık başlangıç noktası
     */
    position = new Point3(0, 0, 0);
    /**
     * Işık yönü
     */
    direction = new Point3(0, -1, 0);
    /**
     * Konik ışık açısı
     *
     * Radyan
     */
    angle = Math.PI / 4;
    /**
     * Yumuşak geçiş bölgesi
     */
    penumbra = 0;
    /**
     * Maksimum mesafe
     */
    distance = 0;
    /**
     * Işık düşüş katsayısı
     */
    decay = 2;
    constructor(name = "Spot Light", options = {}) {
        super(LightType.Spot, name);
        if (options.position) {
            this.position =
                options.position;
        }
        if (options.direction) {
            this.direction =
                options.direction;
        }
        if (options.color) {
            this.color = {
                ...options.color
            };
        }
        if (options.intensity !== undefined) {
            this.intensity =
                options.intensity;
        }
        if (options.angle !== undefined) {
            this.angle =
                options.angle;
        }
        if (options.penumbra !== undefined) {
            this.penumbra =
                options.penumbra;
        }
        if (options.distance !== undefined) {
            this.distance =
                options.distance;
        }
        if (options.decay !== undefined) {
            this.decay =
                options.decay;
        }
    }
    setPosition(position) {
        this.position =
            position;
    }
    getPosition() {
        return new Point3(this.position.x, this.position.y, this.position.z);
    }
    setDirection(direction) {
        this.direction =
            direction;
    }
    getDirection() {
        return new Point3(this.direction.x, this.direction.y, this.direction.z);
    }
    setAngle(angle) {
        this.angle =
            Math.max(0, Math.min(Math.PI, angle));
    }
    setPenumbra(value) {
        this.penumbra =
            Math.max(0, Math.min(1, value));
    }
    calculateSpotEffect(lightDirection) {
        /**
         * Spot konisi hesaplama.
         *
         * cos(theta)
         */
        const dot = this.direction.x *
            lightDirection.x +
            this.direction.y *
                lightDirection.y +
            this.direction.z *
                lightDirection.z;
        const limit = Math.cos(this.angle);
        if (dot < limit) {
            return 0;
        }
        if (this.penumbra === 0) {
            return 1;
        }
        const edge = (dot - limit) /
            this.penumbra;
        return Math.max(0, Math.min(1, edge));
    }
    getLightData() {
        return {
            ...super.getLightData(),
            position: this.position,
            direction: this.direction,
            angle: this.angle,
            penumbra: this.penumbra,
            distance: this.distance,
            decay: this.decay
        };
    }
    clone() {
        return new SpotLight("Spot Light Copy", {
            position: this.getPosition(),
            direction: this.getDirection(),
            color: {
                ...this.color
            },
            intensity: this.intensity,
            angle: this.angle,
            penumbra: this.penumbra,
            distance: this.distance,
            decay: this.decay
        });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            position: this.position,
            direction: this.direction,
            angle: this.angle,
            penumbra: this.penumbra,
            distance: this.distance,
            decay: this.decay
        };
    }
    static fromJSON(data) {
        return new SpotLight(data.name, {
            position: data.position,
            direction: data.direction,
            color: data.color,
            intensity: data.intensity,
            angle: data.angle,
            penumbra: data.penumbra,
            distance: data.distance,
            decay: data.decay
        });
    }
}
//# sourceMappingURL=SpotLight.js.map