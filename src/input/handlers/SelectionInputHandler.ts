// src/input/handlers/SelectionInputHandler.ts


import {
    InputHandler
} from "../InputRouter";


import {
    PointerEvent
} from "../PointerEvent";


import {
    GestureEvent,
    GestureType
} from "../GestureRecognizer";







export interface SelectionResult {


    id:string;


    type:
        "vertex"
        |
        "edge"
        |
        "face"
        |
        "feature";



    distance:number;

}









export interface SelectionEngine {



    select(
        x:number,
        y:number
    ):
    SelectionResult | null;





    clear():void;





    setActive(
        result:SelectionResult
    ):void;





    toggle(
        result:SelectionResult
    ):void;


}









export class SelectionInputHandler
    implements InputHandler {




    private selection:
        SelectionEngine;



    private pointerDownX =
        0;



    private pointerDownY =
        0;



    private dragging =
        false;



    private selected:
        SelectionResult | null =
        null;






    constructor(
        selectionEngine:SelectionEngine
    ){

        this.selection =
            selectionEngine;

    }









    public onPointerDown(
        event:PointerEvent
    ):void {



        this.pointerDownX =
            event.position.x;



        this.pointerDownY =
            event.position.y;



        this.dragging =
            false;

    }









    public onPointerMove(
        event:PointerEvent
    ):void {



        const dx =
            event.position.x -
            this.pointerDownX;



        const dy =
            event.position.y -
            this.pointerDownY;



        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );



        if(distance > 5){

            this.dragging =
                true;

        }

    }









    public onPointerUp(
        event:PointerEvent
    ):void {



        /*
         * Eğer hareket yoksa
         * seçim yap
         */
        if(!this.dragging){


            const result =
                this.selection.select(

                    event.position.x,

                    event.position.y

                );



            if(result){


                this.selected =
                    result;



                this.selection.setActive(
                    result
                );


            }

            else {


                this.selection.clear();


                this.selected =
                    null;

            }

        }

    }









    public onGesture(
        event:GestureEvent
    ):void {


        switch(
            event.type
        ){




            case GestureType.DoubleTap:


                if(this.selected){


                    this.selection.toggle(
                        this.selected
                    );

                }


                break;






            case GestureType.LongPress:


                /*
                 * Context menu
                 *
                 * Face properties
                 * Feature edit
                 * Delete
                 *
                 */


                break;





        }

    }









    public getSelected():

        SelectionResult | null {


        return this.selected;

    }


}