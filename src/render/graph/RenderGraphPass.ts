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





export enum RenderResourceState {

    Undefined = "Undefined",

    Read = "Read",

    Write = "Write"

}






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




    private state:

        RenderResourceState =

            RenderResourceState.Undefined;





    constructor(

        name:string,

        priority:number = 0

    ){

        this.name = name;

        this.priority = priority;

    }






    /*
    ============================================
        Priority
    ============================================
    */


    setPriority(

        priority:number

    ):this
    {

        this.priority = priority;

        return this;

    }







    /*
    ============================================
        Resource Read
    ============================================
    */


    read(

        resource:RenderGraphResource

    ):this
    {


        if(

            !this.reads.includes(resource)

        )
        {


            this.reads.push(resource);



            resource.addConsumer(

                this.name

            );


        }



        return this;

    }








    /*
    ============================================
        Resource Write
    ============================================
    */


    write(

        resource:RenderGraphResource

    ):this
    {


        if(

            !this.writes.includes(resource)

        )
        {


            this.writes.push(resource);



            resource.setProducer(

                this.name

            );


        }



        return this;

    }







    /*
    ============================================
        Dependency
    ============================================
    */


    dependsOn(

        pass:RenderGraphPass

    ):this
    {


        if(

            pass === this

        )
        {

            throw new Error(

                "RenderGraphPass cannot depend on itself"

            );

        }




        if(

            !this.dependencies.includes(pass)

        )
        {

            this.dependencies.push(pass);

        }



        return this;

    }







    /*
    ============================================
        Execute Callback
    ============================================
    */


    setExecute(

        callback:RenderGraphExecuteCallback

    ):this
    {


        this.executeCallback = callback;


        return this;

    }







    /*
    ============================================
        Runtime Execute
    ============================================
    */


    execute(

        context:RenderContext,

        scene?:RenderScene,

        camera?:RenderCamera

    ):void
    {


        if(

            this.executeCallback

        )
        {


            this.executeCallback(

                context,

                scene,

                camera

            );


        }


    }







    /*
    ============================================
        Resource Access
    ============================================
    */


    getReads():

    readonly RenderGraphResource[]
    {

        return this.reads;

    }





    getWrites():

    readonly RenderGraphResource[]
    {

        return this.writes;

    }





    getDependencies():

    readonly RenderGraphPass[]
    {

        return this.dependencies;

    }







    /*
    ============================================
        State
    ============================================
    */


    setState(

        state:RenderResourceState

    ):void
    {

        this.state = state;

    }




    getState():

    RenderResourceState
    {

        return this.state;

    }







    /*
    ============================================
        Validation
    ============================================
    */


    validate():

    boolean
    {


        if(

            this.writes.length === 0 &&

            this.reads.length === 0

        )
        {

            return false;

        }



        return true;

    }







    /*
    ============================================
        Debug
    ============================================
    */


    debugInfo()
    {

        return {


            name:

                this.name,



            priority:

                this.priority,



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

                ),



            state:

                this.state


        };

    }



}