import { MeshVertex } from "./MeshVertex";


export class MeshTriangle {


    /**
     * Triangle unique id
     */
    public readonly id:number;



    /**
     * Vertex indices
     */
    public v1:number;

    public v2:number;

    public v3:number;



    /**
     * Mesh3 compatibility
     */
    public get a():number {

        return this.v1;

    }


    public set a(

        value:number

    ){

        this.v1=value;

    }



    public get b():number {

        return this.v2;

    }


    public set b(

        value:number

    ){

        this.v2=value;

    }



    public get c():number {

        return this.v3;

    }


    public set c(

        value:number

    ){

        this.v3=value;

    }





    /**
     * Face normal index
     */
    public normalIndex:

        number | null = null;




    /**
     * Material index
     */
    public materialIndex:

        number | null = null;






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







    public getVertexIndices():

    readonly number[]{


        return [

            this.v1,

            this.v2,

            this.v3

        ];


    }







    public containsVertex(

        vertexIndex:number

    ):boolean{


        return (

            this.v1===vertexIndex ||

            this.v2===vertexIndex ||

            this.v3===vertexIndex

        );


    }







    public replaceVertex(

        oldIndex:number,

        newIndex:number

    ):void{


        if(this.v1===oldIndex)

            this.v1=newIndex;



        if(this.v2===oldIndex)

            this.v2=newIndex;



        if(this.v3===oldIndex)

            this.v3=newIndex;


    }







    /**
     * Face direction reverse
     */
    public reverse():void{


        const temp=this.v2;


        this.v2=this.v3;


        this.v3=temp;


    }







    public isDegenerate():

    boolean{


        return (

            this.v1===this.v2 ||

            this.v2===this.v3 ||

            this.v3===this.v1

        );


    }







    /**
     * Triangle area
     */
    public computeArea(

        vertices:MeshVertex[]

    ):number{


        const a=

            vertices[this.v1].position;



        const b=

            vertices[this.v2].position;



        const c=

            vertices[this.v3].position;





        const ab=

            b.subtract(a);



        const ac=

            c.subtract(a);





        return (

            ab

            .cross(ac)

            .length()

            *

            0.5

        );


    }







    public clone():

    MeshTriangle{


        const t=

            new MeshTriangle(

                MeshTriangle.generateId(),

                this.v1,

                this.v2,

                this.v3

            );



        t.normalIndex=

            this.normalIndex;



        t.materialIndex=

            this.materialIndex;



        return t;


    }







    public toJSON(){


        return {


            id:this.id,


            a:this.v1,

            b:this.v2,

            c:this.v3,


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

    MeshTriangle{


        const vertices =

            data.vertices ??

            [

                data.a,

                data.b,

                data.c

            ];





        const triangle=

            new MeshTriangle(

                data.id ??

                MeshTriangle.generateId(),

                vertices[0],

                vertices[1],

                vertices[2]

            );





        triangle.normalIndex=

            data.normalIndex ??

            null;



        triangle.materialIndex=

            data.materialIndex ??

            null;



        return triangle;


    }







    private static generateId():

    number{


        return (

            Date.now()

            +

            Math.floor(

                Math.random()*100000

            )

        );


    }



}