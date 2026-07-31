import { Wire }
from "../../topology/core/Wire";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


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


        public profiles:Wire[],


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





        let finalFaces =

        faces;





        if(

            this.options.closed

        ){

            finalFaces =

            [

                ...faces,

                ...this.createClosingFaces()

            ];

        }





        const shell =

        builder.createShell(

            finalFaces

        );





        return builder.createSolid(

            shell

        );

    }









    private createFaces():

    Face[] {



        const faces:

        Face[] = [];





        for(

            let i = 0;

            i < this.profiles.length - 1;

            i++

        ){



            const current =

            this.profiles[i];



            const next =

            this.profiles[i + 1];





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

                let j = 0;

                j < count;

                j++

            ){



                const edgeA =

                currentEdges[j];



                const edgeB =

                nextEdges[j];





                faces.push(

                    this.createLoftFace(

                        edgeA,

                        edgeB

                    )

                );

            }

        }





        return faces;

    }









    private createLoftFace(

        edgeA:Edge,


        edgeB:Edge

    ):

    Face {



        const wire =

        new Wire();





        wire.addEdge(

            edgeA

        );





        wire.addEdge(

            new Edge(

                edgeA.end,

                edgeB.end

            )

        );





        wire.addEdge(

            edgeB

        );





        wire.addEdge(

            new Edge(

                edgeB.start,

                edgeA.start

            )

        );





        return new Face(

            null as any,

            wire

        );

    }









    private createClosingFaces():

    Face[] {



        const faces:

        Face[] = [];





        if(

            this.profiles.length < 2

        ){

            return faces;

        }





        const first =

        this.profiles[0];



        const last =

        this.profiles[

            this.profiles.length - 1

        ];





        const firstEdges =

        first.getEdges();



        const lastEdges =

        last.getEdges();





        const count =

        Math.min(

            firstEdges.length,

            lastEdges.length

        );





        for(

            let i = 0;

            i < count;

            i++

        ){



            faces.push(

                this.createLoftFace(

                    lastEdges[i],

                    firstEdges[i]

                )

            );

        }





        return faces;

    }







}