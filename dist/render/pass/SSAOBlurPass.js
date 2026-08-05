import { RenderPass } from "./RenderPass";
export class SSAOBlurPass extends RenderPass {
    input = null;
    output = null;
    shader = null;
    constructor(options = {}) {
        super({
            name: "SSAOBlurPass",
            priority: 176
        });
        this.input = options.input ?? null;
        this.output = options.output ?? null;
        this.shader = options.shader ?? null;
    }
    setInput(buffer) {
        this.input = buffer;
    }
    setOutput(buffer) {
        this.output = buffer;
    }
    setShader(shader) {
        this.shader = shader;
    }
    begin(context) {
        this.output?.bind();
        super.begin(context);
    }
    execute(context, scene, camera) {
        if (!this.shader ||
            !this.input) {
            return;
        }
        this.shader.bind();
        this.input.bind();
        context.drawFullscreenQuad?.();
    }
    end(context) {
        this.output?.unbind();
    }
    resize(width, height) {
        this.output?.resize?.(width, height);
    }
    debugInfo() {
        return {
            type: "SSAOBlurPass",
            hasInput: this.input !== null,
            hasOutput: this.output !== null,
            hasShader: this.shader !== null
        };
    }
}
//# sourceMappingURL=SSAOBlurPass.js.map