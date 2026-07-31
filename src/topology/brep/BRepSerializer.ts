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







export interface SerializedVertex {


    id:string;


    x:number;


    y:number;


    z:number;


}







export interface SerializedEdge {


    id:string;


    start:string;


    end:string;


}







export interface SerializedFace {


    id:string;


    edges:string[];


}







export interface SerializedShell {


    id:string;


    faces:string[];

}







export interface SerializedSolid {


    id:string;


    shells:string[];

}







export interface SerializedBRep {


    vertices:SerializedVertex[];


    edges:SerializedEdge[];


    faces:SerializedFace[];


    shells:SerializedShell[];


    solids:SerializedSolid[];

}







export class BRepSerializer {







    serialize(

        model:BRepModel

    ):

    SerializedBRep {



        const vertices:

        SerializedVertex[] = [];



        const edges:

        SerializedEdge[] = [];



        const faces:

        SerializedFace[] = [];



        const shells:

        SerializedShell[] = [];



        const solids:

        SerializedSolid[] = [];





        const vertexIds =

        new Map<Vertex,string>();



        const edgeIds =

        new Map<Edge,string>();



        const faceIds =

        new Map<Face,string>();



        const shellIds =

        new Map<Shell,string>();









        let counter =

        0;





        const createId =

        (prefix:string)=>{


            counter++;


            return prefix + counter;


        };









        for(

            const vertex of

            model.getVertices()

        ){



            const id =

            createId(

                "v"

            );



            vertexIds.set(

                vertex,

                id

            );





            vertices.push({


                id,


                x:

                vertex.position.x,


                y:

                vertex.position.y,


                z:

                vertex.position.z


            });

        }









        for(

            const edge of

            model.getEdges()

        ){



            const id =

            createId(

                "e"

            );



            edgeIds.set(

                edge,

                id

            );





            edges.push({


                id,


                start:

                vertexIds.get(

                    edge.start

                )!,


                end:

                vertexIds.get(

                    edge.end

                )!


            });

        }









        for(

            const face of

            model.getFaces()

        ){



            const id =

            createId(

                "f"

            );



            faceIds.set(

                face,

                id

            );





            faces.push({


                id,


                edges:

                face.getEdges()

                .map(

                    edge =>

                    edgeIds.get(

                        edge

                    )!

                )


            });

        }









        for(

            const solid of

            model.getSolids()

        ){



            for(

                const shell of

                solid.getShells()

            ){



                const id =

                createId(

                    "sh"

                );



                shellIds.set(

                    shell,

                    id

                );





                shells.push({


                    id,


                    faces:

                    shell.getFaces()

                    .map(

                        face =>

                        faceIds.get(

                            face

                        )!

                    )


                });

            }

        }









        for(

            const solid of

            model.getSolids()

        ){



            solids.push({


                id:

                createId(

                    "so"

                ),


                shells:

                solid.getShells()

                .map(

                    shell =>

                    shellIds.get(

                        shell

                    )!

                )


            });

        }









        return {


            vertices,


            edges,


            faces,


            shells,


            solids


        };

    }









    toJSON(

        model:BRepModel

    ):

    string {



        return JSON.stringify(

            this.serialize(

                model

            ),

            null,

            2

        );

    }







}