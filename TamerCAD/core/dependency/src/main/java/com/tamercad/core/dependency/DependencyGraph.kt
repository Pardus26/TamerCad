package com.tamercad.core.dependency



/**
 * Directed dependency graph.
 */
class DependencyGraph<T> {


    private val nodes =

        mutableListOf<DependencyNode<T>>()





    fun add(

        value:T

    ):

    DependencyNode<T>{


        val node =

            DependencyNode(

                value

            )


        nodes.add(node)


        return node

    }





    fun connect(

        parent:

            DependencyNode<T>,


        child:

            DependencyNode<T>

    ){


        parent.children.add(

            child

        )


        child.parents.add(

            parent

        )


    }





    fun nodes():

            List<DependencyNode<T>>{


        return nodes

    }


}