plugins {


    id(
        "com.android.application"
    )


    id(
        "org.jetbrains.kotlin.android"
    )


    id(
        "org.jetbrains.kotlin.plugin.compose"
    )


    id(
        "com.google.dagger.hilt.android"
    )

}



android {


    namespace =
        "com.tamercad.app"



    compileSdk =
        35



    defaultConfig {


        applicationId =
            "com.tamercad.app"



        minSdk =
            29



        targetSdk =
            35



        versionCode =
            1



        versionName =
            "0.1.0-alpha"


    }



    buildTypes {


        debug {


            applicationIdSuffix =
                ".debug"


        }



        release {


            isMinifyEnabled =
                false


        }

    }



    buildFeatures {


        compose =
            true


    }

}



dependencies {


    implementation(
        "androidx.core:core-ktx:1.15.0"
    )


    implementation(
        "androidx.activity:activity-compose:1.10.0"
    )


    implementation(
        "androidx.compose.material3:material3:1.3.1"
    )


    implementation(
        "androidx.navigation:navigation-compose:2.8.5"
    )


    implementation(
        "com.google.dagger:hilt-android:2.52"
    )


}