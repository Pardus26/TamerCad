// src/render/Viewport.ts

import { Camera } from "./Camera";
import { Scene } from "./Scene";

export class Viewport {

    private width: number;

    private height: number;

    private camera: Camera;

    private scene: Scene;

    private backgroundColor = {
        r: 0.12,
        g: 0.12,
        b: 0.14,
        a: 1.0
    };

    constructor(
        camera: Camera,
        scene: Scene
    ) {

        this.camera = camera;
        this.scene = scene;

        this.width = 1280;
        this.height = 720;
    }

    /**
     * Viewport yeniden boyutlandır
     */
    public resize(
        width: number,
        height: number
    ): void {

        this.width = width;
        this.height = height;
    }

    /**
     * Çizim
     */
    public render(): void {

        /*
            Future GPU Pipeline

            1 Clear

            2 Update Camera

            3 Update Scene

            4 Draw Grid

            5 Draw Geometry

            6 Draw Gizmos

            7 Draw Overlay
        */

        this.scene.render();
    }

    /**
     * Kamera
     */
    public getCamera(): Camera {

        return this.camera;
    }

    /**
     * Scene
     */
    public getScene(): Scene {

        return this.scene;
    }

    /**
     * Arka plan
     */
    public setBackground(
        r: number,
        g: number,
        b: number,
        a: number = 1
    ): void {

        this.backgroundColor = {
            r,
            g,
            b,
            a
        };
    }

    public getBackground() {

        return this.backgroundColor;
    }

    /**
     * Boyutlar
     */
    public getWidth(): number {

        return this.width;
    }

    public getHeight(): number {

        return this.height;
    }

    /**
     * Aspect Ratio
     */
    public getAspectRatio(): number {

        if (this.height === 0) {
            return 1;
        }

        return this.width / this.height;
    }

    /**
     * Fit View
     */
    public fitScene(
        radius: number
    ): void {

        this.camera.fitToScene(
            radius
        );
    }

    /**
     * Dünya koordinatından ekran koordinatına
     */
    public worldToScreen(
        x: number,
        y: number,
        z: number
    ) {

        /*
            TODO

            View Matrix

            Projection Matrix

            Viewport Transform
        */

        return {
            x: 0,
            y: 0
        };
    }

    /**
     * Ekrandan dünya koordinatına
     */
    public screenToWorld(
        x: number,
        y: number
    ) {

        /*
            TODO

            Picking Ray

            Ray Casting
        */

        return {
            x: 0,
            y: 0,
            z: 0
        };
    }
}