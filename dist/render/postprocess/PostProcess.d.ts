import { RenderContext } from "../RenderContext";
import { ShaderProgram } from "../shader/ShaderProgram";
export declare enum PostProcessType {
    None = "None",
    FXAA = "FXAA",
    SMAA = "SMAA",
    SSAO = "SSAO",
    Bloom = "Bloom",
    ToneMapping = "ToneMapping"
}
export interface PostProcessOptions {
    enabled?: boolean;
    type?: PostProcessType;
    intensity?: number;
}
export declare class PostProcess {
    enabled: boolean;
    intensity: number;
    protected shader: ShaderProgram | null;
    protected inputTexture: any;
    protected outputTexture: any;
    readonly type: PostProcessType;
    private initialized;
    constructor(options?: PostProcessOptions);
    initialize(context: RenderContext): void;
    setShader(shader: ShaderProgram): void;
    getShader(): ShaderProgram | null;
    setInputTexture(texture: any): void;
    getInputTexture(): any;
    getOutputTexture(): any;
    process(context: RenderContext): any;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    setIntensity(value: number): void;
    dispose(): void;
    toJSON(): {
        enabled: boolean;
        intensity: number;
        type: PostProcessType;
    };
    static fromJSON(data: any): PostProcess;
}
