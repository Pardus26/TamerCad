import { RenderContext } from "../RenderContext";
import { RenderGraphPass } from "./RenderGraphPass";
import { RenderGraphCompileResult } from "./RenderGraphCompiler";


export class RenderGraphExecutor {


    private lastExecution:

        RenderGraphPass[] = [];



    private executionTime:

        Map<string, number> = new Map();



    execute(

        context: RenderContext,

        compileResult: RenderGraphCompileResult

    ): void {



        this.lastExecution.length = 0;

        this.executionTime.clear();



        for (

            const pass of compileResult.executionOrder

        ) {


            const start = performance.now();



            this.beginPass(

                context,

                pass

            );



            try {


                pass.execute(

                    context

                );


            }

            finally {


                this.endPass(

                    context,

                    pass

                );


            }



            const elapsed =

                performance.now() - start;



            this.executionTime.set(

                pass.name,

                elapsed

            );



            this.lastExecution.push(

                pass

            );


        }


    }





    private beginPass(

        context: RenderContext,

        pass: RenderGraphPass

    ):void {



        const anyContext =

            context as any;



        anyContext.pushDebugMarker?.(

            pass.name

        );


    }





    private endPass(

        context: RenderContext,

        pass: RenderGraphPass

    ):void {



        const anyContext =

            context as any;



        anyContext.popDebugMarker?.();


    }





    getLastExecution():

    readonly RenderGraphPass[] {


        return this.lastExecution;


    }





    getExecutionTime(

        passName:string

    ):number {


        return (

            this.executionTime.get(

                passName

            ) ?? 0

        );


    }





    debugInfo(){


        return {


            executed:

                this.lastExecution.map(

                    p=>p.name

                ),



            timings:

                Object.fromEntries(

                    this.executionTime

                )


        };


    }

}