export interface SSAONoiseSample {
    x: number;
    y: number;
    z: number;
}
export declare class SSAONoise {
    private readonly size;
    private samples;
    constructor();
    private generate;
    getSize(): number;
    getSamples(): readonly SSAONoiseSample[];
    getFlatArray(): Float32Array;
    regenerate(): void;
    debugInfo(): {
        size: number;
        sampleCount: number;
    };
}
