import { Wire }
from "../../topology/core/Wire";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { Shell }
from "../../topology/core/Shell";


import { Solid }
from "../../topology/core/Solid";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface LoftOptions {


    closed?:boolean;


    solid?:boolean;


    smooth?:boolean;


}







export class Loft {



    constructor(

        public profiles:

        Wire[],


        public options:

        LoftOptions = {}

    ){





        if(

            profiles.length < 2

        ){

            throw new Error(

                "Loft requires at least two profiles"

            );

        }

    }







    build():

    Solid {



        const builder =

        new BRepBuilder();



        const faces =

        this.createFaces();



        const shell =

        builder.createShell(

            faces

        );



        return builder.createSolid(

            shell

        );

    }







    private createFaces():

    Face[] {



        const faces:

        Face[]=[];



        for(

            let i=0;

            i<this.profiles.length-1;

            i++

        ){



            const current =

            this.profiles[i];



            const next =

            this.profiles[i+1];



            const currentEdges =

            current.getEdges();



            const nextEdges =

            next.getEdges();



            const count =

            Math.min(

                currentEdges.length,

                nextEdges.length

            );



            for(

                let j=0;

                j<count;

                j++

            ){



                const edgeA =

                currentEdges[j];



                const edgeB =

                nextEdges[j];



                const faceWire =

                new Wire();



                faceWire.addEdge(

                    edgeA

                );



                faceWire.addEdge(

                    new Edge(

                        edgeA.end,

                        edgeB.start

                    )

                );



                faceWire.addEdge(

                    edgeB

                );



                faces.push(

                    new Face(

                        null as any,

                        faceWire

                    )

                );

            }

        }



        return faces;

    }



}