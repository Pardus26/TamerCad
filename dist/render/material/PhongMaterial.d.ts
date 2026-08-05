import { Material, MaterialColor, MaterialType } from "./Material";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface PhongMaterialOptions {
    color?: MaterialColor;
    ambient?: number;
    diffuse?: number;
    specular?: number;
    shininess?: number;
}
export declare class PhongMaterial extends Material {
    ambient: number;
    diffuse: number;
    specular: number;
    shininess: number;
    constructor(name?: string, options?: PhongMaterialOptions);
    setShader(shader: ShaderProgram): void;
    apply(): void;
    clone(): PhongMaterial;
    toJSON(): {
        ambient: number;
        diffuse: number;
        specular: number;
        shininess: number;
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
    static fromJSON(data: any): PhongMaterial;
}
