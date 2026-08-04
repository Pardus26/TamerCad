import { RenderContext } from "./RenderContext";
import { RenderScene } from "./RenderScene";
import { RenderCamera } from "./RenderCamera";
import { RenderPipeline } from "./RenderPipeline";

import { DisplayMesh } from "./display/DisplayMesh";
import { MeshBody } from "../geometry/mesh/MeshBody";


export interface RenderEngineStatistics {

    frame:number;

    fps:number;

    frameTime:number;

    drawCalls:number;

    triangles:number;

    vertices:number;

}



export class RenderEngine {


    private readonly displayCache =
        new Map<string, DisplayMesh>();


    private frame = 0;


    private fps = 0;


    private frameTime = 0;


    private lastTime = 0;


    private running = false;


    private initialized = false;


    private needsRender = true;



    constructor(


        public readonly context:RenderContext,


        public readonly scene:RenderScene,


        public readonly camera:RenderCamera,


        public readonly pipeline:RenderPipeline


    ){}



    /**
     * Engine başlat
     */
    public initialize():void{


        if(this.initialized){

            return;

        }


        this.context.setCamera(

            this.camera

        );


        this.pipeline.initialize();


        this.initialized=true;


    }





    /**
     * Render
     */
    public render(

        width:number,

        height:number,

        time = performance.now()

    ):void{


        if(!this.initialized){

            this.initialize();

        }


        this.beginFrame(time);



        this.context.applyViewport();



        this.context.clear({

            color:true,

            depth:true

        });



        this.pipeline.render(

            this.scene,

            this.camera

        );



        this.endFrame();



    }





    /**
     * Animation loop
     */
    public start():void{


        if(this.running){

            return;

        }


        this.running=true;



        const loop=(time:number)=>{


            if(!this.running){

                return;

            }


            this.render(

                this.context.viewport?.getWidth() ?? 1,

                this.context.viewport?.getHeight() ?? 1,

                time

            );



            requestAnimationFrame(loop);


        };



        requestAnimationFrame(loop);


    }





    /**
     * Stop
     */
    public stop():void{


        this.running=false;


    }





    /**
     * Resize
     */
    public resize(

        width:number,

        height:number

    ):void{


        this.context.resize(

            width,

            height

        );


        this.pipeline.resize(

            width,

            height

        );


        this.invalidate();


    }





    /**
     * Dispose
     */
    public dispose():void{


        this.displayCache.clear();


        this.pipeline.dispose();


        this.initialized=false;


    }
    // ----------------------------------------------------
    // Statistics
    // ----------------------------------------------------


    public getStatistics():

    RenderEngineStatistics {


        const rendererStats =

            this.pipeline

            .getRenderer()

            .getStatistics();



        return {


            frame:

                this.frame,


            fps:

                this.fps,


            frameTime:

                this.frameTime,


            drawCalls:

                0,


            triangles:

                rendererStats.resourceCount,


            vertices:

                rendererStats.passCount



        };


    }





    /**
     * Kamera erişimi
     */
    public getCamera():

    RenderCamera {


        return this.camera;


    }





    /**
     * Scene erişimi
     */
    public getScene():

    RenderScene {


        return this.scene;


    }





    /**
     * Pipeline erişimi
     */
    public getPipeline():

    RenderPipeline {


        return this.pipeline;


    }






    // ----------------------------------------------------
    // Display Mesh Cache
    // ----------------------------------------------------



