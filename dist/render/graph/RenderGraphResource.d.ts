export declare enum RenderGraphResourceType {
    Texture = "Texture",
    Buffer = "Buffer",
    Depth = "Depth",
    RenderTarget = "RenderTarget",
    Storage = "Storage"
}
export interface RenderGraphResourceDescriptor {
    width?: number;
    height?: number;
    format?: string;
    mipLevels?: number;
    size?: number;
    usage?: string[];
}
export declare class RenderGraphResource {
    readonly name: string;
    readonly type: RenderGraphResourceType;
    readonly descriptor: RenderGraphResourceDescriptor;
    private producer;
    private readonly consumers;
    constructor(name: string, type: RenderGraphResourceType, descriptor?: RenderGraphResourceDescriptor);
    setProducer(passName: string): void;
    getProducer(): string | null;
    addConsumer(passName: string): void;
    getConsumers(): readonly string[];
    isProduced(): boolean;
    isConsumed(): boolean;
    clearUsage(): void;
    debugInfo(): {
        name: string;
        type: RenderGraphResourceType;
        descriptor: RenderGraphResourceDescriptor;
        producer: string | null;
        consumers: string[];
    };
}
