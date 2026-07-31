import { Point }
from "../../geometry/core/Point";


import { Curve }
from "../../geometry/curve/Curve";


import { Surface }
from "../../geometry/surface/Surface";


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


import { BRepModel }
from "./BRepModel";


import { TopologyValidator }
from "../operation/TopologyValidator";



export class BRepBuilder {



    private model:

    BRepModel;



    constructor(

        model?:BRepModel

    ){


        this.model =

        model ??

        new BRepModel();

    }







    createVertex(

        point:Point

    ):

    Vertex {



        return new Vertex(

            point

        );

    }







    createEdge(

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







    createWire(

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







    addHole(

        face:Face,

        hole:Wire

    ):

    void {



        face.addInnerWire(

            hole

        );

    }







    createShell(

        faces:Face[]

    ):

    Shell {



        return new Shell(

            faces

        );

    }







    createSolid(

        shell:Shell

    ):

    Solid {



        return new Solid(

            [

                shell

            ]

        );

    }







    sewFaces(

        faces:Face[]

    ):

    Shell {



        return new Shell(

            faces

        );

    }







    addSolid(

        solid:Solid

    ):

    void {



        this.model.addSolid(

            solid

        );

    }







    build():

    BRepModel {



        if(

            !this.model.validate()

        ){



            console.warn(

                "BRep model contains invalid topology"

            );

        }



        return this.model;

    }



}