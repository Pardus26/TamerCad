import { Surface }
from "../../geometry/surface/Surface";


import { Wire }
from "./Wire";


import { Vector3 }
from "../../geometry/core/Vector3";


import { Point }
from "../../geometry/core/Point";


import { Transform }
from "../../geometry/core/Transform";



export enum FaceOrientation {

    FORWARD,

    REVERSED

}







export class Face {



    private static nextId = 1;



    public readonly id:number;



    public innerWires:Wire[] = [];



    public orientation:

    FaceOrientation =

    FaceOrientation.FORWARD;





    constructor(

        public surface:Surface,

        public outerWire:Wire

    ){



        this.id =

        Face.nextId++;



        this.attach();

    }







    private attach():

    void {



        for(

            const vertex of

            this.outerWire.getVertices()

        ){

            vertex.addFace(

                this

            );

        }

    }







    addInnerWire(

        wire:Wire

    ):

    void {



        this.innerWires.push(

            wire

        );

    }







    getWires():

    Wire[] {



        return [

            this.outerWire,

            ...this.innerWires

        ];

    }







    getEdges():

    any[] {



        const edges:any[]=[];



        for(

            const wire of

            this.getWires()

        ){



            for(

                const he of

                wire.getHalfEdges()

            ){

                if(he.edge)

                {

                    edges.push(

                        he.edge

                    );

                }

            }

        }



        return [

            ...new Set(

                edges

            )

        ];

    }







    normalAt(

        u:number,

        v:number

    ):

    Vector3 {



        let normal =

        this.surface

        .derivativeU(

            u,

            v

        )

        .cross(

            this.surface

            .derivativeV(

                u,

                v

            )

        )

        .normalize();



        if(

            this.orientation ===

            FaceOrientation.REVERSED

        ){

            normal =

            normal.multiply(

                -1

            );

        }



        return normal;

    }







    area():

    number {



        const samples = 20;



        let total = 0;



        for(

            let i=0;

            i<samples;

            i++

        ){



            for(

                let j=0;

                j<samples;

                j++

            ){



                const u0=i/samples;

                const v0=j/samples;



                const du=

                1/samples;



                const dv=

                1/samples;



                const a=

                this.surface

                .derivativeU(

                    u0,

                    v0

                );


                const b=

                this.surface

                .derivativeV(

                    u0,

                    v0

                );



                total +=

                a.cross(b)

                .length()

                *

                du

                *

                dv;

            }

        }



        return total;

    }







    containsPoint(

        point:Point

    ):

    boolean {



        const box =

        this.surface

        .boundingBox();



        return box.contains(

            point

        );

    }







    reverse():

    Face {



        const reversed =

        new Face(

            this.surface,

            this.outerWire.reverse()

        );



        reversed.orientation =

        this.orientation ===

        FaceOrientation.FORWARD

        ?

        FaceOrientation.REVERSED

        :

        FaceOrientation.FORWARD;



        return reversed;

    }







    transform(

        transform:Transform

    ):

    Face {



        return new Face(

            this.surface.transform(

                transform

            ),

            this.outerWire.transform(

                transform

            )

        );

    }



}