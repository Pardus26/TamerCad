import { Point }
from "../../geometry/core/Point";


import { Vertex }
from "../core/Vertex";


import { Edge }
from "../core/Edge";


import { Wire }
from "../core/Wire";


import { Face }
from "../core/Face";


import { Shell }
from "../core/Shell";


import { Solid }
from "../core/Solid";


import { Curve }
from "../../geometry/curve/Curve";



export class EulerOperators {





    static makeVertex(

        point:Point

    ):

    Vertex {



        return new Vertex(

            point

        );

    }









    static makeEdge(

        start:Vertex,

        end:Vertex,

        curve:Curve|null=null

    ):

    Edge {



        return new Edge(

            start,

            end,

            curve

        );

    }









    static makeWire(

        edges:Edge[]

    ):

    Wire {



        const wire =

        new Wire();



        for(

            const edge of edges

        ){



            if(

                edge.halfEdge1

            ){

                wire.addHalfEdge(

                    edge.halfEdge1

                );

            }

        }



        return wire;

    }









    static makeFace(

        surface:any,

        wire:Wire

    ):

    Face {



        return new Face(

            surface,

            wire

        );

    }









    static makeShell(

        faces:Face[]

    ):

    Shell {



        return new Shell(

            faces

        );

    }









    static makeSolid(

        shells:Shell[]

    ):

    Solid {



        return new Solid(

            shells

        );

    }









    static splitEdge(

        edge:Edge,

        vertex:Vertex

    ):

    Edge[] {



        const first =

        new Edge(

            edge.start,

            vertex

        );



        const second =

        new Edge(

            vertex,

            edge.end

        );



        return [

            first,

            second

        ];

    }









    static mergeEdges(

        edgeA:Edge,

        edgeB:Edge

    ):

    Edge {



        return new Edge(

            edgeA.start,

            edgeB.end,

            edgeA.curve

        );

    }









    static splitFace(

        face:Face,

        wire:Wire

    ):

    Face[] {



        const newFace =

        new Face(

            face.surface,

            wire

        );



        return [

            face,

            newFace

        ];

    }









    static mergeFaces(

        faceA:Face,

        faceB:Face

    ):

    Face {



        return new Face(

            faceA.surface,

            faceA.outerWire

        );

    }









    static validateEuler(

        solid:Solid

    ):

    boolean {



        const V =

        solid.getVertices()

        .length;



        const E =

        solid.getEdges()

        .length;



        const F =

        solid.getFaces()

        .length;



        return (

            V-E+F===2

        );

    }



}