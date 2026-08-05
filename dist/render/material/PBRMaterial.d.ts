import { Material, MaterialColor, MaterialType } from "./Material";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface PBRMaterialOptions {
    color?: MaterialColor;
    metallic?: number;
    roughness?: number;
    emission?: MaterialColor;
    normalMap?: string;
    albedoMap?: string;
    metallicMap?: string;
    roughnessMap?: string;
}
export declare class PBRMaterial extends Material {
    /**
     * Metallic value
     *
     * 0 = dielectric
     * 1 = metal
     */
    metallic: number;
    /**
     * Surface roughness
     *
     * 0 = mirror
     * 1 = rough
     */
    roughness: number;
    emission: MaterialColor;
    albedoMap: string | null;
    normalMap: string | null;
    metallicMap: string | null;
    roughnessMap: string | null;
    constructor(name?: string, options?: PBRMaterialOptions);
    setShader(shader: ShaderProgram): void;
    apply(): void;
    setMetallic(value: number): void;
    setRoughness(value: number): void;
    isMetal(): boolean;
    clone(): PBRMaterial;
    toJSON(): {
        metallic: number;
        roughness: number;
        emission: MaterialColor;
        albedoMap: string | null;
        normalMap: string | null;
        metallicMap: string | null;
        roughnessMap: string | null;
        id: string;
        name: string;
        type: MaterialType;
        color: MaterialColor;
        opacity: number;
        transparent: boolean;
        wireframe: boolean;
        uniforms: {
            [k: string]: any;
        };
    };
    static fromJSON(data: any): PBRMaterial;
    private clamp;
}
