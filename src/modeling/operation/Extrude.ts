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



        const startWire =

        this.cloneWire(

            this.profile

        );



        const endWire =

        this.translateWire(

            this.profile

        );



        const faces:

        Face[] = [];



        if(

            this.options.capStart !== false

        ){



            faces.push(

                this.createFace(

                    startWire

                )

            );

        }





        faces.push(

            ...this.createSideFaces(

                startWire,

                endWire

            )

        );





        if(

            this.options.capEnd !== false

        ){



            faces.push(

                this.createFace(

                    endWire

                )

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







    private createFace(

        wire:Wire

    ):

    Face {



        return new Face(

            null as any,

            wire

        );

    }







    private translatePoint(

        point:Point

    ):

    Point {



        const dir =

        this.getDirection();



        return new Point(


            point.x +

            dir.x *

            this.distance,


            point.y +

            dir.y *

            this.distance,


            point.z +

            dir.z *

            this.distance


        );

    }







    private getDirection():

    Vector3 {



        const length =

        Math.sqrt(


            this.direction.x *

            this.direction.x +


            this.direction.y *

            this.direction.y +


            this.direction.z *

            this.direction.z


        );



        if(

            length === 0

        ){



            throw new Error(

                "Extrude direction cannot be zero"

            );

        }



        return new Vector3(


            this.direction.x /

            length,


            this.direction.y /

            length,


            this.direction.z /

            length


        );

    }







    private cloneWire(

        wire:Wire

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

                new Point(

                    edge.start.position.x,

                    edge.start.position.y,

                    edge.start.position.z

                )

            );



            const end =

            new Vertex(

                new Point(

                    edge.end.position.x,

                    edge.end.position.y,

                    edge.end.position.z

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







    private translateWire(

        wire:Wire

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



            result.addEdge(

                new Edge(

                    start,

                    end

                )

            );

        }



        return result;

    }







    private createSideFaces(

        source:Wire,


        target:Wire

    ):

    Face[] {



        const faces:

        Face[] = [];



        const sourceEdges =

        source.getEdges();



        const targetEdges =

        target.getEdges();



        const count =

        Math.min(

            sourceEdges.length,

            targetEdges.length

        );



        for(

            let i = 0;

            i < count;

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

                new Edge(

                    e2.end,

                    e2.start

                )

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