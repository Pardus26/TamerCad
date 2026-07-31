import { Vertex }
from "../core/Vertex";


import { Edge }
from "../core/Edge";


import { Wire }
from "../core/Wire";


import { Face }
from "../core/Face";


import { Shell }
from "../core/Shell";


import { Solid }
from "../core/Solid";



export interface ValidationResult {


    valid:boolean;


    errors:string[];


}







export class TopologyValidator {



    static validateVertex(

        vertex:Vertex

    ):

    ValidationResult {



        const errors:string[]=[];



        if(!vertex.position){

            errors.push(

                "Vertex has no position"

            );

        }



        if(

            Number.isNaN(

                vertex.position.x

            )

        ){

            errors.push(

                "Invalid X coordinate"

            );

        }



        return {

            valid:

            errors.length===0,


            errors

        };

    }







    static validateEdge(

        edge:Edge

    ):

    ValidationResult {



        const errors:string[]=[];



        if(

            !edge.start ||

            !edge.end

        ){

            errors.push(

                "Edge missing vertices"

            );

        }



        if(

            edge.isDegenerate()

        ){

            errors.push(

                "Degenerate edge"

            );

        }



        return {

            valid:

            errors.length===0,


            errors

        };

    }







    static validateWire(

        wire:Wire

    ):

    ValidationResult {



        const errors:string[]=[];



        if(

            !wire.isClosed()

        ){

            errors.push(

                "Wire is open"

            );

        }



        const halfEdges =

        wire.getHalfEdges();



        if(

            halfEdges.length===0

        ){

            errors.push(

                "Empty wire"

            );

        }



        for(

            const he of halfEdges

        ){



            if(!he.next){

                errors.push(

                    "Broken half edge chain"

                );

            }

        }



        return {

            valid:

            errors.length===0,


            errors

        };

    }







    static validateFace(

        face:Face

    ):

    ValidationResult {



        const errors:string[]=[];



        if(

            !face.surface

        ){

            errors.push(

                "Face has no surface"

            );

        }



        const wireResult =

        this.validateWire(

            face.outerWire

        );



        if(

            !wireResult.valid

        ){

            errors.push(

                ...wireResult.errors

            );

        }



        return {

            valid:

            errors.length===0,


            errors

        };

    }







    static validateShell(

        shell:Shell

    ):

    ValidationResult {



        const errors:string[]=[];



        for(

            const face of

            shell.faces

        ){



            const result =

            this.validateFace(

                face

            );



            if(

                !result.valid

            ){

                errors.push(

                    ...result.errors

                );

            }

        }



        if(

            !shell.isClosed()

        ){

            errors.push(

                "Shell is not closed"

            );

        }



        return {

            valid:

            errors.length===0,


            errors

        };

    }







    static validateSolid(

        solid:Solid

    ):

    ValidationResult {



        const errors:string[]=[];



        for(

            const shell of

            solid.shells

        ){



            const result =

            this.validateShell(

                shell

            );



            if(

                !result.valid

            ){

                errors.push(

                    ...result.errors

                );

            }

        }



        if(

            !solid.isClosed()

        ){

            errors.push(

                "Solid is open"

            );

        }



        const V =

        solid.getVertices()

        .length;



        const E =

        solid.getEdges()

        .length;



        const F =

        solid.getFaces()

        .length;



        if(

            V-E+F!==2

        ){

            errors.push(

                "Euler characteristic violation"

            );

        }



        return {

            valid:

            errors.length===0,


            errors

        };

    }







    static checkManifold(

        solid:Solid

    ):

    boolean {



        for(

            const edge of

            solid.getEdges()

        ){



            const h1 =

            edge.halfEdge1;



            const h2 =

            edge.halfEdge2;



            if(

                !h1 ||

                !h2

            ){

                return false;

            }

        }



        return true;

    }



}