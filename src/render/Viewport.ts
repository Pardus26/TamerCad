// src/render/Viewport.ts

import { Camera } from "./Camera";

export interface ViewportRectangle {

    x: number;

    y: number;

    width: number;

    height: number;

}

export class Viewport {

    private readonly camera: Camera;

    private rectangle: ViewportRectangle = {

        x: 0,

        y: 0,

        width: 800,

        height: 600

    };

    private pixelRatio = 1.0;

    private enabled = true;

    constructor(
        camera: Camera,
        width = 800,
        height = 600
    ) {

        this.camera = camera;

        this.resize(width, height);

    }

    public resize(
        width: number,
        height: number
    ): void {

        this.rectangle.width = Math.max(1, width);

        this.rectangle.height = Math.max(1, height);

        this.camera.setViewport(
            this.rectangle.width,
            this.rectangle.height
        );

    }

    public setPosition(
        x: number,
        y: number
    ): void {

        this.rectangle.x = x;

        this.rectangle.y = y;

    }

    public setPixelRatio(
        ratio: number
    ): void {

        this.pixelRatio = Math.max(0.1, ratio);

    }

    public getPixelRatio(): number {

        return this.pixelRatio;

    }

    public getWidth(): number {

        return this.rectangle.width;

    }

    public getHeight(): number {

        return this.rectangle.height;

    }

    public getAspectRatio(): number {

        return this.rectangle.width / this.rectangle.height;

    }

    public getRectangle(): ViewportRectangle {

        return { ...this.rectangle };

    }

    public enable(): void {

        this.enabled = true;

    }

    public disable(): void {

        this.enabled = false;

    }

    public isEnabled(): boolean {

        return this.enabled;

    }

    public render(): void {

        if (!this.enabled) {

            return;

        }

        /*
            Burada ileride:

            Android
                GLES30.glViewport()

            Vulkan
                vkCmdSetViewport()

            WebGL
                gl.viewport()

            çağrıları yapılacak.
        */

    }

    public screenCenter(): {

        x: number;

        y: number;

    } {

        return {

            x: this.rectangle.width * 0.5,

            y: this.rectangle.height * 0.5

        };

    }

    public invalidate(): void {

        /*
            Gelecekte:

            Renderer yeniden çizsin.

            Android:

            GLSurfaceView.requestRender()

        */

    }

    public toJSON() {

        return {

            rectangle: this.rectangle,

            pixelRatio: this.pixelRatio,

            enabled: this.enabled

        };

    }

    public static fromJSON(
        camera: Camera,
        json: any
    ): Viewport {

        const vp = new Viewport(

            camera,

            json.rectangle.width,

            json.rectangle.height

        );

        vp.setPosition(

            json.rectangle.x,

            json.rectangle.y

        );

        vp.setPixelRatio(

            json.pixelRatio

        );

        if (!json.enabled) {

            vp.disable();

        }

        return vp;

    }

}