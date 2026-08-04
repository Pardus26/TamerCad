// src/render/graph/RenderGraphCompiler.ts


import {
    RenderGraphPass
}
from "./RenderGraphPass";


import {
    RenderGraphResource
}
from "./RenderGraphResource";





export interface RenderGraphBarrier {


    resource:string;


    before:string;


    after:string;


}





export interface RenderGraphResourceLifetime {


    resource:string;


    firstUse:number;


    lastUse:number;


}





export interface RenderGraphCompileResult {


    executionOrder:

        RenderGraphPass[];


    barriers:

        RenderGraphBarrier[];


    lifetimes:

        RenderGraphResourceLifetime[];

}







export class RenderGraphCompiler {





    public compile(

        passes:

            RenderGraphPass[],

        resources:

            RenderGraphResource[]

    ):RenderGraphCompileResult {



        const executionOrder =

            this.sortPasses(

                passes

            );





        const barriers =

            this.buildBarriers(

                executionOrder

            );





        const lifetimes =

            this.calculateLifetime(

                executionOrder,

                resources

            );





        return {


            executionOrder,


            barriers,


            lifetimes


        };


    }









    // ==================================================
    // Dependency Sorting
    // ==================================================


    private sortPasses(

        passes:

            RenderGraphPass[]

    ):RenderGraphPass[] {



        const result:

            RenderGraphPass[]

            = [];





        const visited =

            new Set<RenderGraphPass>();





        const visiting =

            new Set<RenderGraphPass>();







        const visit =

            (

                pass:RenderGraphPass

            )=>{



                if(

                    visiting.has(pass)

                ){


                    throw new Error(

                        "RenderGraph cycle detected: "

                        +

                        pass.name

                    );


                }





                if(

                    visited.has(pass)

                ){

                    return;

                }






                visiting.add(pass);






                for(

                    const dependency of

                    pass.getDependencies()

                ){


                    visit(

                        dependency

                    );


                }






                visiting.delete(pass);



                visited.add(pass);



                result.push(pass);



            };






        for(

            const pass of passes

        ){


            visit(pass);


        }






        return result;


    }









    // ==================================================
    // Resource Barrier
    // ==================================================


    private buildBarriers(

        passes:

            RenderGraphPass[]

    ):RenderGraphBarrier[] {



        const barriers:

            RenderGraphBarrier[]

            = [];






        const states =

            new Map<

                string,

                string

            >();







        for(

            const pass of passes

        ){



            for(

                const resource of

                pass.getReads()

            ){



                const previous =

                    states.get(

                        resource.name

                    );





                if(

                    previous === "Write"

                ){


                    barriers.push({

                        resource:

                            resource.name,


                        before:

                            "Write",


                        after:

                            "Read"


                    });


                }





                states.set(

                    resource.name,

                    "Read"

                );


            }







            for(

                const resource of

                pass.getWrites()

            ){



                const previous =

                    states.get(

                        resource.name

                    );





                if(

                    previous === "Read"

                ){



                    barriers.push({

                        resource:

                            resource.name,


                        before:

                            "Read",


                        after:

                            "Write"


                    });


                }







                states.set(

                    resource.name,

                    "Write"

                );


            }




        }






        return barriers;


    }









    // ==================================================
    // Resource Lifetime
    // ==================================================


    private calculateLifetime(

        passes:

            RenderGraphPass[],

        resources:

            RenderGraphResource[]

    ):RenderGraphResourceLifetime[] {



        const result:

            RenderGraphResourceLifetime[]

            = [];







        for(

            const resource of resources

        ){



            let firstUse =

                Number.MAX_SAFE_INTEGER;



            let lastUse =

                -1;








            for(

                let i=0;

                i<passes.length;

                i++

            ){



                const pass =

                    passes[i];







                const used =



                    pass.getReads()

                    .includes(resource)

                    ||



                    pass.getWrites()

                    .includes(resource);







                if(

                    used

                ){



                    firstUse =

                        Math.min(

                            firstUse,

                            i

                        );





                    lastUse =

                        Math.max(

                            lastUse,

                            i

                        );


                }


            }







            if(

                lastUse >= 0

            ){



                result.push({

                    resource:

                        resource.name,


                    firstUse,


                    lastUse


                });


            }


        }







        return result;


    }









    // ==================================================
    // Debug
    // ==================================================


    public debugInfo(

        result:

            RenderGraphCompileResult

    ){



        return {


            executionOrder:

                result.executionOrder

                .map(

                    pass =>

                        pass.name

                ),





            barriers:

                result.barriers,





            lifetimes:

                result.lifetimes


        };


    }



}