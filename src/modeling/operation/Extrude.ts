import { Vector3 }
from "../../geometry/core/Vector3";


import { Point }
from "../../geometry/core/Point";


import { Wire }
from "../../topology/core/Wire";


import { Face }
from "../../topology/core/Face";


import { Edge }
from "../../topology/core/Edge";


import { Vertex }
from "../../topology/core/Vertex";


import { Shell }
from "../../topology/core/Shell";


import { Solid }
from "../../topology/core/Solid";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface ExtrudeOptions {


    makeSolid?:boolean;


    capStart?:boolean;


    capEnd?:boolean;


}







export class Extrude {



    constructor(

        public profile:Wire,

        public direction:Vector3,

        public distance:number,

        public options:

        ExtrudeOptions = {}

    ){}



    build():

    Solid {



        const builder =

        new BRepBuilder();



        const startFace =

        new Face(

            null as any,

            this.profile

        );



        const translatedWire =

        this.translateWire(

            this.profile

        );



        const endFace =

        new Face(

            null as any,

            translatedWire

        );



        const sideFaces =

        this.createSideFaces(

            this.profile,

            translatedWire

        );



        const faces:

        Face[]=[

            ...sideFaces

        ];



        if(

            this.options.capStart !== false

        ){

            faces.push(

                startFace

            );

        }



        if(

            this.options.capEnd !== false

        ){

            faces.push(

                endFace

            );

        }



        const shell =

        builder.createShell(

            faces

        );



        return builder.createSolid(

            shell

        );

    }







    private translatePoint(

        point:Point

    ):

    Point {



        return new Point(

            point.x +

            this.direction.x *

            this.distance,


            point.y +

            this.direction.y *

            this.distance,


            point.z +

            this.direction.z *

            this.distance

        );

    }







    private translateWire(

        wire:Wire

    ):

    Wire {



        const newWire =

        new Wire();



        for(

            const halfEdge of

            wire.getHalfEdges()

        ){



            const edge =

            halfEdge.edge;



            const start =

            new Vertex(

                this.translatePoint(

                    edge.start.position

                )

            );



            const end =

            new Vertex(

                this.translatePoint(

                    edge.end.position

                )

            );



            newWire.addEdge(

                new Edge(

                    start,

                    end

                )

            );

        }



        return newWire;

    }







    private createSideFaces(

        source:Wire,

        target:Wire

    ):

    Face[] {



        const faces:

        Face[]=[];



        const sourceEdges =

        source.getEdges();



        const targetEdges =

        target.getEdges();



        for(

            let i=0;

            i<sourceEdges.length;

            i++

        ){



            const e1 =

            sourceEdges[i];



            const e2 =

            targetEdges[i];



            const sideWire =

            new Wire();



            sideWire.addEdge(

                e1

            );



            sideWire.addEdge(

                new Edge(

                    e1.end,

                    e2.end

                )

            );



            sideWire.addEdge(

                e2

            );



            sideWire.addEdge(

                new Edge(

                    e2.start,

                    e1.start

                )

            );



            faces.push(

                new Face(

                    null as any,

                    sideWire

                )

            );

        }



        return faces;

    }



}