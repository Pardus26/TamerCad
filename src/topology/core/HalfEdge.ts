import { Edge }
from "./Edge";


import { Vertex }
from "./Vertex";







export class HalfEdge {



    public next:

    HalfEdge|null = null;



    public previous:

    HalfEdge|null = null;



    public twin:

    HalfEdge|null = null;







    constructor(


        public edge:Edge,


        public start:Vertex,


        public end:Vertex


    ){



        if(

            start !== edge.start

            &&

            start !== edge.end

        ){

            throw new Error(

                "HalfEdge start vertex does not belong to edge"

            );

        }





        if(

            end !== edge.start

            &&

            end !== edge.end

        ){

            throw new Error(

                "HalfEdge end vertex does not belong to edge"

            );

        }

    }









    setNext(

        halfEdge:HalfEdge

    ):

    void {



        this.next =

        halfEdge;

    }









    setPrevious(

        halfEdge:HalfEdge

    ):

    void {



        this.previous =

        halfEdge;

    }









    setTwin(

        halfEdge:HalfEdge

    ):

    void {



        this.twin =

        halfEdge;



        halfEdge.twin =

        this;

    }









    getStart():

    Vertex {



        return this.start;

    }









    getEnd():

    Vertex {



        return this.end;

    }









    getEdge():

    Edge {



        return this.edge;

    }









    getNext():

    HalfEdge|null {



        return this.next;

    }









    getPrevious():

    HalfEdge|null {



        return this.previous;

    }









    getTwin():

    HalfEdge|null {



        return this.twin;

    }









    reverse():

    HalfEdge {



        return new HalfEdge(


            this.edge.reverse(),


            this.end,


            this.start


        );

    }









    length():

    number {



        return this.edge.getLength();

    }









    connects(

        vertex:Vertex

    ):

    boolean {



        return (

            this.start === vertex

            ||

            this.end === vertex

        );

    }









    isClosed():

    boolean {



        return (

            this.start === this.end

        );

    }









    clone():

    HalfEdge {



        const cloned =

        new HalfEdge(


            this.edge.clone(),


            this.start.clone(),


            this.end.clone()


        );



        return cloned;

    }







}