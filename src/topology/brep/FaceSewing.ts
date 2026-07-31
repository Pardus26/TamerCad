import { Face } 
from "../core/Face";

import { Edge } 
from "../core/Edge";

import { HalfEdge } 
from "../core/HalfEdge";

import { Shell } 
from "../core/Shell";

import { Solid } 
from "../core/Solid";







export interface SewingResult {


    shell:Shell;


    halfEdges:HalfEdge[];


    sewn:boolean;


    errors:string[];


}







export class FaceSewing {







    constructor(

        public tolerance:number = 1e-6

    ){}





    







    sewFaces(

        faces:Face[]

    ):

    SewingResult {



        const shell =

        new Shell(

            faces

        );





        const errors:

        string[] = [];





        const halfEdges:

        HalfEdge[] = [];









        this.createHalfEdges(

            faces,

            halfEdges

        );





        this.connectTwins(

            halfEdges,

            errors

        );





        this.connectLoops(

            faces

        );









        return {


            shell,


            halfEdges,


            sewn:

            errors.length === 0,


            errors


        };

    }









    createSolid(

        faces:Face[]

    ):

    Solid {



        const result =

        this.sewFaces(

            faces

        );





        if(

            !result.sewn

        ){

            throw new Error(

                result.errors.join(
                    "\n"
                )

            );

        }





        return new Solid(

            result.shell

        );

    }









    private createHalfEdges(

        faces:Face[],

        output:HalfEdge[]

    ):

    void {



        for(

            const face of

            faces

        ){



            for(

                const wire of

                face.getWires()

            ){



                for(

                    const edge of

                    wire.getEdges()

                ){



                    const halfEdge =

                    new HalfEdge(

                        edge,

                        edge.start,

                        edge.end

                    );





                    output.push(

                        halfEdge

                    );

                }

            }

        }

    }









    private connectTwins(

        halfEdges:

        HalfEdge[],

        errors:string[]

    ):

    void {



        for(

            let i = 0;

            i < halfEdges.length;

            i++

        ){



            const a =

            halfEdges[i];





            if(

                a.twin

            ){

                continue;

            }





            for(

                let j = i + 1;

                j < halfEdges.length;

                j++

            ){



                const b =

                halfEdges[j];





                if(

                    b.twin

                ){

                    continue;

                }





                if(

                    this.isOpposite(

                        a,

                        b

                    )

                ){



                    a.setTwin(

                        b

                    );


                    break;

                }

            }

        }





        for(

            const halfEdge of

            halfEdges

        ){



            if(

                !halfEdge.twin

            ){



                errors.push(

                    "Open edge detected during sewing"

                );

            }

        }

    }









    private isOpposite(

        a:HalfEdge,

        b:HalfEdge

    ):

    boolean {



        return (


            this.sameVertex(

                a.start,

                b.end

            )

            &&


            this.sameVertex(

                a.end,

                b.start

            )


        );

    }









    private sameVertex(

        a:any,

        b:any

    ):

    boolean {



        return (

            a === b

        )

        ||

        (

            a.position.distanceTo(

                b.position

            )

            <=

            this.tolerance

        );

    }









    private connectLoops(

        faces:Face[]

    ):

    void {



        for(

            const face of

            faces

        ){



            for(

                const wire of

                face.getWires()

            ){



                const halfEdges =

                wire.getHalfEdges();





                if(

                    halfEdges.length < 2

                ){

                    continue;

                }





                for(

                    let i = 0;

                    i < halfEdges.length;

                    i++

                ){



                    const current =

                    halfEdges[i];



                    const next =

                    halfEdges[

                        (

                            i + 1

                        )

                        %

                        halfEdges.length

                    ];





                    current.setNext(

                        next

                    );


                    next.setPrevious(

                        current

                    );

                }

            }

        }

    }









    getBoundaryEdges(

        shell:Shell

    ):

    Edge[] {



        const result:

        Edge[] = [];





        for(

            const edge of

            shell.getEdges()

        ){



            let count =

            0;





            for(

                const face of

                shell.getFaces()

            ){



                if(

                    face.containsEdge(

                        edge

                    )

                ){



                    count++;

                }

            }





            if(

                count === 1

            ){



                result.push(

                    edge

                );

            }

        }





        return result;

    }









    isClosed(

        shell:Shell

    ):

    boolean {



        return (

            this.getBoundaryEdges(

                shell

            )

            .length === 0

        );

    }







}