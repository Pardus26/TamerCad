import { Vector3 } from "../../math/vector/Vector3";
import { Matrix4 } from "../../math/matrix/Matrix4";


export interface Point3JSON {

    x:number;

    y:number;

    z:number;

}





export class Point3 {


    public x:number;

    public y:number;

    public z:number;



    constructor(

        x:number = 0,

        y:number = 0,

        z:number = 0

    ){

        this.x = x;

        this.y = y;

        this.z = z;

    }





    // ---------------------------------------
    // Factory
    // ---------------------------------------


    static origin():Point3 {

        return new Point3(
            0,
            0,
            0
        );

    }





    static fromVector(

        vector:Vector3

    ):Point3 {


        return new Point3(

            vector.x,

            vector.y,

            vector.z

        );

    }





    toVector():Vector3 {


        return new Vector3(

            this.x,

            this.y,

            this.z

        );

    }





    // ---------------------------------------
    // Arithmetic
    // ---------------------------------------


    public add(

        vector:Vector3

    ):Point3 {


        return new Point3(

            this.x + vector.x,

            this.y + vector.y,

            this.z + vector.z

        );

    }





    public subtract(

        point:Point3

    ):Vector3 {


        return new Vector3(

            this.x - point.x,

            this.y - point.y,

            this.z - point.z

        );

    }





    public translate(

        vector:Vector3

    ):void {


        this.x += vector.x;

        this.y += vector.y;

        this.z += vector.z;

    }





    public scale(

        factor:number

    ):Point3 {


        return new Point3(

            this.x * factor,

            this.y * factor,

            this.z * factor

        );

    }





    public lerp(

        point:Point3,

        t:number

    ):Point3 {


        return new Point3(

            this.x + (point.x-this.x)*t,

            this.y + (point.y-this.y)*t,

            this.z + (point.z-this.z)*t

        );

    }





    // ---------------------------------------
    // Distance
    // ---------------------------------------


    public distanceTo(

        point:Point3

    ):number {


        const dx =
            this.x-point.x;


        const dy =
            this.y-point.y;


        const dz =
            this.z-point.z;



        return Math.sqrt(

            dx*dx +

            dy*dy +

            dz*dz

        );

    }





    public distanceSquared(

        point:Point3

    ):number {


        const dx =
            this.x-point.x;


        const dy =
            this.y-point.y;


        const dz =
            this.z-point.z;



        return (

            dx*dx +

            dy*dy +

            dz*dz

        );

    }





    public midpoint(

        point:Point3

    ):Point3 {


        return new Point3(

            (this.x+point.x)*0.5,

            (this.y+point.y)*0.5,

            (this.z+point.z)*0.5

        );

    }





    // ---------------------------------------
    // Transform
    // ---------------------------------------


    public transform(

        matrix:Matrix4

    ):Point3 {


        const result =

            matrix.transformPoint(

                this

            );



        return new Point3(

            result.x,

            result.y,

            result.z

        );

    }





    public applyMatrix4(

        matrix:Matrix4

    ):void {


        const result =

            this.transform(matrix);



        this.x=result.x;

        this.y=result.y;

        this.z=result.z;

    }





    // ---------------------------------------
    // Compare
    // ---------------------------------------


    public equals(

        point:Point3,

        tolerance:number = 1e-6

    ):boolean {


        return (

            Math.abs(this.x-point.x)<=tolerance &&

            Math.abs(this.y-point.y)<=tolerance &&

            Math.abs(this.z-point.z)<=tolerance

        );

    }





    // ---------------------------------------
    // Clone
    // ---------------------------------------


    public clone():Point3 {


        return new Point3(

            this.x,

            this.y,

            this.z

        );

    }





    // ---------------------------------------
    // Serialization
    // ---------------------------------------


    public toJSON():Point3JSON {


        return {

            x:this.x,

            y:this.y,

            z:this.z

        };

    }





    static fromJSON(

        data:any

    ):Point3 {


        return new Point3(

            data.x ?? 0,

            data.y ?? 0,

            data.z ?? 0

        );

    }





    // ---------------------------------------
    // Debug
    // ---------------------------------------


    public toString():string {


        return (

            `Point3(`+

            `${this.x}, `+

            `${this.y}, `+

            `${this.z}`+

            `)`

        );

    }


}