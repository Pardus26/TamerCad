// src/cad/sketch/SketchToolController.ts


import {
    Sketch
}
from "./Sketch";


import {
    SketchSolverManager
}
from "./SketchSolverManager";


import {
    SketchPoint,
    SketchLine,
    SketchEntity
}
from "./SketchEntity";


import {
    Vector2
}
from "../../math/Vector2";









// =====================================================
// Tool Types
// =====================================================


export enum SketchToolType {


    Select,


    Point,


    Line,


    Rectangle,


    Circle,


    Arc,


    Trim,


    Extend,


    Pan



}









// =====================================================
// Stylus Event
// =====================================================


export interface StylusEvent {


    x:number;


    y:number;


    pressure?:number;


    timestamp:number;


}









// =====================================================
// Snap Result
// =====================================================


export interface SnapResult {


    snapped:boolean;


    position:Vector2;


    type:string;


    entity?:SketchEntity;


}









// =====================================================
// Controller Options
// =====================================================


export interface SketchToolControllerOptions {


    sketch:Sketch;


    solver:

        SketchSolverManager;


}









// =====================================================
// Sketch Tool Controller
// =====================================================


export class SketchToolController {



    private readonly sketch:

        Sketch;



    private readonly solver:

        SketchSolverManager;





    private activeTool:

        SketchToolType =

            SketchToolType.Select;





    private pointerDown = false;





    private startPoint:

        Vector2 | null = null;





    private currentPoint:

        Vector2 | null = null;





    private selectedEntity:

        SketchEntity | null = null;









    constructor(

        options:

        SketchToolControllerOptions

    ){


        this.sketch =

            options.sketch;



        this.solver =

            options.solver;


    }









    // -------------------------------------------------
    // Tool Selection
    // -------------------------------------------------


    setTool(

        tool:SketchToolType

    ):void{


        this.cancel();


        this.activeTool =

            tool;


    }







    getTool():

        SketchToolType{


        return this.activeTool;


    }









    // -------------------------------------------------
    // Stylus Down
    // -------------------------------------------------


    pointerDownEvent(

        event:StylusEvent

    ):void{


        this.pointerDown=true;



        const point =

            this.snap(

                new Vector2(

                    event.x,

                    event.y

                )

            );



        this.startPoint =

            point.position;



        this.currentPoint =

            point.position;




        switch(this.activeTool){



            case SketchToolType.Point:


                this.createPoint(

                    point.position

                );

                break;





            case SketchToolType.Select:


                this.selectAt(

                    point.position

                );

                break;



        }


    }









    // -------------------------------------------------
    // Stylus Move
    // -------------------------------------------------


    pointerMoveEvent(

        event:StylusEvent

    ):void{


        if(!this.pointerDown)

            return;





        const snap =

            this.snap(

                new Vector2(

                    event.x,

                    event.y

                )

            );





        this.currentPoint =

            snap.position;







        if(

            this.activeTool ===

            SketchToolType.Select

        ){


            this.dragSelected(

                snap.position

            );


        }


    }









    // -------------------------------------------------
    // Stylus Up
    // -------------------------------------------------


    pointerUpEvent(

        event:StylusEvent

    ):void{


        if(!this.pointerDown)

            return;




        const point =

            this.snap(

                new Vector2(

                    event.x,

                    event.y

                )

            );





        switch(this.activeTool){



            case SketchToolType.Line:


                this.createLine(

                    this.startPoint!,

                    point.position

                );

                break;




            case SketchToolType.Circle:


                this.createCircle(

                    this.startPoint!,

                    point.position

                );

                break;



        }




        this.pointerDown=false;



        this.startPoint=null;



        this.currentPoint=null;



    }









    // -------------------------------------------------
    // Geometry Creation
    // -------------------------------------------------


    private createPoint(

        position:Vector2

    ):void{


        const point =

            new SketchPoint(

                crypto.randomUUID(),

                position

            );



        this.solver.addEntity(

            point

        );


    }









    private createLine(

        start:Vector2,

        end:Vector2

    ):void{


        const line =

            new SketchLine(

                crypto.randomUUID(),

                start,

                end

            );



        this.solver.addEntity(

            line

        );


    }









    private createCircle(

        center:Vector2,

        edge:Vector2

    ):void{


        const radius =

            center.distanceTo(

                edge

            );



        // Circle entity sonraki aşamada eklenecek


        void radius;


    }









    // -------------------------------------------------
    // Selection
    // -------------------------------------------------


    private selectAt(

        position:Vector2

    ):void{



        let closest:

            SketchEntity | null = null;



        let distance =

            Number.MAX_VALUE;





        for(

            const entity of this.sketch.entities

        ){



            const d =

                entity.distanceTo(

                    position

                );



            if(d < distance){



                distance=d;



                closest=entity;



            }


        }





        this.selectedEntity =

            closest;




        closest?.select();



    }









    // -------------------------------------------------
    // Drag
    // -------------------------------------------------


    private dragSelected(

        position:Vector2

    ):void{



        if(

            !this.selectedEntity ||

            !this.startPoint

        )

            return;





        const delta =

            new Vector2(

                position.x -

                this.startPoint.x,



                position.y -

                this.startPoint.y

            );





        this.selectedEntity.move(

            delta

        );





        this.startPoint =

            position;



        this.solver.solve();



    }









    // -------------------------------------------------
    // Snap Engine
    // -------------------------------------------------


    private snap(

        position:Vector2

    ):

    SnapResult{



        const threshold =

            10;





        for(

            const entity of this.sketch.entities

        ){



            for(

                const point of entity.getPoints()

            ){



                if(

                    point.distanceTo(

                        position

                    )

                    < threshold

                ){



                    return {


                        snapped:true,


                        position:

                            point.clone(),


                        type:"Point",


                        entity


                    };


                }


            }


        }





        return {


            snapped:false,


            position,


            type:"None"



        };


    }









    // -------------------------------------------------
    // Cancel
    // -------------------------------------------------


    cancel():

        void{


        this.pointerDown=false;


        this.startPoint=null;


        this.currentPoint=null;


    }









    // -------------------------------------------------
    // Debug
    // -------------------------------------------------


    debugInfo(){


        return {


            tool:

                SketchToolType[this.activeTool],



            pointerDown:

                this.pointerDown,



            selected:

                this.selectedEntity?.id ?? null



        };


    }



}