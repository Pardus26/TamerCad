import { Vector2 } from "../../math/Vector2";

import {

    SketchEntity,

    SketchPoint,

    SketchLine,

    SketchCircle

} from "./SketchEntity";

/* ======================================================
 * Snap Types
 * ====================================================== */

export enum SnapType {

    None,

    Endpoint,

    Midpoint,

    Center,

    Intersection,

    Grid,

    Angle,

    Tangent,

    Quadrant,

    Projection

}

/* ======================================================
 * Snap Result
 * ====================================================== */

export interface SnapResult {

    snapped: boolean;

    position: Vector2;

    type: SnapType;

    entity?: SketchEntity;

    distance: number;

    constraint?: string;

}

/* ======================================================
 * Options
 * ====================================================== */

export interface SnapEngineOptions {

    snapDistance?: number;

    gridSize?: number;

    angleStep?: number;

    enableGrid?: boolean;

    enableAngleSnap?: boolean;

}

/* ======================================================
 * Snap Engine
 * ====================================================== */

export class SnapEngine {

    private readonly snapDistance: number;

    private readonly gridSize: number;

    private readonly angleStep: number;

    private readonly enableGrid: boolean;

    private readonly enableAngleSnap: boolean;

    constructor(

        options: SnapEngineOptions = {}

    ) {

        this.snapDistance =

            options.snapDistance ?? 12;

        this.gridSize =

            options.gridSize ?? 10;

        this.angleStep =

            options.angleStep ?? 15;

        this.enableGrid =

            options.enableGrid ?? true;

        this.enableAngleSnap =

            options.enableAngleSnap ?? true;

    }

    /* ======================================================
     * Main Snap Entry
     * ====================================================== */

    snap(

        position: Vector2,

        entities: readonly SketchEntity[]

    ): SnapResult {

        let best: SnapResult = {

            snapped: false,

            position: position.clone(),

            type: SnapType.None,

            distance: Number.MAX_VALUE

        };

        for (

            const entity of entities

        ) {

            best = this.checkEntity(

                position,

                entity,

                best

            );

        }

        if (

            !best.snapped &&

            this.enableGrid

        ) {

            best = this.gridSnap(

                position

            );

        }

        return best;

    }
    /* ======================================================
     * Entity Snap Dispatcher
     * ====================================================== */

    private checkEntity(

        position: Vector2,

        entity: SketchEntity,

        current: SnapResult

    ): SnapResult {

        if (entity instanceof SketchPoint) {

            current = this.pointSnap(

                position,

                entity,

                current

            );

        }

        else if (entity instanceof SketchLine) {

            current = this.endpointSnap(

                position,

                entity,

                current

            );

            current = this.midpointSnap(

                position,

                entity,

                current

            );

            current = this.projectionSnap(

                position,

                entity,

                current

            );

        }

        else if (entity instanceof SketchCircle) {

            current = this.centerSnap(

                position,

                entity,

                current

            );

            current = this.quadrantSnap(

                position,

                entity,

                current

            );

        }

        return current;

    }

    /* ======================================================
     * Point Snap
     * ====================================================== */

    private pointSnap(

        position: Vector2,

        entity: SketchPoint,

        current: SnapResult

    ): SnapResult {

        const d = entity.position.distanceTo(

            position

        );

        if (

            d < this.snapDistance &&

            d < current.distance

        ) {

            return {

                snapped: true,

                position:

                    entity.position.clone(),

                type:

                    SnapType.Endpoint,

                entity,

                distance: d,

                constraint:

                    "Coincident"

            };

        }

        return current;

    }

    /* ======================================================
     * Endpoint Snap
     * ====================================================== */

    private endpointSnap(

        position: Vector2,

        entity: SketchLine,

        current: SnapResult

    ): SnapResult {

        const pts = [

            entity.start,

            entity.end

        ];

        for (

            const p of pts

        ) {

            const d = p.distanceTo(

                position

            );

            if (

                d < this.snapDistance &&

                d < current.distance

            ) {

                return {

                    snapped: true,

                    position:

                        p.clone(),

                    type:

                        SnapType.Endpoint,

                    entity,

                    distance: d,

                    constraint:

                        "Coincident"

                };

            }

        }

        return current;

    }
    /* ======================================================
     * Midpoint Snap
     * ====================================================== */

    private midpointSnap(

        position: Vector2,

        entity: SketchLine,

        current: SnapResult

    ): SnapResult {

        const midpoint = new Vector2(

            (entity.start.x + entity.end.x) * 0.5,

            (entity.start.y + entity.end.y) * 0.5

        );

        const d = midpoint.distanceTo(

            position

        );

        if (

            d < this.snapDistance &&

            d < current.distance

        ) {

            return {

                snapped: true,

                position: midpoint,

                type: SnapType.Midpoint,

                entity,

                distance: d,

                constraint: "Midpoint"

            };

        }

        return current;

    }

