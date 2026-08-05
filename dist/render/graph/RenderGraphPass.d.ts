import { RenderGraphResource } from "./RenderGraphResource";
import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
export type RenderGraphExecuteCallback = (context: RenderContext, scene?: RenderScene, camera?: RenderCamera) => void;
export declare class RenderGraphPass {
    readonly name: string;
    priority: number;
    private readonly reads;
    private readonly writes;
    private readonly dependencies;
    private executeCallback;
    constructor(name: string);
    setPriority(priority: number): this;
    read(resource: RenderGraphResource): this;
    write(resource: RenderGraphResource): this;
    dependsOn(pass: RenderGraphPass): this;
    getDependencies(): readonly RenderGraphPass[];
    setExecute(callback: RenderGraphExecuteCallback): this;
    execute(context: RenderContext, scene?: RenderScene, camera?: RenderCamera): void;
    getReads(): readonly RenderGraphResource[];
    getWrites(): readonly RenderGraphResource[];
    hasReads(): boolean;
    hasWrites(): boolean;
    hasDependencies(): boolean;
    clearResources(): void;
    clearDependencies(): void;
    get resources(): {
        reads: string[];
        writes: string[];
    };
    debugInfo(): {
        name: string;
        priority: number;
        reads: string[];
        writes: string[];
        dependencies: string[];
        producerResources: number;
        consumerResources: number;
    };
}
