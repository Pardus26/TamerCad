package com.tamercad.core.regeneration



import com.tamercad.core.feature.Feature



/**
 * Rebuilds affected features.
 */
class RegenerationEngine {



    fun rebuild(

        feature:Feature

    ){


        if(

            !feature.enabled

        )

            return



        feature.regenerate()


    }


}