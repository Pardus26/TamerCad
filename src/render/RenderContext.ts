import { RenderViewport } from "./RenderViewport";
import { RenderCamera } from "./RenderCamera";


/**
 * Desteklenen render backendleri
 */
export enum RenderBackend {

    WebGL = "WebGL",

    WebGPU = "WebGPU",

    Vulkan = "Vulkan",

    OpenGLES = "OpenGLES",

    Software = "Software"

}



/**
 * GPU yetenekleri
 */
export interface RenderCapabilities {


    maxTextureSize: number;


    maxVertexAttributes: number;


    maxUniformVectors: number;


    supportsInstancing: boolean;


    supportsFloatTextures: boolean;


    supportsDepthTexture: boolean;


    supportsMSAA: boolean;


}



/**
 * Render durum bilgisi
 */
export interface RenderState {


    depthTest: boolean;


    blending: boolean;


    culling: boolean;


    wireframe: boolean;


}



/**
 * Ana Render Context
 *
 * GPU ile engine arasındaki köprü
 *
 * Android:
 *
 * OpenGL ES
 * Vulkan
 *
 * Web:
 *
 * WebGL
 * WebGPU
 *
 */
export class RenderContext {


    /**
     * Aktif backend
     */
    public backend:

        RenderBackend;



    /**
     * Native GPU context
     *
     * WebGLRenderingContext
     *
     * GPUDevice
     *
     * EGL Context
     *
     */
    public nativeContext:

        any = null;



    /**
     * Aktif viewport
     */
    public viewport:

        RenderViewport | null = null;



    /**
     * Aktif kamera
     */
    public camera:

        RenderCamera | null = null;



    /**
     * GPU özellikleri
     */
    public capabilities:

        RenderCapabilities = {


            maxTextureSize:

                0,


            maxVertexAttributes:

                0,


            maxUniformVectors:

                0,


            supportsInstancing:

                false,


            supportsFloatTextures:

                false,


            supportsDepthTexture:

                false,


            supportsMSAA:

                false


        };



    /**
     * Render state
     */
    public state:

        RenderState = {


            depthTest:

                true,


            blending:

                false,


            culling:

                true,


            wireframe:

                false


        };



    private initialized = false;



    constructor(

        backend:

            RenderBackend =

                RenderBackend.Software

    ) {


        this.backend = backend;


    }

    /**
     * GPU context başlat
     */
    public initialize(

        nativeContext?: any

    ): void {


        this.nativeContext =

            nativeContext ?? null;



        this.detectCapabilities();



        this.initialized = true;

    }




    /**
     * Başlatıldı mı?
     */
    public isInitialized():

    boolean {


        return this.initialized;

    }




    // ----------------------------------------------------
    // Camera / Viewport
    // ----------------------------------------------------


    /**
     * Aktif viewport ata
     */
    public setViewport(

        viewport: RenderViewport

    ): void {


        this.viewport = viewport;


    }




    /**
     * Aktif kamera ata
     */
    public setCamera(

        camera: RenderCamera

    ): void {


        this.camera = camera;


    }




    /**
     * Aspect ratio
     */
    public getAspectRatio():

    number {


        if (

            !this.viewport

        ) {

            return 1;

        }



        return this.viewport.getAspectRatio();

    }




    /**
     * Viewport GPU'ya uygula
     */
    public applyViewport():

    void {


        if (

            !this.viewport

        ) {

            return;

        }



        if (

            !this.nativeContext

        ) {

            return;

        }



        this.viewport.apply(

            this.nativeContext

        );

    }




    // ----------------------------------------------------
    // Render State
    // ----------------------------------------------------


    /**
     * Depth test
     */
    public setDepthTest(

        enabled:boolean

    ):void {


        this.state.depthTest = enabled;


    }




    /**
     * Blending
     */
    public setBlending(

        enabled:boolean

    ):void {


        this.state.blending = enabled;


    }




    /**
     * Face culling
     */
    public setCulling(

        enabled:boolean

    ):void {


        this.state.culling = enabled;


    }




    /**
     * Wireframe modu
     *
     * CAD görünümü için
     */
    public setWireframe(

        enabled:boolean

    ):void {


        this.state.wireframe = enabled;


    }




    public getRenderState():

    RenderState {


        return {


            ...this.state

        };


    }

    // ----------------------------------------------------
    // Frame Operations
    // ----------------------------------------------------


