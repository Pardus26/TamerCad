import { RenderContext } from "./RenderContext";
import { RenderScene } from "./RenderScene";
import { RenderCamera } from "./RenderCamera";

import { DeferredRenderer } from "./renderer/DeferredRenderer";

import { RenderPass } from "./pass/RenderPass";

import { DepthPass } from "./pass/DepthPass";
import { GeometryPass } from "./pass/GeometryPass";
import { ShadowPass } from "./pass/ShadowPass";
import { LightingPass } from "./pass/LightingPass";



/**
 * Pipeline ayarları
 */
export interface RenderPipelineOptions {


    context: RenderContext;


    renderer?: DeferredRenderer;


}



/**
 * RenderPipeline
 *
 * CAD render aşamaları:
 *
 * Depth
 * Geometry
 * Selection
 * Edges
 * Shadows
 * Lighting
 * Overlay
 *
 */
export class RenderPipeline {


    private readonly context:

        RenderContext;



    private readonly renderer:

        DeferredRenderer;



    private initialized = false;



    constructor(

        options: RenderPipelineOptions

    ) {


        this.context =

            options.context;



        this.renderer =

            options.renderer ??

            new DeferredRenderer({

                context:

                    this.context

            });


    }



    /**
     * Pipeline başlat
     */
    public initialize():

    void {


        if (

            this.initialized

        ) {

            return;

        }



        this.build();



        this.renderer.initialize();



        this.initialized = true;


    }

    /**
     * Frame render
     */
    public render(

        scene: RenderScene,

        camera: RenderCamera

    ): void {


        if (

            !this.initialized

        ) {

            this.initialize();

        }



        this.context.setCamera(

            camera

        );



        this.renderer.render(

            scene,

            camera

        );


    }





    /**
     * Viewport değişimi
     */
    public resize(

        width:number,

        height:number

    ):void {


        this.context.resize(

            width,

            height

        );


        this.renderer.resize(

            width,

            height

        );

    }





    /**
     * Pipeline temizleme
     */
    public dispose():

    void {


        this.renderer.dispose();


        this.initialized = false;


    }





    /**
     * Hazır mı?
     */
    public isInitialized():

    boolean {


        return this.initialized;


    }

    // ----------------------------------------------------
    // Render Pass Construction
    // ----------------------------------------------------


    private build():

    void {


        this.renderer.clearPasses();



        /**
         * Depth Pass
         *
         * Görünürlük ve
         * occlusion hesapları
         */
        this.renderer.addPass(

            new DepthPass()

        );



        /**
         * Geometry Pass
         *
         * Mesh çizimi
         *
         * Vertex
         * Normal
         * Material
         */
        this.renderer.addPass(

            new GeometryPass()

        );



        /**
         * Shadow Pass
         *
         * CAD modeli için
         * gerçekçi ışık
         */
        this.renderer.addPass(

            new ShadowPass()

        );



        /**
         * Lighting Pass
         *
         * Final renk üretimi
         */
        this.renderer.addPass(

            new LightingPass()

        );


    }





    /**
     * Dışarıdan pass ekleme
     *
     * Örnek:
     *
     * SelectionPass
     *
     * WireframePass
     *
     * MeasurementPass
     */
    public addPass(

        pass: RenderPass

    ):void {


        this.renderer.addPass(

            pass

        );


    }





    /**
     * Mevcut renderer
     */
    public getRenderer():

    DeferredRenderer {


        return this.renderer;


    }

    // ----------------------------------------------------
    // Debug / CAD Information
    // ----------------------------------------------------


    private wireframeMode = false;



    private selectionMode = false;



    /**
     * Wireframe görüntüleme
     *
     * CAD kenar görünümü için
     */
    public setWireframeMode(

        enabled:boolean

    ):void {


        this.wireframeMode = enabled;



        this.context.invalidate?.();


    }





    public isWireframeMode():

    boolean {


        return this.wireframeMode;


    }





    /**
     * Selection render modu
     *
     * Kalem ile yüzey/kenar seçimi
     */
    public setSelectionMode(

        enabled:boolean

    ):void {


        this.selectionMode = enabled;



        this.context.invalidate?.();


    }





    public isSelectionMode():

    boolean {


        return this.selectionMode;


    }





    /**
     * Debug bilgileri
     */
    public debugInfo():

    object {


        return {


            type:

                "RenderPipeline",



            initialized:

                this.initialized,



            wireframeMode:

                this.wireframeMode,



            selectionMode:

                this.selectionMode,



            renderer:

                this.renderer.debugInfo?.() ?? null


        };


    }

    // ----------------------------------------------------
    // CAD Render Extensions
    // ----------------------------------------------------


    /**
     * CAD Selection Pass ekleme noktası
     *
     * Daha sonra:
     *
     * SelectionPass
     * ID Buffer
     * GPU Picking
     *
     * burada bağlanacak.
     */
    public enableCADSelection():

    void {


        if (

            this.selectionMode

        ) {

            return;

        }



        this.selectionMode = true;



    }





    /**
     * CAD Edge / Wireframe desteği
     *
     * Shapr3D benzeri
     * çizgi görünümü
     */
    public enableEdges():

    void {


        this.wireframeMode = true;


    }





    /**
     * Solid görünüm
     */
    public disableEdges():

    void {


        this.wireframeMode = false;


    }





    /**
     * Render sırası bilgisi
     *
     * Debug için
     */
    public getPassOrder():

    string[] {


        return [


            "DepthPass",


            "GeometryPass",


            "ShadowPass",


            "LightingPass"


        ];


    }





    /**
     * Context erişimi
     */
    public getContext():

    RenderContext {


        return this.context;


    }

    // ----------------------------------------------------
    // Lifecycle Helpers
    // ----------------------------------------------------


    /**
     * Pipeline temiz reset
     */
    public reset():

    void {


        this.renderer.clearPasses();



        this.initialized = false;



    }





    /**
     * Aktif pass sayısı
     */
    public getPassCount():

    number {


        return this.renderer.getPassCount?.() ?? 0;


    }





    /**
     * Render backend bilgisi
     */
    public getBackendInfo():

    object {


        return {


            backend:

                this.context.getBackend(),



            initialized:

                this.initialized


        };


    }





    /**
     * Pipeline hazır mı?
     */
    public ensureInitialized():

    void {


        if (

            !this.initialized

        ) {


            this.initialize();

        }


    }



}
