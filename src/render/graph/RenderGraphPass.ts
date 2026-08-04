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




    read(

        resource:RenderGraphResource

    ):this{


        if(

            !this.reads.includes(resource)

        ){

            this.reads.push(resource);


            resource.addConsumer(

                this.name

            );

        }


        return this;

    }





    write(

        resource:RenderGraphResource

    ):this{


        if(

            !this.writes.includes(resource)

        ){

            this.writes.push(resource);


            resource.setProducer(

                this.name

            );

        }


        return this;

    }





    dependsOn(

        pass:RenderGraphPass

    ):this{


        if(

            !this.dependencies.includes(pass)

        ){

            this.dependencies.push(pass);

        }


        return this;

    }





    setExecute(

        callback:RenderGraphExecuteCallback

    ):this{


        this.executeCallback = callback;


        return this;

    }





    execute(

        context:RenderContext,

        scene?:RenderScene,

        camera?:RenderCamera

    ):void{


        if(

            this.executeCallback

        ){

            this.executeCallback(

                context,

                scene,

                camera

            );

        }

    }





    getReads():

    readonly RenderGraphResource[]{


        return this.reads;

    }





    getWrites():

    readonly RenderGraphResource[]{


        return this.writes;

    }





    getDependencies():

    readonly RenderGraphPass[]{


        return this.dependencies;

    }





    debugInfo(){


        return {


            name:this.name,


            reads:

                this.reads.map(

                    r=>r.name

                ),


            writes:

                this.writes.map(

                    r=>r.name

                ),


            dependencies:

                this.dependencies.map(

                    d=>d.name

                )


        };


    }


}