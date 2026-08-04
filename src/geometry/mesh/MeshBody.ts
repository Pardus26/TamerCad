import { Mesh3 } from "./Mesh3";


export interface MeshTransform {


    matrix:number[];


}



export interface MeshBodyData {


    id:string;

    name:string;

    visible:boolean;

    locked:boolean;

    selected:boolean;

    transform:number[];

    metadata:Record<string,any>;

    mesh:any;

}




export class MeshBody {



    public readonly id:string;


    public name:string;


    public readonly mesh:Mesh3;



    public visible:boolean = true;


    public locked:boolean = false;


    public selected:boolean = false;



    /**
     * 4x4 column major transform
     */
    public transform:number[] = [

        1,0,0,0,

        0,1,0,0,

        0,0,1,0,

        0,0,0,1

    ];



    public metadata:

        Record<string,any> = {};





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
    // Geometry Queries
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


        return this.mesh.area();


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





    public validate():

    boolean{


        return this.mesh.validate();


    }





    // ------------------------------------------------
    // State
    // ------------------------------------------------



    public setVisible(

        value:boolean

    ):void{


        this.visible=value;


    }





    public setLocked(

        value:boolean

    ):void{


        this.locked=value;


    }





    public select():

    void{


        this.selected=true;


    }





    public deselect():

    void{


        this.selected=false;


    }





    // ------------------------------------------------
    // Transform
    // ------------------------------------------------



    public setTransform(

        matrix:number[]

    ):void{


        if(

            matrix.length!==16

        ){

            throw new Error(

                "Transform matrix must have 16 values"

            );

        }



        this.transform=[

            ...matrix

        ];

    }





    public resetTransform():

    void{


        this.transform=[


            1,0,0,0,


            0,1,0,0,


            0,0,1,0,


            0,0,0,1


        ];

    }







    // ------------------------------------------------
    // Clone
    // ------------------------------------------------



    public clone():

    MeshBody{


        const body =

            new MeshBody(

                this.mesh.clone(),

                this.name

            );



        body.visible=this.visible;


        body.locked=this.locked;


        body.selected=this.selected;



        body.transform=[

            ...this.transform

        ];



        body.metadata={

            ...this.metadata

        };



        return body;


    }







    // ------------------------------------------------
    // Serialization
    // ------------------------------------------------



    public toJSON():

    MeshBodyData{


        return {


            id:this.id,


            name:this.name,


            visible:this.visible,


            locked:this.locked,


            selected:this.selected,


            transform:[

                ...this.transform

            ],


            metadata:this.metadata,


            mesh:this.mesh.toJSON()


        };


    }







    public static fromJSON(

        data:any

    ):

    MeshBody{


        const mesh =

            Mesh3.fromJSON(

                data.mesh

            );



        const body =

            new MeshBody(

                mesh,

                data.name

            );



        body.visible =

            data.visible ?? true;



        body.locked =

            data.locked ?? false;



        body.selected =

            data.selected ?? false;



        body.transform =

            data.transform

            ?

            [

                ...data.transform

            ]

            :

            body.transform;



        body.metadata =

            data.metadata ?? {};



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





    private static generateId():

    string{


        return (

            "body_" +

            Date.now()

            +

            "_"

            +

            Math.floor(

                Math.random()*1000000

            )

        );


    }



}