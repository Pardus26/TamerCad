// src/app/KernelBootstrap.ts
import { Scene } from "../render/Scene";
import { Renderer } from "../render/Renderer";
import { Camera } from "../render/Camera";
import { Viewport } from "../render/Viewport";
export class KernelBootstrap {
    static initialized = false;
    static context = null;
    static initialize() {
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
    static context() {
        if (!KernelBootstrap.context) {
            throw new Error("Kernel not initialized.");
        }
        return KernelBootstrap.context;
    }
    static update(deltaTime) {
        if (!KernelBootstrap.context)
            return;
        KernelBootstrap.context.scene.update(deltaTime);
        KernelBootstrap.context.renderer.update(deltaTime);
    }
    static render() {
        if (!KernelBootstrap.context)
            return;
        KernelBootstrap.context.renderer.render();
    }
    static shutdown() {
        if (!KernelBootstrap.context)
            return;
        KernelBootstrap.context.renderer.dispose();
        KernelBootstrap.context = null;
        KernelBootstrap.initialized = false;
    }
}
//# sourceMappingURL=KernelBootstrap.js.map