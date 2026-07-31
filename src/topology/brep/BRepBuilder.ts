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


import { Surface }
from "../../geometry/surface/Surface";







export class BRepBuilder {









    createVertex(

        vertex:Vertex

    ):

    Vertex {



        return vertex;

    }









    createEdge(

        start:Vertex,


        end:Vertex

    ):

    Edge {



        return new Edge(

            start,

            end

        );

    }









    createWire(

        edges:Edge[]

    ):

    Wire {



        const wire =

        new Wire();





        for(

            const edge of

            edges

        ){



            wire.addEdge(

                edge

            );

        }





        wire.close();





        return wire;

    }









    createFace(

        surface:Surface,


        wire:Wire

    ):

    Face {



        return new Face(

            surface,

            wire

        );

    }









    addInnerWire(

        face:Face,


        wire:Wire

    ):

    void {



        face.addInnerWire(

            wire

        );

    }









    createShell(

        faces:Face[]

    ):

    Shell {



        const shell =

        new Shell();





        for(

            const face of

            faces

        ){



            shell.addFace(

                face

            );

        }





        return shell;

    }









    createSolid(

        shell:Shell

    ):

    Solid {



        return new Solid(

            shell

        );

    }









    createSolidFromFaces(

        faces:Face[]

    ):

    Solid {



        const shell =

        this.createShell(

            faces

        );





        return this.createSolid(

            shell

        );

    }









    connectTwinEdges(

        edgeA:Edge,


        edgeB:Edge

    ):

    void {



        const halfA =

        new HalfEdge(

            edgeA,

            edgeA.start,

            edgeA.end

        );



        const halfB =

        new HalfEdge(

            edgeB,

            edgeB.end,

            edgeB.start

        );





        halfA.setTwin(

            halfB

        );

    }









    validateSolid(

        solid:Solid

    ):

    boolean {



        return solid.isValid();

    }







}