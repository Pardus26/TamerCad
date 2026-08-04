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

        name:string,

        priority:number = 0

    ):RenderGraphPass
    {


        const existing =

            this.passes.get(name);



        if(existing)
        {


            existing.setPriority(

                priority

            );


            return existing;

        }







       const pass = new RenderGraphPass(name);
pass.setPriority(priority);





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

        type:RenderGraphResourceType,

        descriptor:

            RenderGraphResourceDescriptor = {}

    ):RenderGraphResource
    {


        const existing =

            this.resources.get(

                name

            );





        if(existing)
        {

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


    public connectRead(

        pass:RenderGraphPass,

        resource:RenderGraphResource

    ):this
    {


        pass.read(

            resource

        );



        return this;


    }








    public connectWrite(

        pass:RenderGraphPass,

        resource:RenderGraphResource

    ):this
    {


        pass.write(

            resource

        );



        return this;


    }







    // Alias methods
    // Eski kullanım uyumluluğu



    public read(

        pass:RenderGraphPass,

        resource:RenderGraphResource

    ):this
    {

        return this.connectRead(

            pass,

            resource

        );

    }







    public write(

        pass:RenderGraphPass,

        resource:RenderGraphResource

    ):this
    {

        return this.connectWrite(

            pass,

            resource

        );

    }









    // ==================================================
    // Dependency
    // ==================================================


    public dependency(

        before:RenderGraphPass,

        after:RenderGraphPass

    ):this
    {


        after.dependsOn(

            before

        );



        return this;


    }









    // ==================================================
    // Query
    // ==================================================


    public getPasses():

    readonly RenderGraphPass[]
    {

        return [

            ...this.passes.values()

        ];

    }




public getResource(
    name: string
): RenderGraphResource | undefined {

    return this.resources.get(name);

}


    public getResources():

    readonly RenderGraphResource[]
    {

        return [

            ...this.resources.values()

        ];

    }









    // ==================================================
    // Validation
    // ==================================================


    public validate():

    boolean
    {


        for(

            const pass of

            this.passes.values()

        )
        {

            if(

                !pass.validate()

            )
            {

                return false;

            }

        }



        return true;


    }









    // ==================================================
    // Reset
    // ==================================================


    public clear():void
    {


        for(

            const resource of

            this.resources.values()

        )
        {


            resource.clearUsage();


        }




        this.passes.clear();

        this.resources.clear();


    }









    // ==================================================
    // Debug
    // ==================================================


    public debugInfo()
    {


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