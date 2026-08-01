package com.tamercad.core.feature



/**
 * Stores ordered modeling history.
 */
class FeatureTree {



    private val features =

        mutableListOf<Feature>()





    fun add(

        feature:Feature

    ){


        features.add(

            feature

        )

    }





    fun remove(

        feature:Feature

    ){


        features.remove(

            feature

        )

    }





    fun all():

            List<Feature>{


        return features


    }


}