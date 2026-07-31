import { Solid }
from "../../topology/core/Solid";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { Wire }
from "../../topology/core/Wire";


import { PlaneSurface }
from "../../geometry/surface/PlaneSurface";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";





export interface FilletOptions {


    segments?:number;


    preserveTopology?:boolean;


    smooth?:boolean;


}







export class Fillet {



    constructor(


        public solid:Solid,


        public edges:Edge[],


        public radius:number,


        public options:

        FilletOptions = {}

    ){





        if(

            radius <= 0

        ){

            throw new Error(

                "Fillet radius must be positive"

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

                    this.createFilletFace(

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









    private createFilletFace(

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









    getRadius():

    number {



        return this.radius;

    }









    getEdges():

    Edge[] {



        return this.edges;

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







}