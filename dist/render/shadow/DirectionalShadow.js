import { ShadowMap } from "./ShadowMap";
import { RenderCamera } from "../RenderCamera";
import { Point3 } from "../../geometry/primitives/Point3";
export class DirectionalShadow {
    shadowMap;
    camera;
    light;
    cameraSize = 20;
    near = 0.1;
    far = 100;
    bias = 0.005;
    enabled = true;
    constructor(light, options = {}) {
        this.light =
            light;
        this.shadowMap =
            new ShadowMap({
                width: options.mapSize ?? 2048,
                height: options.mapSize ?? 2048,
                bias: options.bias
            });
        this.cameraSize =
            options.cameraSize ??
                20;
        this.near =
            options.near ??
                0.1;
        this.far =
            options.far ??
                100;
        this.camera =
            new RenderCamera();
    }
    update() {
        /**
         * Directional shadow camera
         *
         * ışık yönüne göre
         * ortografik kamera ayarlanır.
         */
        const direction = this.light.getDirection();
        const position = new Point3(-direction.x * 50, -direction.y * 50, -direction.z * 50);
        this.camera.position =
            position;
        this.camera.lookAt(new Point3(0, 0, 0));
    }
    renderShadow(context, scene) {
        if (!this.enabled) {
            return;
        }
        /**
         * Shadow pass
         *
         * 1. Shadow camera aktif
         *
         * 2. Scene depth render
         *
         * 3. Depth texture oluştur
         */
        this.shadowMap.bind(context);
        if (scene &&
            typeof scene.renderDepth ===
                "function") {
            scene.renderDepth(this.camera);
        }
        this.shadowMap.unbind(context);
    }
    setLight(light) {
        this.light =
            light;
    }
    setEnabled(value) {
        this.enabled =
            value;
    }
    isEnabled() {
        return this.enabled;
    }
    setBias(value) {
        this.bias =
            Math.max(0, value);
        this.shadowMap.setBias(this.bias);
    }
    getShadowMap() {
        return this.shadowMap;
    }
    getCamera() {
        return this.camera;
    }
    toJSON() {
        return {
            enabled: this.enabled,
            cameraSize: this.cameraSize,
            near: this.near,
            far: this.far,
            bias: this.bias,
            shadowMap: this.shadowMap.toJSON()
        };
    }
}
//# sourceMappingURL=DirectionalShadow.js.map