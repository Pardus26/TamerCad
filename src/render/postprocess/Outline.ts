import {
    PostProcess,
    PostProcessType
} from "./PostProcess";

import { ShaderProgram } from "../shader/ShaderProgram";

import { RenderContext } from "../RenderContext";



export interface OutlineOptions {


    enabled?: boolean;


    color?: {

        r:number;

        g:number;

        b:number;

        a?:number;

    };


    thickness?: number;


    intensity?: number;

}



export class Outline extends PostProcess {


    /**
     * Çizgi rengi
     */
    public color = {


        r:1,

        g:0.65,

        b:0.1,

        a:1

    };



    /**
     * Kenar kalınlığı
     */
    public thickness = 2;



    /**
     * Highlight gücü
     */
    public intensity = 1;



    private maskTexture:

        any = null;



    private depthTexture:

        any = null;



    constructor(

        options:

            OutlineOptions = {}

    ) {


        super({

            type:

                PostProcessType.None,


            enabled:

                options.enabled

        });



        if (

            options.color

        ) {

            this.color = {

                ...this.color,

                ...options.color

            };

        }



        if (

            options.thickness !== undefined

        ) {

            this.thickness =

                options.thickness;

        }



        if (

            options.intensity !== undefined

        ) {

            this.intensity =

                options.intensity;

        }

    }





    setMaskTexture(

        texture:any

    ):void {


        this.maskTexture =

            texture;

    }





    getMaskTexture():

    any {


        return this.maskTexture;

    }





    setDepthTexture(

        texture:any

    ):void {


        this.depthTexture =

            texture;

    }





    override process(

        context:

            RenderContext

    ):any {


        if (

            !this.enabled

        ) {

            return this.inputTexture;

        }



        const shader =

            this.getShader();



        if (

            shader

        ) {


            shader.setUniform(

                "outlineColor",

                this.color

            );



            shader.setUniform(

                "outlineThickness",

                this.thickness

            );



            shader.setUniform(

                "outlineIntensity",

                this.intensity

            );



            shader.setUniform(

                "outlineMaskTexture",

                this.maskTexture

            );



            shader.setUniform(

                "outlineDepthTexture",

                this.depthTexture

            );

        }



        return super.process(

            context

        );

    }





    setColor(

        color:any

    ):void {


        this.color = {

            ...this.color,

            ...color

        };

    }





    setThickness(

        value:number

    ):void {


        this.thickness =

            Math.max(

                1,

                value

            );

    }





    setIntensity(

        value:number

    ):void {


        this.intensity =

            Math.max(

                0,

                value

            );

    }





    reset():void {


        this.color = {


            r:1,

            g:0.65,

            b:0.1,

            a:1

        };


        this.thickness = 2;


        this.intensity = 1;

    }





    getSettings(){


        return {


            color:

                this.color,


            thickness:

                this.thickness,


            intensity:

                this.intensity,


            enabled:

                this.enabled

        };

    }





    override toJSON(){


        return {


            ...super.toJSON(),


            color:

                this.color,


            thickness:

                this.thickness,


            intensity:

                this.intensity

        };

    }

}