// src/cad/sketch/SketchConstraint.ts


import {
    ConstraintType,
    ConstraintPriority,
    ConstraintSource,
    ConstraintState
}
from "./ConstraintTypes";


import {
    SketchEntity
}
from "./SketchEntity";





// =====================================================
// Constraint Parameter Types
// =====================================================


export type ConstraintParameter =


    number |

    number[] |

    {
        value:number;
        min?:number;
        max?:number;
    };









// =====================================================
// Solver Constraint Data
// =====================================================


export interface SolverConstraintData {


    type:

        ConstraintType;



    entityIds:

        number[];



    parameters:

        Record<string,number>;



}









// =====================================================
// Sketch Constraint
// =====================================================


export class SketchConstraint {



    public readonly id:number;



    public readonly type:

        ConstraintType;



    private entities:

        SketchEntity[];




    private parameters:

        Map<string,number>;




    public priority:

        ConstraintPriority;



    public source:

        ConstraintSource;



    private state:

        ConstraintState;



    private static nextId = 1;








    constructor(

        type:ConstraintType,

        entities:SketchEntity[],

        parameters:

            Record<string,number> = {},


        priority:

            ConstraintPriority =

                ConstraintPriority.Normal,


        source:

            ConstraintSource =

                ConstraintSource.User

    ){


        this.id =

            SketchConstraint.nextId++;



        this.type =

            type;



        this.entities =

            [...entities];



        this.parameters =

            new Map();



        for(

            const key in parameters

        ){


            this.parameters.set(

                key,

                parameters[key]

            );


        }




        this.priority =

            priority;



        this.source =

            source;



        this.state =

            ConstraintState.Active;


    }









    // =====================================================
    // Entity Access
    // =====================================================


    getEntities():

    readonly SketchEntity[]{


        return this.entities;


    }







    references(

        entity:SketchEntity

    ):boolean{


        return this.entities.includes(

            entity

        );


    }









    // =====================================================
    // Parameter Access
    // =====================================================


    getParameter(

        name:string

    ):

    number | undefined{


        return this.parameters.get(

            name

        );


    }








    setParameter(

        name:string,

        value:number

    ):void{


        this.parameters.set(

            name,

            value

        );


    }







    getParameters():

    Record<string,number>{



        const result:

            Record<string,number> = {};



        for(

            const [

                key,

                value

            ]

            of this.parameters

        ){


            result[key] = value;


        }



        return result;


    }









    // =====================================================
    // Solver Interface
    // =====================================================


    toSolverData():

    SolverConstraintData{


        return {


            type:

                this.type,


            entityIds:

                this.entities.map(

                    e => e.id

                ),



            parameters:

                this.getParameters()


        };


    }









    // =====================================================
    // Degrees Of Freedom
    // =====================================================


    getConsumedDegreesOfFreedom():

    number{


        switch(this.type){


            case ConstraintType.Coincident:

                return 2;



            case ConstraintType.Horizontal:

            case ConstraintType.Vertical:

                return 1;



            case ConstraintType.Distance:

            case ConstraintType.DistanceX:

            case ConstraintType.DistanceY:

            case ConstraintType.Angle:

            case ConstraintType.Radius:

            case ConstraintType.Diameter:

                return 1;



            case ConstraintType.Parallel:

            case ConstraintType.Perpendicular:

            case ConstraintType.Tangent:

                return 1;



            case ConstraintType.Symmetric:

                return 2;



            case ConstraintType.Fixed:

                return 999;



            default:

                return 0;


        }


    }









    // =====================================================
    // Validation
    // =====================================================


    isValid():

    boolean{


        if(

            this.entities.length===0

        )

            return false;



        switch(this.type){


            case ConstraintType.Radius:

                return (

                    this.parameters.has(

                        "radius"

                    )

                );



            case ConstraintType.Distance:

                return (

                    this.parameters.has(

                        "distance"

                    )

                );



            case ConstraintType.Angle:

                return (

                    this.parameters.has(

                        "angle"

                    )

                );



        }



        return true;


    }









    // =====================================================
    // State
    // =====================================================


    getState():

    ConstraintState{


        return this.state;


    }







    setState(

        state:ConstraintState

    ):void{


        this.state = state;


    }









    suppress():void{


        this.state =

            ConstraintState.Suppressed;


    }









    activate():void{


        this.state =

            ConstraintState.Active;


    }









    // =====================================================
    // Debug
    // =====================================================


    debugInfo(){


        return {


            id:this.id,


            type:this.type,


            entities:

                this.entities.map(

                    e => e.id

                ),



            parameters:

                this.getParameters(),



            priority:

                this.priority,



            source:

                this.source,



            state:

                this.state


        };


    }



}