    /* ======================================================
     * Projection Snap
     * ====================================================== */

    private projectionSnap(

        position: Vector2,

        entity: SketchLine,

        current: SnapResult

    ): SnapResult {

        const projected = this.projectPointToSegment(

            position,

            entity.start,

            entity.end

        );

        const d = projected.distanceTo(

            position

        );

        if (

            d < this.snapDistance &&

            d < current.distance

        ) {

            return {

                snapped: true,

                position: projected,

                type: SnapType.Projection,

                entity,

                distance: d,

                constraint: "HorizontalVertical"

            };

        }

        return current;

    }

    /* ======================================================
     * Point Projection Helper
     * ====================================================== */

    private projectPointToSegment(

        point: Vector2,

        start: Vector2,

        end: Vector2

    ): Vector2 {

        const ab = end.clone().sub(

            start

        );

        const ap = point.clone().sub(

            start

        );

        const abLengthSq =

            ab.dot(ab);

        if (abLengthSq <= 1e-9) {

            return start.clone();

        }

        let t =

            ap.dot(ab) / abLengthSq;

        t = Math.max(

            0,

            Math.min(

                1,

                t

            )

        );

        return start.clone().add(

            ab.multiplyScalar(

                t

            )

        );

    }
    /* ======================================================
     * Circle Center Snap
     * ====================================================== */

    private centerSnap(

        position: Vector2,

        entity: SketchCircle,

        current: SnapResult

    ): SnapResult {

        const d =

            entity.center.distanceTo(

                position

            );

        if (

            d < this.snapDistance &&

            d < current.distance

        ) {

            return {

                snapped: true,

                position:

                    entity.center.clone(),

                type:

                    SnapType.Center,

                entity,

                distance: d,

                constraint:

                    "Center"

            };

        }

        return current;

    }


    /* ======================================================
     * Circle Quadrant Snap
     * ====================================================== */

    private quadrantSnap(

        position: Vector2,

        entity: SketchCircle,

        current: SnapResult

    ): SnapResult {


        const candidates = [

            new Vector2(

                entity.center.x +

                entity.radius,

                entity.center.y

            ),


            new Vector2(

                entity.center.x -

                entity.radius,

                entity.center.y

            ),


            new Vector2(

                entity.center.x,

                entity.center.y +

                entity.radius

            ),


            new Vector2(

                entity.center.x,

                entity.center.y -

                entity.radius

            )

        ];



        for (

            const point of candidates

        ) {


            const d =

                point.distanceTo(

                    position

                );



            if (

                d < this.snapDistance &&

                d < current.distance

            ) {


                return {

                    snapped: true,

                    position:

                        point,

                    type:

                        SnapType.Quadrant,

                    entity,

                    distance: d,

                    constraint:

                        "Quadrant"

                };


            }


        }


        return current;


    }



    /* ======================================================
     * Grid Snap
     * ====================================================== */

    private gridSnap(

        position: Vector2

    ): SnapResult {


        const x =

            Math.round(

                position.x /

                this.gridSize

            )

            *

            this.gridSize;


        const y =

            Math.round(

                position.y /

                this.gridSize

            )

            *

            this.gridSize;



        const snapped =

            new Vector2(

                x,

                y

            );



        const d =

            snapped.distanceTo(

                position

            );



        if (

            d < this.snapDistance

        ) {


            return {

                snapped: true,

                position: snapped,

                type:

                    SnapType.Grid,

                distance: d,

                constraint:

                    "Grid"

            };


        }



        return {

            snapped: false,

            position:

                position.clone(),

            type:

                SnapType.None,

            distance: d

        };


    }
    /* ======================================================
     * Angle Snap
     * ====================================================== */

    snapAngle(

        start: Vector2,

        end: Vector2

    ): Vector2 {


        if (

            !this.enableAngleSnap

        ) {

            return end.clone();

        }


        const dx =

            end.x -

            start.x;


        const dy =

            end.y -

            start.y;


        const length =

            Math.sqrt(

                dx * dx +

                dy * dy

            );


        if (

            length < 0.00001

        ) {

            return end.clone();

        }


        const angle =

            Math.atan2(

                dy,

                dx

            );


        const degrees =

            angle *

            180 /

            Math.PI;


        const snappedDegrees =

            Math.round(

                degrees /

                this.angleStep

            )

            *

            this.angleStep;


        const radians =

            snappedDegrees *

            Math.PI /

            180;


        return new Vector2(

            start.x +

            Math.cos(radians)

            *

            length,


            start.y +

            Math.sin(radians)

            *

            length

        );

    }


