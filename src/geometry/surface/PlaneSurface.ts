import { Surface }
from "./Surface";


import { Point }
from "../core/Point";


import { Vector3 }
from "../core/Vector3";


import { Plane }
from "../core/Plane";


import { BoundingBox }
from "../core/BoundingBox";


import { Transform }
from "../core/Transform";



export class PlaneSurface

extends Surface {



    constructor(

        public plane:Plane,

        public size:number = 1000

    ){

        super();

    }





    get uMin():

    number {

        return -this.size;

    }





    get uMax():

    number {

        return this.size;

    }





    get vMin():

    number {

        return -this.size;

    }





    get vMax():

    number {

        return this.size;

    }






    evaluate(

        u:number,

        v:number

    ):

    Point {


        const uAxis =

        this.plane

        .xAxis

        .toVector();



        const vAxis =

        this.plane

        .yAxis

        .toVector();



        return this.plane.origin

        .addVector(

            uAxis.multiply(u)

        )

        .addVector(

            vAxis.multiply(v)

        );

    }





    derivativeU(

        u:number,

        v:number

    ):

    Vector3 {


        return this.plane

        .xAxis

        .toVector();

    }





    derivativeV(

        u:number,

        v:number

    ):

    Vector3 {


        return this.plane

        .yAxis

        .toVector();

    }





    boundingBox():

    BoundingBox {


        const p1 =

        this.evaluate(

            this.uMin,

            this.vMin

        );


        const p2 =

        this.evaluate(

            this.uMax,

            this.vMax

        );



        return new BoundingBox(

            p1,

            p2

        );

    }





    reverse():

    PlaneSurface {


        return new PlaneSurface(

            this.plane.reverse(),

            this.size

        );

    }





    transform(

        transform:Transform

    ):

    PlaneSurface {


        return new PlaneSurface(

            this.plane.transform(

                transform

            ),

            this.size

        );

    }



}