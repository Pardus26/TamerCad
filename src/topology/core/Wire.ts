import { Edge }
from "./Edge";


import { HalfEdge }
from "./HalfEdge";


import { Vertex }
from "./Vertex";







export class Wire {



    private halfEdges:

    HalfEdge[] = [];







    constructor(

    ){}



    addEdge(

        edge:Edge

    ):

    void {



        const halfEdge =

        new HalfEdge(

            edge,

            edge.start,

            edge.end

        );





        this.addHalfEdge(

            halfEdge

        );

    }









    addHalfEdge(

        halfEdge:HalfEdge

    ):

    void {



        const count =

        this.halfEdges.length;





        if(

            count > 0

        ){



            const previous =

            this.halfEdges[count - 1];





            previous.setNext(

                halfEdge

            );



            halfEdge.setPrevious(

                previous

            );

        }





        this.halfEdges.push(

            halfEdge

        );

    }









    getHalfEdges():

    HalfEdge[] {



        return this.halfEdges;

    }









    getEdges():

    Edge[] {



        return this.halfEdges

        .map(

            he => he.edge

        );

    }









    getVertices():

    Vertex[] {



        const vertices:

        Vertex[] = [];





        for(

            const halfEdge of

            this.halfEdges

        ){



            if(

                !vertices.includes(

                    halfEdge.start

                )

            ){

                vertices.push(

                    halfEdge.start

                );

            }

        }





        return vertices;

    }









    close():

    void {



        if(

            this.halfEdges.length < 2

        ){

            return;

        }





        const first =

        this.halfEdges[0];



        const last =

        this.halfEdges[

            this.halfEdges.length - 1

        ];





        last.setNext(

            first

        );



        first.setPrevious(

            last

        );

    }









    isClosed():

    boolean {



        if(

            this.halfEdges.length === 0

        ){

            return false;

        }





        const first =

        this.halfEdges[0]

        .start;



        const last =

        this.halfEdges[

            this.halfEdges.length - 1

        ]

        .end;





        return (

            first === last

        );

    }









    length():

    number {



        let total =

        0;





        for(

            const edge of

            this.getEdges()

        ){



            total +=

            edge.getLength();

        }





        return total;

    }









    containsEdge(

        edge:Edge

    ):

    boolean {



        return this.halfEdges

        .some(

            he =>

            he.edge === edge

        );

    }









    removeEdge(

        edge:Edge

    ):

    void {



        this.halfEdges =

        this.halfEdges

        .filter(

            he =>

            he.edge !== edge

        );

    }









    clear():

    void {



        this.halfEdges = [];

    }









    clone():

    Wire {



        const wire =

        new Wire();





        for(

            const halfEdge of

            this.halfEdges

        ){



            wire.addEdge(

                halfEdge.edge.clone()

            );

        }





        return wire;

    }







}