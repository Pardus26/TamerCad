// src/cad/sketch/ConstraintSystem.ts


import {
    SketchConstraint,
    ConstraintType
}
from "./SketchConstraint";


import {
    SketchEntity
}
from "./SketchEntity";





// =====================================================
// Constraint Result
// =====================================================


export interface ConstraintSolveStatus {


    solved:boolean;


    overConstrained:boolean;


    conflict:

        SketchConstraint[];



    iterations:number;



}









// =====================================================
// Constraint System
// =====================================================


export class ConstraintSystem {



    private constraints:

        SketchConstraint[] = [];



    private entities:

        SketchEntity[] = [];





    private dirty = true;





    // -------------------------------------------------
    // Entity Registration
    // -------------------------------------------------


    addEntity(

        entity:SketchEntity

    ):void{



        if(

            !this.entities.includes(entity)

        ){


            this.entities.push(entity);


            this.dirty = true;


        }


    }








    removeEntity(

        entity:SketchEntity

    ):void{



        const index =

            this.entities.indexOf(entity);



        if(index!==-1){



            this.entities.splice(

                index,

                1

            );


        }




        this.constraints =

            this.constraints.filter(

                c =>

                    !c.references(entity)

            );




        this.dirty = true;


    }









    getEntities():

    readonly SketchEntity[]{


        return this.entities;


    }









    // -------------------------------------------------
    // Constraint Management
    // -------------------------------------------------


    addConstraint(

        constraint:SketchConstraint

    ):void{



        if(

            this.constraints.includes(

                constraint

            )

        )

            return;



        this.constraints.push(

            constraint

        );


        this.dirty = true;


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



        this.dirty = true;


    }









    clear():void{



        this.constraints.length = 0;


        this.entities.length = 0;


        this.dirty = true;


    }









    getConstraints():

    readonly SketchConstraint[]{


        return this.constraints;


    }









    // -------------------------------------------------
    // Constraint Search
    // -------------------------------------------------


    findConstraints(

        type:ConstraintType

    ):



    SketchConstraint[]{



        return this.constraints.filter(

            c =>

                c.type === type

        );


    }









    // -------------------------------------------------
    // Solver Preparation
    // -------------------------------------------------


    prepareSolve(){



        return {



            entities:

                this.entities,



            constraints:

                this.constraints



        };


    }









    // -------------------------------------------------
    // Validation
    // -------------------------------------------------


    validate():

    ConstraintSolveStatus{



        const conflicts:

            SketchConstraint[] = [];





        for(

            const constraint of this.constraints

        ){



            if(

                !constraint.isValid()

            ){



                conflicts.push(

                    constraint

                );

            }


        }







        return {



            solved:

                conflicts.length===0,



            overConstrained:

                conflicts.length>0,



            conflict:

                conflicts,



            iterations:0



        };



    }









    // -------------------------------------------------
    // Degrees Of Freedom
    // -------------------------------------------------


    calculateDegreesOfFreedom():

    number{



        let dof = 0;



        for(

            const entity of this.entities

        ){



            dof +=

                entity.getDegreesOfFreedom();



        }





        for(

            const constraint of this.constraints

        ){



            dof -=

                constraint.getConsumedDegreesOfFreedom();



        }





        return Math.max(

            dof,

            0

        );



    }









    // -------------------------------------------------
    // Constraint Statistics
    // -------------------------------------------------


    getStatistics(){



        const types:any = {};





        for(

            const c of this.constraints

        ){



            types[c.type] =

                (

                    types[c.type] ?? 0

                )

                +1;


        }





        return {



            entities:

                this.entities.length,



            constraints:

                this.constraints.length,



            degreesOfFreedom:

                this.calculateDegreesOfFreedom(),



            types



        };



    }









    // -------------------------------------------------
    // Debug
    // -------------------------------------------------


    debugInfo(){



        return {



            dirty:

                this.dirty,



            entityCount:

                this.entities.length,



            constraintCount:

                this.constraints.length,



            statistics:

                this.getStatistics()



        };


    }



}