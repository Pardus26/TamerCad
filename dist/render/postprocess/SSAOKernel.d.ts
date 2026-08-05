export interface SSAOKernelSample {
    x: number;
    y: number;
    z: number;
}
export declare class SSAOKernel {
    private samples;
    constructor(sampleCount?: number);
    generate(sampleCount: number): void;
    getSamples(): readonly SSAOKernelSample[];
    getFlatArray(): Float32Array;
    private lerp;
    debugInfo(): {
        sampleCount: number;
    };
}
