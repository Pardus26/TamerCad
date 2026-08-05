import { RenderContext } from "../RenderContext";
export declare enum BufferUsage {
    Static = "Static",
    Dynamic = "Dynamic",
    Stream = "Stream"
}
export declare enum BufferType {
    Vertex = "Vertex",
    Normal = "Normal",
    UV = "UV",
    Custom = "Custom"
}
export declare class VertexBuffer {
    readonly type: BufferType;
    readonly usage: BufferUsage;
    private data;
    private gpuBuffer;
    private uploaded;
    constructor(type?: BufferType, usage?: BufferUsage);
    setData(data: Float32Array): void;
    getData(): Float32Array | null;
    upload(context: RenderContext): void;
    bind(context: RenderContext): void;
    update(data: Float32Array, context: RenderContext): void;
    isUploaded(): boolean;
    getSize(): number;
    dispose(): void;
}
