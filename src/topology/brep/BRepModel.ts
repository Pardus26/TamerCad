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


import { TopologyExplorer }
from "../operation/TopologyExplorer";


import { TopologyValidator }
from "../operation/TopologyValidator";


import { Transform }
from "../../geometry/core/Transform";


import { BoundingBox }
from "../../geometry/core/BoundingBox";



export class BRepModel {



    private static nextId = 1;



    public readonly id:number;



    private solids:

    Solid[] = [];





    constructor(){

        this.id =

        BRepModel.nextId++;

    }







    addSolid(

        solid:Solid

    ):

    void {



        this.solids.push(

            solid

        );

    }







    removeSolid(

        solid:Solid

    ):

    void {



        const index =

        this.solids.indexOf(

            solid

        );



        if(index>=0){



            this.solids.splice(

                index,

                1

            );

        }

    }







    getSolids():

    Solid[] {



        return [

            ...this.solids

        ];

    }







    vertices():

    Vertex[] {



        const result:

        Vertex[]=[];



        for(

            const solid of

            this.solids

        ){



            result.push(

                ...solid.getVertices()

            );

        }



        return [

            ...new Set(

                result

            )

        ];

    }







    edges():

    Edge[] {



        const result:

        Edge[]=[];



        for(

            const solid of

            this.solids

        ){



            result.push(

                ...solid.getEdges()

            );

        }



        return [

            ...new Set(

                result

            )

        ];

    }







    faces():

    Face[] {



        const result:

        Face[]=[];



        for(

            const solid of

            this.solids

        ){



            result.push(

                ...solid.getFaces()

            );

        }



        return [

            ...new Set(

                result

            )

        ];

    }







    validate():

    boolean {



        for(

            const solid of

            this.solids

        ){



            const result =

            TopologyValidator

            .validateSolid(

                solid

            );



            if(

                !result.valid

            ){

                return false;

            }

        }



        return true;

    }







    validationReport():

    object[] {



        const report:

        object[]=[];



        for(

            const solid of

            this.solids

        ){



            report.push(

                TopologyValidator

                .validateSolid(

                    solid

                )

            );

        }



        return report;

    }







    explorer(

        solid:Solid

    ):

    TopologyExplorer {



        return new TopologyExplorer(

            solid

        );

    }







    boundingBox():

    BoundingBox {



        const box =

        BoundingBox.empty();



        for(

            const vertex of

            this.vertices()

        ){



            box.expand(

                vertex.position

            );

        }



        return box;

    }







    transform(

        transform:Transform

    ):

    BRepModel {



        const model =

        new BRepModel();



        for(

            const solid of

            this.solids

        ){



            model.addSolid(

                solid.transform(

                    transform

                )

            );

        }



        return model;

    }







    clone():

    BRepModel {



        const model =

        new BRepModel();



        for(

            const solid of

            this.solids

        ){



            model.addSolid(

                solid

                .transform(

                    new Transform()

                )

            );

        }



        return model;

    }







    statistics():

    object {



        return {

            solids:

            this.solids.length,


            vertices:

            this.vertices().length,


            edges:

            this.edges().length,


            faces:

            this.faces().length,


            valid:

            this.validate()

        };

    }



}