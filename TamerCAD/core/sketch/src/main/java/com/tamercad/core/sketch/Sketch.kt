package com.tamercad.core.sketch


import com.tamercad.core.kernel.CadEntity



/**
 * 2D sketch container.
 */
class Sketch(

    override val id:String

):CadEntity{


    private val entities =

        mutableListOf<CadEntity>()



    fun add(

        entity:CadEntity

    ){

        entities.add(
            entity
        )

    }



    fun getEntities():

            List<CadEntity>{

        return entities

    }


}