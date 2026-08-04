import {
    RenderContext
} from "../RenderContext";


import {
    RenderScene
} from "../RenderScene";


import {
    RenderCamera
} from "../RenderCamera";


import {
    RenderPass
} from "../pass/RenderPass";


import {
    RenderGraphBuilder
} from "../graph/RenderGraphBuilder";


import {
    RenderGraphCompiler,
    RenderGraphCompileResult
} from "../graph/RenderGraphCompiler";


import {
    RenderGraphExecutor
} from "../graph/RenderGraphExecutor";


import {
    RenderGraphPass
} from "../graph/RenderGraphPass";


import {
    RenderGraphResourceType
} from "../graph/RenderGraphResource";




export interface DeferredRendererOptions {


    context: RenderContext;

}



export interface DeferredRendererStatistics {


    frame:number;


    frameTime:number;


    passCount:number;


    resourceCount:number;


}




export class DeferredRenderer {


    protected readonly context:

        RenderContext;



    protected readonly graphBuilder:

        RenderGraphBuilder;



    protected readonly compiler:

        RenderGraphCompiler;



    protected readonly executor:

        RenderGraphExecutor;



    protected readonly passes:

        RenderPass[] = [];



    protected initialized = false;



    private frame = 0;



    private width = 1;


    private height = 1;



    private frameTime = 0;



    private passCount = 0;



    private resourceCount = 0;




    constructor(

        options:

            DeferredRendererOptions

    ){


        this.context =

            options.context;



        this.graphBuilder =

            new RenderGraphBuilder();



        this.compiler =

            new RenderGraphCompiler();



        this.executor =

            new RenderGraphExecutor();


    }





    // ------------------------------------------------
    // Lifecycle
    // ------------------------------------------------


    initialize():void{


        if(this.initialized)

            return;



        for(const pass of this.passes){


            pass.initialize(

                this.context

            );


        }



        this.initialized = true;


    }





    dispose():void{


        if(!this.initialized)

            return;



        for(const pass of this.passes){


            pass.dispose(

                this.context

            );


        }



        this.passes.length = 0;



        this.graphBuilder.clear();



        this.initialized = false;


    }




    // ------------------------------------------------
    // Pass Management
    // ------------------------------------------------


    addPass(

        pass:RenderPass

    ):void{


        if(

            this.passes.includes(pass)

        )

            return;



        this.passes.push(pass);



        this.passes.sort(

            (a,b)=>

                a.priority -

                b.priority

        );



        if(this.initialized){


            pass.initialize(

                this.context

            );

        }


    }





    removePass(

        pass:RenderPass

    ):void{


        const index =

            this.passes.indexOf(pass);



        if(index === -1)

            return;



        pass.dispose(

            this.context

        );



        this.passes.splice(

            index,

            1

        );


    }





    clearPasses():void{


        for(const pass of this.passes){


            pass.dispose(

                this.context

            );


        }



        this.passes.length = 0;


    }





    getPasses():

    readonly RenderPass[]{


        return this.passes;


    }

    // ------------------------------------------------
    // Resize
    // ------------------------------------------------


    resize(

        width:number,

        height:number

    ):void{


        this.width =

            Math.max(

                width,

                1

            );


        this.height =

            Math.max(

                height,

                1

            );


    }





    public getWidth():number{


        return this.width;


    }





    public getHeight():number{


        return this.height;


    }





    // ------------------------------------------------
    // Render Graph Resources
    // ------------------------------------------------


    protected registerResources():void{


        const size = {


            width:

                this.width,


            height:

                this.height


        };




        /*
            Depth attachment

            Vulkan:
            VkImage depth


            OpenGL:

            GL_DEPTH_ATTACHMENT

        */


        this.graphBuilder.createResource(

            "Depth",

            RenderGraphResourceType.Depth,

            size

        );





        /*
            Deferred GBuffer

            CAD için:

            Position:
                world position


            Normal:
                surface normal


            Albedo:
                base color


            Material:

                roughness
                metallic
                shader flags

        */



        this.graphBuilder.createResource(

            "GBuffer_Position",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA16F"

            }

        );





