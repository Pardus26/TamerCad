import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRMaskOptions {
    width?: number;
    height?: number;
    format?: string;
    roughnessThreshold?: number;
    metallicThreshold?: number;
    enabled?: boolean;
}
export declare enum SSRMaskAttachment {
    Mask = "mask",
    Roughness = "roughness",
    Metallic = "metallic",
    MaterialClass = "materialClass",
    Reactive = "reactive"
}
export declare enum SSRMaterialClass {
    Opaque = 0,
    Metal = 1,
    Glass = 2,
    Coated = 3,
    Emissive = 4,
    Transparent = 5
}
export interface SSRMaskMaterial {
    roughness: number;
    metallic: number;
    transparent?: boolean;
    emissive?: boolean;
    clearCoat?: boolean;
}
export interface SSRMaskEvaluation {
    factor: number;
    materialClass: SSRMaterialClass;
    enabled: boolean;
    reactive: number;
}
export declare class SSRMask extends FrameBuffer {
    enabled: boolean;
    roughnessThreshold: number;
    metallicThreshold: number;
    private rendered;
    private shader;
    private frameIndex;
    constructor(options?: SSRMaskOptions);
    static createAttachments(options: SSRMaskOptions): FrameBufferAttachment[];
    getMaskTexture(): any;
    getRoughnessTexture(): any;
    getMetallicTexture(): any;
    getMaterialClassTexture(): any;
    getReactiveTexture(): any;
    classifyMaterial(material: SSRMaskMaterial): SSRMaterialClass;
    calculateSSRFactor(material: SSRMaskMaterial): number;
    calculateRoughnessMask(roughness: number): number;
    calculateMetallicMask(metallic: number): number;
    evaluateMaterial(material: SSRMaskMaterial): SSRMaskEvaluation;
    depthReject(currentDepth: number, previousDepth: number, threshold?: number): boolean;
    normalReject(currentNormal: any, previousNormal: any, threshold?: number): boolean;
    calculateReactiveMask(material: SSRMaskMaterial): number;
    validateHistory(currentDepth: number, previousDepth: number, currentNormal: any, previousNormal: any): boolean;
    evaluatePixel(material: SSRMaskMaterial, depthValid: boolean, normalValid: boolean): SSRMaskEvaluation;
    combineMasks(ssr: number, reactive: number, historyValid: boolean): number;
    setShader(shader: ShaderProgram): void;
    execute(context: any): any;
    begin(): void;
    end(): void;
    resize(width: number, height: number): void;
    clear(): void;
    setEnabled(enabled: boolean): void;
    setRoughnessThreshold(value: number): void;
    setMetallicThreshold(value: number): void;
    getFrameIndex(): number;
    isRendered(): boolean;
    reset(): void;
    release(): void;
    getStats(): {
        enabled: boolean;
        rendered: boolean;
        frame: number;
        roughnessThreshold: number;
        metallicThreshold: number;
    };
    debugInfo(): {
        type: string;
        enabled: boolean;
        rendered: boolean;
        frame: number;
        roughnessThreshold: number;
        metallicThreshold: number;
        resources: {
            shader: boolean;
            mask: boolean;
            roughness: boolean;
            metallic: boolean;
            materialClass: boolean;
            reactive: boolean;
        };
    };
}
