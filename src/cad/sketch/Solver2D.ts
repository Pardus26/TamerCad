// src/cad/sketch/Solver2D.ts


import {
    SketchConstraint
}
from "./SketchConstraint";



import {
    SketchEntity
}
from "./SketchEntity";



import {
    Vector2
}
from "../../math/Vector2";









// =====================================================
// Solver Statistics
// =====================================================


export interface Solver2DStatistics {


    iterations:number;


    finalError:number;


    converged:boolean;


    degreesOfFreedom:number;


}









// =====================================================
// Solver Options
// =====================================================


export interface Solver2DOptions {


    maxIterations?:number;


    tolerance?:number;


}









// =====================================================
// Solver Result
// =====================================================


export interface Solver2DResult {


    success:boolean;


    error:number;


    iterations:number;


    dof:number;


}









// =====================================================
// Solver2D
// =====================================================


export class Solver2D {



    private readonly constraints:

        SketchConstraint[] = [];



    private readonly entities:

        SketchEntity[] = [];





    private readonly maxIterations:number;



    private readonly tolerance:number;





    private statistics:

        Solver2DStatistics = {


            iterations:0,


            finalError:0,


            converged:false,


            degreesOfFreedom:0


        };








    constructor(

        options:Solver2DOptions = {}

    ){



        this.maxIterations =

            options.maxIterations ??

            20;



        this.tolerance =

            options.tolerance ??

            0.00001;


    }









    // -------------------------------------------------
    // Registration
    // -------------------------------------------------


    addEntity(

        entity:SketchEntity

    ):void{


        if(

            !this.entities.includes(entity)

        ){


            this.entities.push(entity);


        }


    }







    addConstraint(

        constraint:SketchConstraint

    ):void{


        if(

            !this.constraints.includes(constraint)

        ){


            this.constraints.push(constraint);


        }


    }







    removeConstraint(

        constraint:SketchConstraint

    ):void{


        const index =

            this.constraints.indexOf(

                constraint

            );



        if(index!==-1){


            this.constraints.splice(

                index,

                1

            );


        }


    }









    clear():void{


        this.entities.length=0;


        this.constraints.length=0;


    }









    // -------------------------------------------------
    // Solve
    // -------------------------------------------------


    solve():

        Solver2DResult{


        let error =

            Number.MAX_VALUE;



        let iteration = 0;





        for(

            iteration=0;

            iteration<this.maxIterations;

            iteration++

        ){



            error=0;





            for(

                const constraint of this.constraints

            ){



                if(

                    !constraint.enabled

                )

                    continue;





                error +=

                    constraint.solve();


            }






            if(

                error < this.tolerance

            ){


                break;


            }


        }






        const success =

            error < this.tolerance;





        this.statistics = {


            iterations:

                iteration+1,



            finalError:

                error,



            converged:

                success,



            degreesOfFreedom:

                this.calculateDOF()



        };








        return {


            success,


            error,


            iterations:

                iteration+1,


            dof:

                this.statistics.degreesOfFreedom



        };


    }









    // -------------------------------------------------
    // Degree Of Freedom
    // -------------------------------------------------


    calculateDOF():

        number{


        let variables = 0;





        for(

            const entity of this.entities

        ){



            variables +=

                this.entityVariables(entity);


        }





        let constraints =

            this.constraints.length;





        return Math.max(

            variables -

            constraints,

            0

        );


    }








    private entityVariables(

        entity:SketchEntity

    ):

        number{



        switch(entity.type){



            case 0:

                // Point

                return 2;




            case 1:

                // Line

                return 4;




            case 2:

                // Circle

                return 3;



            default:

                return 0;



        }


    }









    // -------------------------------------------------
    // Auto Fix
    // -------------------------------------------------


    autoFix():

        void{



        for(

            const entity of this.entities

        ){



            if(

                this.calculateDOF()===0

            )

                break;



            entity.setFixed(

                true

            );


        }


    }









    // -------------------------------------------------
    // Constraint Validation
    // -------------------------------------------------


    validate():

        {

            overConstrained:boolean,

            underConstrained:boolean

        }{


        const dof =

            this.calculateDOF();




        return {


            overConstrained:

                dof < 0,



            underConstrained:

                dof > 0



        };


    }









    // -------------------------------------------------
    // Statistics
    // -------------------------------------------------


    getStatistics():

        Solver2DStatistics{


        return {


            ...this.statistics


        };


    }









    // -------------------------------------------------
    // Debug
    // -------------------------------------------------


    debugInfo(){


        return {


            entities:

                this.entities.map(

                    e=>e.debugInfo()

                ),



            constraints:

                this.constraints.map(

                    c=>c.debugInfo()

                ),



            statistics:

                this.statistics



        };


    }



}