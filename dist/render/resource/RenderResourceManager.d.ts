import { RenderContext } from "../RenderContext";
export declare enum RenderResourceType {
    Texture = "Texture",
    Buffer = "Buffer",
    RenderTarget = "RenderTarget",
    DepthBuffer = "DepthBuffer"
}
export interface RenderResourceDescriptor {
    name: string;
    type: RenderResourceType;
    width?: number;
    height?: number;
    format?: string;
    usage?: string;
    samples?: number;
}
export interface RenderResource {
    id: number;
    name: string;
    type: RenderResourceType;
    descriptor: RenderResourceDescriptor;
    handle: any;
    created: boolean;
}
export declare class RenderResourceManager {
    private resources;
    private nameLookup;
    private nextId;
    private initialized;
    initialize(context: RenderContext): void;
    dispose(context: RenderContext): void;
    create(context: RenderContext, descriptor: RenderResourceDescriptor): RenderResource;
    get(id: number): RenderResource | null;
    getByName(name: string): RenderResource | null;
    has(name: string): boolean;
    destroy(context: RenderContext, id: number): void;
    private destroyResource;
    private createBackendResource;
    private createWebGLResource;
    private createWebGPUResource;
    getHandle(name: string): any;
    getAll(): readonly RenderResource[];
    debugInfo(): {
        count: number;
        resources: {
            id: number;
            name: string;
            type: RenderResourceType;
            created: boolean;
        }[];
    };
}
