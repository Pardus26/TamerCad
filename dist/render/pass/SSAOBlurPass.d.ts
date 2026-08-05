import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { SSAOBuffer } from "../postprocess/SSAOBuffer";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSAOBlurPassOptions {
    input?: SSAOBuffer;
    output?: SSAOBuffer;
    shader?: ShaderProgram;
}
export declare class SSAOBlurPass extends RenderPass {
    private input;
    private output;
    private shader;
    constructor(options?: SSAOBlurPassOptions);
    setInput(buffer: SSAOBuffer): void;
    setOutput(buffer: SSAOBuffer): void;
    setShader(shader: ShaderProgram): void;
    protected begin(context: RenderContext): void;
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    protected end(context: RenderContext): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        hasInput: boolean;
        hasOutput: boolean;
        hasShader: boolean;
    };
}
