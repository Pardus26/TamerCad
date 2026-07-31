import { Vertex }
from "../core/Vertex";


import { Edge }
from "../core/Edge";


import { Face }
from "../core/Face";


import { Shell }
from "../core/Shell";


import { Solid }
from "../core/Solid";


import { Wire }
from "../core/Wire";



export class TopologyExplorer {



    constructor(

        public solid:Solid

    ){}





    vertices():

    Vertex[] {



        return this.solid

        .getVertices();

    }







    edges():

    Edge[] {



        return this.solid

        .getEdges();

    }







    faces():

    Face[] {



        return this.solid

        .getFaces();

    }







    shells():

    Shell[] {



        return this.solid

        .getShells();

    }







    wires():

    Wire[] {



        const result:

        Wire[]=[];



        for(

            const face of

            this.faces()

        ){



            result.push(

                ...face.getWires()

            );

        }



        return [

            ...new Set(

                result

            )

        ];

    }







    edgesOfVertex(

        vertex:Vertex

    ):

    Edge[] {



        return vertex

        .getEdges();

    }







    facesOfVertex(

        vertex:Vertex

    ):

    Face[] {



        return vertex

        .getFaces();

    }







    facesOfEdge(

        edge:Edge

    ):

    Face[] {



        const faces:

        Face[]=[];



        if(

            edge.halfEdge1?.face

        ){



            faces.push(

                edge.halfEdge1.face

            );

        }



        if(

            edge.halfEdge2?.face

        ){



            faces.push(

                edge.halfEdge2.face

            );

        }



        return [

            ...new Set(

                faces

            )

        ];

    }







    adjacentFaces(

        face:Face

    ):

    Face[] {



        const result:

        Face[]=[];



        for(

            const edge of

            face.getEdges()

        ){



            for(

                const f of

                this.facesOfEdge(

                    edge

                )

            ){



                if(

                    f !== face

                ){

                    result.push(

                        f

                    );

                }

            }

        }



        return [

            ...new Set(

                result

            )

        ];

    }







    adjacentEdges(

        vertex:Vertex

    ):

    Edge[] {



        return [

            ...vertex.getEdges()

        ];

    }







    boundaryEdges():

    Edge[] {



        return this.edges()

        .filter(

            edge =>

            edge.isBoundary()

        );

    }







    isolatedVertices():

    Vertex[] {



        return this.vertices()

        .filter(

            vertex =>

            vertex.isIsolated()

        );

    }







    connectedFaces():

    Face[][] {



        const visited =

        new Set<Face>();



        const groups:

        Face[][]=[];



        for(

            const face of

            this.faces()

        ){



            if(

                visited.has(face)

            ){

                continue;

            }



            const group:

            Face[]=[];



            this.walkFaceGraph(

                face,

                visited,

                group

            );



            groups.push(

                group

            );

        }



        return groups;

    }







    private walkFaceGraph(

        face:Face,

        visited:Set<Face>,

        group:Face[]

    ):



    void {



        visited.add(

            face

        );



        group.push(

            face

        );



        for(

            const next of

            this.adjacentFaces(

                face

            )

        ){



            if(

                !visited.has(next)

            ){



                this.walkFaceGraph(

                    next,

                    visited,

                    group

                );

            }

        }

    }







    statistics():

    object {



        return {

            vertices:

            this.vertices().length,


            edges:

            this.edges().length,


            faces:

            this.faces().length,


            shells:

            this.shells().length,


            wires:

            this.wires().length

        };

    }



}