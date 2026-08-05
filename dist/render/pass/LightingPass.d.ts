import { RenderPass } from "./RenderPass";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { GBuffer } from "../postprocess/GBuffer";
import { EnvironmentMap } from "../postprocess/EnvironmentMap";
import { ReflectionProbeBuffer } from "../postprocess/ReflectionProbeBuffer";
import { SSRComposite } from "../postprocess/SSRComposite";
import { MeshRenderer } from "../renderer/MeshRenderer";
export interface LightingPassOptions {
    renderer?: MeshRenderer;
    gBuffer?: GBuffer;
    environment?: EnvironmentMap;
    reflectionProbe?: ReflectionProbeBuffer;
    ssrComposite?: SSRComposite;
}
export declare class LightingPass extends RenderPass {
    private renderer;
    private gBuffer;
    private environment;
    private reflectionProbe;
    private ssrComposite;
    constructor(options?: LightingPassOptions);
    reads(): string[];
    writes(): string[];
    protected execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    debugInfo(): {
        type: string;
        gBuffer: boolean;
        environment: boolean;
    };
}
