import { Solid }
from "../core/Solid";


import { Face }
from "../core/Face";


import { Edge }
from "../core/Edge";


import { Vertex }
from "../core/Vertex";


import { Shell }
from "../core/Shell";







export interface ValidationResult {


    valid:boolean;


    errors:string[];


}







export class TopologyValidator {



    







    validate(

        solid:Solid

    ):

    ValidationResult {



        const errors:

        string[] = [];





        this.validateShells(

            solid,

            errors

        );





        this.validateFaces(

            solid,

            errors

        );





        this.validateEdges(

            solid,

            errors

        );





        this.validateVertices(

            solid,

            errors

        );





        return {


            valid:

            errors.length === 0,


            errors

        };

    }









    private validateShells(

        solid:Solid,


        errors:string[]

    ):

    void {



        const shells =

        solid.getShells();





        if(

            shells.length === 0

        ){



            errors.push(

                "Solid has no shell"

            );


            return;

        }





        for(

            const shell of

            shells

        ){



            if(

                !shell.isClosed()

            ){



                errors.push(

                    "Shell is not closed"

                );

            }

        }

    }









    private validateFaces(

        solid:Solid,


        errors:string[]

    ):

    void {



        for(

            const face of

            solid.getFaces()

        ){



            const wire =

            face.getOuterWire();





            if(

                !wire.isClosed()

            ){



                errors.push(

                    "Face outer wire is open"

                );

            }





            if(

                face.getEdges()

                .length === 0

            ){



                errors.push(

                    "Face contains no edges"

                );

            }

        }

    }









    private validateEdges(

        solid:Solid,


        errors:string[]

    ):

    void {



        const edges =

        solid.getEdges();





        for(

            const edge of

            edges

        ){



            if(

                !edge.start

                ||

                !edge.end

            ){



                errors.push(

                    "Edge has invalid vertices"

                );

                continue;

            }





            if(

                edge.start ===

                edge.end

            ){



                errors.push(

                    "Edge has identical start and end vertex"

                );

            }

        }

    }









    private validateVertices(

        solid:Solid,


        errors:string[]

    ):

    void {



        for(

            const vertex of

            solid.getVertices()

        ){



            if(

                !vertex.position

            ){



                errors.push(

                    "Vertex has no position"

                );

            }





            if(

                vertex.getEdges()

                .length === 0

            ){



                errors.push(

                    "Dangling vertex detected"

                );

            }

        }

    }









    isManifold(

        solid:Solid

    ):

    boolean {



        for(

            const edge of

            solid.getEdges()

        ){



            let usage =

            0;





            for(

                const face of

                solid.getFaces()

            ){



                if(

                    face.containsEdge(

                        edge

                    )

                ){



                    usage++;

                }

            }





            if(

                usage !== 2

            ){



                return false;

            }

        }





        return true;

    }









    hasOpenEdges(

        solid:Solid

    ):

    boolean {



        for(

            const edge of

            solid.getEdges()

        ){



            let count =

            0;





            for(

                const face of

                solid.getFaces()

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

                count < 2

            ){



                return true;

            }

        }





        return false;

    }







}