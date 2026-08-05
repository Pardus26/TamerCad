import { SSRBuffer } from "./SSRBuffer";
import { SSRHistoryBuffer } from "./SSRHistoryBuffer";
import { ReflectionProbeBuffer } from "./ReflectionProbeBuffer";
import { EnvironmentMap } from "./EnvironmentMap";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRCompositeOptions {
    fresnelPower?: number;
    reflectionStrength?: number;
    roughnessBlend?: number;
    metallicBoost?: number;
    enabled?: boolean;
    energyConservation?: boolean;
}
export declare enum SSRCompositeMode {
    SSROnly = "SSROnly",
    ProbeOnly = "ProbeOnly",
    Hybrid = "Hybrid"
}
export interface SSRMaterial {
    roughness: number;
    metallic: number;
    albedo: any;
}
export interface SSRCompositeInput {
    ssr: any;
    probe: any;
    environment: any;
    material: SSRMaterial;
    viewAngle: number;
    confidence: number;
}
export interface SSRCompositeResult {
    color: any;
    ssrWeight: number;
    probeWeight: number;
    environmentUsed: boolean;
}
export declare class SSRComposite {
    enabled: boolean;
    fresnelPower: number;
    reflectionStrength: number;
    roughnessBlend: number;
    metallicBoost: number;
    energyConservation: boolean;
    mode: SSRCompositeMode;
    private ssr;
    private history;
    private probe;
    private environment;
    private shader;
    private frameIndex;
    constructor(options?: SSRCompositeOptions);
    setSSRBuffer(buffer: SSRBuffer): void;
    setHistoryBuffer(buffer: SSRHistoryBuffer): void;
    setReflectionProbe(buffer: ReflectionProbeBuffer): void;
    setEnvironmentMap(environment: EnvironmentMap): void;
    setShader(shader: ShaderProgram): void;
    fresnelSchlick(cosTheta: number, f0?: number): number;
    fresnel(viewAngle: number): number;
    calculateRoughnessFactor(roughness: number): number;
    calculateMetallicFactor(metallic: number): number;
    calculateConfidence(confidence: number): number;
    calculateSSRWeight(material: SSRMaterial, viewAngle: number, confidence: number): number;
    calculateProbeWeight(material: SSRMaterial, viewAngle: number): number;
    calculateEnvironmentWeight(material: SSRMaterial, confidence: number): number;
    applyEnergyConservation(reflection: number, diffuse: number): number;
    combineReflection(ssr: any, probe: any, environment: any, ssrWeight: number, probeWeight: number, environmentWeight: number): any;
    resolveHybrid(input: SSRCompositeInput): SSRCompositeResult;
    resolveSSROnly(input: SSRCompositeInput): SSRCompositeResult;
    resolveProbeOnly(input: SSRCompositeInput): SSRCompositeResult;
    composite(input: SSRCompositeInput): SSRCompositeResult;
    execute(context: any): any;
    setEnabled(enabled: boolean): void;
    setFresnelPower(value: number): void;
    setReflectionStrength(value: number): void;
    setRoughnessBlend(value: number): void;
    setMetallicBoost(value: number): void;
    resize(width: number, height: number): void;
    invalidateHistory(): void;
    reset(): void;
    beginFrame(): void;
    setMode(mode: SSRCompositeMode): void;
    setEnergyConservation(enabled: boolean): void;
    getStats(): {
        frame: number;
        enabled: boolean;
        mode: SSRCompositeMode;
        energyConservation: boolean;
        reflectionStrength: number;
    };
    debugInfo(): {
        type: string;
        enabled: boolean;
        mode: SSRCompositeMode;
        fresnelPower: number;
        reflectionStrength: number;
        roughnessBlend: number;
        metallicBoost: number;
        energyConservation: boolean;
        frame: number;
        resources: {
            ssr: boolean;
            history: boolean;
            probe: boolean;
            environment: boolean;
            shader: boolean;
        };
    };
}
