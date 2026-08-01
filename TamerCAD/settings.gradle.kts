pluginManagement {

    repositories {

        google()

        mavenCentral()

        gradlePluginPortal()

    }

}


dependencyResolutionManagement {

    repositoriesMode.set(
        RepositoriesMode.FAIL_ON_PROJECT_REPOS
    )


    repositories {

        google()

        mavenCentral()

    }

}


rootProject.name = "TamerCAD"


include(

    ":app",

    ":core:geometry",

    ":core:math",

    ":core:kernel",

    ":core:rendering",

    ":domain",

    ":data",

    ":feature:home",

    ":feature:project",

    ":feature:editor",

    ":feature:sketch",

    ":ui"

)