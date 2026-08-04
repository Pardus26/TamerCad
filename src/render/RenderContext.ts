import { RenderViewport } from "./RenderViewport";
import { RenderCamera } from "./RenderCamera";


export enum RenderBackend {

    WebGL = "WebGL",
    WebGPU = "WebGPU",
    Vulkan = "Vulkan",
    OpenGLES = "OpenGLES",
    Software = "Software"

}



export interface RenderCapabilities {

    maxTextureSize:number;

    maxVertexAttributes:number;

    maxUniformVectors:number;

    supportsInstancing:boolean;

    supportsFloatTextures:boolean;

    supportsDepthTexture:boolean;

    supportsMSAA:boolean;

}



export interface RenderState {

    depthTest:boolean;

    blending:boolean;

    culling:boolean;

    wireframe:boolean;

}





export class RenderContext {


    public backend:RenderBackend;


    public nativeContext:any = null;


    public viewport:RenderViewport|null = null;


    public camera:RenderCamera|null = null;



    private initialized = false;


    private dirty = true;




    public capabilities:RenderCapabilities = {

        maxTextureSize:0,

        maxVertexAttributes:0,

        maxUniformVectors:0,

        supportsInstancing:false,

        supportsFloatTextures:false,

        supportsDepthTexture:false,

        supportsMSAA:false

    };





    public state:RenderState = {


        depthTest:true,

        blending:false,

        culling:true,

        wireframe:false


    };





    constructor(

        backend:RenderBackend = RenderBackend.Software

    ){

        this.backend = backend;

    }





    public initialize(

        nativeContext?:any

    ):void{


        this.nativeContext = nativeContext ?? null;


        this.detectCapabilities();


        this.initialized = true;


        this.invalidate();


    }






    public isInitialized():boolean{


        return this.initialized;


    }






    public setViewport(

        viewport:RenderViewport

    ):void{


        this.viewport = viewport;


        this.invalidate();


    }






    public setCamera(

        camera:RenderCamera

    ):void{


        this.camera = camera;


        this.invalidate();


    }







    public getAspectRatio():number{


        if(!this.viewport)

            return 1;



        return this.viewport.getAspectRatio();


    }






    public applyViewport():void{


        if(!this.viewport)

            return;



        this.viewport.apply(

            this.nativeContext

        );


    }






    public setDepthTest(

        enabled:boolean

    ):void{


        this.state.depthTest = enabled;


        this.invalidate();


    }





    public setBlending(

        enabled:boolean

    ):void{


        this.state.blending = enabled;


        this.invalidate();


    }






    public setCulling(

        enabled:boolean

    ):void{


        this.state.culling = enabled;


        this.invalidate();


    }






    public setWireframe(

        enabled:boolean

    ):void{


        this.state.wireframe = enabled;


        this.invalidate();


    }






    public getRenderState():RenderState{


        return {

            ...this.state

        };


    }







    public clear(

        options:{

            color?:boolean;

            depth?:boolean;

            stencil?:boolean;


        } = {}

    ):void{


        if(!this.nativeContext)

            return;



        const color =
            options.color ?? true;


        const depth =
            options.depth ?? true;


        const stencil =
            options.stencil ?? false;



        const gl = this.nativeContext;



        if(gl.clear){


            let mask = 0;



            if(color && gl.COLOR_BUFFER_BIT)

                mask |= gl.COLOR_BUFFER_BIT;



            if(depth && gl.DEPTH_BUFFER_BIT)

                mask |= gl.DEPTH_BUFFER_BIT;



            if(stencil && gl.STENCIL_BUFFER_BIT)

                mask |= gl.STENCIL_BUFFER_BIT;



            gl.clear(mask);


        }


    }







    public resize(

        width:number,

        height:number

    ):void{


        if(this.viewport){


            this.viewport.resize(

                width,

                height

            );

        }



        if(this.camera){


            this.camera.setAspectRatio?.(

                width /

                Math.max(

                    height,

                    1

                )

            );


        }



        this.invalidate();


    }







    public getCapabilities():RenderCapabilities{


        return {

            ...this.capabilities

        };


    }







    public getBackend():RenderBackend{


        return this.backend;


    }






    public getNativeContext():any{


        return this.nativeContext;


    }






    public invalidate():void{


        this.dirty = true;


    }






    public needsRender():boolean{


        return this.dirty;


    }






    public consumeRenderFlag():void{


        this.dirty = false;


    }







    public dispose():void{


        this.nativeContext = null;


        this.viewport = null;


        this.camera = null;


        this.initialized = false;


        this.dirty = false;


    }







    private detectCapabilities():void{


        if(

            this.backend === RenderBackend.WebGL &&

            this.nativeContext

        ){


            const gl=this.nativeContext;



            this.capabilities={


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

                    true,


                supportsDepthTexture:

                    true,


                supportsMSAA:

                    true


            };


            return;

        }





        if(

            this.backend===RenderBackend.WebGPU ||

            this.backend===RenderBackend.Vulkan

        ){


            this.capabilities={


                maxTextureSize:16384,

                maxVertexAttributes:32,

                maxUniformVectors:512,

                supportsInstancing:true,

                supportsFloatTextures:true,

                supportsDepthTexture:true,

                supportsMSAA:true


            };


            return;


        }





        if(

            this.backend===RenderBackend.OpenGLES

        ){


            this.capabilities={


                maxTextureSize:8192,

                maxVertexAttributes:16,

                maxUniformVectors:256,

                supportsInstancing:true,

                supportsFloatTextures:true,

                supportsDepthTexture:true,

                supportsMSAA:true


            };


            return;


        }




        this.capabilities={


            maxTextureSize:0,

            maxVertexAttributes:0,

            maxUniformVectors:0,

            supportsInstancing:false,

            supportsFloatTextures:false,

            supportsDepthTexture:false,

            supportsMSAA:false


        };


    }


}