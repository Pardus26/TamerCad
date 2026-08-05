import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";
import { RenderGraphPass } from "./RenderGraphPass";
import { RenderGraphCompileResult } from "./RenderGraphCompiler";
export interface RenderGraphExecutionOptions {
    scene?: RenderScene;
    camera?: RenderCamera;
}
export declare class RenderGraphExecutor {
    private lastExecution;
    private executionTime;
    private barrierCount;
    execute(context: RenderContext, compileResult: RenderGraphCompileResult, options?: RenderGraphExecutionOptions): void;
    private reset;
    private applyBarriers;
    private beginPass;
    private endPass;
    getLastExecution(): readonly RenderGraphPass[];
    getExecutionTime(passName: string): number;
    debugInfo(): {
        executed: string[];
        timings: {
            [k: string]: number;
        };
        barriers: number;
    };
}
