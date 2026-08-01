package com.tamercad.core.feature



/**
 * Editable feature parameters.
 */
class FeatureParameters {


    private val values =

        mutableMapOf<String,Any>()





    fun set(

        key:String,

        value:Any

    ){


        values[key]=value


    }





    fun get(

        key:String

    ):Any? {


        return values[key]

    }





    fun all():

            Map<String,Any>{


        return values


    }


}