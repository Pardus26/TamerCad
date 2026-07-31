
import {

    BRepFeature

}

from "./BRepFeature";



export type ValidationStatus =


    "VALID"

    |

    "WARNING"

    |

    "ERROR";





export interface ValidationIssue {


    type:string;


    message:string;


    severity:"LOW"|"MEDIUM"|"HIGH