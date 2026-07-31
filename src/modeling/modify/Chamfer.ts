import { Solid }
from "../../topology/core/Solid";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { PlaneSurface }
from "../../geometry/surface/PlaneSurface";


import { Point }
from "../../geometry/core/Point";


import { Vector3 }
from "../../geometry/core/Vector3";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface ChamferOptions {


    angle?:number;


    preserveTopology?:boolean;


}







export class Chamfer {



    constructor(

        public solid:Solid,


        public edges:Edge[],


        public distance:number,


        public options:

        ChamferOptions = {}

    ){}



    build():

    Solid {



        const builder =

        new BRepBuilder();



        const faces:

        Face[]=[];



        for(

            const face of

            this.solid.getFaces()

        ){



            if(

                this.isAffected(face)

            ){



                faces.push(

                    this.createChamferFace(

                        face

                    )

                );



            }

            else {



                faces.push(

                    face

                );

            }

        }



        const shell =

        builder.createShell(

            faces

        );



        return builder.createSolid(

            shell

        );

    }







    private isAffected(

        face:Face

    ):

    boolean {



        return face

        .getEdges()

        .some(

            edge =>

            this.edges.includes(edge)

        );

    }







    private createChamferFace(

        face:Face

    ):

    Face {



        const surface =

        new PlaneSurface();



        return new Face(

            surface,

            face.outerWire

        );

    }



}