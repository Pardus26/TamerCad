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


    Rectangle,


    Polyline,


    ClosedProfile



}









// =====================================================
// Recognition Result
// =====================================================


export interface SketchRecognitionResult {


    type:

        SketchRecognitionType;




    confidence:

        number;




    entity?:

        SketchEntity;




    points:

        Vector2[];





    suggestions:

        string[];





    constraints:

        string[];



}









// =====================================================
// Recognizer Options
// =====================================================


export interface SketchRecognizerOptions {


    lineTolerance?:

        number;




    circleTolerance?:

        number;




    arcTolerance?:

        number;




    simplifyTolerance?:

        number;




    rectangleTolerance?:

        number;



}









// =====================================================
// Sketch Recognizer
// =====================================================


export class SketchRecognizer {



    private readonly lineTolerance:number;



    private readonly circleTolerance:number;



    private readonly arcTolerance:number;



    private readonly simplifyTolerance:number;



    private readonly rectangleTolerance:number;





    constructor(

        options:

        SketchRecognizerOptions = {}

    ){



        this.lineTolerance =

            options.lineTolerance ?? 3;



        this.circleTolerance =

            options.circleTolerance ?? 5;



        this.arcTolerance =

            options.arcTolerance ?? 8;



        this.simplifyTolerance =

            options.simplifyTolerance ?? 2;



        this.rectangleTolerance =

            options.rectangleTolerance ?? 8;



    }
    // -------------------------------------------------
    // Main Recognition Pipeline
    // -------------------------------------------------

    recognize(

        inputPoints: Vector2[]

    ):

    SketchRecognitionResult {


        const points =

            this.simplify(

                inputPoints

            );



        if (

            points.length === 0

        ) {


            return {

                type:

                    SketchRecognitionType.None,


                confidence:

                    0,


                points: [],


                suggestions: [],


                constraints: []

            };

        }




        if (

            points.length === 1

        ) {


            return {


                type:

                    SketchRecognitionType.Point,


                confidence:

                    1,


                points,


                suggestions:

                    [],


                constraints:

                    []


            };

        }






        /*
         * Recognition Order
         *
         * 1 - Rectangle
         * 2 - Circle
         * 3 - Arc
         * 4 - Line
         * 5 - Closed Profile
         * 6 - Polyline
         */



        const rectangleScore =

            this.detectRectangle(

                points

            );



        if (

            rectangleScore >

            0.85

        ) {


            return {


                type:

                    SketchRecognitionType.Rectangle,


                confidence:

                    rectangleScore,


                points,


                suggestions:

                    [

                        "Add Horizontal Constraints",

                        "Add Vertical Constraints",

                        "Add Equal Length Constraints"

                    ],


                constraints:

                    [

                        "HORIZONTAL",

                        "VERTICAL",

                        "PERPENDICULAR"

                    ]


            };

        }








        const circleScore =

            this.detectCircle(

                points

            );



        if (

            circleScore >

            0.8

        ) {


            return {


                type:

                    SketchRecognitionType.Circle,


                confidence:

                    circleScore,


                points,


                suggestions:

                    [

                        "Add Radius Constraint"

                    ],


                constraints:

                    [

                        "RADIUS"

                    ]

            };

        }








        const arcScore =

            this.detectArc(

                points

            );



        if (

            arcScore >

            0.75

        ) {


            return {


                type:

                    SketchRecognitionType.Arc,


                confidence:

                    arcScore,


                points,


                suggestions:

                    [

                        "Add Radius Constraint",

                        "Add Tangent Constraint"

                    ],


                constraints:

                    [

                        "RADIUS",

                        "TANGENT"

                    ]


            };

        }








        const lineScore =

            this.detectLine(

                points

            );



        if (

            lineScore >

            0.8

        ) {


            const constraintInfo =

                this.lineConstraints(

                    points

                );



            return {


                type:

                    SketchRecognitionType.Line,


                confidence:

                    lineScore,


                points,


                suggestions:

                    constraintInfo.suggestions,


                constraints:

                    constraintInfo.constraints


            };

        }








        if (

            this.isClosedProfile(

                points

            )

        ) {


            return {


                type:

                    SketchRecognitionType.ClosedProfile,


                confidence:

                    0.7,


                points,


                suggestions:

                    [

                        "Create Extrude Feature"

                    ],


                constraints:

                    []

            };


        }








        return {


            type:

                SketchRecognitionType.Polyline,


            confidence:

                0.5,


            points,


            suggestions:

                [

                    "Convert To Spline"

                ],


            constraints:

                []


        };


    }
    // -------------------------------------------------
    // Line Detection
    // -------------------------------------------------

    private detectLine(

        points: Vector2[]

    ):

