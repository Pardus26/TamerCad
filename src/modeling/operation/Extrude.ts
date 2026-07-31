import { Feature }
from "../feature/Feature";


import { SketchProfile }
from "../sketch/SketchProfile";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Solid }
from "../../topology/core/Solid";



export enum ExtrudeMode {


    OneDirection = "OneDirection",


    Symmetric = "Symmetric",


    TwoDirection = "TwoDirection"

}







export class Extrude

extends Feature {



    constructor(


        id:string,


        public profile:

        SketchProfile,


        public distance:number,


        public direction:

        Vector3,


        public mode:

        ExtrudeMode =

        ExtrudeMode.OneDirection



    ){



        super(id);

    }







    evaluate():

    void {



        this.result =

        this.createSolid();

    }







    createSolid():

    Solid {



        const solid =

        new Solid();



        const wire =

        this.profile.toWire();



        const vector =

        this.direction.normalized()

        .multiply(

            this.distance

        );



        const bottomFace =

        this.createFace(

            wire

        );



        const topFace =

        this.translateFace(

            bottomFace,

            vector

        );



        solid.addFace(

            bottomFace

        );


        solid.addFace(

            topFace

        );



        this.connectFaces(

            solid,

            bottomFace,

            topFace,

            vector

        );



        return solid;

    }







    private createFace(

        wire:any

    ):

    any {



        return {


            wire,

            type:

            "PlaneFace"

        };

    }







    private translateFace(

        face:any,


        vector:Vector3

    ):

    any {



        return {


            wire:

            face.wire,


            offset:

            vector,


            type:

            "PlaneFace"

        };

    }







    private connectFaces(

        solid:Solid,


        bottom:any,


        top:any,


        vector:Vector3

    ):

    void {



        // Side faces

        // gerçek kernel'de

        // edge extrusion yapılır.

    }







    volume():

    number {



        return (

            this.profile.area()

            *

            this.distance

        );

    }







    reverseDirection():

    void {



        this.direction =

        this.direction

        .multiply(-1);

    }



}