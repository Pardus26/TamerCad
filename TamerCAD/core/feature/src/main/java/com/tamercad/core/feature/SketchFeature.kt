package com.tamercad.core.feature



/**
 * Parametric sketch feature.
 */
class SketchFeature(

    id:String

):

    AbstractFeature(

        id,

        "Sketch",

        FeatureType.Sketch

    ){



    override fun regenerate(){


        generatedGeometry =

            "SketchGeometry"


    }


}