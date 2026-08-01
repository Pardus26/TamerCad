package com.tamercad.app


import android.os.Bundle


import androidx.activity.ComponentActivity

import androidx.activity.compose.setContent


import com.tamercad.app.ui.TamerCADApp



class MainActivity :

    ComponentActivity() {


    override fun onCreate(

        savedInstanceState: Bundle?

    ) {


        super.onCreate(
            savedInstanceState
        )



        setContent {


            TamerCADApp()


        }

    }

}