import { RenderContext } from "./RenderContext";
import { RenderScene } from "./RenderScene";
import { RenderCamera } from "./RenderCamera";
import { RenderPipeline } from "./RenderPipeline";

import { DisplayMesh } from "./display/DisplayMesh";
import { MeshBody } from "../geometry/mesh/MeshBody";


/**
 * Render istatistikleri
 */
export interface RenderEngineStatistics {


    frame:number;


    fps:number;


    frameTime:number;


    drawCalls:number;


    triangles:number;


    vertices:number;


}



/**
 * RenderEngine
 *
 * CAD grafik motorunun ana render yöneticisi
 *
 * Shapr3D benzeri yapı:
 *
 * Scene
 *    |
 * RenderEngine
 *    |
 * RenderPipeline
 *    |
 * GPU Backend
 *
 */
export class RenderEngine {



    private readonly displayCache =

        new Map<string, DisplayMesh>();



    private frame = 0;



    private fps = 0;



    private frameTime = 0;



    private lastTime = 0;



    private running = false;



    private initialized = false;



    constructor(

        public readonly context: RenderContext,


        public readonly scene: RenderScene,


        public readonly camera: RenderCamera,


        public readonly pipeline: RenderPipeline


    ) {}




    /**
     * Engine başlat
     */
    public initialize():

    void {


        if (

            this.initialized

        ) {

            return;

        }



        this.context.setCamera(

            this.camera

        );



        this.pipeline.initialize();



        this.initialized = true;

    }

    public invalidateMesh(

        bodyId: string

    ): void {

        this.displayCache.delete(

            bodyId

        );

    }


    public clearCache(): void {

        this.displayCache.clear();

    }



    public getStatistics():

    RenderEngineStatistics {


        const rendererStats =

            this.meshRenderer.getStatistics();



        return {

            frame:

                this.frameCounter,


            fps:

                this.fps,


            drawCalls:

                rendererStats.drawCalls,


            renderedTriangles:

                rendererStats.renderedTriangles,


            renderedVertices:

                rendererStats.renderedVertices

        };

    }



    public getCamera():

    RenderCamera {

        return this.camera;

    }



    public getScene():

    RenderScene {

        return this.scene;

    }



    public resize(

        width: number,

        height: number

    ): void {


        this.meshRenderer.resize(

            width,

            height

        );

    }



    public dispose(): void {


        this.displayCache.clear();


        this.meshRenderer.dispose();


    }



    private getDisplayMesh(

        body: MeshBody

    ): DisplayMesh {


        let displayMesh =

            this.displayCache.get(

                body.id

            );



        if (

            !displayMesh

        ) {


            displayMesh =

                new DisplayMesh(

                    body.mesh

                );



            this.displayCache.set(

                body.id,

                displayMesh

            );

        }



        return displayMesh;

    }



