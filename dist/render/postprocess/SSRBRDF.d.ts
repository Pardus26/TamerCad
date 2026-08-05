import { SSRComposite } from "./SSRComposite";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRBRDFOptions {
    fresnelBase?: number;
    energyCompensation?: boolean;
    minRoughness?: number;
    enabled?: boolean;
}
export interface BRDFInput {
    viewDotNormal: number;
    lightDotNormal: number;
    halfDotNormal: number;
    viewDotHalf: number;
    roughness: number;
    metallic: number;
    confidence?: number;
    baseReflectivity?: number;
}
export interface BRDFResult {
    D: number;
    F: number;
    G: number;
    specular: number;
    diffuseEnergy: number;
    reflectionWeight: number;
}
export interface SSRReflectionInput {
    color: any;
    brdf: BRDFInput;
}
export declare class SSRBRDF {
    enabled: boolean;
    fresnelBase: number;
    energyCompensation: boolean;
    minRoughness: number;
    private composite;
    private shader;
    private frameIndex;
    constructor(options?: SSRBRDFOptions);
    setComposite(composite: SSRComposite): void;
    setShader(shader: ShaderProgram): void;
    distributionGGX(nDotH: number, roughness: number): number;
    fresnelSchlick(cosTheta: number, f0: number): number;
    fresnelRoughness(cosTheta: number, f0: number, roughness: number): number;
    geometrySchlickGGX(nDot: number, roughness: number): number;
    geometrySmith(nDotV: number, nDotL: number, roughness: number): number;
    visibility(nDotV: number, nDotL: number): number;
    calculateF0(metallic: number, baseReflectivity?: number): number;
    calculateDiffuseEnergy(fresnel: number, metallic: number): number;
    calculateSpecular(input: BRDFInput): BRDFResult;
    evaluate(input: BRDFInput): BRDFResult;
    applyReflection(reflection: any, input: BRDFInput): any;
    evaluateSSRReflection(input: SSRReflectionInput): any;
    composeSSR(reflection: any, brdf: BRDFInput): any;
    execute(context: any): any;
    update(): void;
    resize(width: number, height: number): void;
    setEnabled(enabled: boolean): void;
    setFresnelBase(value: number): void;
    setEnergyCompensation(enabled: boolean): void;
    setMinRoughness(value: number): void;
    release(): void;
    reset(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        fresnelBase: number;
        energyCompensation: boolean;
        minRoughness: number;
        frame: number;
        resources: {
            composite: boolean;
            shader: boolean;
        };
    };
}
