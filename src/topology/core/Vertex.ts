import { Point }
from "../../geometry/core/Point";


import { Transform }
from "../../geometry/core/Transform";



export class Vertex {



    private static nextId = 1;



    public readonly id:number;



    private edges:Set<any>;



    private faces:Set<any>;



    constructor(

        public position:Point,

        public tolerance:number = 1e-6

    ){


        this.id =

        Vertex.nextId++;



        this.edges =

        new Set();



        this.faces =

        new Set();

    }







    addEdge(

        edge:any

    ):

    void {



        this.edges.add(

            edge

        );

    }







    removeEdge(

        edge:any

    ):

    void {



        this.edges.delete(

            edge

        );

    }







    getEdges():

    any[] {



        return Array.from(

            this.edges

        );

    }







    addFace(

        face:any

    ):

    void {



        this.faces.add(

            face

        );

    }







    removeFace(

        face:any

    ):

    void {



        this.faces.delete(

            face

        );

    }







    getFaces():

    any[] {



        return Array.from(

            this.faces

        );

    }







    distanceTo(

        other:Vertex

    ):

    number {



        return this.position.distanceTo(

            other.position

        );

    }







    equals(

        other:Vertex

    ):

    boolean {



        return (

            this.distanceTo(

                other

            )

            <=

            this.tolerance

        );

    }







    transform(

        transform:Transform

    ):

    Vertex {



        return new Vertex(

            transform.applyToPoint(

                this.position

            ),

            this.tolerance

        );

    }







    clone():

    Vertex {



        return new Vertex(

            this.position.clone(),

            this.tolerance

        );

    }







    isIsolated():

    boolean {



        return (

            this.edges.size===0

        );

    }



}