    private beginFrame(

        currentTime: number

    ): void {



        if (

            this.lastFrameTime !== 0

        ) {


            const delta =

                currentTime -

                this.lastFrameTime;



            if (

                delta > 0

            ) {


                this.fps =

                    1000 /

                    delta;

            }

        }



        this.lastFrameTime =

            currentTime;

    }

}

    // ----------------------------------------------------
    // Rendering
    // ----------------------------------------------------


    /**
     * Tek frame render
     */
    public render(

        width:number,

        height:number,

        time = performance.now()

    ): void {



        if (

            !this.initialized

        ) {

            this.initialize();

        }



        this.beginFrame(

            time

        );



        /**
         * GPU viewport uygula
         */
        this.context.applyViewport();



        /**
         * Frame temizleme
         */
        this.context.clear(

            true,

            true

        );



        /**
         * Render pipeline çalıştır
         */
        this.pipeline.render(

            this.scene,

            this.camera

        );



        this.endFrame();


    }




    /**
     * Animasyon döngüsü
     */
    public start():

    void {


        if (

            this.running

        ) {

            return;

        }



        this.running = true;



        const loop =

            (

                time:number

            ) => {



                if (

                    !this.running

                ) {

                    return;

                }



                this.render(

                    this.context.viewport?.getWidth() ?? 1,

                    this.context.viewport?.getHeight() ?? 1,

                    time

                );



                requestAnimationFrame(

                    loop

                );

            };



        requestAnimationFrame(

            loop

        );


    }




    /**
     * Render döngüsü durdur
     */
    public stop():

    void {


        this.running = false;


    }




    /**
     * Frame başlangıcı
     */
    private beginFrame(

        time:number

    ):void {


        if (

            this.lastTime !== 0

        ) {


            const delta =

                time -

                this.lastTime;



            if (

                delta > 0

            ) {


                this.fps =

                    1000 /

                    delta;


                this.frameTime =

                    delta / 1000;

            }

        }



        this.lastTime = time;


    }




    /**
     * Frame sonu
     */
    private endFrame():

    void {


        this.frame++;

    }

    // ----------------------------------------------------
    // Render Invalidation System
    // ----------------------------------------------------


    private needsRender = true;



    /**
     * Render zorla yenile
     */
    public invalidate():

    void {


        this.needsRender = true;


    }




    /**
     * Sadece gerekiyorsa çiz
     */
    public renderIfNeeded(

        width:number,

        height:number,

        time = performance.now()

    ):void {


        if (

            !this.needsRender

        ) {

            return;

        }



        this.render(

            width,

            height,

            time

        );



        this.needsRender = false;


    }





    /**
     * Kamera değiştiğinde çağrılır
     */
    public cameraChanged():

    void {


        this.invalidate();


    }




    /**
     * Scene değiştiğinde çağrılır
     */
    public sceneChanged():

    void {


        this.invalidate();


    }




    /**
     * Kalem hareketi sırasında
     *
     * Android Stylus
     */
    public stylusMoved(

        x:number,

        y:number,

        pressure:number

    ):void {



        /**
         * Pressure ileride:
         *
         * - çizgi kalınlığı
         * - seçim hassasiyeti
         * - extrusion kontrolü
         *
         * için kullanılacak.
         */


        void x;

        void y;

        void pressure;



        this.invalidate();


    }





    /**
     * Seçim değişikliği
     */
    public selectionChanged():

    void {


        this.invalidate();


    }





    /**
     * Resize sonrası
     */
    public viewportChanged():

    void {


        this.invalidate();


    }

// src/render/RenderEngine.ts

    private getDisplayMesh(

        body: MeshBody

    ): DisplayMesh {


        let displayMesh =

            this.displayCache.get(

                body.id

            );


        if (

            !displayMesh

        ) {


            displayMesh =

                new DisplayMesh(

                    body.mesh

                );


            this.displayCache.set(

                body.id,

                displayMesh

            );

        }


        return displayMesh;

    }



    private beginFrame(

        currentTime: number

    ): void {


        if (

            this.lastFrameTime !== 0

        ) {


            const delta =

                currentTime -

                this.lastFrameTime;



            if (

                delta > 0

            ) {


                this.fps =

                    1000 /

                    delta;

            }

        }



        this.lastFrameTime =

            currentTime;

    }



    public resetStatistics(): void {


        this.frameCounter = 0;

        this.fps = 0;

        this.lastFrameTime = 0;


        this.meshRenderer.resetStatistics();

    }



    public warmup(): void {


        for (

            const body of

            this.scene.getMeshBodies()

        ) {


            this.getDisplayMesh(

                body

            );

        }

    }



    public hasCachedMesh(

        bodyId: string

    ): boolean {


        return this.displayCache.has(

            bodyId

        );

    }



    public getCachedMeshCount(): number {


        return this.displayCache.size;

    }



    public dispose(): void {


        this.displayCache.clear();


        this.meshRenderer.dispose();

    }

}