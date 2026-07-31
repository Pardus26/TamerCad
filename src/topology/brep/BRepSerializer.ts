import { BRepModel }
from "./BRepModel";


import { Solid }
from "../core/Solid";


import { Shell }
from "../core/Shell";


import { Face }
from "../core/Face";


import { Edge }
from "../core/Edge";


import { Vertex }
from "../core/Vertex";


import { Point }
from "../../geometry/core/Point";



export interface SerializedBRep {


    version:string;


    solids:any[];


}







export class BRepSerializer {



    static VERSION =

    "1.0";







    static serialize(

        model:BRepModel

    ):

    SerializedBRep {



        return {

            version:

            this.VERSION,


            solids:

            model

            .getSolids()

            .map(

                solid =>

                this.serializeSolid(

                    solid

                )

            )

        };

    }







    private static serializeSolid(

        solid:Solid

    ):



    any {



        return {


            id:

            solid.id,


            shells:

            solid.shells.map(

                shell =>

                this.serializeShell(

                    shell

                )

            )


        };

    }







    private static serializeShell(

        shell:Shell

    ):



    any {



        return {


            id:

            shell.id,


            faces:

            shell.faces.map(

                face =>

                this.serializeFace(

                    face

                )

            )


        };

    }







    private static serializeFace(

        face:Face

    ):



    any {



        return {


            id:

            face.id,


            orientation:

            face.orientation,


            outerWire:

            face.outerWire.id,


            innerWires:

            face.innerWires

            .map(

                wire =>

                wire.id

            )

        };

    }







    static deserialize(

        data:SerializedBRep

    ):

    BRepModel {



        const model =

        new BRepModel();



        for(

            const solidData of

            data.solids

        ){



            const solid =

            this.deserializeSolid(

                solidData

            );



            model.addSolid(

                solid

            );

        }



        return model;

    }







    private static deserializeSolid(

        data:any

    ):

    Solid {



        const shells:

        Shell[]=[];



        for(

            const shellData of

            data.shells

        ){



            shells.push(

                this.deserializeShell(

                    shellData

                )

            );

        }



        return new Solid(

            shells

        );

    }







    private static deserializeShell(

        data:any

    ):

    Shell {



        const faces:

        Face[]=[];



        for(

            const faceData of

            data.faces

        ){



            faces.push(

                this.deserializeFace(

                    faceData

                )

            );

        }



        return new Shell(

            faces

        );

    }







    private static deserializeFace(

        data:any

    ):

    Face {



        return {

            id:

            data.id,


            orientation:

            data.orientation

        } as Face;

    }



}