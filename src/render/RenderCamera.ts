import { Vector3 } from "../math/vector/Vector3";
import { Matrix4 } from "../math/matrix/Matrix4";


export enum ProjectionType {

    Perspective,

    Orthographic

}



export enum StandardView {

    ISO,

    TOP,

    BOTTOM,

    FRONT,

    BACK,

    LEFT,

    RIGHT

}



export interface CameraRay {

    origin: Vector3;

    direction: Vector3;

}



export interface CameraState {

    position: Vector3;

    target: Vector3;

    up: Vector3;

    distance: number;

    yaw: number;

    pitch: number;

}



export class RenderCamera {


    private projection =
        ProjectionType.Perspective;



    private position =
        new Vector3(
            0,
            0,
            10
        );



    private target =
        new Vector3(
            0,
            0,
            0
        );



    private up =
        new Vector3(
            0,
            1,
            0
        );



    private width = 1;

    private height = 1;



    private fov =

        45 *
        Math.PI /
        180;



    private near =

        0.01;



    private far =

        100000;



    private orthoHeight =

        10;



    private distance =

        10;



    private yaw = 0;

    private pitch = 0;



    constructor(){

        this.updateOrbitPosition();

    }



    // --------------------------------------------------
    // Viewport
    // --------------------------------------------------


    setViewport(

        width:number,

        height:number

    ):void{


        this.width =
            Math.max(
                width,
                1
            );


        this.height =
            Math.max(
                height,
                1
            );


    }



    getAspectRatio():number{

        return (

            this.width /

            this.height

        );

    }



    // --------------------------------------------------
    // Projection
    // --------------------------------------------------


    setPerspective(

        fov:number,

        near:number,

        far:number

    ):void{


        this.projection =
            ProjectionType.Perspective;


        this.fov =
            fov *
            Math.PI /
            180;


        this.near =
            near;


        this.far =
            far;


    }




    setOrthographic(

        height:number,

        near:number,

        far:number

    ):void{


        this.projection =
            ProjectionType.Orthographic;


        this.orthoHeight =
            height;


        this.near =
            near;


        this.far =
            far;


    }



    getProjection():

        ProjectionType{


        return this.projection;

    }




    // --------------------------------------------------
    // Transform
    // --------------------------------------------------


    lookAt(

        position:Vector3,

        target:Vector3,

        up =
            new Vector3(
                0,
                1,
                0
            )

    ):void{


        this.position =
            position.clone();


        this.target =
            target.clone();


        this.up =
            up.clone();


        this.distance =

            this.position

            .subtract(

                this.target

            )

            .length();


    }




    private updateOrbitPosition():

        void{


        const cp =
            Math.cos(
                this.pitch
            );


        const sp =
            Math.sin(
                this.pitch
            );


        const cy =
            Math.cos(
                this.yaw
            );


        const sy =
            Math.sin(
                this.yaw
            );


        this.position.x =

            this.target.x +

            this.distance *

            cp *

            sy;



        this.position.y =

            this.target.y +

            this.distance *

            sp;



        this.position.z =

            this.target.z +

            this.distance *

            cp *

            cy;


    }



    // --------------------------------------------------
    // Matrices
    // --------------------------------------------------


    getViewMatrix():

        Matrix4{


        return Matrix4.lookAt(

            this.position,

            this.target,

            this.up

        );

    }





    getProjectionMatrix():

        Matrix4{


        const aspect =

            this.getAspectRatio();



        if(

            this.projection ===

            ProjectionType.Perspective

        ){


            return Matrix4.perspective(

                this.fov,

                aspect,

                this.near,

                this.far

            );

        }



        const half =

            this.orthoHeight *

            0.5;



        return Matrix4.orthographic(

            -half * aspect,

            half * aspect,

            -half,

            half,

            this.near,

            this.far

        );


    }




    // --------------------------------------------------
    // Picking
    // --------------------------------------------------


    worldToScreen(

        world:Vector3

    ):Vector3{


        const vp =

            this.getProjectionMatrix()

            .multiply(

                this.getViewMatrix()

            );


        const clip =

            vp.transformPoint(

                world

            );



        return new Vector3(

            (clip.x + 1) *

            0.5 *

            this.width,


            (1 - clip.y) *

            0.5 *

            this.height,


            clip.z

        );


    }




    screenToWorld(

        x:number,

        y:number,

        depth:number

    ):Vector3{


        const ndcX =

            x /

            this.width *

            2 -

            1;



        const ndcY =

            1 -

            y /

            this.height *

            2;



        const inverse =


            this.getProjectionMatrix()

            .multiply(

                this.getViewMatrix()

            )

            .inverse();



        return inverse.transformPoint(

            new Vector3(

                ndcX,

                ndcY,

                depth

            )

        );


    }





    pickRay(

        x:number,

        y:number

    ):CameraRay{


        const near =

            this.screenToWorld(

                x,

                y,

                -1

            );



        const far =

            this.screenToWorld(

                x,

                y,

                1

            );



        return {


            origin:

                near,


            direction:

                far

                .subtract(

                    near

                )

                .normalize()


        };


    }




    // --------------------------------------------------
    // CAD Views
    // --------------------------------------------------


    topView():void{


        this.lookAt(

            new Vector3(

                0,

                this.distance,

                0

            ),

            new Vector3()

        );


        this.up =

            new Vector3(

                0,

                0,

                -1

            );


    }




    frontView():void{


        this.lookAt(

            new Vector3(

                0,

                0,

                this.distance

            ),

            new Vector3()

        );


    }





    rightView():void{


        this.lookAt(

            new Vector3(

                this.distance,

                0,

                0

            ),

            new Vector3()

        );


    }





    isoView():void{


        this.yaw =

            Math.PI / 4;



        this.pitch =

            Math.PI / 6;



        this.distance =

            10;



        this.updateOrbitPosition();


    }




    fitBounds(

        min:Vector3,

        max:Vector3

    ):void{


        const center =

            new Vector3(

                (min.x+max.x)*0.5,

                (min.y+max.y)*0.5,

                (min.z+max.z)*0.5

            );



        const size =

            new Vector3(

                max.x-min.x,

                max.y-min.y,

                max.z-min.z

            );



        const radius =

            size.length()*0.5;



        this.target =

            center;



        if(

            this.projection ===

            ProjectionType.Perspective

        ){


            this.distance =

                radius /

                Math.sin(

                    this.fov*0.5

                );


        }

        else{


            this.orthoHeight =

                radius*2;


        }



        this.updateOrbitPosition();


    }




    // --------------------------------------------------
    // Access
    // --------------------------------------------------


    getPosition():

        Vector3{


        return this.position.clone();

    }



    getTarget():

        Vector3{


        return this.target.clone();

    }




    getForward():

        Vector3{


        return this.target

            .subtract(

                this.position

            )

            .normalize();


    }




    getRight():

        Vector3{


        return this.getForward()

            .cross(

                this.up

            )

            .normalize();


    }




    saveState():

        CameraState{


        return {


            position:

                this.position.clone(),


            target:

                this.target.clone(),


            up:

                this.up.clone(),


            distance:

                this.distance,


            yaw:

                this.yaw,


            pitch:

                this.pitch


        };


    }




    restoreState(

        state:CameraState

    ):void{


        this.position =
            state.position.clone();


        this.target =
            state.target.clone();


        this.up =
            state.up.clone();


        this.distance =
            state.distance;


        this.yaw =
            state.yaw;


        this.pitch =
            state.pitch;


    }




    dispose():void{


        this.position.set(

            0,

            0,

            0

        );


        this.target.set(

            0,

            0,

            0

        );


    }


}