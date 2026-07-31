import { Curve }
from "../../geometry/curve/Curve";


import { Point }
from "../../geometry/core/Point";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Wire }
from "../../topology/core/Wire";


import { Vertex }
from "../../topology/core/Vertex";


import { Edge }
from "../../topology/core/Edge";


import { Face }
from "../../topology/core/Face";


import { Shell }
from "../../topology/core/Shell";


import { Solid }
from "../../topology/core/Solid";


import { BRepBuilder }
from "../../topology/brep/BRepBuilder";



export interface SweepOptions {


    sections?:number;


    makeSolid?:boolean;


    scale?:number;


}







export class Sweep {



    constructor(

        public profile:Wire,


        public path:Curve,


        public options:

        SweepOptions = {}

    ){}





    build():

    Solid {



        const builder =

        new BRepBuilder();



        const sections =

        this.options.sections ??

        32;



        const profileSections:

        Wire[]=[];



        for(

            let i=0;

            i<=sections;

            i++

        ){



            const t =

            i /

            sections;



            const point =

            this.path.evaluate(

                t

            );



            const tangent =

            this.path.tangent(

                t

            );



            profileSections.push(

                this.placeProfile(

                    this.profile,

                    point,

                    tangent

                )

            );

        }



        const faces =

        this.createFaces(

            profileSections

        );



        const shell =

        builder.createShell(

            faces

        );



        return builder.createSolid(

            shell

        );

    }







    private placeProfile(

        profile:Wire,

        position:Point,

        tangent:Vector3

    ):

    Wire {



        const wire =

        new Wire();



        for(

            const edge of

            profile.getEdges()

        ){



            const start =

            new Vertex(

                new Point(

                    edge.start.position.x +

                    position.x,


                    edge.start.position.y +

                    position.y,


                    edge.start.position.z +

                    position.z

                )

            );



            const end =

            new Vertex(

                new Point(

                    edge.end.position.x +

                    position.x,


                    edge.end.position.y +

                    position.y,


                    edge.end.position.z +

                    position.z

                )

            );



            wire.addEdge(

                new Edge(

                    start,

                    end

                )

            );

        }



        return wire;

    }







    private createFaces(

        sections:Wire[]

    ):

    Face[] {



        const faces:

        Face[]=[];



        for(

            let i=0;

            i<sections.length-1;

            i++

        ){



            const current =

            sections[i];



            const next =

            sections[i+1];



            const currentEdges =

            current.getEdges();



            const nextEdges =

            next.getEdges();



            for(

                let j=0;

                j<currentEdges.length;

                j++

            ){



                const sideWire =

                new Wire();



                sideWire.addEdge(

                    currentEdges[j]

                );



                sideWire.addEdge(

                    new Edge(

                        currentEdges[j].end,

                        nextEdges[j].start

                    )

                );



                sideWire.addEdge(

                    nextEdges[j]

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