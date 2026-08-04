// src/render/graph/RenderGraphBuilder.ts


import {
    RenderGraphPass
} from "./RenderGraphPass";


import {
    RenderGraphResource,
    RenderGraphResourceDescriptor,
    RenderGraphResourceType
} from "./RenderGraphResource";





export class RenderGraphBuilder {



    private readonly passes:

        Map<string, RenderGraphPass>

        =

        new Map();





    private readonly resources:

        Map<string, RenderGraphResource>

        =

        new Map();









    // ==================================================
    // Pass Creation
    // ==================================================


    public createPass(

        name:string

    ):RenderGraphPass {



        const existing =

            this.passes.get(

                name

            );





        if(

            existing

        ){

            return existing;

        }







        const pass =

            new RenderGraphPass(

                name

            );





        this.passes.set(

            name,

            pass

        );





        return pass;


    }









    // ==================================================
    // Resource Creation
    // ==================================================


    public createResource(

        name:string,

        type:

            RenderGraphResourceType,

        descriptor:

            RenderGraphResourceDescriptor = {}

    ):RenderGraphResource {



        const existing =

            this.resources.get(

                name

            );





        if(

            existing

        ){

            return existing;

        }







        const resource =

            new RenderGraphResource(

                name,

                type,

                descriptor

            );







        this.resources.set(

            name,

            resource

        );





        return resource;


    }









    // ==================================================
    // Resource Connections
    // ==================================================


    public read(

        pass:

            RenderGraphPass,

        resource:

            RenderGraphResource

    ):this {



        pass.read(

            resource

        );



        return this;


    }







    public write(

        pass:

            RenderGraphPass,

        resource:

            RenderGraphResource

    ):this {



        pass.write(

            resource

        );



        return this;


    }









    // ==================================================
    // Access
    // ==================================================


    public getPasses():

    readonly RenderGraphPass[] {



        return [

            ...this.passes.values()

        ];


    }








    public getResources():

    readonly RenderGraphResource[] {



        return [

            ...this.resources.values()

        ];


    }









    // ==================================================
    // Reset
    // ==================================================


    public clear():void {



        for(

            const resource of

            this.resources.values()

        ){


            resource.clearUsage();


        }





        this.passes.clear();

        this.resources.clear();


    }









    // ==================================================
    // Debug
    // ==================================================


    public debugInfo(){



        return {


            passCount:

                this.passes.size,



            resourceCount:

                this.resources.size,



            passes:

                [

                    ...this.passes.values()

                ]

                .map(

                    pass =>

                        pass.debugInfo()

                ),



            resources:

                [

                    ...this.resources.values()

                ]

                .map(

                    resource =>

                        resource.debugInfo()

                )


        };


    }



}