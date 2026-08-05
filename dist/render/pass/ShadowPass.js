import { RenderPass } from "./RenderPass";
export class ShadowPass extends RenderPass {
    renderer = null;
    directional = [];
    point = [];
    spot = [];
    constructor(options = {}) {
        super({
            name: "ShadowPass",
            priority: 150,
            clearDepth: true
        });
        if (options.renderer) {
            this.renderer =
                options.renderer;
        }
    }
    setRenderer(renderer) {
        this.renderer =
            renderer;
    }
    addDirectionalShadow(shadow) {
        this.directional.push(shadow);
    }
    addPointShadow(shadow) {
        this.point.push(shadow);
    }
    addSpotShadow(shadow) {
        this.spot.push(shadow);
    }
    execute(context, scene, camera) {
        this.renderDirectional(context, scene);
        this.renderPoint(context, scene);
        this.renderSpot(context, scene);
    }
    renderDirectional(context, scene) {
        for (const shadow of this.directional) {
            shadow.begin?.();
            this.renderSceneDepth(context, scene, shadow.light);
            shadow.end?.();
        }
    }
    renderPoint(context, scene) {
        for (const shadow of this.point) {
            shadow.begin?.();
            this.renderSceneDepth(context, scene, shadow.light);
            shadow.end?.();
        }
    }
    renderSpot(context, scene) {
        for (const shadow of this.spot) {
            shadow.begin?.();
            this.renderSceneDepth(context, scene, shadow.light);
            shadow.end?.();
        }
    }
    renderSceneDepth(context, scene, light) {
        if (!this.renderer) {
            return;
        }
        const meshes = scene.getMeshes
            ? scene.getMeshes()
            : [];
        for (const mesh of meshes) {
            if (!mesh.visible) {
                continue;
            }
            if (mesh.castShadow === false) {
                continue;
            }
            this.renderer.renderDepth?.(context, mesh, light);
        }
    }
    clear() {
        this.directional.length = 0;
        this.point.length = 0;
        this.spot.length = 0;
    }
    debugInfo() {
        return {
            type: "ShadowPass",
            directional: this.directional.length,
            point: this.point.length,
            spot: this.spot.length
        };
    }
}
//# sourceMappingURL=ShadowPass.js.map