// src/geometry/mesh/MeshBody.ts


import { Mesh } from "./Mesh";



export interface MeshBodyStatistics {

    vertices:number;

    triangles:number;

    surfaceArea:number;

    visible:boolean;

    locked:boolean;

}





export class MeshBody {





    /**
     * Unique body id
     */
    public readonly id:string;





    /**
     * Display name
     */
    public name:string;





    /**
     * Geometry mesh
     */
    public readonly mesh:Mesh;





    /**
     * Visibility
     */
    public visible:boolean = true;





    /**
     * Locked for editing
     */
    public locked:boolean = false;





    /**
     * Selected state
     */
    public selected:boolean = false;





    /**
     * Transform matrix
     *
     * column-major 4x4
     */
    public transform:number[] = [


        1,0,0,0,


        0,1,0,0,


        0,0,1,0,


        0,0,0,1


    ];





    /**
     * CAD metadata
     */
    public metadata:

        Record<string,any> = {};







    constructor(

        mesh:Mesh,

        name:string="MeshBody"

    ){


        this.mesh = mesh;


        this.name = name;


        this.id =

            MeshBody.generateId();


    }







    // ----------------------------------------
    // Geometry Queries
    // ----------------------------------------





    public getVertexCount():

    number {


        return this.mesh.vertexCount();


    }







    public getTriangleCount():

    number {


        return this.mesh.triangleCount();


    }







    public getSurfaceArea():

    number {


        return this.mesh.computeSurfaceArea();


    }







    public getBoundingBox(){


        return this.mesh.getBoundingBox();


    }







    public statistics():

    MeshBodyStatistics {


        return {


            vertices:

                this.getVertexCount(),



            triangles:

                this.getTriangleCount(),



            surfaceArea:

                this.getSurfaceArea(),



            visible:

                this.visible,



            locked:

                this.locked


        };


    }








    // ----------------------------------------
    // State
    // ----------------------------------------





    public setVisible(

        value:boolean

    ):void {


        this.visible=value;


    }







    public setLocked(

        value:boolean

    ):void {


        this.locked=value;


    }







    public select():

    void {


        this.selected=true;


    }







    public deselect():

    void {


        this.selected=false;


    }







    // ----------------------------------------
    // Clone
    // ----------------------------------------





    public clone():

    MeshBody {


        const body =

            new MeshBody(

                this.mesh.clone(),

                this.name

            );




        body.visible =

            this.visible;



        body.locked =

            this.locked;



        body.selected =

            this.selected;




        body.transform = [

            ...this.transform

        ];




        body.metadata = {

            ...this.metadata

        };




        return body;


    }







    // ----------------------------------------
    // Serialization
    // ----------------------------------------





    public toJSON(){


        return {


            id:this.id,


            name:this.name,


            visible:this.visible,


            locked:this.locked,


            selected:this.selected,


            transform:this.transform,


            metadata:this.metadata,


            mesh:this.mesh.toJSON()


        };


    }







    public static fromJSON(

        data:any

    ):MeshBody {


        const body =

            new MeshBody(

                Mesh.fromJSON(

                    data.mesh

                ),

                data.name

            );




        body.visible =

            data.visible ?? true;




        body.locked =

            data.locked ?? false;




        body.selected =

            data.selected ?? false;




        body.transform =

            data.transform ??

            [

                1,0,0,0,

                0,1,0,0,

                0,0,1,0,

                0,0,0,1

            ];




        body.metadata =

            data.metadata ?? {};




        return body;


    }







    // ----------------------------------------
    // Debug
    // ----------------------------------------





    public debugInfo(){


        return {


            type:

                "MeshBody",



            id:

                this.id,



            name:

                this.name,



            vertices:

                this.getVertexCount(),



            triangles:

                this.getTriangleCount(),



            selected:

                this.selected



        };


    }







    private static generateId():

    string {


        return (

            "body_" +

            Date.now() +

            "_" +

            Math.floor(

                Math.random()*1000000

            )

        );


    }




}