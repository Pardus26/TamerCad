import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { DepthPrepass } from "../postprocess/DepthPrepass";
import { MeshRenderer } from "../renderer/MeshRenderer";
export interface DepthPassOptions {
    depthBuffer?: DepthPrepass;
    renderer?: MeshRenderer;
    reverseZ?: boolean;
}
export declare class DepthPass extends RenderPass {
    private depthBuffer;
    private renderer;
    reverseZ: boolean;
    constructor(options?: DepthPassOptions);
    setDepthBuffer(depth: DepthPrepass): void;
    setRenderer(renderer: MeshRenderer): void;
    protected begin(context: RenderContext): void;
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    private renderDepthMesh;
    protected end(context: RenderContext): void;
    debugInfo(): {
        type: string;
        reverseZ: boolean;
        hasDepthBuffer: boolean;
        hasRenderer: boolean;
    };
}
