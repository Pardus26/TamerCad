// src/app/EngineBridge.ts


import {
    KernelBootstrap
} from "./KernelBootstrap";


import {
    InputController
} from "../input/InputController";


import {
    InputRouter,
    InputMode
} from "../input/InputRouter";






export class EngineBridge {



    private static initialized =
        false;



    private static input:
        InputController | null =
        null;









    public static initialize():void {



        if(
            EngineBridge.initialized
        ){

            return;

        }







        KernelBootstrap.initialize();







        EngineBridge.input =
            new InputController(
                new InputRouter()
            );





        EngineBridge.input.initialize();







        EngineBridge.initialized =
            true;





        console.info(
            "[Engine] Initialized"
        );


    }









    public static resize(

        width:number,

        height:number

    ):void {



        if(
            !EngineBridge.initialized
        )
            return;





        const ctx =
            KernelBootstrap.context();





        ctx.viewport.resize(

            width,

            height

        );





        ctx.camera.setViewport(

            width,

            height

        );


    }









    public static update(

        deltaTime:number

    ):void {



        if(
            !EngineBridge.initialized
        )
            return;





        KernelBootstrap.update(

            deltaTime

        );


    }









    public static render():void {



        if(
            !EngineBridge.initialized
        )
            return;





        KernelBootstrap.render();


    }









    public static shutdown():void {



        if(
            !EngineBridge.initialized
        )
            return;





        EngineBridge.input?.shutdown();





        KernelBootstrap.shutdown();





        EngineBridge.input =
            null;





        EngineBridge.initialized =
            false;


    }









    // ------------------------------------------------
    // Input Bridge
    // Android -> TypeScript
    // ------------------------------------------------







    public static pointerDown(

        id:number,

        x:number,

        y:number,

        pressure:number = 1

    ):void {



        if(
            !EngineBridge.input
        )
            return;





        EngineBridge.input.pointerDown(

            id,

            x,

            y,

            pressure

        );


    }









    public static pointerMove(

        id:number,

        x:number,

        y:number,

        pressure:number = 1

    ):void {



        if(
            !EngineBridge.input
        )
            return;





        EngineBridge.input.pointerMove(

            id,

            x,

            y,

            pressure

        );


    }









    public static pointerUp(

        id:number,

        x:number,

        y:number

    ):void {



        if(
            !EngineBridge.input
        )
            return;





        EngineBridge.input.pointerUp(

            id,

            x,

            y

        );


    }









    // ------------------------------------------------
    // Camera Controls
    // ------------------------------------------------







    public static setInputMode(

        mode:InputMode

    ):void {


        EngineBridge.input?.setMode(
            mode
        );


    }







}