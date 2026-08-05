import { ShaderProgram } from "../shader/ShaderProgram";
export declare enum MaterialType {
    Basic = "Basic",
    Phong = "Phong",
    PBR = "PBR",
    Line = "Line"
}
export interface MaterialColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
export interface MaterialProperties {
    color?: MaterialColor;
    opacity?: number;
    transparent?: boolean;
    wireframe?: boolean;
}
export declare class Material {
    readonly id: string;
    type: MaterialType;
    name: string;
    color: MaterialColor;
    opacity: number;
    transparent: boolean;
    wireframe: boolean;
    protected shader: ShaderProgram | null;
    protected uniforms: Map<string, any>;
    constructor(name?: string, type?: MaterialType);
    setShader(shader: ShaderProgram): void;
    getShader(): ShaderProgram | null;
    setColor(color: MaterialColor): void;
    setOpacity(opacity: number): void;
    setTransparent(value: boolean): void;
    setWireframe(value: boolean): void;
    setUniform(name: string, value: any): void;
    getUniform(name: string): any;
    apply(): void;
    clone(): Material;
    toJSON(): {
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
    static fromJSON(data: any): Material;
    private static generateId;
}
