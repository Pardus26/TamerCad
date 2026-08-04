// src/geometry/mesh/MeshTriangle.ts


import { MeshVertex } from "./MeshVertex";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";



export interface MeshTriangleJSON {

    id:number;

    vertices:number[];

    normalIndex:number | null;

    materialIndex:number | null;

}





export class MeshTriangle {



    /**
     * Triangle id
     */
    public readonly id:number;



    /**
     * Vertex indices
     */
    public v1:number;

    public v2:number;

    public v3:number;



    /**
     * Normal reference
     */
    public normalIndex:number | null = null;



    /**
     * Material reference
     */
    public materialIndex:number | null = null;







    constructor(

        id:number,

        v1:number,

        v2:number,

        v3:number

    ){

        this.id=id;

        this.v1=v1;

        this.v2=v2;

        this.v3=v3;

    }







    // -----------------------------------------
    // Vertex Access
    // -----------------------------------------


    public getVertexIndices():

    number[] {


        return [

            this.v1,

            this.v2,

            this.v3

        ];

    }





    public containsVertex(

        index:number

    ):boolean {


        return (

            this.v1===index ||

            this.v2===index ||

            this.v3===index

        );

    }





    public replaceVertex(

        oldIndex:number,

        newIndex:number

    ):void {


        if(this.v1===oldIndex)

            this.v1=newIndex;


        if(this.v2===oldIndex)

            this.v2=newIndex;


        if(this.v3===oldIndex)

            this.v3=newIndex;


    }







    // -----------------------------------------
    // Geometry
    // -----------------------------------------


    public computeArea(

        vertices:MeshVertex[]

    ):number {


        const a =
            vertices[this.v1]
            .position;


        const b =
            vertices[this.v2]
            .position;


        const c =
            vertices[this.v3]
            .position;



        return (

            b.subtract(a)

            .cross(

                c.subtract(a)

            )

            .length()

            *

            0.5

        );


    }







    public computeNormal(

        vertices:MeshVertex[]

    ):Vector3 {


        const a =
            vertices[this.v1]
            .position;


        const b =
            vertices[this.v2]
            .position;


        const c =
            vertices[this.v3]
            .position;



        return (

            b.subtract(a)

            .cross(

                c.subtract(a)

            )

            .normalize()

        );


    }







    public center(

        vertices:MeshVertex[]

    ):Point3 {


        const a =
            vertices[this.v1]
            .position;


        const b =
            vertices[this.v2]
            .position;


        const c =
            vertices[this.v3]
            .position;



        return new Point3(

            (a.x+b.x+c.x)/3,

            (a.y+b.y+c.y)/3,

            (a.z+b.z+c.z)/3

        );


    }







    // -----------------------------------------
    // Validation
    // -----------------------------------------


    public isDegenerate():

    boolean {


        return (

            this.v1===this.v2 ||

            this.v2===this.v3 ||

            this.v3===this.v1

        );

    }





    public isValid(

        vertexCount:number

    ):boolean {


        return (

            !this.isDegenerate() &&

            this.v1>=0 &&

            this.v2>=0 &&

            this.v3>=0 &&

            this.v1<vertexCount &&

            this.v2<vertexCount &&

            this.v3<vertexCount

        );

    }







    // -----------------------------------------
    // Orientation
    // -----------------------------------------


    public reverse():

    void {


        const temp=this.v2;


        this.v2=this.v3;


        this.v3=temp;


    }







    // -----------------------------------------
    // Clone
    // -----------------------------------------


    public clone():

    MeshTriangle {


        const triangle =

            new MeshTriangle(

                this.id,

                this.v1,

                this.v2,

                this.v3

            );



        triangle.normalIndex =

            this.normalIndex;



        triangle.materialIndex =

            this.materialIndex;



        return triangle;


    }







    // -----------------------------------------
    // Serialization
    // -----------------------------------------


    public toJSON():

    MeshTriangleJSON {


        return {


            id:this.id,


            vertices:[

                this.v1,

                this.v2,

                this.v3

            ],


            normalIndex:

                this.normalIndex,


            materialIndex:

                this.materialIndex


        };


    }







    public static fromJSON(

        data:any

    ):

    MeshTriangle {


        const triangle =

            new MeshTriangle(

                data.id,

                data.vertices[0],

                data.vertices[1],

                data.vertices[2]

            );



        triangle.normalIndex =

            data.normalIndex ?? null;



        triangle.materialIndex =

            data.materialIndex ?? null;



        return triangle;


    }







    public toString():

    string {


        return (

            `Triangle(${this.id}) `+

            `[${this.v1},${this.v2},${this.v3}]`

        );


    }



}