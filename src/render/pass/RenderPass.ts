// src/render/pass/RenderPass.ts

import {
    RenderContext
} from "../RenderContext";

import {
    RenderScene
} from "../RenderScene";

import {
    RenderCamera
} from "../RenderCamera";



export interface RenderPassOptions {


    name?: string;


    enabled?: boolean;


    priority?: number;


    clearColor?: boolean;


    clearDepth?: boolean;


    clearStencil?: boolean;


}



export interface RenderPassResources {


    reads: string[];


    writes: string[];


}



export interface RenderPassStatistics {


    name: string;


    enabled: boolean;


    priority: number;


    frameTime: number;


}



export abstract class RenderPass {



    public readonly name: string;



    public enabled = true;



    public priority = 0;



    public clearColor = false;



    public clearDepth = false;



    public clearStencil = false;



    protected initialized = false;



    private lastFrameTime = 0;



    private executing = false;



    /**
     * RenderGraph dependency declaration
     */
    public readonly resources:

        RenderPassResources = {


            reads: [],


            writes: []


        };





    constructor(

        options:

            RenderPassOptions = {}

    ) {


        this.name =

            options.name ??

            this.constructor.name;



        if (

            options.enabled !== undefined

        ) {


            this.enabled =

                options.enabled;


        }



        if (

            options.priority !== undefined

        ) {


            this.priority =

                options.priority;


        }



        this.clearColor =

            options.clearColor ?? false;



        this.clearDepth =

            options.clearDepth ?? false;



        this.clearStencil =

            options.clearStencil ?? false;


    }





    // ==================================================
    // Lifecycle
    // ==================================================


    public initialize(

        context:

            RenderContext

    ): void {



        if (

            this.initialized

        ) {


            return;


        }



        this.onInitialize(

            context

        );



        this.initialized = true;


    }





    public dispose(

        context:

            RenderContext

    ): void {



        if (

            !this.initialized

        ) {


            return;


        }



        this.onDispose(

            context

        );



        this.initialized = false;


    }





    protected onInitialize(

        context:

            RenderContext

    ): void {


        void context;


    }





    protected onDispose(

        context:

            RenderContext

    ): void {


        void context;


    }





    // ==================================================
    // Render Entry
    // ==================================================


    public render(

        context:

            RenderContext,

        scene:

            RenderScene,

        camera:

            RenderCamera

    ): void {



        if (

            !this.enabled

        ) {


            return;


        }





        if (

            this.executing

        ) {


            throw new Error(

                `RenderPass recursion detected: ${this.name}`

            );


        }





        this.executing = true;



        const start =

            performance.now();





        try {


            this.begin(

                context

            );





            this.execute(

                context,

                scene,

                camera

            );





            this.end(

                context

            );


        }

        finally {


            this.executing = false;



            this.lastFrameTime =

                performance.now()

                -

                start;


        }


    }





    // ==================================================
    // GPU Begin / End
    // ==================================================


    protected begin(

        context:

            RenderContext

    ): void {



        if (

            this.clearColor ||

            this.clearDepth ||

            this.clearStencil

        ) {


            context.clear({

                color:

                    this.clearColor,


                depth:

                    this.clearDepth,


                stencil:

                    this.clearStencil


            });


        }


    }





    protected end(

        context:

            RenderContext

    ): void {


        void context;


    }





    // ==================================================
    // Resource Declaration
    // ==================================================


    public reads(

        ...resources:string[]

    ):this {



        this.resources.reads.push(

            ...resources

        );



        return this;


    }





    public writes(

        ...resources:string[]

    ):this {



        this.resources.writes.push(

            ...resources

        );



        return this;


    }





    public hasResourceWrite(

        name:string

    ):boolean {


        return this.resources.writes.includes(

            name

        );


    }





    public hasResourceRead(

        name:string

    ):boolean {


        return this.resources.reads.includes(

            name

        );


    }





    // ==================================================
    // Runtime Control
    // ==================================================


    public setEnabled(

        value:boolean

    ):void {


        this.enabled = value;


    }





    public isEnabled():

    boolean {


        return this.enabled;


    }





    public getFrameTime():

    number {


        return this.lastFrameTime;


    }





    // ==================================================
    // Debug
    // ==================================================


    public debugInfo()

    {


        return {


            type:

                this.constructor.name,


            name:

                this.name,


            enabled:

                this.enabled,


            priority:

                this.priority,


            initialized:

                this.initialized,


            resources:

                {


                    reads:

                        [...this.resources.reads],



                    writes:

                        [...this.resources.writes]


                },


            frameTime:

                this.lastFrameTime


        };


    }





    public statistics():

    RenderPassStatistics {



        return {


            name:

                this.name,


            enabled:

                this.enabled,


            priority:

                this.priority,


            frameTime:

                this.lastFrameTime


        };


    }





    // ==================================================
    // Implementation
    // ==================================================


    protected abstract execute(

        context:

            RenderContext,

        scene:

            RenderScene,

        camera:

            RenderCamera

    ):void;



}