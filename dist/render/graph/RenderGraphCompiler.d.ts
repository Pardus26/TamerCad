import { RenderGraphPass } from "./RenderGraphPass";
import { RenderGraphResource } from "./RenderGraphResource";
export interface RenderGraphBarrier {
    resource: string;
    before: string;
    after: string;
}
export interface RenderGraphResourceLifetime {
    resource: string;
    firstUse: number;
    lastUse: number;
}
export interface RenderGraphCompileResult {
    executionOrder: RenderGraphPass[];
    barriers: RenderGraphBarrier[];
    lifetimes: RenderGraphResourceLifetime[];
}
export declare class RenderGraphCompiler {
    compile(passes: RenderGraphPass[], resources: RenderGraphResource[]): RenderGraphCompileResult;
    private sortPasses;
    private buildBarriers;
    private calculateLifetime;
    debugInfo(result: RenderGraphCompileResult): {
        executionOrder: string[];
        barriers: RenderGraphBarrier[];
        lifetimes: RenderGraphResourceLifetime[];
    };
}
