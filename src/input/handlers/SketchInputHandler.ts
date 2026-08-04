// src/input/handlers/SketchInputHandler.ts


import {
    InputHandler
} from "../InputRouter";


import {
    PointerEvent
} from "../PointerEvent";


import {
    GestureEvent
} from "../GestureRecognizer";





export interface SketchPoint {


    x:number;


    y:number;


    pressure:number;

}





export interface SketchSegment {


    start: SketchPoint;


    end: SketchPoint;

}









/**
 * Sketch motoru için minimum arayüz
 *
 * Daha sonra gerçek SketchManager bağlanacak
 */
export interface SketchEngine {


    beginStroke(
        point:SketchPoint
    ):void;



    updateStroke(
        point:SketchPoint
    ):void;



    endStroke(
        point:SketchPoint
    ):void;


}









export class SketchInputHandler
    implements InputHandler {




    private sketch:
        SketchEngine;



    private drawing =
        false;






    constructor(
        sketchEngine:SketchEngine
    ){

        this.sketch =
            sketchEngine;

    }









    public onPointerDown(
        event:PointerEvent
    ):void{


        if(!event.isStylus()){

            return;

        }




        this.drawing =
            true;



        this.sketch.beginStroke({

            x:
                event.position.x,


            y:
                event.position.y,


            pressure:
                event.pressure

        });

    }









    public onPointerMove(
        event:PointerEvent
    ):void{


        if(!this.drawing)
            return;



        if(!event.isStylus())
            return;





        this.sketch.updateStroke({

            x:
                event.position.x,


            y:
                event.position.y,


            pressure:
                event.pressure

        });

    }









    public onPointerUp(
        event:PointerEvent
    ):void{


        if(!this.drawing)
            return;



        this.drawing =
            false;




        this.sketch.endStroke({

            x:
                event.position.x,


            y:
                event.position.y,


            pressure:
                0

        });

    }









    public onGesture(
        event:GestureEvent
    ):void{


        /*
         * Sketch sırasında
         * kamera gesturelarını
         * engellemek için hazır
         *
         * ileride:
         *
         * two finger erase
         * undo gesture
         *
         * burada olacak
         */


    }

}