    /**
     * Framebuffer temizleme
     *
     * Backend bağımsız.
     *
     * WebGL:
     *
     * gl.clear()
     *
     * Vulkan:
     *
     * RenderPass clear attachment
     *
     */
 public clear(

    options: {

        color?: boolean;

        depth?: boolean;

        stencil?: boolean;

    } = {}

): void {



    if (

        !this.nativeContext

    ) {

        return;

    }



    const color =

        options.color ?? true;



    const depth =

        options.depth ?? true;



    const stencil =

        options.stencil ?? false;



    /*
        Backend bağımsız clear


        WebGL:

        gl.clear(
            COLOR_BUFFER_BIT |
            DEPTH_BUFFER_BIT |
            STENCIL_BUFFER_BIT
        )


        Vulkan:

        vkCmdBeginRenderPass(
            clearValues
        )


        OpenGL ES:

        glClear()

    */



    void color;

    void depth;

    void stencil;


}



    /**
     * Ekran boyutu değişimi
     */
    public resize(

        width:number,

        height:number

    ):void {


        if (

            this.viewport

        ) {


            this.viewport.resize(

                width,

                height

            );

        }



        if (

            this.camera

        ) {


            this.camera.aspect =

                width /

                Math.max(

                    height,

                    1

                );

        }

    }




    // ----------------------------------------------------
    // Capabilities
    // ----------------------------------------------------


    /**
     * GPU özellikleri
     */
    public getCapabilities():

    RenderCapabilities {


        return {


            ...this.capabilities


        };

    }




    /**
     * Backend bilgisi
     */
    public getBackend():

    RenderBackend {


        return this.backend;

    }




    /**
     * Native context erişimi
     */
    public getNativeContext():

    any {


        return this.nativeContext;

    }




    // ----------------------------------------------------
    // Lifecycle
    // ----------------------------------------------------


    /**
     * Render context kapat
     */
    public dispose():

    void {


        this.nativeContext = null;



        this.viewport = null;



        this.camera = null;



        this.initialized = false;


    }

    // ----------------------------------------------------
    // Capability Detection
    // ----------------------------------------------------


    private detectCapabilities():

    void {



        /**
         * WebGL
         */
        if (

            this.backend ===

            RenderBackend.WebGL &&

            this.nativeContext

        ) {


            const gl =

                this.nativeContext;



            this.capabilities = {


                maxTextureSize:

                    gl.getParameter(

                        gl.MAX_TEXTURE_SIZE

                    ) ?? 0,



                maxVertexAttributes:

                    gl.getParameter(

                        gl.MAX_VERTEX_ATTRIBS

                    ) ?? 0,



                maxUniformVectors:

                    gl.getParameter(

                        gl.MAX_VERTEX_UNIFORM_VECTORS

                    ) ?? 0,



                supportsInstancing:

                    !!gl.drawElementsInstanced,



                supportsFloatTextures:

                    !!gl.FLOAT,



                supportsDepthTexture:

                    !!gl.DEPTH_COMPONENT,



                supportsMSAA:

                    !!gl.SAMPLES



            };


            return;

        }




        /**
         * WebGPU
         */
        if (

            this.backend ===

            RenderBackend.WebGPU

        ) {


            this.capabilities = {


                maxTextureSize:

                    16384,



                maxVertexAttributes:

                    16,



                maxUniformVectors:

                    256,



                supportsInstancing:

                    true,



                supportsFloatTextures:

                    true,



                supportsDepthTexture:

                    true,



                supportsMSAA:

                    true


            };


            return;

        }





        /**
         * Android OpenGL ES
         *
         * İleride native bridge
         * üzerinden doldurulacak.
         */
        if (

            this.backend ===

            RenderBackend.OpenGLES

        ) {


            this.capabilities = {


                maxTextureSize:

                    8192,



                maxVertexAttributes:

                    16,



                maxUniformVectors:

                    256,



                supportsInstancing:

                    true,



                supportsFloatTextures:

                    true,



                supportsDepthTexture:

                    true,



                supportsMSAA:

                    true


            };


            return;

        }





        /**
         * Vulkan
         *
         * Native Android
         * renderer için hazırlık.
         */
        if (

            this.backend ===

            RenderBackend.Vulkan

        ) {


            this.capabilities = {


                maxTextureSize:

                    16384,



                maxVertexAttributes:

                    32,



                maxUniformVectors:

                    512,



                supportsInstancing:

                    true,



                supportsFloatTextures:

                    true,



                supportsDepthTexture:

                    true,



                supportsMSAA:

                    true


            };


            return;

        }





        /**
         * Software fallback
         */
        this.capabilities = {


            maxTextureSize:

                0,



            maxVertexAttributes:

                0,



            maxUniformVectors:

                0,



            supportsInstancing:

                false,



            supportsFloatTextures:

                false,



            supportsDepthTexture:

                false,



            supportsMSAA:

                false


        };

    }


}