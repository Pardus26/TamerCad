import { Shell }
from "./Shell";


import { Face }
from "./Face";


import { Edge }
from "./Edge";


import { Vertex }
from "./Vertex";


import { BoundingBox }
from "../../geometry/core/BoundingBox";


import { Transform }
from "../../geometry/core/Transform";



export enum SolidOrientation {

    OUTWARD,

    INWARD

}







export class Solid {



    private static nextId = 1;



    public readonly id:number;



    public shells:Shell[];



    public orientation:

    SolidOrientation =

    SolidOrientation.OUTWARD;





    constructor(

        shells:Shell[] = []

    ){


        this.id =

        Solid.nextId++;



        this.shells =

        shells;

    }







    addShell(

        shell:Shell

    ):

    void {



        this.shells.push(

            shell

        );

    }







    removeShell(

        shell:Shell

    ):

    void {



        const index =

        this.shells.indexOf(

            shell

        );



        if(index>=0){



            this.shells.splice(

                index,

                1

            );

        }

    }







    getShells():

    Shell[] {



        return [

            ...this.shells

        ];

    }







    getFaces():

    Face[] {



        const faces:

        Face[]=[];



        for(

            const shell of

            this.shells

        ){



            faces.push(

                ...shell.getFaces()

            );

        }



        return [

            ...new Set(

                faces

            )

        ];

    }







    getEdges():

    Edge[] {



        const edges:

        Edge[]=[];



        for(

            const shell of

            this.shells

        ){



            edges.push(

                ...shell.getEdges()

            );

        }



        return [

            ...new Set(

                edges

            )

        ];

    }







    getVertices():

    Vertex[] {



        const vertices:

        Vertex[]=[];



        for(

            const shell of

            this.shells

        ){



            vertices.push(

                ...shell.getVertices()

            );

        }



        return [

            ...new Set(

                vertices

            )

        ];

    }







    isClosed():

    boolean {



        return this.shells.every(

            shell =>

            shell.isClosed()

        );

    }







    volume():

    number {



        let volume =

        0;



        for(

            const face of

            this.getFaces()

        ){



            const box =

            face.surface

            .boundingBox();



            const size =

            box.size();



            volume +=

            Math.abs(

                size.x *

                size.y *

                size.z

            );

        }



        return volume;

    }







    boundingBox():

    BoundingBox {



        const box =

        BoundingBox.empty();



        for(

            const vertex of

            this.getVertices()

        ){



            box.expand(

                vertex.position

            );

        }



        return box;

    }







    centerOfMass():

    Vertex {



        const vertices =

        this.getVertices();



        if(

            vertices.length===0

        ){

            throw new Error(

                "Empty solid"

            );

        }



        let x=0;

        let y=0;

        let z=0;



        for(

            const v of vertices

        ){



            x += v.position.x;

            y += v.position.y;

            z += v.position.z;

        }



        const n =

        vertices.length;



        return new Vertex(

            new Point(

                x/n,

                y/n,

                z/n

            )

        );

    }







    validate():

    boolean {



        return (

            this.isClosed()

            &&

            this.getFaces().length>0

        );

    }







    reverse():

    Solid {



        const reversed =

        new Solid(

            this.shells.map(

                shell =>

                shell.reverse()

            )

        );



        reversed.orientation =

        this.orientation ===

        SolidOrientation.OUTWARD

        ?

        SolidOrientation.INWARD

        :

        SolidOrientation.OUTWARD;



        return reversed;

    }







    transform(

        transform:Transform

    ):

    Solid {



        return new Solid(

            this.shells.map(

                shell =>

                shell.transform(

                    transform

                )

            )

        );

    }



}