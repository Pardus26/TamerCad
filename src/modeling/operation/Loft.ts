import { Feature }
from "../feature/Feature";


import { SketchProfile }
from "../sketch/SketchProfile";


import { Curve }
from "../../geometry/curve/Curve";


import { Solid }
from "../../topology/core/Solid";







export enum LoftMode {


    Surface = "Surface",


    Solid = "Solid"

}







export enum LoftContinuity {


    C0 = "C0",


    C1 = "C1",


    C2 = "C2"

}







export class Loft

extends Feature {



    constructor(


        id:string,


        public profiles:

        SketchProfile[],


        public guides:

        Curve[] = [],


        public mode:

        LoftMode =

        LoftMode.Solid,


        public continuity:

        LoftContinuity =

        LoftContinuity.C1



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



        const sections =

        this.prepareSections();



        const surfaces =

        [];



        for(

            let i = 0;

            i < sections.length-1;

            i++

        ){



            surfaces.push(

                this.createTransition(

                    sections[i],

                    sections[i+1]

                )

            );

        }



        for(

            const surface of

            surfaces

        ){



            solid.addFace(

                surface

            );

        }



        if(

            this.mode ===

            LoftMode.Solid

        ){



            this.closeEnds(

                solid,

                sections

            );

        }



        return solid;

    }







    private prepareSections():

    any[] {



        return this.profiles.map(

            profile => ({


                profile,


                samples:

                this.sampleProfile(

                    profile

                )

            })

        );

    }







    private sampleProfile(

        profile:

        SketchProfile

    ):

    any[] {



        const points =

        [];



        for(

            const entity of

            profile.outerLoop

        ){



            points.push(

                ...entity.getPoints()

            );

        }



        return points;

    }







    private createTransition(

        sectionA:any,


        sectionB:any

    ):

    any {



        return {


            type:

            "LoftSurface",


            from:

            sectionA,


            to:

            sectionB,


            continuity:

            this.continuity

        };

    }







    private closeEnds(

        solid:Solid,


        sections:any[]

    ):

    void {



        // Closed solid için

        // başlangıç ve bitiş

        // yüzleri oluşturulur.

    }







    addGuide(

        curve:Curve

    ):

    void {



        this.guides.push(

            curve

        );

    }



}