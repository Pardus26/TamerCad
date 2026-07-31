import { Solid }
from "../../topology/core/Solid";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { PlaneSurface }
from "../../geometry/surface/PlaneSurface";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";





export interface ChamferOptions {


    angle?:number;


    preserveTopology?:boolean;


    segments?:number;


}







export class Chamfer {



    constructor(


        public solid:Solid,


        public edges:Edge[],


        public distance:number,


        public options:

        ChamferOptions = {}

    ){



        if(

            distance <= 0

        ){

            throw new Error(

                "Chamfer distance must be positive"

            );

        }

    }







    build():

    Solid {



        const builder =

        new BRepBuilder();





        const faces:

        Face[] = [];





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









    private getAdjacentFaces(

        edge:Edge

    ):

    Face[] {



        const result:

        Face[] = [];





        for(

            const face of

            this.solid.getFaces()

        ){



            if(

                face

                .getEdges()

                .includes(edge)

            ){



                result.push(

                    face

                );

            }

        }





        return result;

    }









    getDistance():

    number {



        return this.distance;

    }









    getAngle():

    number {



        return (

            this.options.angle ??

            Math.PI / 4

        );

    }









    getEdges():

    Edge[] {



        return this.edges;

    }



}