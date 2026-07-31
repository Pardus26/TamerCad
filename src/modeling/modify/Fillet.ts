import { Solid }
from "../../topology/core/Solid";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { CylinderSurface }
from "../../geometry/surface/CylinderSurface";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface FilletOptions {


    smooth?:boolean;


    preserveTopology?:boolean;


}







export class Fillet {



    constructor(

        public solid:Solid,


        public edges:

        Edge[],


        public radius:number,


        public options:

        FilletOptions = {}

    ){}





    build():

    Solid {



        const builder =

        new BRepBuilder();



        const newFaces:

        Face[]=[];



        for(

            const face of

            this.solid.getFaces()

        ){



            newFaces.push(

                this.processFace(

                    face

                )

            );

        }



        const shell =

        builder.createShell(

            newFaces

        );



        return builder.createSolid(

            shell

        );

    }







    private processFace(

        face:Face

    ):

    Face {



        const affected =

        face.getEdges()

        .some(

            e =>

            this.edges.includes(e)

        );



        if(

            !affected

        ){

            return face;

        }



        return this.createFilletFace(

            face

        );

    }







    private createFilletFace(

        face:Face

    ):

    Face {



        const surface =

        new CylinderSurface(

            this.radius,

            this.radius

        );



        return new Face(

            surface,

            face.outerWire

        );

    }



}