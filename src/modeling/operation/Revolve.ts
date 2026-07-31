import { Feature }
from "../feature/Feature";


import { SketchProfile }
from "../sketch/SketchProfile";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Point }
from "../../geometry/core/Point";


import { Solid }
from "../../topology/core/Solid";







export enum RevolveMode {


    Full = "Full",


    Partial = "Partial"

}







export class Revolve

extends Feature {



    constructor(


        id:string,


        public profile:

        SketchProfile,


        public axisPoint:

        Point,


        public axisDirection:

        Vector3,


        public angle:number =

        Math.PI * 2,


        public mode:

        RevolveMode =

        RevolveMode.Full



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



        const steps =

        this.calculateSteps();



        const faces =

        [];



        for(

            let i = 0;

            i < steps;

            i++

        ){



            const theta =

            (

                this.angle /

                steps

            )

            *

            i;



            const rotatedProfile =

            this.rotateProfile(

                this.profile,

                theta

            );



            faces.push(

                rotatedProfile

            );

        }



        for(

            const face of

            faces

        ){



            solid.addFace(

                face

            );

        }



        return solid;

    }







    private calculateSteps():

    number {



        return Math.max(

            8,

            Math.ceil(

                Math.abs(

                    this.angle

                )

                /

                (

                    Math.PI / 12

                )

            )

        );

    }







    private rotateProfile(

        profile:

        SketchProfile,


        angle:number

    ):

    any {



        const transformed =

        [];



        for(

            const entity of

            profile.outerLoop

        ){



            transformed.push(

                this.rotateEntity(

                    entity,

                    angle

                )

            );

        }



        return {


            entities:

            transformed,


            angle

        };

    }







    private rotateEntity(

        entity:any,


        angle:number

    ):

    any {



        // Gerçek kernel seviyesinde:

        // curve revolution yapılır.



        return {


            source:

            entity,


            rotation:

            angle

        };

    }







    volume():

    number {



        // Basit Pappus yaklaşımı

        return 0;

    }







    reverseDirection():

    void {



        this.axisDirection =

        this.axisDirection

        .multiply(-1);

    }



}