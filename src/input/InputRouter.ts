// src/input/InputRouter.ts


import {
    PointerEvent,
    PointerAction
} from "./PointerEvent";


import {
    GestureEvent
} from "./GestureRecognizer";





export enum InputMode {


    /**
     * Kamera görüntüleme modu
     */
    View = "view",



    /**
     * Sketch çizim modu
     */
    Sketch = "sketch",



    /**
     * Seçim modu
     */
    Selection = "selection",



    /**
     * Feature düzenleme
     */
    FeatureEdit = "feature-edit",



    /**
     * Assembly hareket modu
     */
    Assembly = "assembly"

}








export interface InputHandler {



    onPointerDown?(
        event: PointerEvent
    ): void;




    onPointerMove?(
        event: PointerEvent
    ): void;




    onPointerUp?(
        event: PointerEvent
    ): void;




    /**
     * Gesture olayları
     *
     * Pan
     * Pinch
     * Rotate
     * DoubleTap
     */
    onGesture?(
        event: GestureEvent
    ): void;


}










export class InputRouter {



    private mode:
        InputMode =
        InputMode.View;



    private handlers:
        Map<InputMode, InputHandler>
        =
        new Map();










    /**
     * Aktif çalışma modunu değiştirir
     */
    public setMode(
        mode: InputMode
    ): void {


        this.mode = mode;

    }









    /**
     * Aktif modu döndürür
     */
    public getMode():
        InputMode {


        return this.mode;

    }









    /**
     * Input handler kayıt eder
     */
    public register(
        mode: InputMode,
        handler: InputHandler
    ): void {


        this.handlers.set(
            mode,
            handler
        );

    }









    /**
     * Handler kaldırır
     */
    public remove(
        mode: InputMode
    ): void {


        this.handlers.delete(
            mode
        );

    }









    /**
     * Pointer olaylarını yönlendirir
     */
    public route(
        event: PointerEvent
    ): void {



        const handler =
            this.handlers.get(
                this.mode
            );



        if (!handler) {

            return;

        }






        switch (
            event.action
        ) {



            case PointerAction.Down:


                handler.onPointerDown?.(
                    event
                );

                break;





            case PointerAction.Move:


                handler.onPointerMove?.(
                    event
                );

                break;





            case PointerAction.Up:


                handler.onPointerUp?.(
                    event
                );

                break;

        }

    }









    /**
     * Gesture olaylarını yönlendirir
     *
     * Tablet:
     *
     * iki parmak pan
     * pinch zoom
     * rotate
     * double tap
     *
     */
    public routeGesture(
        event: GestureEvent
    ): void {



        const handler =
            this.handlers.get(
                this.mode
            );



        if (!handler) {

            return;

        }






        handler.onGesture?.(
            event
        );

    }









    /**
     * Aktif handler var mı?
     */
    public hasHandler():
        boolean {


        return this.handlers.has(
            this.mode
        );

    }









    /**
     * Tüm handlerları temizler
     */
    public clear(): void {


        this.handlers.clear();

    }



}