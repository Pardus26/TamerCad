import { BRepModel }
from "../BRepModel";

import { Solid }
from "../core/Solid";

import { Shell }
from "../core/Shell";

import { Face }
from "../core/Face";

import { Edge }
from "../core/Edge";

import { Vertex }
from "../core/Vertex";







export interface BRepValidationResult {


    valid:boolean;


    errors:string[];


    warnings:string[];

}







export class BRepValidator {







    constructor(

        public tolerance:number = 1e-6

    ){}



    







    validate(

        model:BRepModel

    ):

    BRepValidationResult {



        const errors:

        string[] = [];



        const warnings:

        string[] = [];









        if(

            model.isEmpty()

        ){



            errors.push(

                "BRep model is empty"

            );



            return {


                valid:false,


                errors,


                warnings


            };

        }









        for(

            const solid of

            model.getSolids()

        ){



            this.validateSolid(

                solid,

                errors,

                warnings

            );

        }









        this.validateDuplicateTopology(

            model,

            errors

        );









        return {


            valid:

            errors.length === 0,


            errors,


            warnings


        };

    }









    validateSolid(

        solid:Solid,


        errors:string[],


        warnings:string[]

    ):

    void {



        if(

            !solid.isValid()

        ){



            errors.push(

                "Solid is invalid"

            );

        }









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









        if(

            !this.isManifold(

                solid

            )

        ){



            errors.push(

                "Solid is non manifold"

            );

        }









        if(

            !this.checkEuler(

                solid

            )

        ){



            warnings.push(

                "Euler characteristic is not 2"

            );

        }

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

                "Solid has no shells"

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

                    "Shell is open"

                );

            }





            if(

                shell.faceCount()

                ===

                0

            ){



                errors.push(

                    "Empty shell"

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



            if(

                !face.isValid()

            ){



                errors.push(

                    "Invalid face"

                );

            }





            const outer =

            face.getOuterWire();





            if(

                !outer.isClosed()

            ){



                errors.push(

                    "Face outer wire open"

                );

            }





            if(

                face.getEdges()

                .length === 0

            ){



                errors.push(

                    "Face has no edges"

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

                    "Edge missing vertex"

                );


                continue;

            }





            if(

                edge.start ===

                edge.end

            ){



                errors.push(

                    "Zero length edge"

                );

            }





            if(

                edge.getLength()

                <=

                this.tolerance

            ){



                errors.push(

                    "Degenerate edge"

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

                    "Vertex without point"

                );

            }





            if(

                vertex.getEdges()

                .length === 0

            ){



                errors.push(

                    "Dangling vertex"

                );

            }

        }

    }









    private validateDuplicateTopology(

        model:BRepModel,


        errors:string[]

    ):

    void {



        const vertices =

        model.getVertices();





        for(

            let i = 0;

            i < vertices.length;

            i++

        ){



            for(

                let j = i + 1;

                j < vertices.length;

                j++

            ){



                if(

                    vertices[i]

                    .equals(

                        vertices[j],

                        this.tolerance

                    )

                ){



                    errors.push(

                        "Duplicate vertices detected"

                    );

                }

            }

        }









        const edges =

        model.getEdges();





        for(

            let i = 0;

            i < edges.length;

            i++

        ){



            for(

                let j = i + 1;

                j < edges.length;

                j++

            ){



                if(

                    edges[i]

                    .equals(

                        edges[j],

                        this.tolerance

                    )

                ){



                    errors.push(

                        "Duplicate edges detected"

                    );

                }

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

                count !== 2

            ){



                return false;

            }

        }





        return true;

    }









    checkEuler(

        solid:Solid

    ):

    boolean {



        const V =

        solid.getVertices()

        .length;



        const E =

        solid.getEdges()

        .length;



        const F =

        solid.getFaces()

        .length;





        return (

            V -

            E +

            F

        )

        ===

        2;

    }









    hasOpenBoundary(

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

                usage === 1

            ){



                return true;

            }

        }





        return false;

    }









    validateOrThrow(

        model:BRepModel

    ):

    void {



        const result =

        this.validate(

            model

        );





        if(

            !result.valid

        ){



            throw new Error(

                result.errors.join(

                    "\n"

                )

            );

        }

    }







}