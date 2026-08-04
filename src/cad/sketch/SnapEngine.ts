// src/cad/sketch/SnapEngine.ts


import {
    Vector2
}
from "../../math/Vector2";


import {
    SketchEntity,
    SketchPoint,
    SketchLine,
    SketchCircle
}
from "./SketchEntity";









// =====================================================
// Snap Types
// =====================================================


export enum SnapType {


    None,


    Endpoint,


    Midpoint,


    Center,


    Intersection,


    Grid,


    Angle,


    Tangent



}









// =====================================================
// Snap Result
// =====================================================


export interface SnapResult {


    position:Vector2;


    type:SnapType;


    entity?:

        SketchEntity;



    distance:number;



    constraint?:string;



}









// =====================================================
// Options
// =====================================================


export interface SnapEngineOptions {


    snapDistance?:number;


    gridSize?:number;


    angleStep?:number;



}









// =====================================================
// Snap Engine
// =====================================================


export class SnapEngine {



    private readonly snapDistance:number;



    private readonly gridSize:number;



    private readonly angleStep:number;







    constructor(

        options:

        SnapEngineOptions = {}

    ){



        this.snapDistance =

            options.snapDistance ??

            12;




        this.gridSize =

            options.gridSize ??

            10;




        this.angleStep =

            options.angleStep ??

            15;



    }









    // -------------------------------------------------
    // Main Snap Query
    // -------------------------------------------------


    snap(

        position:Vector2,

        entities:readonly SketchEntity[]

    ):

    SnapResult{



        let best:

            SnapResult = {


                position,

                type:

                    SnapType.None,

                distance:

                    Number.MAX_VALUE


            };






        for(

            const entity of entities

        ){



            best =

                this.checkEntity(

                    position,

                    entity,

                    best

                );


        }






        if(

            best.type ===

            SnapType.None

        ){



            best =

                this.gridSnap(

                    position

                );



        }





        return best;


    }









    // -------------------------------------------------
    // Entity Checks
    // -------------------------------------------------


    private checkEntity(

        position:Vector2,

        entity:SketchEntity,

        current:SnapResult

    ):

    SnapResult{





        if(entity instanceof SketchLine){



            current =

                this.endpointSnap(

                    position,

                    entity,

                    current

                );



            current =

                this.midpointSnap(

                    position,

                    entity,

                    current

                );


        }







        if(entity instanceof SketchCircle){



            current =

                this.centerSnap(

                    position,

                    entity,

                    current

                );


        }







        return current;



    }









    // -------------------------------------------------
    // Endpoint Snap
    // -------------------------------------------------


    private endpointSnap(

        position:Vector2,

        entity:SketchLine,

        current:SnapResult

    ):

    SnapResult{



        const points =

            [

                entity.start,

                entity.end

            ];






        for(

            const p of points

        ){



            const distance =

                p.distanceTo(

                    position

                );





            if(

                distance <

                this.snapDistance &&

                distance <

                current.distance

            ){



                return {


                    position:

                        p.clone(),


                    type:

                        SnapType.Endpoint,


                    entity,


                    distance,


                    constraint:

                        "Coincident"



                };


            }



        }





        return current;


    }









    // -------------------------------------------------
    // Midpoint Snap
    // -------------------------------------------------


    private midpointSnap(

        position:Vector2,

        entity:SketchLine,

        current:SnapResult

    ):

    SnapResult{



        const midpoint =

            new Vector2(


                (

                    entity.start.x +

                    entity.end.x

                )

                /

                2,



                (

                    entity.start.y +

                    entity.end.y

                )

                /

                2



            );





        const distance =

            midpoint.distanceTo(

                position

            );





        if(

            distance <

            this.snapDistance &&

            distance <

            current.distance

        ){



            return {


                position:

                    midpoint,


                type:

                    SnapType.Midpoint,


                entity,


                distance,


                constraint:

                    "Midpoint"



            };


        }





        return current;


    }









    // -------------------------------------------------
    // Circle Center Snap
    // -------------------------------------------------


    private centerSnap(

        position:Vector2,

        entity:SketchCircle,

        current:SnapResult

    ):

    SnapResult{



        const distance =

            entity.center.distanceTo(

                position

            );





        if(

            distance <

            this.snapDistance &&

            distance < current.distance

        ){



            return {


                position:

                    entity.center.clone(),


                type:

                    SnapType.Center,


                entity,


                distance,


                constraint:

                    "Center"



            };


        }





        return current;


    }









    // -------------------------------------------------
    // Grid Snap
    // -------------------------------------------------


    private gridSnap(

        position:Vector2

    ):

    SnapResult{



        const x =

            Math.round(

                position.x /

                this.gridSize

            )

            *

            this.gridSize;





        const y =

            Math.round(

                position.y /

                this.gridSize

            )

            *

            this.gridSize;





        const snapped =

            new Vector2(

                x,

                y

            );





        const distance =

            snapped.distanceTo(

                position

            );






        if(

            distance <

            this.snapDistance

        ){



            return {


                position:

                    snapped,


                type:

                    SnapType.Grid,


                distance,


                constraint:

                    "Grid"



            };


        }





        return {


            position,

            type:

                SnapType.None,


            distance



        };


    }









    // -------------------------------------------------
    // Angle Snap
    // -------------------------------------------------


    snapAngle(

        start:Vector2,

        end:Vector2

    ):

    Vector2{



        const dx =

            end.x -

            start.x;



        const dy =

            end.y -

            start.y;




        const length =

            Math.sqrt(

                dx*dx +

                dy*dy

            );





        if(length===0)

            return end;





        const angle =

            Math.atan2(

                dy,

                dx

            );





        const degrees =

            angle *

            180 /

            Math.PI;





        const snappedAngle =

            Math.round(

                degrees /

                this.angleStep

            )

            *

            this.angleStep;







        const radians =

            snappedAngle *

            Math.PI /

            180;





        return new Vector2(



            start.x +

            Math.cos(radians)

            *

            length,




            start.y +

            Math.sin(radians)

            *

            length



        );



    }









    // -------------------------------------------------
    // Debug
    // -------------------------------------------------


    debugInfo(){


        return {


            snapDistance:

                this.snapDistance,


            gridSize:

                this.gridSize,


            angleStep:

                this.angleStep



        };


    }



}