import { Scene } from "../render/Scene";
import { Renderer } from "../render/Renderer";
import { Camera } from "../render/Camera";
import { Viewport } from "../render/Viewport";
export interface KernelContext {
    scene: Scene;
    renderer: Renderer;
    camera: Camera;
    viewport: Viewport;
    geometry: GeometryKernel;
    topology: TopologyKernel;
    brep: BRepKernel;
    feature: FeatureEngine;
    constraint: ConstraintEngine;
}
export declare class KernelBootstrap {
    private static initialized;
    private static context;
    static initialize(): KernelContext;
    static context(): KernelContext;
    static update(deltaTime: number): void;
    static render(): void;
    static shutdown(): void;
}
