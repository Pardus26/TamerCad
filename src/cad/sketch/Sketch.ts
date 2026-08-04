// src/cad/sketch/Sketch.ts


import {
    SketchEntity
}
from "./SketchEntity";


import {
    SketchConstraint
}
from "./SketchConstraint";



import {
    Vector2
}
from "../../math/Vector2";



export enum SketchState {


    Editing,


    Solving,


    Solved,


    Failed


}





export class Sketch {



    public readonly id:string;



    private entities:

        SketchEntity[] = [];



    private constraints:

        SketchConstraint[] = [];



    private state:

        SketchState =

            SketchState.Editing;





    private origin:

        Vector2 =

            new Vector2(

                0,

                0

            );





    constructor(

        id:string

    ){


        this.id=id;


    }






    // ------------------------------------------------
    // Entity Management
    // ------------------------------------------------



    addEntity(

        entity:SketchEntity

    ):void{


        if(

            this.entities.includes(entity)

        ){

            return;

        }



        this.entities.push(

            entity

        );


    }





    removeEntity(

        entity:SketchEntity

    ):void{


        const index =

            this.entities.indexOf(

                entity

            );



        if(index===-1)

            return;



        this.entities.splice(

            index,

            1

        );


    }







    getEntities():

        readonly SketchEntity[]{


        return this.entities;


    }






    clearEntities():

        void{


        this.entities.length=0;


    }






    // ------------------------------------------------
    // Constraint Management
    // ------------------------------------------------



    addConstraint(

        constraint:SketchConstraint

    ):void{


        if(

            this.constraints.includes(

                constraint

            )

        ){

            return;

        }



        this.constraints.push(

            constraint

        );


    }






    removeConstraint(

        constraint:SketchConstraint

    ):void{


        const index =

            this.constraints.indexOf(

                constraint

            );



        if(index===-1)

            return;



        this.constraints.splice(

            index,

            1

        );


    }






    getConstraints():

        readonly SketchConstraint[]{


        return this.constraints;


    }







    clearConstraints():

        void{


        this.constraints.length=0;


    }







    // ------------------------------------------------
    // Solver State
    // ------------------------------------------------



    setState(

        state:SketchState

    ):void{


        this.state=state;


    }






    getState():

        SketchState{


        return this.state;


    }






    isSolved():

        boolean{


        return (

            this.state ===

            SketchState.Solved

        );


    }







    // ------------------------------------------------
    // Origin
    // ------------------------------------------------



    setOrigin(

        origin:Vector2

    ):void{


        this.origin =

            origin.clone();


    }






    getOrigin():

        Vector2{


        return this.origin.clone();


    }







    // ------------------------------------------------
    // Solver Preparation
    // ------------------------------------------------



    prepareSolve():

        void{


        this.state =

            SketchState.Solving;


    }






    solveCompleted():

        void{


        this.state =

            SketchState.Solved;


    }






    solveFailed():

        void{


        this.state =

            SketchState.Failed;


    }








    // ------------------------------------------------
    // Geometry Query
    // ------------------------------------------------



    getEntityCount():

        number{


        return this.entities.length;


    }





    getConstraintCount():

        number{


        return this.constraints.length;


    }







    // ------------------------------------------------
    // Debug
    // ------------------------------------------------



    debugInfo(){


        return {


            id:this.id,


            state:

                SketchState[this.state],



            entities:

                this.entities.map(

                    e =>

                        e.debugInfo()

                ),



            constraints:

                this.constraints.map(

                    c =>

                        c.debugInfo()

                ),



            origin:{


                x:

                    this.origin.x,


                y:

                    this.origin.y


            }


        };


    }






    // ------------------------------------------------
    // Serialization
    // ------------------------------------------------



    serialize(){


        return {


            id:this.id,


            origin:{


                x:

                    this.origin.x,


                y:

                    this.origin.y


            },



            entities:

                this.entities.map(

                    e =>

                        e.serialize()

                ),



            constraints:

                this.constraints.map(

                    c =>

                        c.serialize()

                )


        };


    }





}