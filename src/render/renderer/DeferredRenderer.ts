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


    context:

        RenderContext;


}



export interface DeferredRendererStatistics {


    frame:

        number;


    frameTime:

        number;


    passCount:

        number;


    resourceCount:

        number;


}



export class DeferredRenderer {



    protected readonly context:

        RenderContext;



    protected readonly graphBuilder:

        RenderGraphBuilder;



    protected readonly graphCompiler:

        RenderGraphCompiler;



    protected readonly graphExecutor:

        RenderGraphExecutor;



    protected readonly passes:

        RenderPass[] = [];



    protected initialized = false;



    protected frameIndex = 0;



    protected width = 1;



    protected height = 1;



    private lastFrameTime = 0;



    private lastPassCount = 0;



    private lastResourceCount = 0;



    constructor(

        options:

            DeferredRendererOptions

    ) {


        this.context =

            options.context;



        this.graphBuilder =

            new RenderGraphBuilder();



        this.graphCompiler =

            new RenderGraphCompiler();



        this.graphExecutor =

            new RenderGraphExecutor();


    }

    // ----------------------------------------------------
    // Lifecycle
    // ----------------------------------------------------


    initialize(): void {


        if (

            this.initialized

        ) {

            return;

        }



        this.onInitialize();



        this.initialized = true;


    }





    protected onInitialize(): void {


        for (

            const pass of this.passes

        ) {


            pass.initialize(

                this.context

            );


        }


    }





    dispose(): void {


        if (

            !this.initialized

        ) {

            return;

        }



        for (

            const pass of this.passes

        ) {


            pass.dispose(

                this.context

            );


        }



        this.passes.length = 0;



        this.graphBuilder.clear();



        this.initialized = false;


    }





    // ----------------------------------------------------
    // Render Pass Management
    // ----------------------------------------------------



    addPass(

        pass:

            RenderPass

    ): void {


        if (

            this.passes.includes(

                pass

            )

        ) {


            return;


        }



        this.passes.push(

            pass

        );



        this.sortPasses();



        if (

            this.initialized

        ) {


            pass.initialize(

                this.context

            );


        }


    }





    removePass(

        pass:

            RenderPass

    ): void {


        const index =

            this.passes.indexOf(

                pass

            );



        if (

            index < 0

        ) {

            return;

        }



        pass.dispose(

            this.context

        );



        this.passes.splice(

            index,

            1

        );


    }





    clearPasses(): void {


        for (

            const pass of this.passes

        ) {


            pass.dispose(

                this.context

            );


        }



        this.passes.length = 0;


    }





    protected sortPasses(): void {


        this.passes.sort(

            (

                a,

                b

            ) =>

                a.priority -

                b.priority

        );


    }





    getPasses():

    readonly RenderPass[] {


        return this.passes;


    }





    // ----------------------------------------------------
    // Resize
    // ----------------------------------------------------



