import { RenderPass } from "./RenderPass";
export class SSAOPass extends RenderPass {
    gBuffer = null;
    output = null;
    shader = null;
    radius = 0.5;
    bias = 0.025;
    power = 1.5;
    constructor() {
        super({
            name: "SSAOPass",
            priority: 175
        });
    }
    reads() {
        return [
            "GBuffer_Position",
            "GBuffer_Normal"
        ];
    }
    writes() {
        return [
            "SSAO"
        ];
    }
    begin(context) {
        this.output?.bind();
        super.begin(context);
    }
    execute(context, scene, camera) {
        if (!this.shader ||
            !this.gBuffer)
            return;
        this.shader.bind();
        this.gBuffer.bind();
        this.shader.setUniform?.("uRadius", this.radius);
        this.shader.setUniform?.("uBias", this.bias);
        this.shader.setUniform?.("uPower", this.power);
        context.drawFullscreenQuad?.();
    }
    end(context) {
        this.output?.unbind();
    }
}
//# sourceMappingURL=SSAOPass.js.map