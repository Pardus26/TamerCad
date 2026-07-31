import { Solid }
from "../../topology/core/Solid";


import { Face }
from "../../topology/core/Face";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Point }
from "../../geometry/core/Point";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface DraftOptions {


    direction?:Vector3;


    preserveTopology?:boolean;


}







export class Draft {



    constructor(

        public solid:Solid,


        public faces:Face[],


        public angle:number,


        public neutralPlane:

        Point,


        public options:

        DraftOptions = {}

    ){}



    build():

    Solid {



        const builder =

        new BRepBuilder();



        const resultFaces:

        Face[]=[];



        for(

            const face of

            this.solid.getFaces()

        ){



            if(

                this.isDraftFace(

                    face

                )

            ){



                resultFaces.push(

                    this.applyDraft(

                        face

                    )

                );



            }

            else {



                resultFaces.push(

                    face

                );

            }

        }



        const shell =

        builder.createShell(

            resultFaces

        );



        return builder.createSolid(

            shell

        );

    }







    private isDraftFace(

        face:Face

    ):

    boolean {



        return this.faces

        .includes(

            face

        );

    }







    private applyDraft(

        face:Face

    ):

    Face {



        // Gerçek kernel'de:

        // Surface transform + taper

        // algoritması çalışır.



        return face;

    }



}