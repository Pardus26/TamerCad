// src/render/graph/RenderGraphCompiler.ts


import {
    RenderGraphPass
} from "./RenderGraphPass";


import {
    RenderGraphResource
} from "./RenderGraphResource";



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



        const dependencies =

            this.buildDependencies(

                passes

            );





        const executionOrder =

            this.topologicalSort(

                passes,

                dependencies

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







    // =================================================
    // Dependency Builder
    // =================================================



    private buildDependencies(

        passes:

            RenderGraphPass[]

    ):



    Map<RenderGraphPass, RenderGraphPass[]> {



        const map =

            new Map<

                RenderGraphPass,

                RenderGraphPass[]

            >();





        for(

            const pass of passes

        ){


            map.set(

                pass,

                []

            );


        }







        for(

            const writer of passes

        ){



            const writes =

                writer.resources.writes;





            for(

                const reader of passes

            ){



                if(

                    writer === reader

                ){

                    continue;

                }





                const conflict =

                    writes.some(

                        resource =>

                            reader.resources.reads

                            .includes(resource)

                    );





                if(

                    conflict

                ){



                    map

                    .get(reader)!

                    .push(

                        writer

                    );


                }



            }



        }



        return map;


    }









    // =================================================
    // Topological Sort
    // =================================================



    private topologicalSort(

        passes:

            RenderGraphPass[],

        dependencies:

            Map<RenderGraphPass,RenderGraphPass[]>

    ):



    RenderGraphPass[] {



        const result:

            RenderGraphPass[] = [];





        const visited =

            new Set<RenderGraphPass>();





        const visiting =

            new Set<RenderGraphPass>();







        const visit =

            (

                pass:

                    RenderGraphPass

            ) => {



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

                dependencies.get(pass) ?? []

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









    // =================================================
    // Barrier Generation
    // =================================================



    private buildBarriers(

        passes:

            RenderGraphPass[]

    ):



    RenderGraphBarrier[] {



        const barriers:

            RenderGraphBarrier[] = [];





        const states =

            new Map<string,string>();







        for(

            const pass of passes

        ){





            for(

                const resource of

                pass.resources.reads

            ){



                const previous =

                    states.get(resource);





                if(

                    previous === "Write"

                ){



                    barriers.push({

                        resource,

                        before:"Write",

                        after:"Read"


                    });


                }







                states.set(

                    resource,

                    "Read"

                );



            }







            for(

                const resource of

                pass.resources.writes

            ){



                const previous =

                    states.get(resource);





                if(

                    previous === "Read"

                ){



                    barriers.push({

                        resource,

                        before:"Read",

                        after:"Write"


                    });


                }







                states.set(

                    resource,

                    "Write"

                );


            }



        }





        return barriers;


    }









    // =================================================
    // Lifetime Analysis
    // =================================================



    private calculateLifetime(

        passes:

            RenderGraphPass[],

        resources:

            RenderGraphResource[]

    ):



    RenderGraphResourceLifetime[] {



        const result:

            RenderGraphResourceLifetime[] = [];







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



                    pass.resources.reads

                    .includes(resource.name)

                    ||

                    pass.resources.writes

                    .includes(resource.name);







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









    // =================================================
    // Debug
    // =================================================



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