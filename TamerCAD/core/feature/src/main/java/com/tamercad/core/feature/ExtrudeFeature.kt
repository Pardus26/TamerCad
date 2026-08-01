package com.tamercad.core.feature



/**
 * Creates solid extrusion from sketch.
 */
class ExtrudeFeature(

    id:String,

    private val profile:

        Feature

):

    AbstractFeature(

        id,

        "Extrude",

        FeatureType.Extrude

    ){



    init {


        parameters.set(

            "distance",

            10.0

        )


    }





    override fun regenerate(){


        val distance =

            parameters.get(

                "distance"

            )



        generatedGeometry =

            "Extruded($distance)"

    }


}