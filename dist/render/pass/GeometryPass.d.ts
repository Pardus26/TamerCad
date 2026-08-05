import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { GBuffer } from "../postprocess/GBuffer";
import { MeshRenderer } from "../renderer/MeshRenderer";
export interface GeometryPassOptions {
    gBuffer?: GBuffer;
    renderer?: MeshRenderer;
}
export declare class GeometryPass extends RenderPass {
    private gBuffer;
    private renderer;
    constructor(options?: GeometryPassOptions);
    reads(): string[];
    writes(): string[];
    setGBuffer(buffer: GBuffer): void;
    setRenderer(renderer: MeshRenderer): void;
    protected begin(context: RenderContext): void;
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    private renderMesh;
    protected end(context: RenderContext): void;
}
