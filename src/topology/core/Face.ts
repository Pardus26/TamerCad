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


        public surface:

        Surface | null,


        public outerWire:

        Wire

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



        if(

            !this.innerWires.includes(

                wire

            )

        ){



            this.innerWires.push(

                wire

            );

        }

    }









    removeInnerWire(

        wire:Wire

    ):

    void {



        const index =

        this.innerWires.indexOf(

            wire

        );





        if(

            index !== -1

        ){



            this.innerWires.splice(

                index,

                1

            );

        }

    }









    getOuterWire():

    Wire {



        return this.outerWire;

    }









    getInnerWires():

    Wire[] {



        return [

            ...this.innerWires

        ];

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



        const result:

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

                    !result.includes(

                        edge

                    )

                ){



                    result.push(

                        edge

                    );

                }

            }

        }





        return result;

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

    ):



    any {



        if(

            !this.surface

        ){

            return null;

        }





        const normal =

        this.surface.normal(

            u,

            v

        );





        if(

            this.reversed

        ){



            return normal.negate

            ? normal.negate()

            : normal;

        }





        return normal;

    }









    area():

    number {



        if(

            !this.surface

        ){

            return 0;

        }





        return this.surface.area();

    }









    reverse():

    Face {



        const face =

        new Face(

            this.surface,

            this.outerWire.clone()

        );





        face.outerWire.close();





        for(

            const wire of

            this.innerWires

        ){



            const inner =

            wire.clone();



            inner.close();



            face.addInnerWire(

                inner

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

        .some(

            e =>

            e === edge

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





        face.reversed =

        this.reversed;





        return face;

    }









    isValid():

    boolean {



        return (

            this.outerWire.isValid()

            &&

            this.outerWire.isClosed()

        );

    }







}