// src/cad/sketch/SketchRecognizer.ts


import {
    Vector2
}
from "../../math/Vector2";



import {
    SketchEntity,
    SketchLine,
    SketchPoint,
    SketchCircle
}
from "./SketchEntity";









// =====================================================
// Recognition Types
// =====================================================


export enum SketchRecognitionType {


    None,


    Point,


    Line,


    Circle,


    Arc,


    Polyline



}









// =====================================================
// Recognition Result
// =====================================================


export interface SketchRecognitionResult {


    type:

        SketchRecognitionType;



    confidence:number;



    entity?:

        SketchEntity;



    points:

        Vector2[];



    suggestions:

        string[];



}









// =====================================================
// Recognizer Options
// =====================================================


export interface SketchRecognizerOptions {


    lineTolerance?:number;


    circleTolerance?:number;


    simplifyTolerance?:number;


}









// =====================================================
// Sketch Recognizer
// =====================================================


export class SketchRecognizer {



    private readonly lineTolerance:number;



    private readonly circleTolerance:number;



    private readonly simplifyTolerance:number;





    constructor(

        options:

        SketchRecognizerOptions = {}

    ){



        this.lineTolerance =

            options.lineTolerance ??

            3;



        this.circleTolerance =

            options.circleTolerance ??

            5;



        this.simplifyTolerance =

            options.simplifyTolerance ??

            2;



    }









    // -------------------------------------------------
    // Main Recognition
    // -------------------------------------------------


    recognize(

        inputPoints:Vector2[]

    ):

    SketchRecognitionResult{



        const points =

            this.simplify(

                inputPoints

            );





        if(points.length < 2){


            return {


                type:

                    SketchRecognitionType.Point,


                confidence:

                    1,


                points



            };


        }







        const lineScore =

            this.detectLine(

                points

            );





        const circleScore =

            this.detectCircle(

                points

            );








        if(

            circleScore >

            lineScore &&

            circleScore >

            0.8

        ){



            return {


                type:

                    SketchRecognitionType.Circle,


                confidence:

                    circleScore,


                points,


                suggestions:

                [

                    "Add Radius Constraint"

                ]


            };


        }








        if(

            lineScore >

            0.8

        ){



            return {


                type:

                    SketchRecognitionType.Line,


                confidence:

                    lineScore,


                points,


                suggestions:

                this.lineSuggestions(

                    points

                )


            };


        }








        return {


            type:

                SketchRecognitionType.Polyline,


            confidence:

                0.5,


            points



        };



    }









    // -------------------------------------------------
    // Line Detection
    // -------------------------------------------------


    private detectLine(

        points:Vector2[]

    ):

    number{



        const start =

            points[0];



        const end =

            points[

                points.length-1

            ];





        const length =

            start.distanceTo(

                end

            );





        if(length===0)

            return 0;







        let error=0;





        for(

            const p of points

        ){



            const distance =

                this.pointLineDistance(

                    p,

                    start,

                    end

                );



            error += distance;



        }





        error /= points.length;





        return Math.max(

            0,

            1 -

            (

                error /

                this.lineTolerance

            )

        );



    }









    // -------------------------------------------------
    // Circle Detection
    // -------------------------------------------------


    private detectCircle(

        points:Vector2[]

    ):

    number{



        if(points.length < 5)

            return 0;





        const center =

            this.average(

                points

            );





        const radii =

            points.map(

                p=>

                    p.distanceTo(

                        center

                    )

            );





        const avg =

            radii.reduce(

                (a,b)=>a+b,

                0

            )

            /

            radii.length;







        let deviation=0;





        for(

            const r of radii

        ){


            deviation +=

                Math.abs(

                    r -

                    avg

                );


        }





        deviation /= radii.length;





        return Math.max(

            0,

            1 -

            (

                deviation /

                this.circleTolerance

            )

        );



    }









    // -------------------------------------------------
    // Constraint Suggestions
    // -------------------------------------------------


    private lineSuggestions(

        points:Vector2[]

    ):

    string[]{



        const start =

            points[0];



        const end =

            points[

                points.length-1

            ];





        const dx =

            Math.abs(

                end.x -

                start.x

            );





        const dy =

            Math.abs(

                end.y -

                start.y

            );







        const suggestions:string[]=[];






        if(dx > dy*10){


            suggestions.push(

                "Horizontal Constraint"

            );


        }





        if(dy > dx*10){


            suggestions.push(

                "Vertical Constraint"

            );


        }





        return suggestions;


    }









    // -------------------------------------------------
    // Geometry Helpers
    // -------------------------------------------------


    private simplify(

        points:Vector2[]

    ):

    Vector2[]{



        if(points.length < 3)

            return points;





        const result:Vector2[]=[

            points[0]

        ];





        for(

            let i=1;

            i<points.length-1;

            i++

        ){



            const prev =

                points[i-1];



            const next =

                points[i+1];



            const current =

                points[i];





            const d =

                this.pointLineDistance(

                    current,

                    prev,

                    next

                );





            if(

                d >

                this.simplifyTolerance

            ){


                result.push(

                    current

                );


            }


        }





        result.push(

            points[

                points.length-1

            ]

        );





        return result;


    }









    private average(

        points:Vector2[]

    ):

    Vector2{


        let x=0;

        let y=0;





        for(

            const p of points

        ){



            x+=p.x;

            y+=p.y;



        }





        return new Vector2(

            x/points.length,

            y/points.length

        );


    }









    private pointLineDistance(

        p:Vector2,

        a:Vector2,

        b:Vector2

    ):

    number{



        const area =

            Math.abs(

                (

                    b.x-a.x

                )

                *

                (

                    a.y-p.y

                )

                -

                (

                    a.x-p.x

                )

                *

                (

                    b.y-a.y

                )

            );





        const length =

            a.distanceTo(

                b

            );





        if(length===0)

            return p.distanceTo(a);





        return area/length;


    }









    debugInfo(){


        return {


            lineTolerance:

                this.lineTolerance,


            circleTolerance:

                this.circleTolerance,


            simplifyTolerance:

                this.simplifyTolerance



        };


    }



}