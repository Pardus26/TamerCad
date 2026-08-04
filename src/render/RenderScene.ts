import { MeshBody } from "../geometry/mesh/MeshBody";


/**
 * RenderScene içindeki
 * mesh dışı render nesneleri
 */
export interface RenderObject {

    id: string;

    visible: boolean;

}


/**
 * Seçilebilir nesne bilgisi
 *
 * Tablet kalem seçimi
 * ve CAD seçim sistemi
 * için kullanılacak.
 */
export interface SceneSelection {

    id: string;

    type:
        "MeshBody"
        |
        "Object";

}


/**
 * CAD Render Scene
 *
 * Shapr3D benzeri:
 *
 * Model
 *  |
 * MeshBody
 *  |
 * DisplayMesh
 *  |
 * Renderer
 *
 */
export class RenderScene {


    /**
     * Ana CAD mesh listesi
     */
    private readonly meshBodies =
        new Map<string, MeshBody>();


    /**
     * Yardımcı render objeleri
     *
     * Grid
     * Gizmo
     * Axis
     * Overlay
     */
    private readonly objects =
        new Map<string, RenderObject>();


    /**
     * Seçili nesne
     */
    private selection:
        SceneSelection | null = null;



    /**
     * Arka plan rengi
     */
    private backgroundColor = {


        r: 0.15,


        g: 0.15,


        b: 0.18,


        a: 1.0

    };



    constructor() {}



    // ----------------------------------------------------
    // Mesh Bodies
    // ----------------------------------------------------


    /**
     * Yeni CAD gövdesi ekler
     */
    public addMeshBody(

        body: MeshBody

    ): void {


        this.meshBodies.set(

            body.id,

            body

        );

    }



    /**
     * Mesh siler
     */
    public removeMeshBody(

        id: string

    ): boolean {


        if (

            this.selection?.id === id

        ) {

            this.clearSelection();

        }


        return this.meshBodies.delete(

            id

        );

    }



    /**
     * Mesh bul
     */
    public getMeshBody(

        id: string

    ): MeshBody | undefined {


        return this.meshBodies.get(

            id

        );

    }



    /**
     * Tüm meshleri getir
     */
    public getMeshBodies():

    readonly MeshBody[] {


        return Array.from(

            this.meshBodies.values()

        );

    }



    /**
     * Tüm meshleri temizle
     */
    public clearMeshBodies():

    void {


        this.meshBodies.clear();


        this.clearSelection();

    }

    // ----------------------------------------------------
    // Generic Render Objects
    // ----------------------------------------------------


    /**
     * Render yardımcı objesi ekle
     *
     * Örnek:
     *
     * Grid
     * Axis
     * Selection Gizmo
     * Measurement Overlay
     */
    public addObject(

        object: RenderObject

    ): void {


        this.objects.set(

            object.id,

            object

        );

    }



    /**
     * Render objesi sil
     */
    public removeObject(

        id: string

    ): boolean {


        return this.objects.delete(

            id

        );

    }



    /**
     * Render objesi getir
     */
    public getObject(

        id: string

    ): RenderObject | undefined {


        return this.objects.get(

            id

        );

    }



    /**
     * Tüm yardımcı render objeleri
     */
    public getObjects():

    readonly RenderObject[] {


        return Array.from(

            this.objects.values()

        );

    }



    /**
     * Yardımcı objeleri temizle
     */
    public clearObjects():

    void {


        this.objects.clear();

    }




    // ----------------------------------------------------
    // Selection System
    // ----------------------------------------------------


    /**
     * Nesne seç
     *
     * Kalem dokunuşu sonrası
     * burası kullanılacak.
     */
    public select(

        selection: SceneSelection | null

    ): void {


        this.selection = selection;

    }



    /**
     * Seçimi kaldır
     */
    public clearSelection():

    void {


        this.selection = null;

    }



    /**
     * Aktif seçim
     */
    public getSelection():

    SceneSelection | null {


        return this.selection;

    }



    /**
     * Mesh seç
     */
    public selectMeshBody(

        id: string

    ): boolean {


        if (

            !this.meshBodies.has(id)

        ) {

            return false;

        }



        this.selection = {

            id,

            type: "MeshBody"

        };


        return true;

    }



    /**
     * Render objesi seç
     */
    public selectObject(

        id: string

    ): boolean {


        if (

            !this.objects.has(id)

        ) {

            return false;

        }



        this.selection = {

            id,

            type: "Object"

        };


        return true;

    }




    // ----------------------------------------------------
    // Visibility
    // ----------------------------------------------------


    /**
     * Mesh görünürlük
     */
    public setMeshVisibility(

        id: string,

        visible: boolean

    ): boolean {


        const body =

            this.meshBodies.get(id);



        if (

            !body

        ) {

            return false;

        }



        body.visible = visible;


        return true;

    }



    /**
     * Render object görünürlük
     */
    public setObjectVisibility(

        id: string,

        visible: boolean

    ): boolean {


        const object =

            this.objects.get(id);



        if (

            !object

        ) {

            return false;

        }



        object.visible = visible;


        return true;

    }




    // ----------------------------------------------------
    // Scene
    // ----------------------------------------------------


    /**
     * Tüm sahneyi temizle
     */
    public clear():

    void {


        this.meshBodies.clear();


        this.objects.clear();


        this.selection = null;

    }



    /**
     * Sahne boş mu?
     */
    public isEmpty():

    boolean {


        return (

            this.meshBodies.size === 0 &&

            this.objects.size === 0

        );

    }

    // ----------------------------------------------------
    // Background
    // ----------------------------------------------------


    /**
     * Sahne arka plan rengi
     */
    public setBackgroundColor(

        r: number,

        g: number,

        b: number,

        a = 1.0

    ): void {


        this.backgroundColor = {

            r,

            g,

            b,

            a

        };

    }



    /**
     * Arka plan rengi
     */
    public getBackgroundColor() {


        return {

            ...this.backgroundColor

        };

    }




    // ----------------------------------------------------
    // Render Queries
    // ----------------------------------------------------


    /**
     * Render edilecek görünür meshler
     *
     * Renderer bunu kullanacak.
     */
    public getVisibleMeshBodies():

    readonly MeshBody[] {


        return Array.from(

            this.meshBodies.values()

        ).filter(

            body => body.visible

        );

    }



    /**
     * Render edilecek yardımcı objeler
     */
    public getVisibleObjects():

    readonly RenderObject[] {


        return Array.from(

            this.objects.values()

        ).filter(

            object => object.visible

        );

    }




    // ----------------------------------------------------
    // Statistics
    // ----------------------------------------------------


    /**
     * Sahne istatistikleri
     *
     * FPS/debug ekranı için
     */
    public getStatistics() {


        let vertices = 0;

        let triangles = 0;



        for (

            const body of

            this.meshBodies.values()

        ) {


            vertices +=

                body.getVertexCount();



            triangles +=

                body.getTriangleCount();

        }



        return {


            meshBodies:

                this.meshBodies.size,


            renderObjects:

                this.objects.size,


            vertices,


            triangles,


            selected:

                this.selection

        };

    }




    // ----------------------------------------------------
    // Debug
    // ----------------------------------------------------


    public debugInfo() {


        return {


            type:

                "RenderScene",


            meshBodies:

                this.meshBodies.size,


            objects:

                this.objects.size,


            selection:

                this.selection,


            background:

                this.backgroundColor

        };

    }



}