import { MeshVertex } from "./MeshVertex";
import { MeshTriangle } from "./MeshTriangle";



export interface MeshBoundingBox {

    min:{
        x:number;
        y:number;
        z:number;
    };

    max:{
        x:number;
        y:number;
        z:number;
    };

}




export class Mesh {


    private readonly vertices:MeshVertex[]=[];


    private readonly triangles:MeshTriangle[]=[];



    constructor(

        public name:string="Mesh"

    ){}





    public addVertex(

        vertex:MeshVertex

    ):number{


        this.vertices.push(vertex);


        return this.vertices.length-1;


    }






    public addTriangle(

        triangle:MeshTriangle

    ):void{


        this.triangles.push(triangle);


    }






    public getVertex(

        index:number

    ):MeshVertex{


        return this.vertices[index];


    }






    public getTriangle(

        index:number

    ):MeshTriangle{


        return this.triangles[index];


    }






    public getVertices():

    readonly MeshVertex[]{


        return this.vertices;


    }






    public getTriangles():

    readonly MeshTriangle[]{


        return this.triangles;


    }






    public vertexCount():number{


        return this.vertices.length;


    }






    public triangleCount():number{


        return this.triangles.length;


    }






    public clear():void{


        this.vertices.length=0;


        this.triangles.length=0;


    }






    public isEmpty():boolean{


        return (

            this.vertices.length===0 ||

            this.triangles.length===0

        );


    }






    public computeSurfaceArea():number{


        let area=0;


        for(

            const triangle of this.triangles

        ){


            area +=

                triangle.computeArea(

                    this.vertices

                );


        }


        return area;


    }






    public getBoundingBox():

    MeshBoundingBox | null{


        if(this.vertices.length===0){

            return null;

        }



        let minX=Infinity;
        let minY=Infinity;
        let minZ=Infinity;


        let maxX=-Infinity;
        let maxY=-Infinity;
        let maxZ=-Infinity;



        for(

            const vertex of this.vertices

        ){


            const p=

                vertex.position;



            minX=Math.min(minX,p.x);

            minY=Math.min(minY,p.y);

            minZ=Math.min(minZ,p.z);



            maxX=Math.max(maxX,p.x);

            maxY=Math.max(maxY,p.y);

            maxZ=Math.max(maxZ,p.z);


        }





        return {

            min:{

                x:minX,
                y:minY,
                z:minZ

            },


            max:{

                x:maxX,
                y:maxY,
                z:maxZ

            }


        };


    }






    public clone():Mesh{


        const mesh=

            new Mesh(

                this.name

            );



        for(

            const vertex of this.vertices

        ){

            mesh.addVertex(

                vertex.clone()

            );

        }




        for(

            const triangle of this.triangles

        ){

            mesh.addTriangle(

                triangle.clone()

            );

        }



        return mesh;


    }






    public toJSON(){


        return {


            name:this.name,


            vertices:

                this.vertices.map(

                    v=>v.toJSON()

                ),



            triangles:

                this.triangles.map(

                    t=>t.toJSON()

                )


        };


    }






    public static fromJSON(

        data:any

    ):Mesh{


        const mesh=

            new Mesh(

                data.name

            );



        for(

            const vertex of data.vertices

        ){

            mesh.addVertex(

                MeshVertex.fromJSON(vertex)

            );

        }



        for(

            const triangle of data.triangles

        ){

            mesh.addTriangle(

                MeshTriangle.fromJSON(triangle)

            );

        }



        return mesh;


    }


}