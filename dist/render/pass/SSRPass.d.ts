import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { SSRBuffer } from "../postprocess/SSRBuffer";
export declare class SSRPass extends RenderPass {
    private buffer;
    private readonly trace;
    private readonly resolve;
    private readonly temporal;
    private readonly denoise;
    private readonly composite;
    constructor();
    reads(): string[];
    writes(): string[];
    setBuffer(buffer: SSRBuffer): void;
    protected begin(context: RenderContext): void;
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    protected end(context: RenderContext): void;
}
