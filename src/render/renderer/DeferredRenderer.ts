import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";

import { RenderPass } from "../pass/RenderPass";
import { DepthPass } from "../pass/DepthPass";
import { GeometryPass } from "../pass/GeometryPass";
import { ShadowPass } from "../pass/ShadowPass";
import { LightingPass } from "../pass/LightingPass";

export interface DeferredRendererOptions {

    context: RenderContext;

}

export class DeferredRenderer {

    private readonly context: RenderContext;

    private readonly passes: RenderPass[] = [];

    private initialized = false;

    constructor(
        options: DeferredRendererOptions
    ) {

        this.context = options.context;

    }

    initialize(): void {

        if (this.initialized) {
            return;
        }

        this.sortPasses();

        for (const pass of this.passes) {

            pass.initialize(this.context);

        }

        this.initialized = true;

    }

    dispose(): void {

        for (const pass of this.passes) {

            pass.dispose(this.context);

        }

        this.initialized = false;

    }

    addPass(
        pass: RenderPass
    ): void {

        this.passes.push(pass);

        this.sortPasses();

    }

    removePass(
        pass: RenderPass
    ): void {

        const index =
            this.passes.indexOf(pass);

        if (index >= 0) {

            this.passes.splice(index, 1);

        }

    }

    clearPasses(): void {

        this.passes.length = 0;

    }

    render(

        scene: RenderScene,

        camera: RenderCamera

    ): void {

        if (!this.initialized) {

            this.initialize();

        }

        for (const pass of this.passes) {

            if (!pass.enabled) {
                continue;
            }

            pass.render(

                this.context,

                scene,

                camera

            );

        }

    }

    resize(
        width: number,
        height: number
    ): void {

        for (const pass of this.passes) {

            const anyPass =
                pass as any;

            if (
                typeof anyPass.resize === "function"
            ) {

                anyPass.resize(
                    width,
                    height
                );

            }

        }

    }

    private sortPasses(): void {

        this.passes.sort(

            (a, b) =>

                a.priority - b.priority

        );

    }

    getPasses(): readonly RenderPass[] {

        return this.passes;

    }

    getPass<T extends RenderPass>(
        ctor: new (...args: any[]) => T
    ): T | null {

        for (const pass of this.passes) {

            if (pass instanceof ctor) {

                return pass;

            }

        }

        return null;

    }

    buildDefaultPipeline(): void {

        this.clearPasses();

        this.addPass(new DepthPass());

        this.addPass(new GeometryPass());

        this.addPass(new ShadowPass());

        this.addPass(new LightingPass());

    }

    debugInfo() {

        return {

            type: "DeferredRenderer",

            initialized: this.initialized,

            passCount: this.passes.length,

            passes: this.passes.map(

                p => p.name

            )

        };

    }

}