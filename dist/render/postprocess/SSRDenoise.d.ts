import { SSRBuffer } from "./SSRBuffer";
import { SSRHistoryBuffer } from "./SSRHistoryBuffer";
import { NormalPrepass } from "./NormalPrepass";
import { DepthPrepass } from "./DepthPrepass";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRDenoiseOptions {
    radius?: number;
    iterations?: number;
    normalThreshold?: number;
    depthThreshold?: number;
    enabled?: boolean;
    sigma?: number;
}
export declare enum SSRDenoiseMode {
    Gaussian = "Gaussian",
    Bilateral = "Bilateral",
    EdgeAware = "EdgeAware"
}
export interface SSRDenoiseSample {
    color: any;
    normal: any;
    depth: number;
    weight: number;
}
export interface SSRDenoiseResult {
    color: any;
    iterations: number;
    mode: SSRDenoiseMode;
}
export declare class SSRDenoise {
    enabled: boolean;
    radius: number;
    iterations: number;
    normalThreshold: number;
    depthThreshold: number;
    sigma: number;
    mode: SSRDenoiseMode;
    private ssrBuffer;
    private history;
    private normal;
    private depth;
    private shader;
    private frameIndex;
    constructor(options?: SSRDenoiseOptions);
    setSSRBuffer(buffer: SSRBuffer): void;
    setHistoryBuffer(buffer: SSRHistoryBuffer): void;
    setNormalBuffer(buffer: NormalPrepass): void;
    setDepthBuffer(buffer: DepthPrepass): void;
    setShader(shader: ShaderProgram): void;
    generateKernel(): number[];
    spatialWeight(distance: number): number;
    normalWeight(center: any, sample: any): number;
    depthWeight(centerDepth: number, sampleDepth: number): number;
    calculateWeight(center: any, sample: any, distance: number): number;
    sampleNeighborhood(texture: any, x: number, y: number): SSRDenoiseSample[];
    bilateralFilter(input: any): any;
    edgeAwareFilter(input: any): any;
    applyFilter(input: any): any;
    denoise(reflection: any): any;
    private pingPong;
    execute(context: any): any;
    resize(width: number, height: number): void;
    setRadius(radius: number): void;
    setIterations(iterations: number): void;
    setMode(mode: SSRDenoiseMode): void;
    setEnabled(enabled: boolean): void;
    invalidateHistory(): void;
    reset(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        mode: SSRDenoiseMode;
        radius: number;
        iterations: number;
        sigma: number;
        normalThreshold: number;
        depthThreshold: number;
        frame: number;
        resources: {
            ssrBuffer: boolean;
            history: boolean;
            normal: boolean;
            depth: boolean;
            shader: boolean;
        };
    };
}
