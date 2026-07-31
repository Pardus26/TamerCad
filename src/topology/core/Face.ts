import { Surface }
from "../../geometry/surface/Surface";


import { Wire }
from "./Wire";


import { Edge }
from "./Edge";


import { HalfEdge }
from "./HalfEdge";







export class Face {



    public innerWires:

    Wire[] = [];





    public reversed:

    boolean = false;







    constructor(


        public surface:Surface,


        public outerWire:Wire


    ){



        if(

            !outerWire

        ){

            throw new Error(

                "Face requires outer wire"

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









    getOuterWire():

    Wire {



        return this.outerWire;

    }









    getInnerWires():

    Wire[] {



        return this.innerWires;

    }









    getWires():

    Wire[] {



        return [

            this.outerWire,

            ...this.innerWires

        ];

    }









    getEdges():

    Edge[] {



        const edges:

        Edge[] = [];





        for(

            const wire of

            this.getWires()

        ){



            for(

                const edge of

                wire.getEdges()

            ){



                if(

                    !edges.includes(

                        edge

                    )

                ){

                    edges.push(

                        edge

                    );

                }

            }

        }





        return edges;

    }









    getHalfEdges():

    HalfEdge[] {



        const result:

        HalfEdge[] = [];





        for(

            const wire of

            this.getWires()

        ){



            result.push(

                ...wire.getHalfEdges()

            );

        }





        return result;

    }









    normalAt(

        u:number,

        v:number

    ){



        if(

            !this.surface

        ){

            return null;

        }





        return this.surface

        .normal(

            u,

            v

        );

    }









    area():

    number {



        if(

            !this.surface

        ){

            return 0;

        }





        return this.surface

        .area();

    }









    reverse():

    Face {



        const face =

        new Face(

            this.surface,

            this.outerWire.clone()

        );





        for(

            const wire of

            this.innerWires

        ){



            face.addInnerWire(

                wire.clone()

            );

        }





        face.reversed =

        !this.reversed;





        return face;

    }









    containsEdge(

        edge:Edge

    ):

    boolean {



        return this.getEdges()

        .includes(

            edge

        );

    }









    clone():

    Face {



        const face =

        new Face(

            this.surface,

            this.outerWire.clone()

        );





        for(

            const wire of

            this.innerWires

        ){



            face.addInnerWire(

                wire.clone()

            );

        }





        return face;

    }







}