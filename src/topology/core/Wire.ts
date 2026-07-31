import { HalfEdge }
from "./HalfEdge";


import { Vertex }
from "./Vertex";


import { Transform }
from "../../geometry/core/Transform";



export class Wire {



    private static nextId = 1;



    public readonly id:number;



    constructor(

        public start:HalfEdge|null = null

    ){


        this.id =

        Wire.nextId++;

    }







    addHalfEdge(

        halfEdge:HalfEdge

    ):

    void {



        if(!this.start){


            this.start =

            halfEdge;



            halfEdge.next =

            halfEdge;



            halfEdge.previous =

            halfEdge;



            return;

        }





        const last =

        this.start.previous;



        if(last){


            last.next =

            halfEdge;



            halfEdge.previous =

            last;



            halfEdge.next =

            this.start;



            this.start.previous =

            halfEdge;

        }

    }







    getHalfEdges():

    HalfEdge[] {



        const result:

        HalfEdge[] = [];



        if(!this.start){

            return result;

        }



        let current =

        this.start;



        do{


            result.push(

                current

            );


            current =

            current.next!;


        }

        while(

            current !== this.start

        );



        return result;

    }







    getVertices():

    Vertex[] {



        return this

        .getHalfEdges()

        .map(

            he => he.origin

        );

    }







    isClosed():

    boolean {



        if(!this.start){

            return false;

        }



        return (

            this.start.previous !== null &&

            this.start.next !== null &&

            this.start.previous.next === this.start

        );

    }







    length():

    number {



        return this

        .getHalfEdges()

        .reduce(

            (

                total,

                he

            ) =>

                total + he.length(),

            0

        );

    }







    reverse():

    Wire {



        const reversed =

        new Wire();



        const edges =

        this

        .getHalfEdges()

        .map(

            he => he.twin

        )

        .filter(

            he => he!==null

        ) as HalfEdge[];



        for(

            const he of edges

        ){

            reversed.addHalfEdge(

                he

            );

        }



        return reversed;

    }







    transform(

        transform:Transform

    ):

    Wire {



        const edges =

        this

        .getHalfEdges();



        const newWire =

        new Wire();



        for(

            const he of edges

        ){



            newWire.addHalfEdge(

                he

            );

        }



        return newWire;

    }



}