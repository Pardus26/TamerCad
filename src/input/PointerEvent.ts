// src/input/PointerEvent.ts


export enum PointerType {

    Mouse = "mouse",

    Stylus = "stylus",

    Touch = "touch"
}



export enum PointerAction {

    Down = "down",

    Move = "move",

    Up = "up"
}



export interface PointerPosition {

    x: number;

    y: number;
}



export interface PointerData {


    /**
     * Pointer türü
     */
    type: PointerType;



    /**
     * Olay tipi
     */
    action: PointerAction;



    /**
     * Ekran koordinatı
     */
    position: PointerPosition;



    /**
     * Kalem basıncı
     *
     * 0.0 - 1.0
     */
    pressure: number;



    /**
     * Kalem eğimi
     *
     * Tablet destekliyorsa
     */
    tiltX?: number;

    tiltY?: number;



    /**
     * Zaman bilgisi
     */
    timestamp: number;
}



export class PointerEvent {


    public readonly type: PointerType;


    public readonly action: PointerAction;


    public readonly position: PointerPosition;


    public readonly pressure: number;


    public readonly tiltX?: number;


    public readonly tiltY?: number;


    public readonly timestamp: number;



    constructor(
        data: PointerData
    ){

        this.type =
            data.type;


        this.action =
            data.action;


        this.position =
            data.position;


        this.pressure =
            data.pressure ?? 1.0;


        this.tiltX =
            data.tiltX;


        this.tiltY =
            data.tiltY;


        this.timestamp =
            data.timestamp;
    }



    public isStylus(): boolean {

        return (
            this.type === PointerType.Stylus
        );
    }



    public isDown(): boolean {

        return (
            this.action === PointerAction.Down
        );
    }



    public isMove(): boolean {

        return (
            this.action === PointerAction.Move
        );
    }



    public isUp(): boolean {

        return (
            this.action === PointerAction.Up
        );
    }
}