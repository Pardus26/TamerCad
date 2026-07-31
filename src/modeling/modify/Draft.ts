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


        public neutralPlane:Point,


        public options:

        DraftOptions = {}

    ){



        if(

            angle === 0

        ){

            throw new Error(

                "Draft angle cannot be zero"

            );

        }

    }







    build():

    Solid {



        const builder =

        new BRepBuilder();





        const resultFaces:

        Face[] = [];





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



        /*

            Gerçek CAD kernel aşaması:

            1- Face surface alınır

            2- Neutral plane belirlenir

            3- Direction vector hesaplanır

            4- Angle kadar taper uygulanır

            5- Yeni surface oluşturulur

            6- Face yeniden oluşturulur


            Şimdilik topology korunur.


        */



        return face;

    }









    getAngle():

    number {



        return this.angle;

    }









    getNeutralPlane():

    Point {



        return this.neutralPlane;

    }









    getFaces():

    Face[] {



        return this.faces;

    }









    getDirection():

    Vector3 | undefined {



        return this.options.direction;

    }



}