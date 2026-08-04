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



    public readonly name: string;



    private readonly reads:

        RenderGraphResource[] = [];



    private readonly writes:

        RenderGraphResource[] = [];



    private executeCallback:

        RenderGraphExecuteCallback | null = null;





    constructor(

        name: string

    ) {

        this.name = name;

    }





    // ==================================================
    // Resource Declaration
    // ==================================================


    public read(

        resource: RenderGraphResource

    ): this {



        if (

            !this.reads.includes(resource)

        ) {


            this.reads.push(resource);



            resource.addConsumer(

                this.name

            );


        }



        return this;


    }







    public write(

        resource: RenderGraphResource

    ): this {



        if (

            !this.writes.includes(resource)

        ) {


            this.writes.push(resource);



            resource.setProducer(

                this.name

            );


        }



        return this;


    }









    // ==================================================
    // Execute Callback
    // ==================================================


    public setExecute(

        callback:

            RenderGraphExecuteCallback

    ): this {



        this.executeCallback = callback;



        return this;


    }







    public execute(

        context:

            RenderContext,

        scene?:

            RenderScene,

        camera?:

            RenderCamera

    ): void {



        this.executeCallback?.(

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








    public hasRead(

        resource:

            RenderGraphResource

    ): boolean {



        return this.reads.includes(

            resource

        );


    }







    public hasWrite(

        resource:

            RenderGraphResource

    ): boolean {



        return this.writes.includes(

            resource

        );


    }









    // ==================================================
    // Debug
    // ==================================================


    public debugInfo() {



        return {


            name:

                this.name,



            reads:

                this.reads.map(

                    r => r.name

                ),



            writes:

                this.writes.map(

                    r => r.name

                ),



            producerCount:

                this.writes.length,



            consumerCount:

                this.reads.length



        };


    }



}