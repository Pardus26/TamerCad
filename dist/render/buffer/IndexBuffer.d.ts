import { RenderContext } from "../RenderContext";
export declare enum IndexType {
    Uint16 = "Uint16",
    Uint32 = "Uint32"
}
export declare enum IndexBufferUsage {
    Static = "Static",
    Dynamic = "Dynamic",
    Stream = "Stream"
}
export declare class IndexBuffer {
    readonly type: IndexType;
    readonly usage: IndexBufferUsage;
    private data;
    private gpuBuffer;
    private uploaded;
    constructor(type?: IndexType, usage?: IndexBufferUsage);
    setData(data: Uint16Array | Uint32Array): void;
    getData(): Uint16Array | Uint32Array | null;
    upload(context: RenderContext): void;
    bind(context: RenderContext): void;
    update(data: Uint16Array | Uint32Array, context: RenderContext): void;
    getCount(): number;
    getSize(): number;
    getIndexType(): IndexType;
    isUploaded(): boolean;
    dispose(): void;
}
