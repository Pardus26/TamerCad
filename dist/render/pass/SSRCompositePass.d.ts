import { SSRBuffer } from "./SSRBuffer";
import { SSRComposite } from "../postprocess/SSRComposite";
import { ReflectionProbeBuffer } from "../postprocess/ReflectionProbeBuffer";
import { EnvironmentMap } from "../postprocess/EnvironmentMap";
import { SSRBRDF } from "../postprocess/SSRBRDF";
export interface SSRCompositePassOptions {
    enabled?: boolean;
    reflectionStrength?: number;
    fresnelPower?: number;
    metallicBoost?: number;
}
export declare enum SSRCompositePassMode {
    SSR = "SSR",
    Probe = "Probe",
    Hybrid = "Hybrid"
}
export interface SSRCompositeInput {
    ssrTexture: any;
    probeTexture?: any;
    environmentTexture?: any;
    material: any;
    viewAngle: number;
}
export declare class SSRCompositePass {
    enabled: boolean;
    mode: SSRCompositePassMode;
    reflectionStrength: number;
    fresnelPower: number;
    metallicBoost: number;
    private ssrBuffer;
    private probe;
    private environment;
    private composite;
    private brdf;
    private initialized;
    constructor(options?: SSRCompositePassOptions);
    setSSRBuffer(buffer: SSRBuffer): void;
    setReflectionProbe(probe: ReflectionProbeBuffer): void;
    setEnvironmentMap(environment: EnvironmentMap): void;
    setComposite(composite: SSRComposite): void;
    setBRDF(brdf: SSRBRDF): void;
    initialize(): void;
    begin(): void;
    private prepareMaterial;
    private resolveReflection;
    private applyBRDF;
    execute(input: SSRCompositeInput): any;
    setMode(mode: SSRCompositePassMode): void;
    resize(width: number, height: number): void;
    clear(): void;
    reset(): void;
    end(): void;
    update(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        initialized: boolean;
        mode: SSRCompositePassMode;
        reflectionStrength: number;
        fresnelPower: number;
        metallicBoost: number;
        resources: {
            ssrBuffer: boolean;
            reflectionProbe: boolean;
            environment: boolean;
            composite: boolean;
            brdf: boolean;
        };
    };
    getState(): {
        pass: string;
        active: boolean;
        mode: SSRCompositePassMode;
        ready: boolean;
    };
    validate(): boolean;
    dispose(): void;
}
