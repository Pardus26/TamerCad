// src/render/Renderer.ts

import { Viewport } from "./Viewport";

export enum RendererState {
    CREATED = "created",
    INITIALIZED = "initialized",
    RUNNING = "running",
    PAUSED = "paused",
    DISPOSED = "disposed"
}

export interface RendererStatistics {
    fps: number;
    frameTime: number;
    drawCalls: number;
    triangles: number;
    frame: number;
}

export class Renderer {

    private viewport: Viewport;

    private state: RendererState = RendererState.CREATED;

    private stats: RendererStatistics = {
        fps: 0,
        frameTime: 0,
        drawCalls: 0,
        triangles: 0,
        frame: 0
    };

    private lastFrameTime = 0;

    constructor(viewport: Viewport) {

        this.viewport = viewport;

        this.initialize();
    }

    private initialize(): void {

        /*
            Future backend

            Android:
                OpenGL ES
                Vulkan

            Web:
                WebGL

            Desktop:
                OpenGL
        */

        this.state = RendererState.INITIALIZED;
    }

    public render(): void {

        if (
            this.state === RendererState.DISPOSED
        ) {
            return;
        }

        this.beginFrame();

        this.clear();

        this.viewport.render();

        this.endFrame();
    }

    public update(deltaTime: number): void {

        if (
            this.state === RendererState.DISPOSED
        ) {
            return;
        }

        this.stats.frameTime = deltaTime;

        if (deltaTime > 0) {
            this.stats.fps = Math.round(
                1 / deltaTime
            );
        }

        this.render();
    }

    private beginFrame(): void {

        this.state = RendererState.RUNNING;

        this.lastFrameTime = performance.now();

        this.stats.drawCalls = 0;

        this.stats.triangles = 0;
    }

    private clear(): void {

        /*
            GPU Clear

            Color Buffer

            Depth Buffer

            Stencil Buffer
        */
    }

    private endFrame(): void {

        this.stats.frame++;

        const end = performance.now();

        this.stats.frameTime =
            (end - this.lastFrameTime) / 1000;
    }

    public resize(
        width: number,
        height: number
    ): void {

        this.viewport.resize(
            width,
            height
        );
    }

    public pause(): void {

        this.state =
            RendererState.PAUSED;
    }

    public resume(): void {

        this.state =
            RendererState.RUNNING;
    }

    public dispose(): void {

        this.state =
            RendererState.DISPOSED;
    }

    public getStatistics(): RendererStatistics {

        return this.stats;
    }

    public getState(): RendererState {

        return this.state;
    }
}