        this.graphBuilder.createResource(

            "GBuffer_Normal",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA16F"

            }

        );





        this.graphBuilder.createResource(

            "GBuffer_Albedo",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA8"

            }

        );





        this.graphBuilder.createResource(

            "GBuffer_Material",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA8"

            }

        );





        /*
            Object ID buffer

            Shapr3D / CAD seçim sistemi

            mouse yerine:

            GPU picking

        */


        this.graphBuilder.createResource(

            "ObjectID",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "R32UI"

            }

        );






        /*
            Lighting output

            HDR framebuffer

        */


        this.graphBuilder.createResource(

            "HDR_Lighting",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA16F"

            }

        );





        /*
            Screen Space Ambient Occlusion

        */


        this.graphBuilder.createResource(

            "SSAO",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width / 2,


                height:

                    this.height / 2,


                format:

                    "R8"

            }

        );





        /*
            Screen Space Reflection

            Metal yüzeyler

            CNC / CAD parçalar

        */


        this.graphBuilder.createResource(

            "SSR",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA16F"

            }

        );





        /*
            Bloom chain

            rough CAD highlights

        */


        this.graphBuilder.createResource(

            "Bloom",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA16F",

                mipLevels:

                    5

            }

        );





        /*
            CAD overlay

            ölçü çizgileri

            sketch

            gizmo

        */


        this.graphBuilder.createResource(

            "Overlay",

            RenderGraphResourceType.Texture,

            {

                ...size,

                format:

                    "RGBA8"

            }

        );


    }

    // ------------------------------------------------
    // Render Graph Construction
    // ------------------------------------------------


    protected buildGraph(

        scene:RenderScene,

        camera:RenderCamera

    ):void{


        this.graphBuilder.clear();



        this.registerResources();



        this.registerPasses(

            scene,

            camera

        );


    }





    // ------------------------------------------------
    // Pass Registration
    // ------------------------------------------------


    protected registerPasses(

        scene:RenderScene,

        camera:RenderCamera

    ):void{


        for(

            const pass of this.passes

        ){


            const graphPass =

                this.graphBuilder.createPass(

                    pass.name

                );



            graphPass.setPriority(

                pass.priority

            );



            graphPass.setExecute(

                (

                    context:RenderContext

                )=>{


                    pass.render(

                        context,

                        scene,

                        camera

                    );


                }

            );



            this.connectResources(

                graphPass,

                pass

            );


        }


    }





    // ------------------------------------------------
    // Resource Dependencies
    // ------------------------------------------------


    protected connectResources(

        graphPass:RenderGraphPass,

        pass:RenderPass

    ):void{


        /*
        
            Her RenderPass artık:

            reads():

                [
                    "Depth",
                    "GBuffer_Normal"
                ]


            writes():

                [
                    "HDR_Lighting"
                ]


            döndürebilir.


        */


        const reads =

            pass.reads();



        const writes =

            pass.writes();





        for(

            const resource of reads

        ){


            this.graphBuilder.connectRead(

                graphPass,

                resource

            );


        }





        for(

            const resource of writes

        ){


            this.graphBuilder.connectWrite(

                graphPass,

                resource

            );


        }


    }





    // ------------------------------------------------
    // Compile
    // ------------------------------------------------


    protected compileGraph():

    RenderGraphCompileResult{


        return this.compiler.compile(

            this.graphBuilder.getPasses(),

            this.graphBuilder.getResources()

        );


    }





    // ------------------------------------------------
    // Execute
    // ------------------------------------------------


    protected executeGraph(

        result:RenderGraphCompileResult

    ):void{


        this.executor.execute(

            this.context,

            result

        );


    }

    // ------------------------------------------------
    // Frame Rendering
    // ------------------------------------------------


    render(

        scene:RenderScene,

        camera:RenderCamera

    ):void{


        if(!this.initialized){


            this.initialize();


        }



        const start =

            this.beginFrame();





        /*
            1)

            Render graph oluşturulur


        */


        this.buildGraph(

            scene,

            camera

        );





        /*
            2)

            Compile edilir


            Dependency:

                Pass order

                Resource barrier

                Lifetime


        */


        const compiled =

            this.compileGraph();





        this.passCount =

            compiled.passes.length;





        this.resourceCount =

            compiled.resources.length;





        /*
            3)

            GPU execute

        */


        this.executeGraph(

            compiled

        );





        this.endFrame(

            start

        );





        this.frame++;


    }





    // ------------------------------------------------
    // Frame Timing
    // ------------------------------------------------


    private beginFrame():

    number{


        return performance.now();


    }





    private endFrame(

        start:number

    ):void{


        this.frameTime =

            performance.now()

            -

            start;


    }





    // ------------------------------------------------
    // Statistics
    // ------------------------------------------------


    getStatistics():

    DeferredRendererStatistics{


        return {


            frame:

                this.frame,


            frameTime:

                this.frameTime,


            passCount:

                this.passCount,


            resourceCount:

                this.resourceCount


        };


    }





    getFrame():

    number{


        return this.frame;


    }





    getFrameTime():

    number{


        return this.frameTime;


    }





    // ------------------------------------------------
    // Debug
    // ------------------------------------------------


    dumpGraph():void{


        console.group(

            "Deferred Render Graph"

        );




        console.log(

            "Resources"

        );



        console.table(

            this.graphBuilder

            .getResources()

            .map(

                resource =>

                    resource.debugInfo()

            )

        );




        console.log(

            "Passes"

        );



        console.table(

            this.graphBuilder

            .getPasses()

            .map(

                pass =>

                    pass.debugInfo()

            )

        );



        console.groupEnd();


    }





    debugInfo(){


        return {


            renderer:

                "DeferredRenderer",



            initialized:

                this.initialized,



            frame:

                this.frame,



            size:

                {

                    width:

                        this.width,


                    height:

                        this.height

                },



            passes:

                this.passes.map(

                    p =>

                        p.name

                ),



            statistics:

                this.getStatistics(),



            graph:

                this.graphBuilder.debugInfo()



        };


    }

    // ------------------------------------------------
    // Reload
    // ------------------------------------------------


    reload():void{


        const wasInitialized =

            this.initialized;



        this.dispose();



        if(wasInitialized){


            this.initialize();


        }


    }





    // ------------------------------------------------
    // Resize State
    // ------------------------------------------------


    getWidth():number{


        return this.width;


    }



    getHeight():number{


        return this.height;


    }





    // ------------------------------------------------
    // Renderer State
    // ------------------------------------------------


    saveState(){


        return {


            initialized:

                this.initialized,


            frame:

                this.frame,


            width:

                this.width,


            height:

                this.height,


            passes:

                this.passes.map(

                    pass =>

                        pass.name

                )


        };


    }





    restoreState(

        state:any

    ):void{


        this.frame =

            state.frame ?? 0;



        this.width =

            state.width ?? 1;



        this.height =

            state.height ?? 1;


    }





    // ------------------------------------------------
    // Dispose
    // ------------------------------------------------


    dispose():void{


        if(!this.initialized){


            return;


        }




        for(

            const pass of this.passes

        ){


            pass.dispose(

                this.context

            );


        }




        this.passes.length = 0;



        this.graphBuilder.clear();



        this.initialized=false;



    }





    // ------------------------------------------------
    // Backend Information
    // ------------------------------------------------


    getBackendInfo(){


        return {


            renderer:

                "DeferredRenderer",


            api:

                this.context.api,


            resolution:

                {

                    width:

                        this.width,


                    height:

                        this.height

                },


            frame:

                this.frame



        };


    }





    // ------------------------------------------------
    // Final Debug
    // ------------------------------------------------


    printDebug():void{


        console.group(

            "Renderer Debug"

        );



        console.log(

            this.getBackendInfo()

        );



        console.log(

            this.getStatistics()

        );



        this.dumpGraph();



        console.groupEnd();


    }

}