    /* ======================================================
     * Intersection Snap
     * ====================================================== */

    private intersectionSnap(

        position: Vector2,

        entities: readonly SketchEntity[],

        current: SnapResult

    ): SnapResult {


        for (

            let i = 0;

            i < entities.length;

            i++

        ) {


            const a = entities[i];


            if (

                !(a instanceof SketchLine)

            ) {

                continue;

            }


            for (

                let j = i + 1;

                j < entities.length;

                j++

            ) {


                const b = entities[j];


                if (

                    !(b instanceof SketchLine)

                ) {

                    continue;

                }


                const intersection =

                    this.lineIntersection(

                        a.start,

                        a.end,

                        b.start,

                        b.end

                    );


                if (

                    !intersection

                ) {

                    continue;

                }


                const d =

                    intersection.distanceTo(

                        position

                    );


                if (

                    d < this.snapDistance &&

                    d < current.distance

                ) {


                    return {

                        snapped:true,

                        position:

                            intersection,

                        type:

                            SnapType.Intersection,

                        entity:a,

                        distance:d,

                        constraint:

                            "Intersection"

                    };

                }

            }

        }


        return current;

    }


    /* ======================================================
     * Line Intersection Helper
     * ====================================================== */

    private lineIntersection(

        p1:Vector2,

        p2:Vector2,

        p3:Vector2,

        p4:Vector2

    ):Vector2 | null {


        const denominator =

            (

                p1.x-p2.x

            )

            *

            (

                p3.y-p4.y

            )

            -

            (

                p1.y-p2.y

            )

            *

            (

                p3.x-p4.x

            );


        if (

            Math.abs(

                denominator

            )

            < 0.000001

        ) {

            return null;

        }


        const x =

            (

                (

                    p1.x*p2.y -

                    p1.y*p2.x

                )

                *

                (

                    p3.x-p4.x

                )

                -

                (

                    p1.x-p2.x

                )

                *

                (

                    p3.x*p4.y -

                    p3.y*p4.x

                )

            )

            /

            denominator;


        const y =

            (

                (

                    p1.x*p2.y -

                    p1.y*p2.x

                )

                *

                (

                    p3.y-p4.y

                )

                -

                (

                    p1.y-p2.y

                )

                *

                (

                    p3.x*p4.y -

                    p3.y*p4.x

                )

            )

            /

            denominator;


        return new Vector2(

            x,

            y

        );

    }
    /* ======================================================
     * Tangent Snap
     * ====================================================== */

    private tangentSnap(

        position: Vector2,

        entity: SketchCircle,

        current: SnapResult

    ): SnapResult {


        const direction =

            position.clone()

            .sub(

                entity.center

            );


        const length =

            direction.length();


        if (

            length === 0

        ) {

            return current;

        }


        const tangentPoint =

            entity.center.clone()

            .add(

                direction

                .normalize()

                .multiplyScalar(

                    entity.radius

                )

            );


        const distance =

            tangentPoint.distanceTo(

                position

            );


        if (

            distance < this.snapDistance &&

            distance < current.distance

        ) {


            return {

                snapped:true,

                position:

                    tangentPoint,

                type:

                    SnapType.Tangent,

                entity,

                distance,

                constraint:

                    "Tangent"

            };

        }


        return current;

    }



    /* ======================================================
     * Priority Comparison
     * ====================================================== */

    private better(

        candidate:SnapResult,

        current:SnapResult

    ):boolean {


        if (

            !candidate.snapped

        ) {

            return false;

        }


        if (

            !current.snapped

        ) {

            return true;

        }


        const priority = [

            SnapType.Intersection,

            SnapType.Endpoint,

            SnapType.Center,

            SnapType.Midpoint,

            SnapType.Quadrant,

            SnapType.Tangent,

            SnapType.Projection,

            SnapType.Grid

        ];


        const candidatePriority =

            priority.indexOf(

                candidate.type

            );


        const currentPriority =

            priority.indexOf(

                current.type

            );


        if (

            candidatePriority !==

            currentPriority

        ) {

            return (

                candidatePriority <

                currentPriority

            );

        }


        return (

            candidate.distance <

            current.distance

        );

    }



    /* ======================================================
     * Public Debug
     * ====================================================== */

    debugInfo() {


        return {

            snapDistance:

                this.snapDistance,


            gridSize:

                this.gridSize,


            angleStep:

                this.angleStep,


            gridEnabled:

                this.enableGrid,


            angleSnapEnabled:

                this.enableAngleSnap

        };

    }


}