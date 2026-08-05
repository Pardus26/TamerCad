import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { RenderPass } from "../pass/RenderPass";
import { RenderGraphBuilder } from "../graph/RenderGraphBuilder";
import { RenderGraphCompiler, RenderGraphCompileResult } from "../graph/RenderGraphCompiler";
import { RenderGraphExecutor } from "../graph/RenderGraphExecutor";
import { RenderGraphPass } from "../graph/RenderGraphPass";
import { RenderGraphResourceType } from "../graph/RenderGraphResource";
export interface DeferredRendererOptions {
    context: RenderContext;
}
export interface DeferredRendererStatistics {
    frame: number;
    frameTime: number;
    passCount: number;
    resourceCount: number;
}
export declare class DeferredRenderer {
    protected readonly context: RenderContext;
    protected readonly graphBuilder: RenderGraphBuilder;
    protected readonly compiler: RenderGraphCompiler;
    protected readonly executor: RenderGraphExecutor;
    protected readonly passes: RenderPass[];
    protected initialized: boolean;
    private frame;
    private width;
    private height;
    private frameTime;
    private passCount;
    private resourceCount;
    constructor(options: DeferredRendererOptions);
    initialize(): void;
    dispose(): void;
    addPass(pass: RenderPass): void;
    removePass(pass: RenderPass): void;
    clearPasses(): void;
    private sortPasses;
    getPasses(): readonly RenderPass[];
    resize(width: number, height: number): void;
    getWidth(): number;
    getHeight(): number;
    protected registerResources(): void;
    protected buildGraph(scene: RenderScene, camera: RenderCamera): void;
    protected registerPasses(scene: RenderScene, camera: RenderCamera): void;
    protected connectResources(graphPass: RenderGraphPass, pass: RenderPass): void;
    protected compileGraph(): RenderGraphCompileResult;
    protected executeGraph(result: RenderGraphCompileResult, scene: RenderScene, camera: RenderCamera): void;
    render(scene: RenderScene, camera: RenderCamera): void;
    private beginFrame;
    private endFrame;
    getStatistics(): DeferredRendererStatistics;
    getFrame(): number;
    getFrameTime(): number;
    dumpGraph(): void;
    debugInfo(): {
        renderer: string;
        initialized: boolean;
        frame: number;
        resolution: {
            width: number;
            height: number;
        };
        passes: string[];
        statistics: DeferredRendererStatistics;
        graph: {
            passCount: number;
            resourceCount: number;
            passes: {
                name: string;
                priority: number;
                reads: string[];
                writes: string[];
                dependencies: string[];
                producerResources: number;
                consumerResources: number;
            }[];
            resources: {
                name: string;
                type: RenderGraphResourceType;
                descriptor: import("../graph/RenderGraphResource").RenderGraphResourceDescriptor;
                producer: string | null;
                consumers: string[];
            }[];
        };
    };
    reload(): void;
    saveState(): {
        initialized: boolean;
        frame: number;
        width: number;
        height: number;
        passes: string[];
    };
    restoreState(state: any): void;
    getBackendInfo(): {
        renderer: string;
        api: import("../RenderContext").RenderBackend;
        resolution: {
            width: number;
            height: number;
        };
        frame: number;
    };
    printDebug(): void;
}
