// src/app/EngineBridge.ts

import { KernelBootstrap } from "./KernelBootstrap";

export class EngineBridge {

    private static initialized = false;

    public static initialize(): void {

        if (EngineBridge.initialized) {
            return;
        }

        KernelBootstrap.initialize();

        EngineBridge.initialized = true;

        console.info("[Engine] Initialized");
    }

    public static resize(
        width: number,
        height: number
    ): void {

        if (!EngineBridge.initialized) {
            return;
        }

        const ctx = KernelBootstrap.context();

        ctx.viewport.resize(width, height);

        ctx.camera.setViewport(width, height);
    }

    public static update(
        deltaTime: number
    ): void {

        if (!EngineBridge.initialized) {
            return;
        }

        KernelBootstrap.update(deltaTime);
    }

    public static render(): void {

        if (!EngineBridge.initialized) {
            return;
        }

        KernelBootstrap.render();
    }

    public static shutdown(): void {

        if (!EngineBridge.initialized) {
            return;
        }

        KernelBootstrap.shutdown();

        EngineBridge.initialized = false;
    }

    // --------------------------------------------------------
    // Camera Controls
    // --------------------------------------------------------

    public static orbit(
        dx: number,
        dy: number
    ): void {

        const camera = KernelBootstrap.context().camera;

        camera.orbit(dx, dy);
    }

    public static pan(
        dx: number,
        dy: number
    ): void {

        const camera = KernelBootstrap.context().camera;

        camera.pan(dx, dy);
    }

    public static zoom(
        amount: number
    ): void {

        const camera = KernelBootstrap.context().camera;

        camera.zoom(amount);
    }

    // --------------------------------------------------------
    // Stylus
    // --------------------------------------------------------

    public static pointerDown(
        x: number,
        y: number,
        pressure: number = 1.0
    ): void {

        const scene = KernelBootstrap.context().scene;

        scene.pointerDown(x, y, pressure);
    }

    public static pointerMove(
        x: number,
        y: number,
        pressure: number = 1.0
    ): void {

        const scene = KernelBootstrap.context().scene;

        scene.pointerMove(x, y, pressure);
    }

    public static pointerUp(
        x: number,
        y: number
    ): void {

        const scene = KernelBootstrap.context().scene;

        scene.pointerUp(x, y);
    }

}