    resize(

        width:number,

        height:number

    ):void {


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

    // ----------------------------------------------------
    // Frame Graph Construction
    // ----------------------------------------------------


    protected buildGraph(

        scene:

            RenderScene,

        camera:

            RenderCamera

    ): void {



        this.graphBuilder.clear();



        this.registerResources();



        this.registerPasses(

            scene,

            camera

        );


    }





    // ----------------------------------------------------
    // Resource Registration
    // ----------------------------------------------------



    protected registerResources(): void {



        /*
            Depth Buffer

            Android:
            OpenGL ES Depth Attachment

            Vulkan:
            VkImage Depth
        */


        this.graphBuilder.createResource(

            "Depth",

            RenderGraphResourceType.Depth,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            GBuffer

            CAD için:

            Position
            Normal
            Material
            Object ID
        */


        this.graphBuilder.createResource(

            "GBuffer",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            HDR Lighting Target

        */


        this.graphBuilder.createResource(

            "HDR",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            Ambient Occlusion

        */


        this.graphBuilder.createResource(

            "SSAO",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            Screen Space Reflection

            Opsiyonel:

            Tablet GPU için kapatılabilir

        */


        this.graphBuilder.createResource(

            "SSR",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            Bloom

            Metal / polished CAD yüzeyleri için

        */


        this.graphBuilder.createResource(

            "Bloom",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            Shapr3D tarzı seçim sistemi

            Mouse yerine:

            Stylus ID Buffer

        */


        this.graphBuilder.createResource(

            "Selection",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );





        /*
            CAD ölçüm ve sketch overlay

        */


        this.graphBuilder.createResource(

            "Overlay",

            RenderGraphResourceType.Texture,

            {

                width:

                    this.width,


                height:

                    this.height


            }

        );


    }

    // ----------------------------------------------------
    // Pass Registration
    // ----------------------------------------------------


    protected registerPasses(

        scene:

            RenderScene,

        camera:

            RenderCamera

    ): void {



        for (

            const renderPass of this.passes

        ) {



            const graphPass =

                this.graphBuilder.createPass(

                    renderPass.name

                );





            graphPass.setExecute(

                (

                    context:

                        RenderContext

                ) => {



                    renderPass.render(

                        context,

                        scene,

                        camera

                    );



                }

            );





            this.connectResources(

                graphPass,

                renderPass

            );



        }


    }





    // ----------------------------------------------------
    // Resource Connections
    // ----------------------------------------------------


    protected connectResources(

        graphPass:

            RenderGraphPass,

        renderPass:

            RenderPass

    ): void {



        /*
            Şimdilik otomatik bağlantı yok.

            İleride her RenderPass:

            reads:
                [
                    "Depth",
                    "GBuffer"
                ]


            writes:
                [
                    "HDR"
                ]


            şeklinde bildirecek.



            Örnek:



            GeometryPass

            WRITE:
                Depth
                GBuffer



            LightingPass

            READ:
                GBuffer
                Depth


            WRITE:
                HDR



            SelectionPass

            WRITE:
                Selection



            OverlayPass

            WRITE:
                Overlay


        */



        void graphPass;

        void renderPass;


    }





    // ----------------------------------------------------
    // Graph Compilation
    // ----------------------------------------------------


    protected compileGraph():

        RenderGraphCompileResult {



        return this.graphCompiler.compile(

            this.graphBuilder.getPasses(),

            this.graphBuilder.getResources()

        );


    }





    // ----------------------------------------------------
    // Graph Execution
    // ----------------------------------------------------


    protected executeGraph(

        result:

            RenderGraphCompileResult

    ): void {



        this.graphExecutor.execute(

            this.context,

            result

        );


    }

    // ----------------------------------------------------
    // Frame Render
    // ----------------------------------------------------


    render(

        scene:

            RenderScene,

        camera:

            RenderCamera

    ): void {



        if (

            !this.initialized

        ) {


            this.initialize();


        }





        const start =

            this.beginFrame();





        this.buildGraph(

            scene,

            camera

        );





        this.lastPassCount =

            this.graphBuilder

                .getPasses()

                .length;





        this.lastResourceCount =

            this.graphBuilder

                .getResources()

                .length;





        const compiled =

            this.compileGraph();





        this.executeGraph(

            compiled

        );





        this.endFrame(

            start

        );





        this.frameIndex++;


    }





    // ----------------------------------------------------
    // Frame Profiling
    // ----------------------------------------------------


    private beginFrame():

        number {



        return performance.now();


    }





    private endFrame(

        start:

            number

    ): void {



        this.lastFrameTime =

            performance.now()

            -

            start;


    }





    // ----------------------------------------------------
    // Frame Information
    // ----------------------------------------------------


    getFrameIndex():

    number {



        return this.frameIndex;


    }





    getStatistics():

    DeferredRendererStatistics {



        return {



            frame:

                this.frameIndex,



            frameTime:

                this.lastFrameTime,



            passCount:

                this.lastPassCount,



            resourceCount:

                this.lastResourceCount



        };


    }





    // ----------------------------------------------------
    // Debug
    // ----------------------------------------------------


    dumpGraph(): void {



        console.group(

            "Deferred Render Graph"

        );





        console.table(

            this.graphBuilder

                .getResources()

                .map(

                    resource =>

                        resource.debugInfo()

                )

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

    // ----------------------------------------------------
    // Hot Reload
    // ----------------------------------------------------


    reload(): void {



        this.dispose();



        this.initialize();



    }





    // ----------------------------------------------------
    // Debug Information
    // ----------------------------------------------------


    debugInfo() {



        return {



            type:

                "DeferredRenderer",



            initialized:

                this.initialized,



            frameIndex:

                this.frameIndex,



            resolution:

                {

                    width:

                        this.width,


                    height:

                        this.height


                },



            passes:

                this.passes.map(

                    pass =>

                        pass.name

                ),



            graph:

                this.graphBuilder.debugInfo(),



            executor:

                this.graphExecutor.debugInfo()



        };


    }



}