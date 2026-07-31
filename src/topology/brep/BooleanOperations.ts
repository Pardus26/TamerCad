import { Solid }
from "../core/Solid";

import { Shell }
from "../core/Shell";

import { Face }
from "../core/Face";

import { Edge }
from "../core/Edge";

import { Wire }
from "../core/Wire";

import { Vertex }
from "../core/Vertex";

import { Point }
from "../../geometry/core/Point";

import { BRepValidator }
from "./BRepValidator";

import { FaceSewing }
from "./FaceSewing";







export type BooleanOperation =


    "union"

    |

    "difference"

    |

    "intersection";









export interface BooleanResult {


    solid:Solid|null;


    success:boolean;


    errors:string[];


}









export class BooleanOperations {







    private validator:

    BRepValidator;



    private sewing:

    FaceSewing;







    constructor(

        tolerance:number = 1e-6

    ){



        this.validator =

        new BRepValidator(

            tolerance

        );





        this.sewing =

        new FaceSewing(

            tolerance

        );

    }









    union(

        a:Solid,

        b:Solid

    ):

    BooleanResult {



        return this.execute(

            a,

            b,

            "union"

        );

    }









    difference(

        a:Solid,

        b:Solid

    ):

    BooleanResult {



        return this.execute(

            a,

            b,

            "difference"

        );

    }









    intersection(

        a:Solid,

        b:Solid

    ):

    BooleanResult {



        return this.execute(

            a,

            b,

            "intersection"

        );

    }









    private execute(

        a:Solid,


        b:Solid,


        operation:BooleanOperation

    ):

    BooleanResult {



        const errors:

        string[] = [];









        if(

            !this.validator

            .validateSolid(

                a,

                errors,

                []

            )

        ){



            return {


                solid:null,


                success:false,


                errors:[

                    "Invalid first solid"

                ]

            };

        }









        if(

            !this.validator

            .validateSolid(

                b,

                errors,

                []

            )

        ){



            return {


                solid:null,


                success:false,


                errors:[

                    "Invalid second solid"

                ]

            };

        }









        switch(

            operation

        ){



            case "union":



                return this.unionSolids(

                    a,

                    b

                );







            case "difference":



                return this.subtractSolid(

                    a,

                    b

                );







            case "intersection":



                return this.intersectSolids(

                    a,

                    b

                );

        }

    }









    private unionSolids(

        a:Solid,

        b:Solid

    ):

    BooleanResult {



        /*

            Gerçek kernel:

            - intersect faces

            - split faces

            - classify regions

            - remove internal faces

            - sew remaining faces


        */





        const faces:

        Face[] = [

            ...a.getFaces(),

            ...b.getFaces()

        ];





        try {



            const result =

            this.sewing.createSolid(

                faces

            );





            return {


                solid:result,


                success:true,


                errors:[]

            };



        }

        catch(error){



            return {


                solid:null,


                success:false,


                errors:[

                    String(error)

                ]

            };

        }

    }









    private subtractSolid(

        base:Solid,

        tool:Solid

    ):

    BooleanResult {



        /*

            Placeholder:

            Base - Tool

            gerçek uygulamada:

            tool yüzleri ile

            base yüzleri intersect edilir.

        */



        const remainingFaces:

        Face[] = [];





        for(

            const face of

            base.getFaces()

        ){



            if(

                !this.faceInsideSolid(

                    face,

                    tool

                )

            ){



                remainingFaces.push(

                    face

                );

            }

        }









        try {



            const solid =

            this.sewing.createSolid(

                remainingFaces

            );





            return {


                solid,


                success:true,


                errors:[]

            };



        }

        catch(error){



            return {


                solid:null,


                success:false,


                errors:[

                    String(error)

                ]

            };

        }

    }









    private intersectSolids(

        a:Solid,

        b:Solid

    ):

    BooleanResult {



        const commonFaces:

        Face[] = [];





        for(

            const faceA of

            a.getFaces()

        ){



            for(

                const faceB of

                b.getFaces()

            ){



                if(

                    this.facesCoincident(

                        faceA,

                        faceB

                    )

                ){



                    commonFaces.push(

                        faceA

                    );

                }

            }

        }









        if(

            commonFaces.length === 0

        ){



            return {


                solid:null,


                success:false,


                errors:[

                    "No intersection found"

                ]

            };

        }









        try {



            return {


                solid:

                this.sewing.createSolid(

                    commonFaces

                ),


                success:true,


                errors:[]

            };



        }

        catch(error){



            return {


                solid:null,


                success:false,


                errors:[

                    String(error)

                ]

            };

        }

    }









    private faceInsideSolid(

        face:Face,

        solid:Solid

    ):

    boolean {



        const vertices =

        face.getEdges()

        .map(

            e =>

            e.start.position

        );





        if(

            vertices.length === 0

        ){

            return false;

        }





        const center =

        this.averagePoint(

            vertices

        );





        return this.pointInsideSolid(

            center,

            solid

        );

    }









    private pointInsideSolid(

        point:Point,

        solid:Solid

    ):

    boolean {



        /*

            Ray casting:

            Gerçek kernel burada

            face intersection

            ile yapılır.


        */



        return false;

    }









    private facesCoincident(

        a:Face,

        b:Face

    ):

    boolean {



        const edgesA =

        a.getEdges();



        const edgesB =

        b.getEdges();





        if(

            edgesA.length !==

            edgesB.length

        ){

            return false;

        }





        return true;

    }









    private averagePoint(

        points:Point[]

    ):

    Point {



        let x =

        0;



        let y =

        0;



        let z =

        0;





        for(

            const p of

            points

        ){



            x += p.x;


            y += p.y;


            z += p.z;

        }





        return new Point(


            x / points.length,


            y / points.length,


            z / points.length


        );

    }







}