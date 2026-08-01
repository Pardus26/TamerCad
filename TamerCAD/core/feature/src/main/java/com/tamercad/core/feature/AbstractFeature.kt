package com.tamercad.core.feature



/**
 * Common implementation for features.
 */
abstract class AbstractFeature(

    override val id:String,


    override var name:String,


    val type:FeatureType

):Feature {



    override var enabled = true



    override var visible = true



    val parameters =

        FeatureParameters()



    protected var generatedGeometry:

            Any? = null





    override fun geometry():

            Any? {


        return generatedGeometry

    }



}