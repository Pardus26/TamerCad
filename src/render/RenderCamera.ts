

import { Vector3 } from "../math/vector/Vector3";
import { Matrix4 } from "../math/matrix/Matrix4";

export enum ProjectionType{

    Perspective,

    Orthographic

}

export enum StandardView{

    ISO,

    TOP,

    BOTTOM,

    FRONT,

    BACK,

    LEFT,

    RIGHT

}

export interface CameraRay{

    origin:Vector3;

    direction:Vector3;

}

export interface CameraState{

    position:Vector3;

    target:Vector3;

    up:Vector3;

    distance:number;

    yaw:number;

    pitch:number;

}

export class RenderCamera{

    private projection=

        ProjectionType.Perspective;

    private position=

        new Vector3(0,0,5);

    private target=

        new Vector3(0,0,0);

    private up=

        new Vector3(0,1,0);

    private yaw=0;

    private pitch=0;

    private distance=5;

    private width=1;

    private height=1;

    private fov=45;

    private near=0.01;

    private far=100000;

    private orthoHeight=10;

    private readonly minDistance=0.1;

    private readonly maxDistance=100000;
constructor(){

    this.updatePosition();

}

public setViewport(

    width:number,

    height:number

):void{

    this.width=

        Math.max(

            width,

            1

        );

    this.height=

        Math.max(

            height,

            1

        );

}

public setPerspective(

    fov:number,

    near:number,

    far:number

):void{

    this.projection=

        ProjectionType.Perspective;

    this.fov=fov;

    this.near=near;

    this.far=far;

}

public setOrthographic(

    height:number,

    near:number,

    far:number

):void{

    this.projection=

        ProjectionType.Orthographic;

    this.orthoHeight=height;

    this.near=near;

    this.far=far;

}

public lookAt(

    eye:Vector3,

    target:Vector3,

    up=new Vector3(

        0,

        1,

        0

    )

):void{

    this.position=eye;

    this.target=target;

    this.up=up;

    this.distance=

        eye

        .subtract(

            target

        )

        .length();

}

private updatePosition():void{

    const cp=

        Math.cos(

            this.pitch

        );

    const sp=

        Math.sin(

            this.pitch

        );

    const cy=

        Math.cos(

            this.yaw

        );

    const sy=

        Math.sin(

            this.yaw

        );

    this.position.x=

        this.target.x+

        this.distance*

        cp*

        sy;

    this.position.y=

        this.target.y+

        this.distance*

        sp;

    this.position.z=

        this.target.z+

        this.distance*

        cp*

        cy;

}

public reset():void{

    this.target.set(

        0,

        0,

        0

    );

    this.distance=5;

    this.pitch=0;

    this.yaw=0;

    this.up.set(

        0,

        1,

        0

    );

    this.updatePosition();

}

public orbit(

    deltaX:number,

    deltaY:number

):void{


    const rotationSpeed=

        0.005;


    this.yaw +=

        deltaX *

        rotationSpeed;


    this.pitch +=

        deltaY *

        rotationSpeed;


    const limit=

        Math.PI * 0.49;


    if(

        this.pitch > limit

    ){

        this.pitch = limit;

    }


    if(

        this.pitch < -limit

    ){

        this.pitch = -limit;

    }


    this.updatePosition();

}

public pan(

    deltaX:number,

    deltaY:number

):void{


    const speed=

        this.distance *

        0.001;


    const right =

        new Vector3(

            Math.cos(this.yaw),

            0,

            -Math.sin(this.yaw)

        );


    const moveX=

        right.multiply(

            deltaX * speed

        );


    const moveY=

        this.up.multiply(

            deltaY * speed

        );


    this.target =

        this.target

        .add(

            moveX

        )

        .add(

            moveY

        );


    this.updatePosition();

}

public zoom(

    amount:number

):void{


    const zoomSpeed=

        0.1;


    this.distance *=

        1 -

        amount *

        zoomSpeed;


    if(

        this.distance <

        this.minDistance

    ){

        this.distance=

            this.minDistance;

    }


    if(

        this.distance >

        this.maxDistance

    ){

        this.distance=

            this.maxDistance;

    }


    this.updatePosition();

}

public dolly(

    amount:number

):void{


    const direction=

        this.target

        .subtract(

            this.position

        )

        .normalize();


    this.position=

        this.position

        .add(

            direction.multiply(

                amount

            )

        );


    this.distance=

        this.position

        .subtract(

            this.target

        )

        .length();

}

public truck(

    amount:number

):void{


    const right=

        new Vector3(

            Math.cos(this.yaw),

            0,

            -Math.sin(this.yaw)

        );


    this.target=

        this.target

        .add(

            right.multiply(

                amount

            )

        );


    this.updatePosition();

}

public pedestal(

    amount:number

):void{


    this.target=

        this.target

        .add(

            this.up.multiply(

                amount

            )

        );


    this.updatePosition();

}

public fitAll(

    boundsMin:Vector3,

    boundsMax:Vector3

):void{


    const center =

        new Vector3(

            (boundsMin.x + boundsMax.x) * 0.5,

            (boundsMin.y + boundsMax.y) * 0.5,

            (boundsMin.z + boundsMax.z) * 0.5

        );


    const size =

        new Vector3(

            boundsMax.x - boundsMin.x,

            boundsMax.y - boundsMin.y,

            boundsMax.z - boundsMin.z

        );


    const radius =

        size.length() * 0.5;


    this.target = center;


    if(

        this.projection ===

        ProjectionType.Perspective

    ){

        const fovRad=

            this.fov *

            Math.PI /

            180;


        this.distance=

            radius /

            Math.sin(

                fovRad * 0.5

            );


    }

    else{

        this.orthoHeight=

            radius * 2;

    }


    this.updatePosition();

}

public fitSelection(

    boundsMin:Vector3,

    boundsMax:Vector3

):void{


    this.fitAll(

        boundsMin,

        boundsMax

    );

}

public topView():void{


    this.position=

        new Vector3(

            0,

            this.distance,

            0

        );


    this.target=

        new Vector3(

            0,

            0,

            0

        );


    this.up=

        new Vector3(

            0,

            0,

            -1

        );


}

public bottomView():void{


    this.position=

        new Vector3(

            0,

            -this.distance,

            0

        );


    this.target=

        new Vector3(

            0,

            0,

            0

        );


    this.up=

        new Vector3(

            0,

            0,

            1

        );


}

public frontView():void{


    this.position=

        new Vector3(

            0,

            0,

            this.distance

        );


    this.target=

        new Vector3(

            0,

            0,

            0

        );


    this.up=

        new Vector3(

            0,

            1,

            0

        );


}

public backView():void{


    this.position=

        new Vector3(

            0,

            0,

            -this.distance

        );


    this.target=

        new Vector3(

            0,

            0,

            0

        );


}

public rightView():void{


    this.position=

        new Vector3(

            this.distance,

            0,

            0

        );


    this.target=

        new Vector3(

            0,

            0,

            0

        );


    this.up=

        new Vector3(

            0,

            1,

            0

        );


}

public leftView():void{


    this.position=

        new Vector3(

            -this.distance,

            0,

            0

        );


    this.target=

        new Vector3(

            0,

            0,

            0

        );


}

public isoView():void{


    const angle=

        Math.PI / 4;


    const height=

        Math.PI / 6;


    this.yaw=

        angle;


    this.pitch=

        height;


    this.distance=

        10;


    this.target=

        new Vector3(

            0,

            0,

            0

        );


    this.up=

        new Vector3(

            0,

            1,

            0

        );


    this.updatePosition();

}

public getViewMatrix():Matrix4{


    return Matrix4.lookAt(

        this.position,

        this.target,

        this.up

    );

}

public getProjectionMatrix():Matrix4{


    const aspect=

        this.getAspectRatio();


    if(

        this.projection ===

        ProjectionType.Perspective

    ){

        return Matrix4.perspective(

            this.fov *

            Math.PI /

            180,

            aspect,

            this.near,

            this.far

        );

    }


    const half=

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

public getAspectRatio():number{


    return (

        this.width /

        this.height

    );

}

public saveState():CameraState{


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

public restoreState(

    state:CameraState

):void{


    this.position=

        state.position.clone();


    this.target=

        state.target.clone();


    this.up=

        state.up.clone();


    this.distance=

        state.distance;


    this.yaw=

        state.yaw;


    this.pitch=

        state.pitch;


    this.updatePosition();

}

public worldToScreen(

    world:Vector3

):Vector3{


    const view =

        this.getViewMatrix();


    const projection =

        this.getProjectionMatrix();


    const clip =

        projection

        .multiply(

            view

        )

        .transformVector(

            world.x,

            world.y,

            world.z

        );


    const ndcX=

        clip.x;


    const ndcY=

        clip.y;


    return new Vector3(

        (

            ndcX + 1

        ) *

        0.5 *

        this.width,


        (

            1 - ndcY

        ) *

        0.5 *

        this.height,


        clip.z

    );

}

public screenToWorld(

    x:number,

    y:number,

    depth:number = 0

):Vector3{


    const ndcX=

        (

            x /

            this.width

        ) * 2 - 1;


    const ndcY=

        1 -

        (

            y /

            this.height

        ) * 2;


    const inverse =

        this.getProjectionMatrix()

        .multiply(

            this.getViewMatrix()

        );


    const point =

        inverse.transformVector(

            ndcX,

            ndcY,

            depth

        );


    return new Vector3(

        point.x,

        point.y,

        point.z

    );

}

public pickRay(

    screenX:number,

    screenY:number

):CameraRay{


    const near =

        this.screenToWorld(

            screenX,

            screenY,

            -1

        );


    const far =

        this.screenToWorld(

            screenX,

            screenY,

            1

        );


    const direction =

        far

        .subtract(

            near

        )

        .normalize();


    return {

        origin:

            near,


        direction:

            direction

    };

}

public rayPoint(

    ray:CameraRay,

    distance:number

):Vector3{


    return ray.origin.add(

        ray.direction.multiply(

            distance

        )

    );

}

public getForward():Vector3{


    return this.target

        .subtract(

            this.position

        )

        .normalize();

}

public getRight():Vector3{


    return this.getForward()

        .cross(

            this.up

        )

        .normalize();

}

public getCameraUp():Vector3{


    return this.getRight()

        .cross(

            this.getForward()

        )

        .normalize();

}

private pivot = new Vector3(

    0,

    0,

    0

);


public setPivot(

    point:Vector3

):void{


    this.pivot=

        point.clone();

}

public orbitAroundPoint(

    deltaX:number,

    deltaY:number,

    pivot:Vector3

):void{


    this.setPivot(

        pivot

    );


    this.yaw +=

        deltaX *

        0.005;


    this.pitch +=

        deltaY *

        0.005;



    const limit=

        Math.PI *

        0.49;


    this.pitch=

        Math.max(

            -limit,

            Math.min(

                limit,

                this.pitch

            )

        );


    const offset=

        this.position

        .subtract(

            pivot

        );


    const radius=

        offset.length();


    this.distance=

        radius;


    this.target=

        pivot.clone();


    this.updatePosition();

}

public rotateAroundSelection(

    boundsMin:Vector3,

    boundsMax:Vector3,

    dx:number,

    dy:number

):void{


    const center=

        new Vector3(

            (

                boundsMin.x+

                boundsMax.x

            )*0.5,


            (

                boundsMin.y+

                boundsMax.y

            )*0.5,


            (

                boundsMin.z+

                boundsMax.z

            )*0.5

        );


    this.orbitAroundPoint(

        dx,

        dy,

        center

    );

}

public smoothTransition(

    targetPosition:Vector3,

    targetLook:Vector3,

    speed:number = 0.1

):void{


    this.position=

        this.position

        .add(

            targetPosition

            .subtract(

                this.position

            )

            .multiply(

                speed

            )

        );


    this.target=

        this.target

        .add(

            targetLook

            .subtract(

                this.target

            )

            .multiply(

                speed

            )

        );

}

public animateToView(

    view:StandardView

):void{


    switch(view){


        case StandardView.TOP:

            this.topView();

            break;


        case StandardView.FRONT:

            this.frontView();

            break;


        case StandardView.RIGHT:

            this.rightView();

            break;


        case StandardView.ISO:

            this.isoView();

            break;


    }

}

public getDistance():number{


    return this.distance;

}

public getPosition():Vector3{


    return this.position.clone();

}

public getTarget():Vector3{


    return this.target.clone();

}

public clone():Camera{


    const camera=

        new Camera();


    camera.projection=

        this.projection;


    camera.position=

        this.position.clone();


    camera.target=

        this.target.clone();


    camera.up=

        this.up.clone();


    camera.yaw=

        this.yaw;


    camera.pitch=

        this.pitch;


    camera.distance=

        this.distance;


    camera.width=

        this.width;


    camera.height=

        this.height;


    camera.fov=

        this.fov;


    camera.near=

        this.near;


    camera.far=

        this.far;


    camera.orthoHeight=

        this.orthoHeight;


    camera.pivot=

        this.pivot.clone();


    return camera;

}

public toJSON(){

    return {


        projection:

            this.projection,


        position:

            this.position,


        target:

            this.target,


        up:

            this.up,


        yaw:

            this.yaw,


        pitch:

            this.pitch,


        distance:

            this.distance,


        width:

            this.width,


        height:

            this.height,


        fov:

            this.fov,


        near:

            this.near,


        far:

            this.far,


        orthoHeight:

            this.orthoHeight


    };

}

public fromJSON(

    data:any

):void{


    this.projection=

        data.projection;


    this.position=

        new Vector3(

            data.position.x,

            data.position.y,

            data.position.z

        );


    this.target=

        new Vector3(

            data.target.x,

            data.target.y,

            data.target.z

        );


    this.up=

        new Vector3(

            data.up.x,

            data.up.y,

            data.up.z

        );


    this.yaw=

        data.yaw;


    this.pitch=

        data.pitch;


    this.distance=

        data.distance;


    this.width=

        data.width;


    this.height=

        data.height;


    this.fov=

        data.fov;


    this.near=

        data.near;


    this.far=

        data.far;


    this.orthoHeight=

        data.orthoHeight;


    this.updatePosition();

}

public serialize():string{


    return JSON.stringify(

        this.toJSON()

    );

}

public deserialize(

    json:string

):void{


    const data=

        JSON.parse(

            json

        );


    this.fromJSON(

        data

    );

}

public getProjection():

ProjectionType{


    return this.projection;

}

public dispose():void{


    this.position=

        new Vector3();


    this.target=

        new Vector3();


    this.up=

        new Vector3(

            0,

            1,

            0

        );


    this.distance=0;


}