    number {


        const start =

            points[0];



        const end =

            points[

                points.length - 1

            ];



        const length =

            start.distanceTo(

                end

            );



        if (

            length === 0

        ) {

            return 0;

        }





        let totalError = 0;



        for (

            const point of points

        ) {


            totalError +=

                this.pointLineDistance(

                    point,

                    start,

                    end

                );


        }





        const averageError =

            totalError /

            points.length;





        return Math.max(

            0,

            1 -

            (

                averageError /

                this.lineTolerance

            )

        );


    }









    // -------------------------------------------------
    // Line Constraint Analysis
    // -------------------------------------------------

    private lineConstraints(

        points: Vector2[]

    ) {


        const start =

            points[0];



        const end =

            points[

                points.length - 1

            ];





        const dx =

            end.x -

            start.x;



        const dy =

            end.y -

            start.y;





        const absX =

            Math.abs(

                dx

            );



        const absY =

            Math.abs(

                dy

            );






        const suggestions:string[] = [];



        const constraints:string[] = [];








        // Horizontal Detection

        if (

            absY < this.lineTolerance

        ) {


            suggestions.push(

                "Horizontal Line"

            );


            constraints.push(

                "HORIZONTAL"

            );


        }








        // Vertical Detection

        else if (

            absX < this.lineTolerance

        ) {


            suggestions.push(

                "Vertical Line"

            );


            constraints.push(

                "VERTICAL"

            );


        }








        // Near 45 Degree

        else {


            const angle =

                Math.atan2(

                    dy,

                    dx

                )

                *

                180

                /

                Math.PI;




            const snappedAngle =

                Math.round(

                    angle /

                    45

                )

                *

                45;




            if (

                Math.abs(

                    angle -

                    snappedAngle

                )

                < 5

            ) {


                suggestions.push(

                    `Angle ${snappedAngle}°`

                );


                constraints.push(

                    "ANGLE"

                );


            }


        }








        return {


            suggestions,


            constraints


        };


    }









    // -------------------------------------------------
    // Horizontal Test
    // -------------------------------------------------

    private isHorizontal(

        start:Vector2,

        end:Vector2

    ):


    boolean {


        return Math.abs(

            end.y -

            start.y

        )

        <

        this.lineTolerance;


    }









    // -------------------------------------------------
    // Vertical Test
    // -------------------------------------------------

    private isVertical(

        start:Vector2,

        end:Vector2

    ):


    boolean {


        return Math.abs(

            end.x -

            start.x

        )

        <

        this.lineTolerance;


    }
    // -------------------------------------------------
    // Circle Detection
    // -------------------------------------------------

    private detectCircle(

        points: Vector2[]

    ):

    number {


        if (

            points.length < 5

        ) {

            return 0;

        }





        const center =

            this.average(

                points

            );





        const radii =

            points.map(

                p =>

                    p.distanceTo(

                        center

                    )

            );





        const averageRadius =

            radii.reduce(

                (

                    sum,

                    value

                ) =>

                    sum + value,

                0

            )

            /

            radii.length;





        let error = 0;





        for (

            const radius of radii

        ) {


            error +=

                Math.abs(

                    radius -

                    averageRadius

                );


        }





        error /=

            radii.length;






        return Math.max(

            0,

            1 -

            (

                error /

                this.circleTolerance

            )

        );

    }









    // -------------------------------------------------
    // Arc Detection
    // -------------------------------------------------

    private detectArc(

        points: Vector2[]

    ):

    number {



        if (

            points.length < 4

        ) {

            return 0;

        }







        const start =

            points[0];



        const middle =

            points[

                Math.floor(

                    points.length / 2

                )

            ];



        const end =

            points[

                points.length - 1

            ];








        const center =

            this.circleCenterFromThreePoints(

                start,

                middle,

                end

            );





        if (

            !center

        ) {

            return 0;

        }






        const radius =

            center.distanceTo(

                start

            );





        let deviation = 0;





        for (

            const point of points

        ) {


            deviation +=

                Math.abs(

                    point.distanceTo(

                        center

                    )

                    -

                    radius

                );


        }





        deviation /=

            points.length;








        const score =

            Math.max(

                0,

                1 -

                (

                    deviation /

                    this.arcTolerance

                )

            );





        return score;

    }









    // -------------------------------------------------
    // Circle Center From Three Points
    // -------------------------------------------------

    private circleCenterFromThreePoints(

        a:Vector2,

        b:Vector2,

        c:Vector2

    ):

