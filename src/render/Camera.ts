import { Point3 } from "../geometry/primitives/Point3";

export enum ProjectionType {

    Perspective = "Perspective",

    Orthographic = "Orthographic"

}

export class Camera {

    // --------------------------------------------------
    // Projection
    // --------------------------------------------------

    public projection: ProjectionType =
        ProjectionType.Perspective;

    // --------------------------------------------------
    // Camera
    // --------------------------------------------------

    public position =
        new Point3(0, 0, 10);

    public target =
        new Point3(0, 0, 0);

    public up =
        new Point3(0, 1, 0);

    // --------------------------------------------------
    // Cached orientation
    // --------------------------------------------------

    private forward =
        new Point3(0, 0, -1);

    private right =
        new Point3(1, 0, 0);

    // --------------------------------------------------
    // Perspective
    // --------------------------------------------------

    public fov = 45;

    public near = 0.01;

    public far = 100000;

    // --------------------------------------------------
    // Orthographic
    // --------------------------------------------------

    public orthoHeight = 10;

    public aspect = 1;

    constructor() {

        this.updateVectors();

    }

    // --------------------------------------------------
    // Projection
    // --------------------------------------------------

    public setPerspective(

        fov: number,

        aspect: number,

        near: number,

        far: number

    ): void {

        this.projection =
            ProjectionType.Perspective;

        this.fov = fov;

        this.aspect = aspect;

        this.near = near;

        this.far = far;

    }

    public setOrthographic(

        height: number,

        aspect: number,

        near: number,

        far: number

    ): void {

        this.projection =
            ProjectionType.Orthographic;

        this.orthoHeight =
            height;

        this.aspect =
            aspect;

        this.near =
            near;

        this.far =
            far;

    }

    // --------------------------------------------------
    // View
    // --------------------------------------------------

    public lookAt(

        eye: Point3,

        target: Point3,

        up: Point3 = new Point3(0,1,0)

    ): void {

        this.position = eye;

        this.target = target;

        this.up = up;

        this.updateVectors();

    }

    // --------------------------------------------------
    // Translation
    // --------------------------------------------------

    public translate(

        dx:number,

        dy:number,

        dz:number

    ): void {

        this.position = new Point3(

            this.position.x + dx,

            this.position.y + dy,

            this.position.z + dz

        );

        this.target = new Point3(

            this.target.x + dx,

            this.target.y + dy,

            this.target.z + dz

        );

        this.updateVectors();

    }

    // --------------------------------------------------
    // Zoom
    // --------------------------------------------------

    public zoom(

        factor:number

    ):void{

        if(

            this.projection===

            ProjectionType.Perspective

        ){

            const dx=

                this.target.x-

                this.position.x;

            const dy=

                this.target.y-

                this.position.y;

            const dz=

                this.target.z-

                this.position.z;

            this.position=new Point3(

                this.position.x+

                dx*factor,

                this.position.y+

                dy*factor,

                this.position.z+

                dz*factor

            );

        }

        else{

            this.orthoHeight*=factor;

        }

        this.updateVectors();

    }

    // --------------------------------------------------
    // Orientation
    // --------------------------------------------------

    private updateVectors():void{

        const dx=

            this.target.x-

            this.position.x;

        const dy=

            this.target.y-

            this.position.y;

        const dz=

            this.target.z-

            this.position.z;

        const length=Math.sqrt(

            dx*dx+

            dy*dy+

            dz*dz

        )||1;

        this.forward=new Point3(

            dx/length,

            dy/length,

            dz/length

        );

        const rx=

            this.forward.y*

            this.up.z-

            this.forward.z*

            this.up.y;

        const ry=

            this.forward.z*

            this.up.x-

            this.forward.x*

            this.up.z;

        const rz=

            this.forward.x*

            this.up.y-

            this.forward.y*

            this.up.x;

        const rl=Math.sqrt(

            rx*rx+

            ry*ry+

            rz*rz

        )||1;

        this.right=new Point3(

            rx/rl,

            ry/rl,

            rz/rl

        );

    }

    // --------------------------------------------------
    // Getters
    // --------------------------------------------------

    public getForward():Point3{

        return this.forward;

    }

    public getRight():Point3{

        return this.right;

    }

    public getUp():Point3{

        return this.up;

    }

    public getPosition():Point3{

        return this.position;

    }

    public getTarget():Point3{

        return this.target;

    }

    // --------------------------------------------------
    // Matrix placeholders
    // --------------------------------------------------

    public getViewMatrix():number[]{

        return [

            1,0,0,0,

            0,1,0,0,

            0,0,1,0,

            0,0,0,1

        ];

    }

    public getProjectionMatrix():number[]{

        return [

            1,0,0,0,

            0,1,0,0,

            0,0,1,0,

            0,0,0,1

        ];

    }

}