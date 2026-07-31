import { Face }
from "./Face";


import { Edge }
from "./Edge";


import { Vertex }
from "./Vertex";







export class Shell {



    private faces:

    Face[] = [];







    constructor(

        faces:Face[] = []

    ){



        this.faces =

        faces;

    }









    addFace(

        face:Face

    ):

    void {



        if(

            !this.faces.includes(

                face

            )

        ){



            this.faces.push(

                face

            );

        }

    }









    removeFace(

        face:Face

    ):

    void {



        const index =

        this.faces.indexOf(

            face

        );





        if(

            index !== -1

        ){



            this.faces.splice(

                index,

                1

            );

        }

    }









    getFaces():

    Face[] {



        return this.faces;

    }









    getEdges():

    Edge[] {



        const edges:

        Edge[] = [];





        for(

            const face of

            this.faces

        ){



            for(

                const edge of

                face.getEdges()

            ){



                if(

                    !edges.includes(

                        edge

                    )

                ){



                    edges.push(

                        edge

                    );

                }

            }

        }





        return edges;

    }









    getVertices():

    Vertex[] {



        const vertices:

        Vertex[] = [];





        for(

            const edge of

            this.getEdges()

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









    isClosed():

    boolean {



        const edgeCount:

        Map<Edge,number> =

        new Map();





        for(

            const edge of

            this.getEdges()

        ){



            edgeCount.set(

                edge,

                (

                    edgeCount.get(

                        edge

                    )

                    ??

                    0

                )

                +

                1

            );

        }





        for(

            const count of

            edgeCount.values()

        ){



            if(

                count !== 2

            ){

                return false;

            }

        }





        return true;

    }









    containsFace(

        face:Face

    ):

    boolean {



        return this.faces

        .includes(

            face

        );

    }









    faceCount():

    number {



        return this.faces.length;

    }









    clear():

    void {



        this.faces = [];

    }









    clone():

    Shell {



        return new Shell(

            this.faces

            .map(

                face =>

                face.clone()

            )

        );

    }







}