    Vector2 | null {



        const denominator =

            2 *

            (

                a.x *

                (

                    b.y -

                    c.y

                )

                +

                b.x *

                (

                    c.y -

                    a.y

                )

                +

                c.x *

                (

                    a.y -

                    b.y

                )

            );





        if (

            Math.abs(

                denominator

            )

            <

            0.000001

        ) {


            return null;

        }







        const a2 =

            a.x *

            a.x +

            a.y *

            a.y;



        const b2 =

            b.x *

            b.x +

            b.y *

            b.y;



        const c2 =

            c.x *

            c.x +

            c.y *

            c.y;








        const x =

            (

                a2 *

                (

                    b.y -

                    c.y

                )

                +

                b2 *

                (

                    c.y -

                    a.y

                )

                +

                c2 *

                (

                    a.y -

                    b.y

                )

            )

            /

            denominator;






        const y =

            (

                a2 *

                (

                    c.x -

                    b.x

                )

                +

                b2 *

                (

                    a.x -

                    c.x

                )

                +

                c2 *

                (

                    b.x -

                    a.x

                )

            )

            /

            denominator;





        return new Vector2(

            x,

            y

        );

    }
    // -------------------------------------------------
    // Rectangle Detection
    // -------------------------------------------------

    private detectRectangle(

        points: Vector2[]

    ):

    number {


        if (

            points.length < 4

        ) {

            return 0;

        }





        if (

            !this.isClosedProfile(

                points

            )

        ) {

            return 0;

        }







        const simplified =

            this.simplify(

                points

            );





        if (

            simplified.length !== 5

        ) {

            return 0;

        }







        let rightAngleCount = 0;





        for (

            let i = 0;

            i < 4;

            i++

        ) {



            const a =

                simplified[i];



            const b =

                simplified[i + 1];



            const c =

                simplified[

                    (

                        i + 2

                    )

                    %

                    4

                ];






            const v1 =

                new Vector2(

                    a.x - b.x,

                    a.y - b.y

                );



            const v2 =

                new Vector2(

                    c.x - b.x,

                    c.y - b.y

                );






            const dot =

                v1.dot(

                    v2

                );





            const len =

                v1.length()

                *

                v2.length();






            if (

                len === 0

            ) {

                continue;

            }







            const cos =

                dot /

                len;







            if (

                Math.abs(

                    cos

                )

                <

                0.15

            ) {


                rightAngleCount++;


            }


        }








        return (

            rightAngleCount /

            4

        );

    }









    // -------------------------------------------------
    // Closed Profile Detection
    // -------------------------------------------------

    private isClosedProfile(

        points: Vector2[]

    ):

    boolean {



        if (

            points.length < 3

        ) {

            return false;

        }







        const start =

            points[0];



        const end =

            points[

                points.length - 1

            ];







        return (

            start.distanceTo(

                end

            )

            <

            this.simplifyTolerance * 2

        );

    }









    // -------------------------------------------------
    // Polygon Area
    // -------------------------------------------------

    private polygonArea(

        points:Vector2[]

    ):

    number {


        let area = 0;





        for (

            let i = 0;

            i < points.length;

            i++

        ) {


            const current =

                points[i];



            const next =

                points[

                    (

                        i + 1

                    )

                    %

                    points.length

                ];





            area +=

                (

                    current.x *

                    next.y

                )

                -

                (

                    next.x *

                    current.y

                );


        }






        return Math.abs(

            area /

            2

        );


    }









    // -------------------------------------------------
    // Profile Validation
    // -------------------------------------------------

    private validateProfile(

        points:Vector2[]

    ) {



        return {


            closed:

                this.isClosedProfile(

                    points

                ),


            area:

                this.polygonArea(

                    points

                ),


            pointCount:

                points.length


        };


    }
    // -------------------------------------------------
    // Advanced Constraint Suggestion Engine
    // -------------------------------------------------

    private generateConstraintSuggestions(

        points: Vector2[]

    ) {



        const suggestions:string[] = [];



        const constraints:string[] = [];







        if (

            points.length < 2

        ) {


            return {

                suggestions,

                constraints

            };


        }







        const start =

            points[0];



        const end =

            points[

                points.length - 1

            ];







        const dx =

            end.x -

            start.x;



        const dy =

            end.y -

            start.y;






        const length =

            Math.sqrt(

                dx * dx +

                dy * dy

            );







        if (

            length === 0

        ) {


            return {

                suggestions,

                constraints

            };


        }








        // ---------------------------------------------
        // Horizontal / Vertical
        // ---------------------------------------------


        if (

            Math.abs(

                dy

            )

            <

            this.lineTolerance

        ) {


            suggestions.push(

                "Horizontal Alignment"

            );


            constraints.push(

                "HORIZONTAL"

            );

        }






        if (

            Math.abs(

                dx

            )

            <

            this.lineTolerance

        ) {


            suggestions.push(

                "Vertical Alignment"

            );


            constraints.push(

                "VERTICAL"

            );

        }









        // ---------------------------------------------
        // Angle Detection
        // ---------------------------------------------


        const angle =

            Math.atan2(

                dy,

                dx

            )

            *

            180

            /

            Math.PI;







        const commonAngles =

            [

                0,

                30,

                45,

                60,

                90,

                120,

                135,

                150,

                180

            ];








        for (

            const target of commonAngles

        ) {


            if (

                Math.abs(

                    angle -

                    target

                )

                <

                4

            ) {


                suggestions.push(

                    `Angle ${target}°`

                );


                constraints.push(

                    "ANGLE"

                );


                break;

            }

        }








        // ---------------------------------------------
        // Equal Length Candidate
        // ---------------------------------------------


        if (

            points.length === 3

        ) {



            const a =

                points[0]

                .distanceTo(

                    points[1]

                );



            const b =

                points[1]

                .distanceTo(

                    points[2]

                );






            if (

                Math.abs(

                    a-b

                )

                <

                this.lineTolerance

            ) {


                suggestions.push(

                    "Equal Length"

                );


                constraints.push(

                    "EQUAL_LENGTH"

                );


            }


        }









        return {


            suggestions,

            constraints


        };


    }









