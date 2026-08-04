// src/cad/sketch/ConstraintTypes.ts


// =====================================================
// Sketch Constraint Types
// =====================================================


export enum ConstraintType {


    // Two points share same location
    Coincident =

        "Coincident",




    // Line direction constraints
    Horizontal =

        "Horizontal",



    Vertical =

        "Vertical",





    Parallel =

        "Parallel",



    Perpendicular =

        "Perpendicular",





    // Curve relations

    Tangent =

        "Tangent",



    Equal =

        "Equal",





    // Dimensional constraints

    Distance =

        "Distance",



    DistanceX =

        "DistanceX",



    DistanceY =

        "DistanceY",





    Angle =

        "Angle",



    Radius =

        "Radius",



    Diameter =

        "Diameter",





    // Position lock

    Fixed =

        "Fixed",





    // Symmetry

    Symmetric =

        "Symmetric",





    // Construction

    Construction =

        "Construction"



}









// =====================================================
// Constraint Priority
// =====================================================


export enum ConstraintPriority {


    // Automatically generated constraints

    Weak = 0,



    // User suggested constraints

    Normal = 1,



    // User confirmed constraints

    Strong = 2,



    // Locked engineering constraints

    Driving = 3



}









// =====================================================
// Constraint Source
// =====================================================


export enum ConstraintSource {


    // User created

    User =

        "User",



    // Generated from snapping

    Auto =

        "Auto",



    // Recognizer suggestion

    Recognizer =

        "Recognizer",



    // Imported CAD data

    Import =

        "Import"



}









// =====================================================
// Constraint State
// =====================================================


export enum ConstraintState {


    Active =

        "Active",



    Suppressed =

        "Suppressed",



    Conflicted =

        "Conflicted",



    Redundant =

        "Redundant"



}









// =====================================================
// Constraint Metadata
// =====================================================


export interface ConstraintDefinition {


    type:

        ConstraintType;



    name:

        string;



    description:

        string;



    degreesOfFreedom:number;



    priority:

        ConstraintPriority;



}









// =====================================================
// Constraint Library
// =====================================================


export const ConstraintLibrary:

Record<

    ConstraintType,

    ConstraintDefinition

> = {



    [ConstraintType.Coincident]:

    {


        type:

            ConstraintType.Coincident,


        name:

            "Coincident",


        description:

            "Two points are merged",


        degreesOfFreedom:

            2,


        priority:

            ConstraintPriority.Strong


    },





    [ConstraintType.Horizontal]:

    {


        type:

            ConstraintType.Horizontal,


        name:

            "Horizontal",


        description:

            "Line is horizontal",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Normal


    },





    [ConstraintType.Vertical]:

    {


        type:

            ConstraintType.Vertical,


        name:

            "Vertical",


        description:

            "Line is vertical",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Normal


    },





    [ConstraintType.Parallel]:

    {


        type:

            ConstraintType.Parallel,


        name:

            "Parallel",


        description:

            "Two entities have same direction",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Normal


    },





    [ConstraintType.Perpendicular]:

    {


        type:

            ConstraintType.Perpendicular,


        name:

            "Perpendicular",


        description:

            "Entities intersect at 90 degrees",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Normal


    },





    [ConstraintType.Tangent]:

    {


        type:

            ConstraintType.Tangent,


        name:

            "Tangent",


        description:

            "Curve touches another entity smoothly",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Strong


    },





    [ConstraintType.Equal]:

    {


        type:

            ConstraintType.Equal,


        name:

            "Equal",


        description:

            "Equal length or radius",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Normal


    },





    [ConstraintType.Distance]:

    {


        type:

            ConstraintType.Distance,


        name:

            "Distance",


        description:

            "Fixed distance",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Driving


    },





    [ConstraintType.Angle]:

    {


        type:

            ConstraintType.Angle,


        name:

            "Angle",


        description:

            "Fixed angular relation",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Driving


    },





    [ConstraintType.Radius]:

    {


        type:

            ConstraintType.Radius,


        name:

            "Radius",


        description:

            "Fixed circle radius",


        degreesOfFreedom:

            1,


        priority:

            ConstraintPriority.Driving


    },





    [ConstraintType.Fixed]:

    {


        type:

            ConstraintType.Fixed,


        name:

            "Fixed",


        description:

            "Lock geometry position",


        degreesOfFreedom:

            0,


        priority:

            ConstraintPriority.Driving


    },





    [ConstraintType.Symmetric]:

    {


        type:

            ConstraintType.Symmetric,


        name:

            "Symmetric",


        description:

            "Entities symmetric around axis",


        degreesOfFreedom:

            2,


        priority:

            ConstraintPriority.Strong


    },





    [ConstraintType.Construction]:

    {


        type:

            ConstraintType.Construction,


        name:

            "Construction",


        description:

            "Reference geometry only",


        degreesOfFreedom:

            0,


        priority:

            ConstraintPriority.Weak


    }



};









// =====================================================
// Helper Functions
// =====================================================


export function isDimensionalConstraint(

    type:ConstraintType

):

boolean{


    return (

        type === ConstraintType.Distance ||

        type === ConstraintType.DistanceX ||

        type === ConstraintType.DistanceY ||

        type === ConstraintType.Angle ||

        type === ConstraintType.Radius ||

        type === ConstraintType.Diameter

    );


}







export function isGeometricConstraint(

    type:ConstraintType

):

boolean{


    return (

        type === ConstraintType.Coincident ||

        type === ConstraintType.Horizontal ||

        type === ConstraintType.Vertical ||

        type === ConstraintType.Parallel ||

        type === ConstraintType.Perpendicular ||

        type === ConstraintType.Tangent ||

        type === ConstraintType.Equal ||

        type === ConstraintType.Symmetric

    );


}







export function getConstraintDefinition(

    type:ConstraintType

):

ConstraintDefinition{


    return ConstraintLibrary[type];


}