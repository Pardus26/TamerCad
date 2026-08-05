import { RenderContext } from "../RenderContext";
export declare enum ShaderType {
    Vertex = "Vertex",
    Fragment = "Fragment",
    Compute = "Compute"
}
export declare class Shader {
    readonly type: ShaderType;
    readonly source: string;
    private compiled;
    private nativeShader;
    constructor(type: ShaderType, source: string);
    compile(context: RenderContext): void;
    isCompiled(): boolean;
    getNativeShader(): any;
    validate(): boolean;
    getSource(): string;
    dispose(): void;
}
