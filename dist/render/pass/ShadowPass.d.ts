import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { MeshRenderer } from "../renderer/MeshRenderer";
import { DirectionalShadow } from "../shadow/DirectionalShadow";
import { PointShadow } from "../shadow/PointShadow";
import { SpotShadow } from "../shadow/SpotShadow";
export interface ShadowPassOptions {
    renderer?: MeshRenderer;
}
export declare class ShadowPass extends RenderPass {
    private renderer;
    private directional;
    private point;
    private spot;
    constructor(options?: ShadowPassOptions);
    setRenderer(renderer: MeshRenderer): void;
    addDirectionalShadow(shadow: DirectionalShadow): void;
    addPointShadow(shadow: PointShadow): void;
    addSpotShadow(shadow: SpotShadow): void;
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    private renderDirectional;
    private renderPoint;
    private renderSpot;
    private renderSceneDepth;
    clear(): void;
    debugInfo(): {
        type: string;
        directional: number;
        point: number;
        spot: number;
    };
}
