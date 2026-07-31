import { Solid }
from "../core/Solid";

import { Face }
from "../core/Face";

import { Point }
from "../../geometry/core/Point";

import { BoundingBox }
from "../../geometry/core/BoundingBox";

import { FaceClassifier }
from "./FaceClassifier";







export enum SolidClassification {


    INSIDE = "inside",


    OUTSIDE = "outside",


    ON_BOUNDARY = "on_boundary",


    INTERSECTING = "intersecting"


}







export interface SolidClassificationResult {


    classification:SolidClassification;


    point?:Point;


    details?:string[];

}







export class SolidClassifier {







    private faceClassifier:

    FaceClassifier;







    constructor(

        public tolerance:number = 1e-6

    ){



        this.faceClassifier =

        new FaceClassifier(

            tolerance

        );

    }









    classifyPoint(

        point:Point,

        solid:Solid

    ):

    SolidClassificationResult {



        const boundary =

        this.isPointOnBoundary(

            point,

            solid

        );





        if(

            boundary

        ){



            return {


                classification:

                SolidClassification.ON_BOUNDARY,


                point

            };

        }









        const inside =

        this.isPointInside(

            point,

            solid

        );





        return {


            classification:

            inside

            ?

            SolidClassification.INSIDE

            :

            SolidClassification.OUTSIDE,


            point

        };

    }









    classifySolid(

        source:Solid,

        target:Solid

    ):

    SolidClassificationResult {



        const details:

        string[] = [];









        if(

            !this.boundingBoxesOverlap(

                source,

                target

            )

        ){



            return {


                classification:

                SolidClassification.OUTSIDE,


                details:[

                    "Bounding boxes do not overlap"

                ]

            };

        }









        let insideCount =

        0;



        let outsideCount =

        0;



        let boundaryCount =

        0;









        for(

            const vertex of

            source.getVertices()

        ){



            const result =

            this.classifyPoint(

                vertex.position,

                target

            );





            switch(

                result.classification

            ){



                case SolidClassification.INSIDE:

                    insideCount++;

                    break;





                case SolidClassification.OUTSIDE:

                    outsideCount++;

                    break;





                case SolidClassification.ON_BOUNDARY:

                    boundaryCount++;

                    break;

            }

        }









        if(

            boundaryCount > 0

        ){



            details.push(

                "Shared boundary detected"

            );

        }









        if(

            insideCount > 0

            &&

            outsideCount > 0

        ){



            return {


                classification:

                SolidClassification.INTERSECTING,


                details

            };

        }









        if(

            insideCount ===

            source.getVertices()

            .length

        ){



            return {


                classification:

                SolidClassification.INSIDE,


                details

            };

        }









        return {


            classification:

            SolidClassification.OUTSIDE,


            details

        };

    }









    contains(

        container:Solid,

        object:Solid

    ):

    boolean {



        const result =

        this.classifySolid(

            object,

            container

        );





        return (

            result.classification ===

            SolidClassification.INSIDE

            ||

            result.classification ===

            SolidClassification.ON_BOUNDARY

        );

    }









    intersects(

        a:Solid,

        b:Solid

    ):

    boolean {



        return (

            this.classifySolid(

                a,

                b

            )

            .classification

            ===

            SolidClassification.INTERSECTING

        );

    }









    private isPointInside(

        point:Point,

        solid:Solid

    ):

    boolean {



        let intersections =

        0;





        for(

            const face of

            solid.getFaces()

        ){



            if(

                this.rayIntersectsFace(

                    point,

                    face

                )

            ){



                intersections++;

            }

        }





        return (

            intersections %

            2

        )

        ===

        1;

    }









    private isPointOnBoundary(

        point:Point,

        solid:Solid

    ):

    boolean {



        for(

            const face of

            solid.getFaces()

        ){



            const result =

            this.faceClassifier

            .classifyPoint(

                point,

                face

            );





            if(

                result.classification ===

                "on_boundary"

            ){



                return true;

            }

        }





        return false;

    }









    private rayIntersectsFace(

        point:Point,

        face:Face

    ):

    boolean {



        if(

            !face.surface

        ){

            return false;

        }





        /*

            Gerçek kernel:

            
            Ray:

            P + tD


            Surface intersection:

            Plane
            Cylinder
            Sphere
            NURBS


            burada uygulanır.

        */



        return false;

    }









    private boundingBoxesOverlap(

        a:Solid,

        b:Solid

    ):

    boolean {



        const boxA =

        this.getBoundingBox(

            a

        );



        const boxB =

        this.getBoundingBox(

            b

        );





        if(

            !boxA

            ||

            !boxB

        ){

            return true;

        }





        return boxA.intersects(

            boxB

        );

    }









    private getBoundingBox(

        solid:Solid

    ):

    BoundingBox|null {



        const vertices =

        solid.getVertices();





        if(

            vertices.length === 0

        ){

            return null;

        }





        let minX =

        vertices[0].position.x;



        let minY =

        vertices[0].position.y;



        let minZ =

        vertices[0].position.z;



        let maxX =

        minX;



        let maxY =

        minY;



        let maxZ =

        minZ;









        for(

            const vertex of

            vertices

        ){



            const p =

            vertex.position;





            minX =

            Math.min(

                minX,

                p.x

            );



            minY =

            Math.min(

                minY,

                p.y

            );



            minZ =

            Math.min(

                minZ,

                p.z

            );





            maxX =

            Math.max(

                maxX,

                p.x

            );



            maxY =

            Math.max(

                maxY,

                p.y

            );



            maxZ =

            Math.max(

                maxZ,

                p.z

            );

        }





        return new BoundingBox(

            new Point(

                minX,

                minY,

                minZ

            ),

            new Point(

                maxX,

                maxY,

                maxZ

            )

        );

    }









    sameSolid(

        a:Solid,

        b:Solid

    ):

    boolean {



        const av =

        a.getVertices();



        const bv =

        b.getVertices();





        if(

            av.length !==

            bv.length

        ){

            return false;

        }





        return true;

    }







}