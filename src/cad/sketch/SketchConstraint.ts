// src/cad/sketch/SketchConstraint.ts


import {
    SketchEntity
}
from "./SketchEntity";



import {
    Vector2
}
from "../../math/Vector2";









// =====================================================
// Constraint Type
// =====================================================


export enum SketchConstraintType {


    Coincident,


    Horizontal,


    Vertical,


    Parallel,


    Perpendicular,


    Tangent,


    EqualLength,


    Distance,


    Angle,


    Radius,


    Fixed



}









// =====================================================
// Base Constraint
// =====================================================


export abstract class SketchConstraint {



    public readonly id:string;



    public readonly type:

        SketchConstraintType;



    public enabled:boolean = true;



    public driving:boolean = true;





    protected constructor(

        id:string,

        type:SketchConstraintType

    ){


        this.id=id;


        this.type=type;


    }







    // Solver tarafında kullanılır

    abstract solve():

        number;





    abstract entities():

        SketchEntity[];






    abstract serialize():

        any;








    debugInfo(){


        return {


            id:

                this.id,



            type:

                SketchConstraintType[this.type],



            enabled:

                this.enabled,



            driving:

                this.driving



        };


    }



}









// =====================================================
// Coincident Constraint
// İki nokta aynı konumda
// =====================================================


export class CoincidentConstraint

    extends SketchConstraint {



    constructor(

        id:string,

        private readonly a:

            Vector2,

        private readonly b:

            Vector2


    ){


        super(

            id,

            SketchConstraintType.Coincident

        );


    }






    solve():

        number{


        const dx =

            this.a.x -

            this.b.x;



        const dy =

            this.a.y -

            this.b.y;



        const error =

            Math.sqrt(

                dx*dx +

                dy*dy

            );



        if(error > 0){


            this.b.x =

                this.a.x;



            this.b.y =

                this.a.y;



        }



        return error;


    }






    entities():

        SketchEntity[]{


        return [];


    }






    serialize(){


        return {


            id:this.id,


            type:"Coincident"



        };


    }



}









// =====================================================
// Horizontal Constraint
// =====================================================


export class HorizontalConstraint

    extends SketchConstraint {



    constructor(

        id:string,

        private readonly start:

            Vector2,

        private readonly end:

            Vector2


    ){


        super(

            id,

            SketchConstraintType.Horizontal

        );


    }







    solve():

        number{


        const error =

            Math.abs(

                this.start.y -

                this.end.y

            );



        this.end.y =

            this.start.y;



        return error;


    }






    entities():

        SketchEntity[]{


        return [];


    }





    serialize(){


        return {


            id:this.id,

            type:"Horizontal"



        };


    }


}









// =====================================================
// Vertical Constraint
// =====================================================


export class VerticalConstraint

    extends SketchConstraint {



    constructor(

        id:string,

        private readonly start:

            Vector2,

        private readonly end:

            Vector2


    ){


        super(

            id,

            SketchConstraintType.Vertical

        );


    }






    solve():

        number{


        const error =

            Math.abs(

                this.start.x -

                this.end.x

            );



        this.end.x =

            this.start.x;



        return error;


    }






    entities():

        SketchEntity[]{


        return [];


    }






    serialize(){


        return {


            id:this.id,

            type:"Vertical"


        };


    }



}









// =====================================================
// Distance Constraint
// =====================================================


export class DistanceConstraint

    extends SketchConstraint {



    constructor(

        id:string,

        private readonly a:

            Vector2,

        private readonly b:

            Vector2,

        public value:number


    ){


        super(

            id,

            SketchConstraintType.Distance

        );


    }







    solve():

        number{


        const current =

            this.a.distanceTo(

                this.b

            );



        const error =

            Math.abs(

                current -

                this.value

            );





        if(current===0)

            return error;






        const scale =

            this.value /

            current;






        this.b.x =

            this.a.x +

            (

                this.b.x -

                this.a.x

            )

            *

            scale;





        this.b.y =

            this.a.y +

            (

                this.b.y -

                this.a.y

            )

            *

            scale;






        return error;



    }








    entities():

        SketchEntity[]{


        return [];


    }






    serialize(){


        return {


            id:this.id,


            type:"Distance",


            value:this.value



        };


    }



}









// =====================================================
// Radius Constraint
// =====================================================


export class RadiusConstraint

    extends SketchConstraint {



    constructor(

        id:string,

        public radius:

            number,

        private readonly target:

            {

                radius:number

            }


    ){


        super(

            id,

            SketchConstraintType.Radius

        );


    }







    solve():

        number{


        const error =

            Math.abs(

                this.target.radius -

                this.radius

            );



        this.target.radius =

            this.radius;



        return error;


    }






    entities():

        SketchEntity[]{


        return [];


    }







    serialize(){


        return {


            id:this.id,


            type:"Radius",


            radius:this.radius



        };


    }



}