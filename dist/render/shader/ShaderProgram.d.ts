import { RenderContext } from "../RenderContext";
import { Shader } from "./Shader";
export interface ShaderUniform {
    name: string;
    value: any;
}
export interface ShaderAttribute {
    name: string;
    location: number;
}
export declare class ShaderProgram {
    readonly vertexShader: Shader;
    readonly fragmentShader: Shader;
    private linked;
    private nativeProgram;
    private uniforms;
    private attributes;
    constructor(vertexShader: Shader, fragmentShader: Shader);
    compile(context: RenderContext): void;
    link(context: RenderContext): void;
    use(context: RenderContext): void;
    setUniform(name: string, value: any): void;
    getUniform(name: string): ShaderUniform | undefined;
    addAttribute(name: string, location: number): void;
    getAttribute(name: string): ShaderAttribute | undefined;
    hasUniform(name: string): boolean;
    hasAttribute(name: string): boolean;
    isLinked(): boolean;
    getNativeProgram(): any;
    dispose(): void;
}
