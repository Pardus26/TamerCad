import { RenderGraphPass } from "./RenderGraphPass";

import { 
    RenderGraphResource 
} from "./RenderGraphResource";



export interface RenderGraphCompileResult {


    executionOrder:

        RenderGraphPass[];


    resources:

        RenderGraphResource[];


}




export class RenderGraphCompiler {


    private compiled = false;



    constructor() {}



    // ----------------------------------------------------
    // Compile
    // ----------------------------------------------------


    compile(

        passes:

            readonly RenderGraphPass[],

        resources:

            readonly RenderGraphResource[]

    ): RenderGraphCompileResult {



        const executionOrder =

            this.sortPasses(

                passes

            );



        this.compiled = true;



        return {


            executionOrder,


            resources:

                [...resources]


        };


    }


    // ----------------------------------------------------
    // Topological Sort
    // ----------------------------------------------------


    private sortPasses(

        passes:

            readonly RenderGraphPass[]

    ): RenderGraphPass[] {



        const result:

            RenderGraphPass[] = [];



        const visited =

            new Set<RenderGraphPass>();



        const visiting =

            new Set<RenderGraphPass>();





        for (

            const pass of passes

        ) {



            this.visit(

                pass,

                visited,

                visiting,

                result

            );


        }





        return result;


    }





    // ----------------------------------------------------
    // Dependency Visit
    // ----------------------------------------------------


    private visit(

        pass:

            RenderGraphPass,


        visited:

            Set<RenderGraphPass>,


        visiting:

            Set<RenderGraphPass>,


        result:

            RenderGraphPass[]


    ): void {



        if (

            visited.has(

                pass

            )

        ) {


            return;


        }





        if (

            visiting.has(

                pass

            )

        ) {


            throw new Error(

                "RenderGraph cycle detected: " +

                pass.name

            );


        }





        visiting.add(

            pass

        );





        for (

            const dependency of

            pass.getDependencies()

        ) {



            this.visit(

                dependency,

                visited,

                visiting,

                result

            );


        }





        visiting.delete(

            pass

        );



        visited.add(

            pass

        );



        result.push(

            pass

        );


    }


    // ----------------------------------------------------
    // Resource Validation
    // ----------------------------------------------------


    private validateResources(

        passes:

            readonly RenderGraphPass[],

        resources:

            readonly RenderGraphResource[]

    ): void {



        const resourceNames =

            new Set<string>();





        for (

            const resource of resources

        ) {



            if (

                resourceNames.has(

                    resource.name

                )

            ) {



                throw new Error(

                    "Duplicate RenderGraph resource: " +

                    resource.name

                );


            }





            resourceNames.add(

                resource.name

            );


        }





        for (

            const pass of passes

        ) {



            this.validatePassResources(

                pass

            );


        }


    }





    // ----------------------------------------------------
    // Pass Resource Validation
    // ----------------------------------------------------


    private validatePassResources(

        pass:

            RenderGraphPass

    ): void {



        const writes =

            new Set<string>();



        for (

            const resource of

            pass.getWrites()

        ) {



            writes.add(

                resource.name

            );


        }





        for (

            const resource of

            pass.getReads()

        ) {



            /*
                Aynı pass içinde:

                READ + WRITE

                şu an desteklenmiyor.


                Daha sonra:

                Vulkan Image Barrier

                WebGPU Resource Transition

                olarak geliştirilecek.
            */


            if (

                writes.has(

                    resource.name

                )

            ) {



                throw new Error(

                    "RenderGraph hazard: pass '" +

                    pass.name +

                    "' reads and writes resource '" +

                    resource.name +

                    "'"

                );


            }


        }


    }





    // ----------------------------------------------------
    // Compile State
    // ----------------------------------------------------


    isCompiled():

    boolean {



        return this.compiled;


    }





    reset(): void {



        this.compiled = false;


    }


    // ----------------------------------------------------
    // Debug
    // ----------------------------------------------------


    debugInfo() {


        return {


            type:

                "RenderGraphCompiler",


            compiled:

                this.compiled


        };


    }



}