    /**
     * MeshBody için GPU display mesh üretir
     */
    private getDisplayMesh(

        body:MeshBody

    ):DisplayMesh {


        let displayMesh =

            this.displayCache.get(

                body.id

            );



        if(!displayMesh){


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





    /**
     * Mesh cache sil
     *
     * Model değişince çağrılır.
     */
    public invalidateMesh(

        bodyId:string

    ):void{


        this.displayCache.delete(

            bodyId

        );



        this.invalidate();


    }





    /**
     * Tüm cache temizle
     */
    public clearCache():

    void{


        this.displayCache.clear();



        this.invalidate();


    }





    /**
     * Cache var mı?
     */
    public hasCachedMesh(

        bodyId:string

    ):boolean{


        return this.displayCache.has(

            bodyId

        );


    }





    /**
     * Cache sayısı
     */
    public getCachedMeshCount():

    number{


        return this.displayCache.size;


    }





    /**
     * İlk yükleme için meshleri hazırla
     */
    public warmup():

    void{


        for(

            const body of

            this.scene.getMeshBodies()

        ){


            this.getDisplayMesh(

                body

            );


        }


    }






    // ----------------------------------------------------
    // Frame Timing
    // ----------------------------------------------------



    private beginFrame(

        time:number

    ):void{


        if(

            this.lastTime !== 0

        ){


            const delta =

                time -

                this.lastTime;



            if(delta > 0){


                this.fps =

                    1000 /

                    delta;



                this.frameTime =

                    delta /

                    1000;


            }


        }



        this.lastTime = time;


    }





    private endFrame():

    void{


        this.frame++;


    }







    // ----------------------------------------------------
    // Render Invalidation
    // ----------------------------------------------------



    /**
     * Yeniden çizim gerekli
     */
    public invalidate():

    void{


        this.needsRender = true;


    }





    /**
     * Gerekiyorsa render
     */
    public renderIfNeeded(

        width:number,

        height:number,

        time = performance.now()

    ):void{


        if(!this.needsRender){

            return;

        }



        this.render(

            width,

            height,

            time

        );



        this.needsRender=false;


    }







    /**
     * Kamera değişti
     */
    public cameraChanged():

    void{


        this.invalidate();


    }





    /**
     * Scene değişti
     */
    public sceneChanged():

    void{


        this.invalidate();


    }





    /**
     * Selection değişti
     */
    public selectionChanged():

    void{


        this.invalidate();


    }





    /**
     * Viewport değişti
     */
    public viewportChanged():

    void{


        this.invalidate();


    }





    /**
     * Stylus hareketi
     *
     * Android tablet kalem desteği
     */
    public stylusMoved(

        x:number,

        y:number,

        pressure:number

    ):void{


        /*
        
        İleride:
        
        pressure:
        - çizgi kalınlığı
        - seçim hassasiyeti
        - extrusion
        
        için kullanılacak.

        */


        void x;

        void y;

        void pressure;



        this.invalidate();


    }





    // ----------------------------------------------------
    // Statistics Reset
    // ----------------------------------------------------


    public resetStatistics():

    void{


        this.frame = 0;


        this.fps = 0;


        this.frameTime = 0;


        this.lastTime = 0;


    }





    // ----------------------------------------------------
    // Save / Restore
    // ----------------------------------------------------


    public saveState(){

        return {


            initialized:

                this.initialized,


            frame:

                this.frame,


            fps:

                this.fps,


            frameTime:

                this.frameTime,


            running:

                this.running,


            cacheSize:

                this.displayCache.size


        };


    }





    public restoreState(

        state:any

    ):void{


        this.frame =

            state.frame ?? 0;



        this.fps =

            state.fps ?? 0;



        this.frameTime =

            state.frameTime ?? 0;



        this.running =

            state.running ?? false;



    }






    // ----------------------------------------------------
    // Backend Information
    // ----------------------------------------------------


    public getBackendInfo(){

        return {


            engine:

                "TamerCAD RenderEngine",



            backend:

                this.context.getBackend(),



            initialized:

                this.initialized,



            running:

                this.running,



            viewport:

                this.context.viewport

                ?

                {

                    width:

                        this.context.viewport.getWidth(),


                    height:

                        this.context.viewport.getHeight()

                }

                :

                null



        };


    }







    // ----------------------------------------------------
    // Debug
    // ----------------------------------------------------


    public debugInfo(){

        return {


            type:

                "RenderEngine",



            initialized:

                this.initialized,



            running:

                this.running,



            frame:

                this.frame,



            fps:

                this.fps,



            frameTime:

                this.frameTime,



            cache:

                {

                    meshes:

                        this.displayCache.size

                },



            scene:

                this.scene.debugInfo(),



            pipeline:

                this.pipeline.debugInfo(),



            backend:

                this.getBackendInfo()



        };


    }






    // ----------------------------------------------------
    // Reload
    // ----------------------------------------------------


    public reload():

    void{


        const wasInitialized =

            this.initialized;



        this.pipeline.dispose();



        this.initialized=false;



        if(wasInitialized){


            this.initialize();


        }


    }






    // ----------------------------------------------------
    // Final
    // ----------------------------------------------------


}