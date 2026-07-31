import { Vertex }
from "./Vertex";



export class HalfEdge {



    private static nextId = 1;



    public readonly id:number;



    public twin:HalfEdge|null = null;



    public next:HalfEdge|null = null;



    public previous:HalfEdge|null = null;



    public face:any|null = null;



    public edge:any|null = null;





    constructor(

        public origin:Vertex

    ){


        this.id =

        HalfEdge.nextId++;

    }







    getTarget():

    Vertex|null {



        if(this.next){

            return this.next.origin;

        }



        return null;

    }







    setTwin(

        twin:HalfEdge

    ):

    void {



        this.twin = twin;



        twin.twin = this;

    }







    setNext(

        next:HalfEdge

    ):

    void {



        this.next = next;



        next.previous = this;

    }







    setFace(

        face:any

    ):

    void {



        this.face = face;

    }







    length():

    number {



        const target =

        this.getTarget();



        if(!target){

            return 0;

        }



        return this.origin

        .distanceTo(

            target

        );

    }







    isBoundary():

    boolean {



        return (

            this.face === null

        );

    }







    reverse():

    HalfEdge {



        if(this.twin){

            return this.twin;

        }



        const reversed =

        new HalfEdge(

            this.getTarget()

            ??

            this.origin

        );



        reversed.face =

        this.face;



        return reversed;

    }



}