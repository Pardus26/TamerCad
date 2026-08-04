// src/render/graph/RenderGraphExecutor.ts


import {
    RenderContext
} from "../RenderContext";


import {
    RenderScene
} from "../RenderScene";


import {
    RenderCamera
} from "../RenderCamera";


import {
    RenderGraphPass
} from "./RenderGraphPass";


import {
    RenderGraphCompileResult
} from "./RenderGraphCompiler";





export interface RenderGraphExecutionOptions {


    scene?: RenderScene;


    camera?: RenderCamera;


}







export class RenderGraphExecutor {



    private lastExecution:

        RenderGraphPass[] = [];



    private executionTime:

        Map<string,number> =

        new Map();





    private barrierCount = 0;









    public execute(

        context:

            RenderContext,


        compileResult:

            RenderGraphCompileResult,


        options:

            RenderGraphExecutionOptions = {}

    ):void {



        this.reset();





        this.applyBarriers(

            context,

            compileResult

        );







        for(

            const pass of

            compileResult.executionOrder

        ){



            const start =

                performance.now();





            this.beginPass(

                context,

                pass

            );





            try {



                pass.execute(

                    context,

                    options.scene,

                    options.camera

                );



            }

            finally {



                this.endPass(

                    context,

                    pass

                );


            }







            const elapsed =

                performance.now()

                -

                start;





            this.executionTime.set(

                pass.name,

                elapsed

            );





            this.lastExecution.push(

                pass

            );


        }



    }









    private reset():void {



        this.lastExecution.length = 0;


        this.executionTime.clear();


        this.barrierCount = 0;


    }









    // =================================================
    // Resource Barrier Handling
    // =================================================


    private applyBarriers(

        context:

            RenderContext,


        result:

            RenderGraphCompileResult

    ):void {



        for(

            const barrier of

            result.barriers

        ){



            this.barrierCount++;





            const anyContext =

                context as any;





            anyContext.resourceBarrier?.(

                {


                    resource:

                        barrier.resource,



                    before:

                        barrier.before,



                    after:

                        barrier.after



                }

            );


        }



    }









    private beginPass(

        context:

            RenderContext,


        pass:

            RenderGraphPass

    ):void {



        const anyContext =

            context as any;





        anyContext.pushDebugMarker?.(

            pass.name

        );



    }









    private endPass(

        context:

            RenderContext,


        pass:

            RenderGraphPass

    ):void {



        const anyContext =

            context as any;





        anyContext.popDebugMarker?.();


    }









    public getLastExecution():

    readonly RenderGraphPass[] {



        return this.lastExecution;


    }









    public getExecutionTime(

        passName:string

    ):number {



        return (

            this.executionTime.get(

                passName

            )

            ??

            0

        );


    }









    public debugInfo(){



        return {


            executed:

                this.lastExecution

                .map(

                    pass =>

                        pass.name

                ),



            timings:

                Object.fromEntries(

                    this.executionTime

                ),



            barriers:

                this.barrierCount



        };


    }



}