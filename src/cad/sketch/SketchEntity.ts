// src/cad/sketch/SketchEntity.ts


import {
    Vector2
}
from "../../math/Vector2";





// =====================================================
// Entity Type
// =====================================================


export enum SketchEntityType {


    Point,


    Line,


    Circle,


    Arc



}









// =====================================================
// Base Entity
// =====================================================


export abstract class SketchEntity {



    public readonly id:string;



    public readonly type:

        SketchEntityType;





    public visible:boolean = true;



    public construction:boolean = false;



    public fixed:boolean = false;



    public selected:boolean = false;








    protected constructor(

        id:string,

        type:SketchEntityType

    ){


        this.id=id;


        this.type=type;


    }







    // -------------------------------------------------
    // Geometry
    // -------------------------------------------------


    abstract getPoints():

        Vector2[];





    abstract move(

        delta:Vector2

    ):

        void;







    // -------------------------------------------------
    // Constraint Support
    // -------------------------------------------------


    canModify():

        boolean{


        return !this.fixed;


    }








    setFixed(

        value:boolean

    ):

        void{


        this.fixed=value;


    }








    setConstruction(

        value:boolean

    ):

        void{


        this.construction=value;


    }







    // -------------------------------------------------
    // Selection
    // -------------------------------------------------


    select():

        void{


        this.selected=true;


    }





    deselect():

        void{


        this.selected=false;


    }







    // -------------------------------------------------
    // Distance Query
    // -------------------------------------------------


    distanceTo(

        point:Vector2

    ):

        number{


        let min =

            Number.MAX_VALUE;




        for(const p of this.getPoints()){


            const d =

                p.distanceTo(point);



            if(d < min)

                min=d;


        }



        return min;


    }








    // -------------------------------------------------
    // Serialization
    // -------------------------------------------------


    serialize():

        any{


        return {



            id:

                this.id,



            type:

                SketchEntityType[this.type],




            visible:

                this.visible,



            construction:

                this.construction,



            fixed:

                this.fixed



        };


    }








    // -------------------------------------------------
    // Debug
    // -------------------------------------------------


    debugInfo(){


        return {


            id:

                this.id,



            type:

                SketchEntityType[this.type],



            visible:

                this.visible,



            construction:

                this.construction,



            fixed:

                this.fixed,



            selected:

                this.selected



        };


    }



}









// =====================================================
// Sketch Point
// =====================================================


export class SketchPoint

    extends SketchEntity {



    public position:

        Vector2;





    constructor(

        id:string,

        position:Vector2

    ){


        super(

            id,

            SketchEntityType.Point

        );



        this.position =

            position.clone();


    }







    getPoints():

        Vector2[]{


        return [

            this.position

        ];


    }







    move(

        delta:Vector2

    ):

        void{


        if(this.fixed)

            return;



        this.position.add(

            delta

        );


    }







    serialize(){


        return {


            ...super.serialize(),



            position:{


                x:

                    this.position.x,


                y:

                    this.position.y


            }


        };


    }



}









// =====================================================
// Sketch Line
// =====================================================


export class SketchLine

    extends SketchEntity {



    public start:

        Vector2;



    public end:

        Vector2;






    constructor(

        id:string,

        start:Vector2,

        end:Vector2

    ){


        super(

            id,

            SketchEntityType.Line

        );



        this.start =

            start.clone();



        this.end =

            end.clone();



    }







    getPoints():

        Vector2[]{


        return [

            this.start,

            this.end

        ];


    }








    move(

        delta:Vector2

    ):

        void{


        if(this.fixed)

            return;



        this.start.add(

            delta

        );



        this.end.add(

            delta

        );


    }






    length():

        number{


        return this.start.distanceTo(

            this.end

        );


    }








    direction():

        Vector2{


        return new Vector2(

            this.end.x-this.start.x,

            this.end.y-this.start.y

        ).normalize();


    }







    serialize(){


        return {


            ...super.serialize(),



            start:{


                x:this.start.x,

                y:this.start.y


            },



            end:{


                x:this.end.x,

                y:this.end.y


            }



        };


    }



}










// =====================================================
// Sketch Circle
// =====================================================


export class SketchCircle

    extends SketchEntity {



    public center:

        Vector2;



    public radius:number;






    constructor(

        id:string,

        center:Vector2,

        radius:number

    ){


        super(

            id,

            SketchEntityType.Circle

        );



        this.center =

            center.clone();



        this.radius=

            radius;


    }






    getPoints():

        Vector2[]{


        return [

            this.center

        ];


    }







    move(

        delta:Vector2

    ):

        void{


        if(this.fixed)

            return;



        this.center.add(

            delta

        );


    }








    serialize(){


        return {



            ...super.serialize(),




            center:{


                x:this.center.x,

                y:this.center.y


            },



            radius:this.radius



        };


    }



}