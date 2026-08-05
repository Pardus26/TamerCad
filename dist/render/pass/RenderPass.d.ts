export interface RenderResourceAccess {
    reads: string[];
    writes: string[];
}
export interface RenderPassOptions {
    name?: string;
    priority?: number;
    enabled?: boolean;
    clearColor?: boolean;
    clearDepth?: boolean;
}
export declare abstract class RenderPass {
    readonly name: string;
    priority: number;
    enabled: boolean;
    clearColor: boolean;
    clearDepth: boolean;
    constructor(options?: RenderPassOptions);
    initialize(context: RenderContext): void;
    dispose(context: RenderContext): void;
    render(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
    reads(): string[];
    writes(): string[];
    protected begin(context: RenderContext): void;
    protected end(context: RenderContext): void;
    protected onInitialize(context: RenderContext): void;
    protected onDispose(context: RenderContext): void;
    protected abstract execute(context: RenderContext, scene: RenderScene, camera: RenderCamera): void;
}
