// src/app/EngineBridge.ts
import { KernelBootstrap } from "./KernelBootstrap";
import { InputController } from "../input/InputController";
import { InputRouter } from "../input/InputRouter";
export class EngineBridge {
    static initialized = false;
    static input = null;
    static initialize() {
        if (EngineBridge.initialized) {
            return;
        }
        KernelBootstrap.initialize();
        EngineBridge.input =
            new InputController(new InputRouter());
        EngineBridge.input.initialize();
        EngineBridge.initialized =
            true;
        console.info("[Engine] Initialized");
    }
    static resize(width, height) {
        if (!EngineBridge.initialized)
            return;
        const ctx = KernelBootstrap.context();
        ctx.viewport.resize(width, height);
        ctx.camera.setViewport(width, height);
    }
    static update(deltaTime) {
        if (!EngineBridge.initialized)
            return;
        KernelBootstrap.update(deltaTime);
    }
    static render() {
        if (!EngineBridge.initialized)
            return;
        KernelBootstrap.render();
    }
    static shutdown() {
        if (!EngineBridge.initialized)
            return;
        EngineBridge.input?.shutdown();
        KernelBootstrap.shutdown();
        EngineBridge.input =
            null;
        EngineBridge.initialized =
            false;
    }
    // ------------------------------------------------
    // Input Bridge
    // Android -> TypeScript
    // ------------------------------------------------
    static pointerDown(id, x, y, pressure = 1) {
        if (!EngineBridge.input)
            return;
        EngineBridge.input.pointerDown(id, x, y, pressure);
    }
    static pointerMove(id, x, y, pressure = 1) {
        if (!EngineBridge.input)
            return;
        EngineBridge.input.pointerMove(id, x, y, pressure);
    }
    static pointerUp(id, x, y) {
        if (!EngineBridge.input)
            return;
        EngineBridge.input.pointerUp(id, x, y);
    }
    // ------------------------------------------------
    // Camera Controls
    // ------------------------------------------------
    static setInputMode(mode) {
        EngineBridge.input?.setMode(mode);
    }
}
//# sourceMappingURL=EngineBridge.js.map