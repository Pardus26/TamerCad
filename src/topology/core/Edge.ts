import { Vertex }
from "./Vertex";


import { HalfEdge }
from "./HalfEdge";


import { Curve }
from "../../geometry/curve/Curve";


import { Transform }
from "../../geometry/core/Transform";



export class Edge {



    private static nextId = 1;



    public readonly id:number;



    public halfEdge1:HalfEdge|null = null;



    public halfEdge2:HalfEdge|null = null;



    public tolerance:number;





    constructor(

        public start:Vertex,

        public end:Vertex,

        public curve:Curve|null = null,

        tolerance:number = 1e-6

    ){



        this.id =

        Edge.nextId++;



        this.tolerance =

        tolerance;



        this.createHalfEdges();

    }







    private createHalfEdges():

    void {



        this.halfEdge1 =

        new HalfEdge(

            this.start

        );



        this.halfEdge2 =

        new HalfEdge(

            this.end

        );



        this.halfEdge1.setTwin(

            this.halfEdge2

        );



        this.halfEdge1.edge =

        this;



        this.halfEdge2.edge =

        this;



        this.start.addEdge(

            this

        );


        this.end.addEdge(

            this

        );

    }







    getVertices():

    Vertex[] {



        return [

            this.start,

            this.end

        ];

    }







    length():

    number {



        if(this.curve){


            return this.curve.length();

        }



        return this.start.distanceTo(

            this.end

        );

    }







    isDegenerate():

    boolean {



        return (

            this.length()

            <

            this.tolerance

        );

    }







    otherVertex(

        vertex:Vertex

    ):

    Vertex|null {



        if(

            vertex === this.start

        ){

            return this.end;

        }



        if(

            vertex === this.end

        ){

            return this.start;

        }



        return null;

    }







    containsVertex(

        vertex:Vertex

    ):

    boolean {



        return (

            vertex===this.start ||

            vertex===this.end

        );

    }







    replaceVertex(

        oldVertex:Vertex,

        newVertex:Vertex

    ):

    void {



        if(

            this.start===oldVertex

        ){

            this.start=

            newVertex;

        }



        if(

            this.end===oldVertex

        ){

            this.end=

            newVertex;

        }

    }







    setCurve(

        curve:Curve

    ):

    void {



        this.curve=

        curve;

    }







    isBoundary():

    boolean {



        return (

            this.halfEdge1?.face===null ||

            this.halfEdge2?.face===null

        );

    }







    transform(

        transform:Transform

    ):

    Edge {



        return new Edge(

            transform.applyToVertex(

                this.start

            ),

            transform.applyToVertex(

                this.end

            ),

            this.curve,

            this.tolerance

        );

    }







    clone():

    Edge {



        return new Edge(

            this.start.clone(),

            this.end.clone(),

            this.curve,

            this.tolerance

        );

    }



}