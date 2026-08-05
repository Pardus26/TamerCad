import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
export declare class SSAOPass extends RenderPass {
    private gBuffer;
    private output;
    private shader;
    radius: number;
    bias: number;
    power: number;
    constructor();
    reads(): string[];
    writes(): string[];
    protected begin(context: RenderContext): void;
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    protected end(context: RenderContext): void;
}
