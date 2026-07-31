import { Edge }
from "../core/Edge";

import { Vertex }
from "../core/Vertex";







export enum EdgeMatchType {


    None = "None",


    SameDirection = "SameDirection",


    OppositeDirection = "OppositeDirection"


}







export interface EdgeMatchResult {


    matched:boolean;


    type:EdgeMatchType;


    distance:number;


}







export class EdgeMatcher {







    constructor(

        public tolerance:number = 1e-6

    ){}



    







    match(

        edgeA:Edge,

        edgeB:Edge

    ):

    EdgeMatchResult {



        const same =

        this.sameGeometry(

            edgeA,

            edgeB

        );





        if(

            same

        ){



            return {


                matched:true,


                type:

                EdgeMatchType.SameDirection,


                distance:

                this.edgeDistance(

                    edgeA,

                    edgeB

                )


            };

        }









        const opposite =

        this.oppositeGeometry(

            edgeA,

            edgeB

        );





        if(

            opposite

        ){



            return {


                matched:true,


                type:

                EdgeMatchType.OppositeDirection,


                distance:

                this.edgeDistance(

                    edgeA,

                    edgeB

                )


            };

        }









        return {


            matched:false,


            type:

            EdgeMatchType.None,


            distance:

            Infinity


        };

    }









    equals(

        edgeA:Edge,

        edgeB:Edge

    ):

    boolean {



        return this.match(

            edgeA,

            edgeB

        )

        .matched;

    }









    sameDirection(

        edgeA:Edge,

        edgeB:Edge

    ):

    boolean {



        return (

            this.match(

                edgeA,

                edgeB

            )

            .type ===

            EdgeMatchType.SameDirection

        );

    }









    oppositeDirection(

        edgeA:Edge,

        edgeB:Edge

    ):

    boolean {



        return (

            this.match(

                edgeA,

                edgeB

            )

            .type ===

            EdgeMatchType.OppositeDirection

        );

    }









    private sameGeometry(

        edgeA:Edge,

        edgeB:Edge

    ):

    boolean {



        return (

            this.sameVertex(

                edgeA.start,

                edgeB.start

            )

            &&

            this.sameVertex(

                edgeA.end,

                edgeB.end

            )

        )

        &&

        this.sameCurve(

            edgeA,

            edgeB

        );

    }









    private oppositeGeometry(

        edgeA:Edge,

        edgeB:Edge

    ):

    boolean {



        return (

            this.sameVertex(

                edgeA.start,

                edgeB.end

            )

            &&

            this.sameVertex(

                edgeA.end,

                edgeB.start

            )

        )

        &&

        this.sameCurve(

            edgeA,

            edgeB

        );

    }









    private sameVertex(

        a:Vertex,

        b:Vertex

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









    private sameCurve(

        a:Edge,

        b:Edge

    ):

    boolean {



        const curveA =

        a.getCurve();



        const curveB =

        b.getCurve();





        if(

            !curveA

            &&

            !curveB

        ){

            return true;

        }





        if(

            !curveA

            ||

            !curveB

        ){

            return false;

        }





        /*

            Gerçek CAD kernel:

            curve type kontrolü

            NURBS knot

            control points

            radius

            parameter range

            tolerans analizi


        */



        return curveA === curveB;

    }









    private edgeDistance(

        a:Edge,

        b:Edge

    ):

    number {



        const d1 =

        a.start.position.distanceTo(

            b.start.position

        );





        const d2 =

        a.end.position.distanceTo(

            b.end.position

        );





        const d3 =

        a.start.position.distanceTo(

            b.end.position

        );





        const d4 =

        a.end.position.distanceTo(

            b.start.position

        );





        return Math.min(

            d1 + d2,

            d3 + d4

        );

    }









    findMatches(

        edge:Edge,

        candidates:Edge[]

    ):

    Edge[] {



        return candidates

        .filter(

            candidate =>

            this.equals(

                edge,

                candidate

            )

        );

    }









    findOpposite(

        edge:Edge,

        candidates:Edge[]

    ):

    Edge|null {



        for(

            const candidate of

            candidates

        ){



            const result =

            this.match(

                edge,

                candidate

            );





            if(

                result.type ===

                EdgeMatchType.OppositeDirection

            ){



                return candidate;

            }

        }





        return null;

    }







}