    // -------------------------------------------------
    // Parallel Detection
    // -------------------------------------------------

    private detectParallel(

        lineA:SketchLine,

        lineB:SketchLine

    ):

    boolean {



        const dirA =

            lineA.direction();



        const dirB =

            lineB.direction();





        const cross =

            Math.abs(

                dirA.x *

                dirB.y

                -

                dirA.y *

                dirB.x

            );






        return (

            cross <

            0.01

        );


    }









    // -------------------------------------------------
    // Perpendicular Detection
    // -------------------------------------------------

    private detectPerpendicular(

        lineA:SketchLine,

        lineB:SketchLine

    ):

    boolean {


        const dot =

            lineA.direction()

            .dot(

                lineB.direction()

            );




        return (

            Math.abs(

                dot

            )

            <

            0.01

        );


    }









    // -------------------------------------------------
    // Tangent Suggestion
    // -------------------------------------------------

    private detectTangent(

        circle:SketchCircle,

        line:SketchLine

    ):

    boolean {


        const closest =

            this.closestPointOnLine(

                circle.center,

                line

            );





        const distance =

            closest.distanceTo(

                circle.center

            );







        return (

            Math.abs(

                distance -

                circle.radius

            )

            <

            this.circleTolerance

        );


    }
    // -------------------------------------------------
    // Closest Point On Line
    // -------------------------------------------------

    private closestPointOnLine(

        point:Vector2,

        line:SketchLine

    ):

    Vector2 {



        const start =

            line.start;



        const end =

            line.end;





        const direction =

            new Vector2(

                end.x-start.x,

                end.y-start.y

            );






        const lengthSq =

            direction.dot(

                direction

            );





        if (

            lengthSq === 0

        ) {


            return start.clone();

        }






        const offset =

            new Vector2(

                point.x-start.x,

                point.y-start.y

            );







        let t =

            offset.dot(

                direction

            )

            /

            lengthSq;






        t = Math.max(

            0,

            Math.min(

                1,

                t

            )

        );







        return new Vector2(

            start.x +

            direction.x *

            t,



            start.y +

            direction.y *

            t

        );

    }









    // -------------------------------------------------
    // Point Distance To Segment
    // -------------------------------------------------

    private pointSegmentDistance(

        point:Vector2,

        start:Vector2,

        end:Vector2

    ):

    number {



        const closest =

            this.closestPointOnSegment(

                point,

                start,

                end

            );





        return closest.distanceTo(

            point

        );

    }









    private closestPointOnSegment(

        point:Vector2,

        start:Vector2,

        end:Vector2

    ):

    Vector2 {



        const segment =

            new Vector2(

                end.x-start.x,

                end.y-start.y

            );





        const lengthSq =

            segment.dot(

                segment

            );





        if (

            lengthSq === 0

        ) {


            return start.clone();

        }





        let t =

            (

                (

                    point.x-start.x

                )

                *

                segment.x

                +

                (

                    point.y-start.y

                )

                *

                segment.y

            )

            /

            lengthSq;







        t = Math.max(

            0,

            Math.min(

                1,

                t

            )

        );






        return new Vector2(

            start.x +

            segment.x *

            t,


            start.y +

            segment.y *

            t

        );


    }









    // -------------------------------------------------
    // Debug Information
    // -------------------------------------------------

    debugInfo(){


        return {


            lineTolerance:

                this.lineTolerance,


            circleTolerance:

                this.circleTolerance,



            arcTolerance:

                this.arcTolerance,



            simplifyTolerance:

                this.simplifyTolerance,



            rectangleTolerance:

                this.rectangleTolerance



        };


    }


}