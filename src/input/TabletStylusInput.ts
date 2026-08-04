export interface StylusState {


    x:number;


    y:number;


    pressure:number;


    tiltX:number;


    tiltY:number;


    buttons:number;


    isDown:boolean;


}



export class TabletStylusInput {



    private state:StylusState = {


        x:0,

        y:0,

        pressure:0,

        tiltX:0,

        tiltY:0,

        buttons:0,

        isDown:false


    };





    update(

        event:PointerEvent

    ):void{



        this.state.x = event.clientX;


        this.state.y = event.clientY;



        this.state.pressure =

            event.pressure;



        this.state.tiltX =

            event.tiltX;



        this.state.tiltY =

            event.tiltY;



        this.state.isDown =

            event.buttons > 0;



    }






    getState():

        StylusState{


        return {

            ...this.state

        };


    }





}