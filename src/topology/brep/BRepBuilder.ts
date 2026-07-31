import { Vertex }
from "../core/Vertex";


import { Edge }
from "../core/Edge";


import { HalfEdge }
from "../core/HalfEdge";


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


        end:Vertex,


        curve:any = null

    ):

    Edge {



        return new Edge(

            start,

            end,

            curve

        );

    }









    createWire(

        edges:Edge[]

    ):

    Wire {



        if(

            edges.length === 0

        ){

            throw new Error(

                "Cannot create empty wire"

            );

        }





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

        surface:

        Surface | null,


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



        if(

            faces.length === 0

        ){

            throw new Error(

                "Shell requires faces"

            );

        }





        const shell =

        new Shell(

            faces

        );





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

    [

        HalfEdge,

        HalfEdge

    ] {



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





        return [

            halfA,

            halfB

        ];

    }









    validateWire(

        wire:Wire

    ):

    boolean {



        return (

            wire.getEdges()

            .length > 0

            &&

            wire.isClosed()

        );

    }









    validateFace(

        face:Face

    ):

    boolean {



        return face.isValid();

    }









    validateShell(

        shell:Shell

    ):

    boolean {



        return shell.isValid();

    }









    validateSolid(

        solid:Solid

    ):

    boolean {



        return solid.isValid();

    }







}