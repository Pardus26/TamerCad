// src/input/PointerEvent.ts





export enum PointerType {


    /**
     * Android / Tablet kalemi
     */
    Stylus = "stylus",



    /**
     * Parmak dokunuşu
     */
    Touch = "touch",



    /**
     * Mouse / trackpad
     */
    Mouse = "mouse"


}









export enum PointerAction {


    Down = "down",


    Move = "move",


    Up = "up",


    Cancel = "cancel"


}









export interface PointerPosition {


    x:number;


    y:number;


}









export interface PointerEvent {


    /**
     * Down / Move / Up
     */
    action:PointerAction;





    /**
     * Kaynağın tipi
     */
    type:PointerType;





    /**
     * Ekran koordinatı
     */
    position:PointerPosition;





    /**
     * Kalem basıncı
     *
     * 0.0 - 1.0
     */
    pressure:number;





    /**
     * Event zamanı
     */
    timestamp:number;



}









export interface PointerState {


    id:number;


    event:PointerEvent;


}









export function createPointerEvent(

    action:PointerAction,

    type:PointerType,

    x:number,

    y:number,

    pressure:number = 1

):PointerEvent {



    return {


        action,


        type,


        position:{


            x,


            y


        },


        pressure,


        timestamp:
            performance.now()



    };


}