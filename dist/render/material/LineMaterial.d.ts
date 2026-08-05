import { Material, MaterialColor, MaterialType } from "./Material";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface LineMaterialOptions {
    color?: MaterialColor;
    lineWidth?: number;
    dashed?: boolean;
    dashSize?: number;
    gapSize?: number;
}
export declare class LineMaterial extends Material {
    lineWidth: number;
    dashed: boolean;
    dashSize: number;
    gapSize: number;
    constructor(name?: string, options?: LineMaterialOptions);
    setShader(shader: ShaderProgram): void;
    apply(): void;
    setLineWidth(width: number): void;
    setDashed(value: boolean): void;
    setDashPattern(dash: number, gap: number): void;
    clone(): LineMaterial;
    toJSON(): {
        lineWidth: number;
        dashed: boolean;
        dashSize: number;
        gapSize: number;
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
    static fromJSON(data: any): LineMaterial;
}
