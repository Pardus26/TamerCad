package com.tamercad.app


import android.content.Context
import android.opengl.GLSurfaceView
import android.view.MotionEvent



class EngineSurfaceView(

    context: Context

) : GLSurfaceView(context) {



    private val renderer: TamerCADRenderer





    init {



        /*
            OpenGL ES 3.0
         */
        setEGLContextClientVersion(3)



        renderer =
            TamerCADRenderer()



        setRenderer(
            renderer
        )



        renderMode =
            RENDERMODE_CONTINUOUSLY



        preserveEGLContextOnPause =
            true


    }









    override fun onTouchEvent(

        event: MotionEvent

    ): Boolean {



        val pointerIndex =

            event.actionIndex





        val pointerId =

            event.getPointerId(
                pointerIndex
            )





        val x =

            event.getX(
                pointerIndex
            )





        val y =

            event.getY(
                pointerIndex
            )





        val pressure =

            event.getPressure(
                pointerIndex
            )









        val toolType =

            event.getToolType(
                pointerIndex
            )









        when(event.actionMasked) {



            MotionEvent.ACTION_DOWN,

            MotionEvent.ACTION_POINTER_DOWN -> {



                EngineBridge.pointerDown(

                    pointerId,

                    x,

                    y,

                    pressure

                )


            }









            MotionEvent.ACTION_MOVE -> {



                /*
                    Multi-touch desteği

                    tüm aktif pointerları
                    gönderiyoruz
                 */

                for(
                    i in 0 until event.pointerCount
                ){


                    EngineBridge.pointerMove(

                        event.getPointerId(i),

                        event.getX(i),

                        event.getY(i),

                        event.getPressure(i)

                    )


                }


            }









            MotionEvent.ACTION_UP,

            MotionEvent.ACTION_POINTER_UP -> {



                EngineBridge.pointerUp(

                    pointerId,

                    x,

                    y

                )


            }









            MotionEvent.ACTION_CANCEL -> {



                EngineBridge.pointerUp(

                    pointerId,

                    x,

                    y

                )


            }


        }





        return true

    }









    private fun isStylus(

        event:MotionEvent

    ):Boolean {


        return event.getToolType(

            event.actionIndex

        ) ==

        MotionEvent.TOOL_TYPE_STYLUS



    }









    fun shutdown() {



        renderer.shutdown()



    }



}