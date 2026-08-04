import { Mesh } from "./Mesh";


/**
 * Mesh tabanlı CAD gövdesi
 *
 * Shapr3D benzeri modelleme için temel obje.
 *
 * Mesh
 *  |
 * MeshBody
 *  |
 * Feature / History / Renderer
 *
 */
export class MeshBody {


    /**
     * Benzersiz ID
     */
    public readonly id:string;



    /**
     * Kullanıcı görünen isim
     */
    public name:string;



    /**
     * Geometri verisi
     */
    public readonly mesh:Mesh;



    /**
     * Görünürlük
     */
    public visible:boolean = true;



    /**
     * Kilit durumu
     *
     * Tablet kalem ile yanlış
     * düzenlemeleri engellemek için
     */
    public locked:boolean = false;



    /**
     * Seçim durumu
     */
    public selected:boolean = false;



    /**
     * Aktif CAD objesi mi?
     */
    public active:boolean = false;



    /**
     * Transform matrix
     *
     * Column-major 4x4
     */
    public transform:number[] = [

        1,0,0,0,

        0,1,0,0,

        0,0,1,0,

        0,0,0,1

    ];



    /**
     * CAD metadata
     *
     * Feature sistemi,
     * parametric bilgiler,
     * renk,
     * malzeme vb.
     */
    public metadata:
        Record<string,unknown> = {};



    /**
     * Versiyon bilgisi
     *
     * Otomatik release sistemi
     * için kullanılacak
     */
    public version:number = 1;



    /**
     * Oluşturulma zamanı
     */
    public readonly createdAt:number;



    /**
     * Güncelleme zamanı
     */
    public updatedAt:number;



    constructor(

        mesh:Mesh,

        name:string = "MeshBody"

    ){


        this.mesh = mesh;


        this.name = name;


        this.id =
            MeshBody.generateId();



        this.createdAt =
            Date.now();



        this.updatedAt =
            Date.now();


    }





    /**
     * Vertex sayısı
     */
    public getVertexCount():number{


        return this.mesh.vertexCount();


    }





    /**
     * Triangle sayısı
     */
    public getTriangleCount():number{


        return this.mesh.triangleCount();


    }





    /**
     * Yüzey alanı
     */
    public getSurfaceArea():number{


        return this.mesh.computeSurfaceArea();


    }





    /**
     * Bounding box
     */
    public getBoundingBox(){


        return this.mesh.getBoundingBox();


    }





    /**
     * Transform güncelleme
     */
    public setTransform(

        matrix:number[]

    ):void{


        if(matrix.length!==16){

            throw new Error(

                "Transform matrix must have 16 values"

            );

        }


        this.transform = [

            ...matrix

        ];


        this.touch();


    }





    /**
     * Değişiklik zamanı
     */
    public touch():void{


        this.updatedAt =
            Date.now();


        this.version++;


    }





    /**
     * Clone
     */
    public clone():MeshBody{


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



        body.active =
            this.active;



        body.transform = [

            ...this.transform

        ];



        body.metadata = {


            ...this.metadata


        };



        body.version =
            this.version;



        return body;


    }





    /**
     * JSON export
     *
     * Save system,
     * GitHub snapshot,
     * release archive
     */
    public toJSON(){


        return {


            schemaVersion:1,


            id:this.id,


            name:this.name,


            visible:this.visible,


            locked:this.locked,


            selected:this.selected,


            active:this.active,


            version:this.version,


            createdAt:this.createdAt,


            updatedAt:this.updatedAt,


            transform:[

                ...this.transform

            ],


            metadata:{


                ...this.metadata


            },


            mesh:this.mesh.toJSON()


        };


    }





    /**
     * JSON import
     */
    public static fromJSON(

        data:any

    ):MeshBody{


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



        body.active =
            data.active ?? false;



        body.transform =

            data.transform ??

            [

                1,0,0,0,

                0,1,0,0,

                0,0,1,0,

                0,0,0,1

            ];



        body.metadata =

            data.metadata ??

            {};



        body.version =

            data.version ??

            1;



        return body;


    }





    /**
     * ID üretimi
     */
    private static generateId():string{


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





    /**
     * Dispose
     */
    public dispose():void{


        this.visible=false;


        this.selected=false;


        this.active=false;


        this.metadata={};


    }


}