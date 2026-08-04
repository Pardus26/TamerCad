import { Mesh3 } from "./Mesh3";


export interface TransformData {

    matrix:number[];

}



export interface MeshBodyMetadata {

    material?:string;

    color?:string;

    layer?:string;

    [key:string]:any;

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
     * Geometry
     */
    public readonly mesh:Mesh3;



    /**
     * Visibility
     */
    public visible:boolean = true;



    /**
     * Locked state
     */
    public locked:boolean = false;



    /**
     * Selection
     */
    public selected:boolean = false;



    /**
     * CAD transform matrix
     */
    public transform:number[] = [

        1,0,0,0,

        0,1,0,0,

        0,0,1,0,

        0,0,0,1

    ];



    /**
     * Metadata
     */
    public metadata:

        MeshBodyMetadata = {};



    /**
     * History reference
     */
    public historyId:

        string | null = null;



    /**
     * Construction body flag
     */
    public construction:boolean = false;





    constructor(

        mesh:Mesh3,

        name:string = "MeshBody"

    ){


        this.mesh = mesh;


        this.name = name;


        this.id =

            MeshBody.generateId();


    }







    // ------------------------------------------------
    // Geometry Access
    // ------------------------------------------------


    public getVertexCount():

    number{


        return this.mesh.vertexCount();

    }






    public getTriangleCount():

    number{


        return this.mesh.triangleCount();

    }






    public getSurfaceArea():

    number{


        return this.mesh.surfaceArea();

    }






    public getVolume():

    number{


        return this.mesh.volume();

    }






    public getBoundingBox(){


        return this.mesh.boundingBox();

    }






    public getBoundingSphere(){


        return this.mesh.boundingSphere();

    }





    public centerOfMass(){


        return this.mesh.centerOfMass();

    }






    public isEmpty():

    boolean{


        return this.mesh.isEmpty();

    }






    // ------------------------------------------------
    // Visibility
    // ------------------------------------------------


    public setVisible(

        value:boolean

    ):void{


        this.visible = value;


    }






    public toggleVisibility():

    void{


        this.visible =

            !this.visible;


    }





    // ------------------------------------------------
    // Lock
    // ------------------------------------------------


    public lock():

    void{


        this.locked = true;


    }






    public unlock():

    void{


        this.locked = false;


    }






    public canEdit():

    boolean{


        return (

            !this.locked

        );

    }
    // ------------------------------------------------
    // Transform
    // ------------------------------------------------


    public setTransform(

        matrix:number[]

    ):void{


        if(matrix.length !== 16){

            throw new Error(

                "Transform matrix must be 4x4"

            );

        }


        this.transform = [

            ...matrix

        ];

    }





    public getTransform():

    number[]{


        return [

            ...this.transform

        ];

    }





    public resetTransform():

    void{


        this.transform = [

            1,0,0,0,

            0,1,0,0,

            0,0,1,0,

            0,0,0,1

        ];

    }





    // ------------------------------------------------
    // Selection
    // ------------------------------------------------


    public select():

    void{


        this.selected = true;


    }





    public deselect():

    void{


        this.selected = false;


    }





    public toggleSelection():

    void{


        this.selected =

            !this.selected;


    }





    // ------------------------------------------------
    // Clone
    // ------------------------------------------------


    public clone():

    MeshBody{


        const clone =

            new MeshBody(

                this.mesh.clone(),

                this.name

            );



        clone.visible =

            this.visible;



        clone.locked =

            this.locked;



        clone.selected =

            this.selected;



        clone.transform = [

            ...this.transform

        ];



        clone.metadata = {


            ...this.metadata


        };



        clone.historyId =

            this.historyId;



        clone.construction =

            this.construction;



        return clone;


    }





    // ------------------------------------------------
    // Serialization
    // ------------------------------------------------


    public toJSON(){

        return {


            id:

                this.id,


            name:

                this.name,


            visible:

                this.visible,


            locked:

                this.locked,


            selected:

                this.selected,


            construction:

                this.construction,


            transform:

                this.transform,


            metadata:

                this.metadata,


            historyId:

                this.historyId,


            mesh:

                this.mesh.toJSON()


        };


    }






    public static fromJSON(

        data:any

    ):

    MeshBody{


        const body =

            new MeshBody(

                Mesh3.fromJSON(

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



        body.construction =

            data.construction ?? false;



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



        body.historyId =

            data.historyId ?? null;



        return body;


    }







    // ------------------------------------------------
    // Debug
    // ------------------------------------------------


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



            area:

                this.getSurfaceArea(),



            volume:

                this.getVolume(),



            visible:

                this.visible,



            locked:

                this.locked,



            selected:

                this.selected


        };


    }






    // ------------------------------------------------
    // Dispose
    // ------------------------------------------------


    public dispose():

    void{


        this.mesh.clear();


        this.metadata = {};


        this.selected = false;


        this.visible = false;


    }







    // ------------------------------------------------
    // ID Generator
    // ------------------------------------------------


    private static generateId():

    string{


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