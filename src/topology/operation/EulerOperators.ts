import { Solid }
from "../core/Solid";


import { Shell }
from "../core/Shell";


import { Face }
from "../core/Face";


import { Edge }
from "../core/Edge";


import { Wire }
from "../core/Wire";


import { Vertex }
from "../core/Vertex";


import { BRepBuilder }
from "../brep/BRepBuilder";







export class EulerOperators {







    constructor(

        private builder:

        BRepBuilder =

        new BRepBuilder()

    ){}



    







    makeVertex(

        x:number,

        y:number,

        z:number

    ):

    Vertex {



        return this.builder

        .createVertex(

            new Vertex(

                {

                    x,

                    y,

                    z

                } as any

            )

        );

    }









    makeEdge(

        start:Vertex,

        end:Vertex

    ):

    Edge {



        return this.builder

        .createEdge(

            start,

            end

        );

    }









    makeWire(

        edges:Edge[]

    ):

    Wire {



        return this.builder

        .createWire(

            edges

        );

    }









    makeFace(

        wire:Wire

    ):

    Face {



        return this.builder

        .createFace(

            null as any,

            wire

        );

    }









    addFaceToShell(

        shell:Shell,

        face:Face

    ):

    void {



        shell.addFace(

            face

        );

    }









    removeFaceFromShell(

        shell:Shell,

        face:Face

    ):

    void {



        shell.removeFace(

            face

        );

    }









    splitEdge(

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









    joinEdges(

        edgeA:Edge,

        edgeB:Edge

    ):

    Edge|null {



        if(

            edgeA.end !==

            edgeB.start

        ){

            return null;

        }





        return new Edge(

            edgeA.start,

            edgeB.end

        );

    }









    addHole(

        face:Face,

        wire:Wire

    ):

    void {



        face.addInnerWire(

            wire

        );

    }









    removeHole(

        face:Face,

        wire:Wire

    ):

    void {



        const holes =

        face.innerWires;





        const index =

        holes.indexOf(

            wire

        );





        if(

            index !== -1

        ){



            holes.splice(

                index,

                1

            );

        }

    }









    mergeFaces(

        faceA:Face,

        faceB:Face

    ):

    Face|null {



        const edges =

        [

            ...faceA.getEdges(),

            ...faceB.getEdges()

        ];





        if(

            edges.length === 0

        ){

            return null;

        }





        const wire =

        this.makeWire(

            edges

        );





        return this.makeFace(

            wire

        );

    }









    checkEuler(

        solid:Solid

    ):

    boolean {



        const vertices =

        solid.getVertices()

        .length;



        const edges =

        solid.getEdges()

        .length;



        const faces =

        solid.getFaces()

        .length;





        return (

            vertices -

            edges +

            faces

        )

        ===

        2;

    }







}