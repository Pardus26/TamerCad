// src/app/KernelBootstrap.ts

import { DocumentManager } from "../document/DocumentManager";
import { Renderer } from "../render/Renderer";
import { Scene } from "../render/Scene";
import { Camera } from "../render/Camera";
import { Viewport } from "../render/Viewport";

export enum KernelState {
    CREATED = "created",
    INITIALIZING = "initializing",
    READY = "ready",
    FAILED = "failed",
    SHUTDOWN = "shutdown"
}

export interface KernelSubsystems {
    renderer: Renderer;
    scene: Scene;
    camera: Camera;
    viewport: Viewport;
    documents: DocumentManager;
}

export class KernelBootstrap {

    private static state: KernelState = KernelState.CREATED;

    private static subsystems: KernelSubsystems | null = null;

    public static initialize(): KernelSubsystems {

        if (this.state === KernelState.READY) {
            return this.subsystems!;
        }

        this.state = KernelState.INITIALIZING;

        try {

            const scene = new Scene();

            const camera = new Camera();

            const viewport = new Viewport(camera, scene);

            const renderer = new Renderer(viewport);

            const documents = new DocumentManager();

            this.subsystems = {
                renderer,
                scene,
                camera,
                viewport,
                documents
            };

            this.initializeScene();

            this.state = KernelState.READY;

            return this.subsystems;

        } catch (err) {

            this.state = KernelState.FAILED;

            throw err;
        }
    }

    private static initializeScene(): void {

        if (!this.subsystems) {
            return;
        }

        /*
         İlk sahne hazırlanır.

         - World Origin
         - Grid
         - Axis Gizmo
         - Empty Document
        */

        this.subsystems.documents.createNewDocument();

        // ileride:
        // this.subsystems.scene.add(Grid)
        // this.subsystems.scene.add(WorldAxis)
    }

    public static getState(): KernelState {
        return this.state;
    }

    public static isReady(): boolean {
        return this.state === KernelState.READY;
    }

    public static getSubsystems(): KernelSubsystems {

        if (!this.subsystems) {
            throw new Error("Kernel is not initialized.");
        }

        return this.subsystems;
    }

    public static shutdown(): void {

        if (!this.subsystems) {
            return;
        }

        this.subsystems.renderer.dispose();

        this.subsystems = null;

        this.state = KernelState.SHUTDOWN;
    }
}