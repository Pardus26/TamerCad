import { Point }
from "../../geometry/core/Point";


import { Edge }
from "./Edge";







export class Vertex {



    public edges:

    Edge[] = [];







    constructor(

        public position:Point

    ){}









    addEdge(

        edge:Edge

    ):

    void {



        if(

            !this.edges.includes(

                edge

            )

        ){



            this.edges.push(

                edge

            );

        }

    }









    removeEdge(

        edge:Edge

    ):

    void {



        const index =

        this.edges.indexOf(

            edge

        );





        if(

            index !== -1

        ){



            this.edges.splice(

                index,

                1

            );

        }

    }









    getEdges():

    Edge[] {



        return this.edges;

    }









    distanceTo(

        vertex:Vertex

    ):

    number {



        return this.position

        .distanceTo(

            vertex.position

        );

    }









    equals(

        vertex:Vertex,

        tolerance:number = 1e-6

    ):

    boolean {



        return this.position

        .distanceTo(

            vertex.position

        )

        <= tolerance;

    }









    clone():

    Vertex {



        return new Vertex(

            new Point(

                this.position.x,

                this.position.y,

                this.position.z

            )

        );

    }









    translate(

        vector:

        {

            x:number,

            y:number,

            z:number

        }

    ):

    Vertex {



        return new Vertex(

            new Point(

                this.position.x +

                vector.x,


                this.position.y +

                vector.y,


                this.position.z +

                vector.z

            )

        );

    }







}