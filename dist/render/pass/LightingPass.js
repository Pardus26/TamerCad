import { RenderPass } from "./RenderPass";
export class LightingPass extends RenderPass {
    renderer = null;
    gBuffer = null;
    environment = null;
    reflectionProbe = null;
    ssrComposite = null;
    constructor(options = {}) {
        super({
            name: "LightingPass",
            priority: 200
        });
        this.renderer =
            options.renderer ?? null;
        this.gBuffer =
            options.gBuffer ?? null;
        this.environment =
            options.environment ?? null;
        this.reflectionProbe =
            options.reflectionProbe ?? null;
        this.ssrComposite =
            options.ssrComposite ?? null;
    }
    reads() {
        return [
            "Depth",
            "GBuffer_Position",
            "GBuffer_Normal",
            "GBuffer_Albedo",
            "GBuffer_Material",
            "SSAO",
            "SSR"
        ];
    }
    writes() {
        return [
            "HDR_Lighting"
        ];
    }
    execute(context, scene, camera) {
        if (!this.gBuffer)
            return;
        this.gBuffer.bind();
        const lights = scene.getLights
            ? scene.getLights()
            : [];
        for (const light of lights) {
            this.renderer?.renderLight?.(context, light, camera);
        }
        this.environment?.bind?.();
    }
    debugInfo() {
        return {
            type: "LightingPass",
            gBuffer: this.gBuffer !== null,
            environment: this.environment !== null
        };
    }
}
//# sourceMappingURL=LightingPass.js.map