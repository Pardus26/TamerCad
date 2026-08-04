// src/app/KernelBootstrap.ts

import { Scene } from "../render/Scene";
import { Renderer } from "../render/Renderer";
import { Camera } from "../render/Camera";
import { Viewport } from "../render/Viewport";

export interface KernelContext {

    scene: Scene;

    renderer: Renderer;

    camera: Camera;

    viewport: Viewport;


    // CAD Core

    geometry: GeometryKernel;

    topology: TopologyKernel;

    brep: BRepKernel;

    feature: FeatureEngine;

    constraint: ConstraintEngine;

}
export class KernelBootstrap {

    private static initialized = false;

    private static context: KernelContext | null = null;

    public static initialize(): KernelContext {

        if (KernelBootstrap.initialized && KernelBootstrap.context) {

            return KernelBootstrap.context;
        }

        const scene = new Scene();

        const camera = new Camera();

        const viewport = new Viewport(camera);

        const renderer = new Renderer(scene, camera, viewport);

        renderer.initialize();

        KernelBootstrap.context = {

            scene,

            renderer,

            camera,

            viewport

        };

        KernelBootstrap.initialized = true;

        return KernelBootstrap.context;
    }

    public static context(): KernelContext {

        if (!KernelBootstrap.context) {

            throw new Error(
                "Kernel not initialized."
            );
        }

        return KernelBootstrap.context;
    }

    public static update(deltaTime: number): void {

        if (!KernelBootstrap.context) return;

        KernelBootstrap.context.scene.update(deltaTime);

        KernelBootstrap.context.renderer.update(deltaTime);
    }

    public static render(): void {

        if (!KernelBootstrap.context) return;

        KernelBootstrap.context.renderer.render();
    }

    public static shutdown(): void {

        if (!KernelBootstrap.context) return;

        KernelBootstrap.context.renderer.dispose();

        KernelBootstrap.context = null;

        KernelBootstrap.initialized = false;
    }
}