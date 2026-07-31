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







export class TopologyExplorer {



    constructor(

        public solid:Solid

    ){}



    







    getSolids():

    Solid[] {



        return [

            this.solid

        ];

    }









    getShells():

    Shell[] {



        return this.solid

        .getShells();

    }









    getFaces():

    Face[] {



        return this.solid

        .getFaces();

    }









    getEdges():

    Edge[] {



        return this.solid

        .getEdges();

    }









    getVertices():

    Vertex[] {



        return this.solid

        .getVertices();

    }









    getEdgesOfFace(

        face:Face

    ):

    Edge[] {



        return face

        .getEdges();

    }









    getVerticesOfFace(

        face:Face

    ):

    Vertex[] {



        const vertices:

        Vertex[] = [];





        for(

            const edge of

            face.getEdges()

        ){



            if(

                !vertices.includes(

                    edge.start

                )

            ){

                vertices.push(

                    edge.start

                );

            }





            if(

                !vertices.includes(

                    edge.end

                )

            ){

                vertices.push(

                    edge.end

                );

            }

        }





        return vertices;

    }









    getFacesOfEdge(

        edge:Edge

    ):

    Face[] {



        const result:

        Face[] = [];





        for(

            const face of

            this.getFaces()

        ){



            if(

                face.containsEdge(

                    edge

                )

            ){



                result.push(

                    face

                );

            }

        }





        return result;

    }









    getEdgesOfVertex(

        vertex:Vertex

    ):

    Edge[] {



        return vertex

        .getEdges();

    }









    getConnectedFaces(

        face:Face

    ):

    Face[] {



        const connected:

        Face[] = [];





        for(

            const edge of

            face.getEdges()

        ){



            const faces =

            this.getFacesOfEdge(

                edge

            );





            for(

                const neighbour of

                faces

            ){



                if(

                    neighbour !== face

                    &&

                    !connected.includes(

                        neighbour

                    )

                ){



                    connected.push(

                        neighbour

                    );

                }

            }

        }





        return connected;

    }









    findFaceByEdge(

        edge:Edge

    ):

    Face|null {



        const faces =

        this.getFacesOfEdge(

            edge

        );





        return faces.length > 0

        ?

        faces[0]

        :

        null;

    }









    findVertex(

        vertex:Vertex

    ):

    Vertex|null {



        return this.getVertices()

        .includes(

            vertex

        )

        ?

        vertex

        :

        null;

    }









    countFaces():

    number {



        return this.getFaces()

        .length;

    }









    countEdges():

    number {



        return this.getEdges()

        .length;

    }









    countVertices():

    number {



        return this.getVertices()

        .length;

    }









    isManifold():

    boolean {



        for(

            const edge of

            this.getEdges()

        ){



            const faces =

            this.getFacesOfEdge(

                edge

            );





            if(

                faces.length !== 2

            ){



                return false;

            }

        }





        return true;

    }







}