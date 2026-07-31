import { Face }
from "./Face";


import { Edge }
from "./Edge";


import { Vertex }
from "./Vertex";


import { Transform }
from "../../geometry/core/Transform";



export enum ShellOrientation {

    OUTWARD,

    INWARD

}







export class Shell {



    private static nextId = 1;



    public readonly id:number;



    public orientation:

    ShellOrientation =

    ShellOrientation.OUTWARD;



    constructor(

        public faces:Face[] = []

    ){


        this.id =

        Shell.nextId++;

    }







    addFace(

        face:Face

    ):

    void {



        this.faces.push(

            face

        );

    }







    removeFace(

        face:Face

    ):

    void {



        const index =

        this.faces.indexOf(

            face

        );



        if(index>=0){

            this.faces.splice(

                index,

                1

            );

        }

    }







    getFaces():

    Face[] {



        return [

            ...this.faces

        ];

    }







    getEdges():

    Edge[] {



        const edges:

        Edge[] = [];



        for(

            const face of

            this.faces

        ){



            edges.push(

                ...face.getEdges()

            );

        }



        return [

            ...new Set(

                edges

            )

        ];

    }







    getVertices():

    Vertex[] {



        const vertices:

        Vertex[] = [];



        for(

            const edge of

            this.getEdges()

        ){



            vertices.push(

                ...edge.getVertices()

            );

        }



        return [

            ...new Set(

                vertices

            )

        ];

    }







    isClosed():

    boolean {



        const edgeMap =

        new Map<Edge,number>();



        for(

            const edge of

            this.getEdges()

        ){



            edgeMap.set(

                edge,

                (

                    edgeMap.get(edge)

                    ??

                    0

                )

                +1

            );

        }



        for(

            const count of

            edgeMap.values()

        ){



            if(

                count !== 2

            ){

                return false;

            }

        }



        return true;

    }







    area():

    number {



        return this.faces.reduce(

            (

                total,

                face

            ) =>

                total +

                face.area(),

            0

        );

    }







    boundaryEdges():

    Edge[] {



        return this

        .getEdges()

        .filter(

            edge =>

            edge.isBoundary()

        );

    }







    reverse():

    Shell {



        const reversed =

        new Shell(

            this.faces.map(

                face =>

                face.reverse()

            )

        );



        reversed.orientation =

        this.orientation ===

        ShellOrientation.OUTWARD

        ?

        ShellOrientation.INWARD

        :

        ShellOrientation.OUTWARD;



        return reversed;

    }







    transform(

        transform:Transform

    ):

    Shell {



        return new Shell(

            this.faces.map(

                face =>

                face.transform(

                    transform

                )

            )

        );

    }



}