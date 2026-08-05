import { RenderGraphPass } from "./RenderGraphPass";
import { RenderGraphResource, RenderGraphResourceDescriptor, RenderGraphResourceType } from "./RenderGraphResource";
export declare class RenderGraphBuilder {
    private readonly passes;
    private readonly resources;
    createPass(name: string, priority?: number): RenderGraphPass;
    createResource(name: string, type: RenderGraphResourceType, descriptor?: RenderGraphResourceDescriptor): RenderGraphResource;
    connectRead(pass: RenderGraphPass, resource: RenderGraphResource): this;
    connectWrite(pass: RenderGraphPass, resource: RenderGraphResource): this;
    read(pass: RenderGraphPass, resource: RenderGraphResource): this;
    write(pass: RenderGraphPass, resource: RenderGraphResource): this;
    dependency(before: RenderGraphPass, after: RenderGraphPass): this;
    getPasses(): readonly RenderGraphPass[];
    getResource(name: string): RenderGraphResource | undefined;
    getResources(): readonly RenderGraphResource[];
    validate(): boolean;
    clear(): void;
    debugInfo(): {
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
            descriptor: RenderGraphResourceDescriptor;
            producer: string | null;
            consumers: string[];
        }[];
    };
}
