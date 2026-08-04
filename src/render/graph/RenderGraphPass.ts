// src/render/graph/RenderGraphPass.ts


import {
    RenderGraphResource
} from "./RenderGraphResource";


import {
    RenderContext
} from "../RenderContext";


import {
    RenderScene
} from "../RenderScene";


import {
    RenderCamera
} from "../RenderCamera";





export type RenderGraphExecuteCallback = (

    context: RenderContext,

    scene?: RenderScene,

    camera?: RenderCamera

) => void;







export class RenderGraphPass {





    public readonly name:string;





    public priority:number = 0;







    private readonly reads:

        RenderGraphResource[] = [];





    private readonly writes:

        RenderGraphResource[] = [];





    private readonly dependencies:

        RenderGraphPass[] = [];





    private executeCallback:

        RenderGraphExecuteCallback | null = null;









    constructor(

        name:string

    ){

        this.name = name;

    }









    // ==================================================
    // Priority
    // ==================================================


    public setPriority(

        priority:number

    ):this {


        this.priority = priority;


        return this;


    }









    // ==================================================
    // Resource Read
    // ==================================================


    public read(

        resource:RenderGraphResource

    ):this {



        if(

            !this.reads.includes(resource)

        ){


            this.reads.push(

                resource

            );



            resource.addConsumer(

                this.name

            );


        }



        return this;


    }









    // ==================================================
    // Resource Write
    // ==================================================


    public write(

        resource:RenderGraphResource

    ):this {



        if(

            !this.writes.includes(resource)

        ){



            this.writes.push(

                resource

            );



            resource.setProducer(

                this.name

            );


        }



        return this;


    }









    // ==================================================
    // Dependency
    // ==================================================


    public dependsOn(

        pass:RenderGraphPass

    ):this {



        if(

            pass === this

        ){

            throw new Error(

                "RenderGraphPass cannot depend on itself"

            );

        }





        if(

            !this.dependencies.includes(pass)

        ){



            this.dependencies.push(

                pass

            );


        }





        return this;


    }









    // ==================================================
    // Execute
    // ==================================================


    public setExecute(

        callback:RenderGraphExecuteCallback

    ):this {



        this.executeCallback = callback;


        return this;


    }









    public execute(

        context:RenderContext,

        scene?:RenderScene,

        camera?:RenderCamera

    ):void {



        if(

            !this.executeCallback

        ){

            return;

        }





        this.executeCallback(

            context,

            scene,

            camera

        );


    }









    // ==================================================
    // Resource Access
    // ==================================================


    public getReads():

    readonly RenderGraphResource[] {


        return this.reads;


    }







    public getWrites():

    readonly RenderGraphResource[] {


        return this.writes;


    }







    public getDependencies():

    readonly RenderGraphPass[] {


        return this.dependencies;


    }









    // ==================================================
    // Compiler compatibility
    // ==================================================


    public get resources(){


        return {


            reads:

                this.reads,


            writes:

                this.writes


        };


    }









    // ==================================================
    // Debug
    // ==================================================


    public debugInfo(){


        return {


            name:

                this.name,



            priority:

                this.priority,



            reads:

                this.reads.map(

                    resource =>

                        resource.name

                ),



            writes:

                this.writes.map(

                    resource =>

                        resource.name

                ),



            dependencies:

                this.dependencies.map(

                    pass =>

                        pass.name

                )


        };


    }



}