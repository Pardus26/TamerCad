import { Feature }
from "../feature/Feature";


import { SketchProfile }
from "../sketch/SketchProfile";


import { Curve }
from "../../geometry/curve/Curve";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Solid }
from "../../topology/core/Solid";







export enum SweepOrientation {


    Fixed = "Fixed",


    FollowPath = "FollowPath",


    Corrected = "Corrected"

}







export class Sweep

extends Feature {



    constructor(


        id:string,


        public profile:

        SketchProfile,


        public path:

        Curve,


        public orientation:

        SweepOrientation =

        SweepOrientation.FollowPath,


        public twist:number = 0



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



        const samples =

        this.samplePath();



        const sections =

        [];



        for(

            let i = 0;

            i < samples.length;

            i++

        ){



            const section =

            this.transformProfile(

                samples[i],

                i /

                samples.length

            );



            sections.push(

                section

            );

        }



        for(

            const section of

            sections

        ){



            solid.addFace(

                section

            );

        }



        this.createSideFaces(

            solid,

            sections

        );



        return solid;

    }







    private samplePath():

    any[] {



        const result =

        [];



        const count =

        50;



        for(

            let i = 0;

            i <= count;

            i++

        ){



            result.push(

                this.path.evaluate(

                    i/count

                )

            );

        }



        return result;

    }







    private transformProfile(

        position:any,


        t:number

    ):

    any {



        return {


            position,


            profile:

            this.profile,


            twist:

            this.twist*t

        };

    }







    private createSideFaces(

        solid:Solid,


        sections:any[]

    ):

    void {



        // Gerçek BRep kernel:

        // section edge bağlantıları

        // oluşturulur.

    }







    length():

    number {



        return this.path.length();

    }



}