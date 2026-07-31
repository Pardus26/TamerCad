import { Point }
from "../../geometry/core/Point";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Wire }
from "../../topology/core/Wire";


import { Edge }
from "../../topology/core/Edge";


import { Vertex }
from "../../topology/core/Vertex";


import { Face }
from "../../topology/core/Face";


import { Shell }
from "../../topology/core/Shell";


import { Solid }
from "../../topology/core/Solid";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface RevolveOptions {


    segments?:number;


    makeSolid?:boolean;


}







export class Revolve {



    constructor(

        public profile:Wire,


        public axisPoint:

        Point,


        public axisDirection:

        Vector3,


        public angle:number =

        Math.PI * 2,


        public options:

        RevolveOptions = {}

    ){}



    build():

    Solid {



        const builder =

        new BRepBuilder();



        const segments =

        this.options.segments ??

        32;



        const wires:

        Wire[]=[];



        for(

            let i=0;

            i<=segments;

            i++

        ){



            const theta =

            this.angle *

            (

                i /

                segments

            );



            wires.push(

                this.rotateWire(

                    this.profile,

                    theta

                )

            );

        }



        const faces =

        this.createFaces(

            wires

        );



        const shell =

        builder.createShell(

            faces

        );



        return builder.createSolid(

            shell

        );

    }







    private rotatePoint(

        point:Point,

        angle:number

    ):

    Point {



        const x =

        point.x -

        this.axisPoint.x;



        const y =

        point.y -

        this.axisPoint.y;



        const cos =

        Math.cos(

            angle

        );



        const sin =

        Math.sin(

            angle

        );



        return new Point(


            this.axisPoint.x +

            x*cos -

            y*sin,


            this.axisPoint.y +

            x*sin +

            y*cos,


            point.z

        );

    }







    private rotateWire(

        wire:Wire,

        angle:number

    ):

    Wire {



        const result =

        new Wire();



        for(

            const edge of

            wire.getEdges()

        ){



            const start =

            new Vertex(

                this.rotatePoint(

                    edge.start.position,

                    angle

                )

            );



            const end =

            new Vertex(

                this.rotatePoint(

                    edge.end.position,

                    angle

                )

            );



            result.addEdge(

                new Edge(

                    start,

                    end

                )

            );

        }



        return result;

    }







    private createFaces(

        wires:Wire[]

    ):

    Face[] {



        const faces:

        Face[]=[];



        for(

            let i=0;

            i<wires.length-1;

            i++

        ){



            const current =

            wires[i];



            const next =

            wires[i+1];



            for(

                const edge of

                current.getEdges()

            ){



                const sideWire =

                new Wire();



                sideWire.addEdge(

                    edge

                );



                faces.push(

                    new Face(

                        null as any,

                        sideWire

                    )

                );

            }

        }



        return faces;

    }



}