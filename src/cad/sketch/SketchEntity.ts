import {
    Vector2
}
from "../../math/vector/Vector2";

/* ============================================================
 * Sketch Entity System
 * ============================================================
 *
 * Yeni nesil parametrik sketch altyapısı.
 *
 * Bu sınıf;
 *
 * - Constraint Solver
 * - Snap Engine
 * - Tool Controller
 * - Selection
 * - Renderer
 *
 * tarafından ortak kullanılacaktır.
 *
 * ============================================================
 */

export enum SketchEntityType {
    Point = 0,
    Line = 1,
    Circle = 2,
    Arc = 3
}

/* ============================================================
 * Entity Flags
 * ============================================================
 */

export enum SketchEntityFlags {

    None            = 0,

    Selected        = 1 << 0,

    Hidden          = 1 << 1,

    Fixed           = 1 << 2,

    Construction    = 1 << 3,

    Dirty           = 1 << 4

}

/* ============================================================
 * Anchor Point
 * ============================================================
 */

export interface SketchAnchorPoint {

    id:string;

    position:Vector2;

}

/* ============================================================
 * Handle
 * ============================================================
 */

export interface SketchHandle{

    id:string;

    position:Vector2;

}

/* ============================================================
 * Bounding Box
 * ============================================================
 */

export interface SketchBoundingBox{

    min:Vector2;

    max:Vector2;

}

/* ============================================================
 * Serialized Entity
 * ============================================================
 */

export interface SerializedSketchEntity{

    id:string;

    version:number;

    type:SketchEntityType;

    flags:number;

}

/* ============================================================
 * Base Entity
 * ============================================================
 */

export abstract class SketchEntity{

    public readonly id:string;

    public readonly type:SketchEntityType;

    protected flags:number =
        SketchEntityFlags.None;

    protected version:number = 1;

    protected boundingBoxDirty = true;

    protected cachedBoundingBox?:SketchBoundingBox;

    protected constructor(
        id:string,
        type:SketchEntityType
    ){

        this.id = id;

        this.type = type;

    }

    /* =======================================================
     * Flags
     * =======================================================
     */

    public get selected():boolean{

        return (
            this.flags &
            SketchEntityFlags.Selected
        ) !== 0;

    }

    public set selected(value:boolean){

        if(value){

            this.flags |=
                SketchEntityFlags.Selected;

        }else{

            this.flags &=
                ~SketchEntityFlags.Selected;

        }

    }

    public get fixed():boolean{

        return (
            this.flags &
            SketchEntityFlags.Fixed
        ) !== 0;

    }

    public set fixed(value:boolean){

        if(value){

            this.flags |=
                SketchEntityFlags.Fixed;

        }else{

            this.flags &=
                ~SketchEntityFlags.Fixed;

        }

    }

    public get construction():boolean{

        return (
            this.flags &
            SketchEntityFlags.Construction
        ) !== 0;

    }

    public set construction(value:boolean){

        if(value){

            this.flags |=
                SketchEntityFlags.Construction;

        }else{

            this.flags &=
                ~SketchEntityFlags.Construction;

        }

    }

    public get visible():boolean{

        return (
            this.flags &
            SketchEntityFlags.Hidden
        ) === 0;

    }

    public set visible(value:boolean){

        if(value){

            this.flags &=
                ~SketchEntityFlags.Hidden;

        }else{

            this.flags |=
                SketchEntityFlags.Hidden;

        }

    }

    public get dirty():boolean{

        return (
            this.flags &
            SketchEntityFlags.Dirty
        ) !== 0;

    }

    protected setDirty():void{

        this.flags |=
            SketchEntityFlags.Dirty;

        this.boundingBoxDirty = true;

    }

    public clearDirty():void{

        this.flags &=
            ~SketchEntityFlags.Dirty;

    }

    /* =======================================================
     * Abstract Geometry Interface
     * =======================================================
     */

    abstract getPoints():readonly Vector2[];

    abstract getAnchorPoints():readonly SketchAnchorPoint[];

    abstract getHandles():readonly SketchHandle[];

    abstract move(delta:Vector2):void;

    abstract rotate(
        center:Vector2,
        angle:number
    ):void;

    abstract scale(
        center:Vector2,
        factor:number
    ):void;

    abstract clone():SketchEntity;

    abstract rebuild():void;
    /* =======================================================
     * Bounding Box
     * =======================================================
     */

    public getBoundingBox(): SketchBoundingBox {

        if (
            !this.boundingBoxDirty &&
            this.cachedBoundingBox
        ) {
            return this.cachedBoundingBox;
        }

        const points = this.getPoints();

        if (points.length === 0) {

            this.cachedBoundingBox = {

                min: new Vector2(0, 0),

                max: new Vector2(0, 0)

            };

            this.boundingBoxDirty = false;

            return this.cachedBoundingBox;

        }

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;

        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;

        for (const p of points) {

            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;

            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;

        }

        this.cachedBoundingBox = {

            min: new Vector2(minX, minY),

            max: new Vector2(maxX, maxY)

        };

        this.boundingBoxDirty = false;

        return this.cachedBoundingBox;

    }

    /* =======================================================
     * Closest Point
     * =======================================================
     */

    public closestPoint(
        point: Vector2
    ): Vector2 {

        let best = this.getPoints()[0].clone();

        let bestDistance = Number.MAX_VALUE;

        for (const p of this.getPoints()) {

            const d = p.distanceTo(point);

            if (d < bestDistance) {

                bestDistance = d;

                best = p.clone();

            }

        }

        return best;

    }

    /* =======================================================
     * Distance
     * =======================================================
     */

    public distanceTo(
        point: Vector2
    ): number {

        return this.closestPoint(point)
            .distanceTo(point);

    }

    /* =======================================================
     * Projection
     * =======================================================
     */

    public projectPoint(
        point: Vector2
    ): Vector2 {

        return this.closestPoint(point);

    }

    /* =======================================================
     * Hit Test
     * =======================================================
     */

    public hitTest(
        point: Vector2,
        tolerance = 8
    ): boolean {

        return (
            this.distanceTo(point) <= tolerance
        );

    }

    /* =======================================================
     * Handle Queries
     * =======================================================
     */

    public findNearestHandle(
        point: Vector2,
        tolerance = 10
    ): SketchHandle | null {

        let result: SketchHandle | null = null;

        let best = Number.MAX_VALUE;

        for (const h of this.getHandles()) {

            const d = h.position.distanceTo(point);

            if (
                d < tolerance &&
                d < best
            ) {

                best = d;

                result = h;

            }

        }

        return result;

    }

    public findNearestAnchor(
        point: Vector2,
        tolerance = 10
    ): SketchAnchorPoint | null {

        let result: SketchAnchorPoint | null = null;

        let best = Number.MAX_VALUE;

        for (const a of this.getAnchorPoints()) {

            const d = a.position.distanceTo(point);

            if (
                d < tolerance &&
                d < best
            ) {

                best = d;

                result = a;

            }

        }

        return result;

    }

    /* =======================================================
     * Selection Helpers
     * =======================================================
     */

    public select(): void {

        this.selected = true;

    }

    public deselect(): void {

        this.selected = false;

    }

    public toggleSelection(): void {

        this.selected = !this.selected;

    }

    /* =======================================================
     * Visibility
     * =======================================================
     */

    public hide(): void {

        this.visible = false;

    }

    public show(): void {

        this.visible = true;

    }

    /* =======================================================
     * Fixed State
     * =======================================================
     */

    public lock(): void {

        this.fixed = true;

    }

    public unlock(): void {

        this.fixed = false;

    }
    /* =======================================================
     * Serialization
     * =======================================================
     */

    public serialize(): SerializedSketchEntity {

        return {

            id: this.id,

            version: this.version,

            type: this.type,

            flags: this.flags

        };

    }

    /* =======================================================
     * Restore Common State
     * =======================================================
     */

    protected restoreBaseState(
        data: SerializedSketchEntity
    ): void {

        this.flags = data.flags;

        this.version = data.version;

        this.boundingBoxDirty = true;

        this.cachedBoundingBox = undefined;

    }

    /* =======================================================
     * Versioning
     * =======================================================
     */

    protected touch(): void {

        this.version++;

        this.setDirty();

    }

    public getVersion(): number {

        return this.version;

    }

    /* =======================================================
     * Common Transform Helpers
     * =======================================================
     */

    protected translatePoint(
        point: Vector2,
        delta: Vector2
    ): void {

        point.add(delta);

    }

    protected rotatePoint(
        point: Vector2,
        center: Vector2,
        angle: number
    ): void {

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        const dx = point.x - center.x;
        const dy = point.y - center.y;

        point.x =
            center.x +
            dx * cos -
            dy * sin;

        point.y =
            center.y +
            dx * sin +
            dy * cos;

    }

    protected scalePoint(
        point: Vector2,
        center: Vector2,
        factor: number
    ): void {

        point.x =
            center.x +
            (point.x - center.x) * factor;

        point.y =
            center.y +
            (point.y - center.y) * factor;

    }

    /* =======================================================
     * Utility
     * =======================================================
     */

    public canModify(): boolean {

        return !this.fixed;

    }

    public invalidateGeometry(): void {

        this.boundingBoxDirty = true;

        this.cachedBoundingBox = undefined;

        this.touch();

    }

    /* =======================================================
     * Equality
     * =======================================================
     */

    public equals(
        other: SketchEntity
    ): boolean {

        return this.id === other.id;

    }

    /* =======================================================
     * Debug
     * =======================================================
     */

    public debugInfo() {

        return {

            id: this.id,

            type: SketchEntityType[this.type],

            version: this.version,

            flags: this.flags,

            visible: this.visible,

            selected: this.selected,

            fixed: this.fixed,

            construction: this.construction,

            boundingBox: this.getBoundingBox()

        };

    }

}

/* ============================================================
 * Sketch Point
 * ============================================================
 */

export class SketchPoint extends SketchEntity {

    public position: Vector2;

    constructor(
        id: string,
        position: Vector2
    ) {

        super(
            id,
            SketchEntityType.Point
        );

        this.position = position.clone();

    }

    public getPoints(): readonly Vector2[] {

        return [this.position];

    }

    public getAnchorPoints(): readonly SketchAnchorPoint[] {

        return [

            {

                id: `${this.id}:P`,

                position: this.position

            }

        ];

    }

    public getHandles(): readonly SketchHandle[] {

        return [

            {

                id: `${this.id}:H`,

                position: this.position

            }

        ];

    }

    public move(
        delta: Vector2
    ): void {

        if (!this.canModify()) return;

        this.translatePoint(
            this.position,
            delta
        );

        this.invalidateGeometry();

    }

    public rotate(
        center: Vector2,
        angle: number
    ): void {

        if (!this.canModify()) return;

        this.rotatePoint(
            this.position,
            center,
            angle
        );

        this.invalidateGeometry();

    }

    public scale(
        center: Vector2,
        factor: number
    ): void {

        if (!this.canModify()) return;

        this.scalePoint(
            this.position,
            center,
            factor
        );

        this.invalidateGeometry();

    }

    public clone(): SketchEntity {

        const p = new SketchPoint(
            crypto.randomUUID(),
            this.position
        );

        p.restoreBaseState(
            this.serialize()
        );

        return p;

    }

    public rebuild(): void {

        this.clearDirty();

    }

    public override serialize(): any {

        return {

            ...super.serialize(),

            position: {

                x: this.position.x,

                y: this.position.y

            }

        };

    }

}
/* ============================================================
 * Sketch Line
 * ============================================================
 */

export class SketchLine extends SketchEntity {

    public start: Vector2;

    public end: Vector2;

    constructor(
        id: string,
        start: Vector2,
        end: Vector2
    ) {

        super(
            id,
            SketchEntityType.Line
        );

        this.start = start.clone();
        this.end = end.clone();

    }

    /* =======================================================
     * Geometry
     * =======================================================
     */

    public override getPoints(): readonly Vector2[] {

        return [
            this.start,
            this.end
        ];

    }

    public override getAnchorPoints(): readonly SketchAnchorPoint[] {

        return [

            {
                id: `${this.id}:S`,
                position: this.start
            },

            {
                id: `${this.id}:E`,
                position: this.end
            }

        ];

    }

    public override getHandles(): readonly SketchHandle[] {

        return [

            {
                id: `${this.id}:S`,
                position: this.start
            },

            {
                id: `${this.id}:E`,
                position: this.end
            }

        ];

    }

    /* =======================================================
     * Metrics
     * =======================================================
     */

    public length(): number {

        return this.start.distanceTo(
            this.end
        );

    }

    public direction(): Vector2 {

        return new Vector2(

            this.end.x - this.start.x,

            this.end.y - this.start.y

        ).normalize();

    }

    public midpoint(): Vector2 {

        return new Vector2(

            (this.start.x + this.end.x) * 0.5,

            (this.start.y + this.end.y) * 0.5

        );

    }

    /* =======================================================
     * Closest Point
     * =======================================================
     */

    public override closestPoint(
        point: Vector2
    ): Vector2 {

        const ax = this.start.x;
        const ay = this.start.y;

        const bx = this.end.x;
        const by = this.end.y;

        const abx = bx - ax;
        const aby = by - ay;

        const apx = point.x - ax;
        const apy = point.y - ay;

        const ab2 =
            abx * abx +
            aby * aby;

        if (ab2 === 0) {

            return this.start.clone();

        }

        let t =
            (
                apx * abx +
                apy * aby
            ) / ab2;

        t = Math.max(
            0,
            Math.min(
                1,
                t
            )
        );

        return new Vector2(

            ax + abx * t,

            ay + aby * t

        );

    }

    public override distanceTo(
        point: Vector2
    ): number {

        return this.closestPoint(
            point
        ).distanceTo(
            point
        );

    }

    /* =======================================================
     * Transform
     * =======================================================
     */

    public override move(
        delta: Vector2
    ): void {

        if (!this.canModify())
            return;

        this.translatePoint(
            this.start,
            delta
        );

        this.translatePoint(
            this.end,
            delta
        );

        this.invalidateGeometry();

    }

    public override rotate(
        center: Vector2,
        angle: number
    ): void {

        if (!this.canModify())
            return;

        this.rotatePoint(
            this.start,
            center,
            angle
        );

        this.rotatePoint(
            this.end,
            center,
            angle
        );

        this.invalidateGeometry();

    }

    public override scale(
        center: Vector2,
        factor: number
    ): void {

        if (!this.canModify())
            return;

        this.scalePoint(
            this.start,
            center,
            factor
        );

        this.scalePoint(
            this.end,
            center,
            factor
        );

        this.invalidateGeometry();

    }

    /* =======================================================
     * Clone
     * =======================================================
     */

    public override clone(): SketchEntity {

        const line =
            new SketchLine(

                crypto.randomUUID(),

                this.start,

                this.end

            );

        line.restoreBaseState(
            this.serialize()
        );

        return line;

    }

    /* =======================================================
     * Rebuild
     * =======================================================
     */

    public override rebuild(): void {

        this.clearDirty();

    }

    /* =======================================================
     * Serialization
     * =======================================================
     */

    public override serialize(): any {

        return {

            ...super.serialize(),

            start: {

                x: this.start.x,

                y: this.start.y

            },

            end: {

                x: this.end.x,

                y: this.end.y

            }

        };

    }

}
/* ============================================================
 * SketchCircle
 * ============================================================
 */

export class SketchCircle extends SketchEntity {

    public center: Vector2;

    public radius: number;

    constructor(
        id: string,
        center: Vector2,
        radius: number
    ) {

        super(
            id,
            SketchEntityType.Circle
        );

        this.center = center.clone();

        this.radius = radius;

    }

    /* =======================================================
     * Geometry
     * =======================================================
     */

    public override getPoints(): readonly Vector2[] {

        return [
            this.center
        ];

    }

    public override getAnchorPoints(): readonly SketchAnchorPoint[] {

        return [

            {

                id: `${this.id}:CENTER`,

                position: this.center

            }

        ];

    }

    public override getHandles(): readonly SketchHandle[] {

        return [

            {

                id: `${this.id}:CENTER`,

                position: this.center

            },

            {

                id: `${this.id}:RADIUS`,

                position: new Vector2(

                    this.center.x + this.radius,

                    this.center.y

                )

            }

        ];

    }

    /* =======================================================
     * Closest Point
     * =======================================================
     */

    public override closestPoint(
        point: Vector2
    ): Vector2 {

        const dir = new Vector2(

            point.x - this.center.x,

            point.y - this.center.y

        );

        if (
            dir.length() === 0
        ) {

            return new Vector2(

                this.center.x + this.radius,

                this.center.y

            );

        }

        dir.normalize();

        return new Vector2(

            this.center.x +
            dir.x * this.radius,

            this.center.y +
            dir.y * this.radius

        );

    }

    public override distanceTo(
        point: Vector2
    ): number {

        return Math.abs(

            this.center.distanceTo(point)

            - this.radius

        );

    }

    /* =======================================================
     * Transform
     * =======================================================
     */

    public override move(
        delta: Vector2
    ): void {

        if (!this.canModify())
            return;

        this.translatePoint(
            this.center,
            delta
        );

        this.invalidateGeometry();

    }

    public override rotate(
        center: Vector2,
        angle: number
    ): void {

        if (!this.canModify())
            return;

        this.rotatePoint(
            this.center,
            center,
            angle
        );

        this.invalidateGeometry();

    }

    public override scale(
        center: Vector2,
        factor: number
    ): void {

        if (!this.canModify())
            return;

        this.scalePoint(
            this.center,
            center,
            factor
        );

        this.radius *= factor;

        this.invalidateGeometry();

    }

    /* =======================================================
     * Clone
     * =======================================================
     */

    public override clone(): SketchEntity {

        const c =
            new SketchCircle(

                crypto.randomUUID(),

                this.center,

                this.radius

            );

        c.restoreBaseState(
            this.serialize()
        );

        return c;

    }

    public override rebuild(): void {

        this.clearDirty();

    }

    public override serialize(): any {

        return {

            ...super.serialize(),

            center: {

                x: this.center.x,

                y: this.center.y

            },

            radius: this.radius

        };

    }

}

/* ============================================================
 * SketchArc
 * ============================================================
 */

export class SketchArc extends SketchEntity {

    public center: Vector2;

    public radius: number;

    public startAngle: number;

    public endAngle: number;

    constructor(

        id: string,

        center: Vector2,

        radius: number,

        startAngle: number,

        endAngle: number

    ) {

        super(
            id,
            SketchEntityType.Arc
        );

        this.center = center.clone();

        this.radius = radius;

        this.startAngle = startAngle;

        this.endAngle = endAngle;

    }

    public override getPoints(): readonly Vector2[] {

        return [

            this.center,

            this.getStartPoint(),

            this.getEndPoint()

        ];

    }

    public override getAnchorPoints(): readonly SketchAnchorPoint[] {

        return [

            {

                id: `${this.id}:CENTER`,

                position: this.center

            },

            {

                id: `${this.id}:START`,

                position: this.getStartPoint()

            },

            {

                id: `${this.id}:END`,

                position: this.getEndPoint()

            }

        ];

    }

    public override getHandles(): readonly SketchHandle[] {

        return this.getAnchorPoints().map(a => ({

            id: a.id,

            position: a.position

        }));

    }

    private getStartPoint(): Vector2 {

        return new Vector2(

            this.center.x +
            Math.cos(this.startAngle) *
            this.radius,

            this.center.y +
            Math.sin(this.startAngle) *
            this.radius

        );

    }

    private getEndPoint(): Vector2 {

        return new Vector2(

            this.center.x +
            Math.cos(this.endAngle) *
            this.radius,

            this.center.y +
            Math.sin(this.endAngle) *
            this.radius

        );

    }
    /* =======================================================
     * Closest Point
     * =======================================================
     */

    public override closestPoint(
        point: Vector2
    ): Vector2 {

        let angle = Math.atan2(
            point.y - this.center.y,
            point.x - this.center.x
        );

        // açıyı ark aralığına sınırla
        angle = this.clampAngle(angle);

        return new Vector2(

            this.center.x +
                Math.cos(angle) * this.radius,

            this.center.y +
                Math.sin(angle) * this.radius

        );

    }

    public override distanceTo(
        point: Vector2
    ): number {

        return this.closestPoint(point)
            .distanceTo(point);

    }

    /* =======================================================
     * Transform
     * =======================================================
     */

    public override move(
        delta: Vector2
    ): void {

        if (!this.canModify())
            return;

        this.translatePoint(
            this.center,
            delta
        );

        this.invalidateGeometry();

    }

    public override rotate(
        center: Vector2,
        angle: number
    ): void {

        if (!this.canModify())
            return;

        this.rotatePoint(
            this.center,
            center,
            angle
        );

        this.startAngle += angle;
        this.endAngle += angle;

        this.invalidateGeometry();

    }

    public override scale(
        center: Vector2,
        factor: number
    ): void {

        if (!this.canModify())
            return;

        this.scalePoint(
            this.center,
            center,
            factor
        );

        this.radius *= factor;

        this.invalidateGeometry();

    }

    /* =======================================================
     * Utilities
     * =======================================================
     */

    private clampAngle(
        angle: number
    ): number {

        let a = angle;

        while (a < 0)
            a += Math.PI * 2;

        while (a >= Math.PI * 2)
            a -= Math.PI * 2;

        let start = this.startAngle;
        let end = this.endAngle;

        while (start < 0)
            start += Math.PI * 2;

        while (end < 0)
            end += Math.PI * 2;

        while (start >= Math.PI * 2)
            start -= Math.PI * 2;

        while (end >= Math.PI * 2)
            end -= Math.PI * 2;

        if (start <= end) {

            if (a < start)
                return start;

            if (a > end)
                return end;

            return a;

        }

        // açı 0°'ı geçiyor

        if (
            a >= start ||
            a <= end
        ) {

            return a;

        }

        const ds =
            Math.abs(a - start);

        const de =
            Math.abs(a - end);

        return ds < de
            ? start
            : end;

    }

    /* =======================================================
     * Clone
     * =======================================================
     */

    public override clone(): SketchEntity {

        const arc =
            new SketchArc(

                crypto.randomUUID(),

                this.center,

                this.radius,

                this.startAngle,

                this.endAngle

            );

        arc.restoreBaseState(
            this.serialize()
        );

        return arc;

    }

    /* =======================================================
     * Rebuild
     * =======================================================
     */

    public override rebuild(): void {

        this.clearDirty();

    }

    /* =======================================================
     * Serialization
     * =======================================================
     */

    public override serialize(): any {

        return {

            ...super.serialize(),

            center: {

                x: this.center.x,

                y: this.center.y

            },

            radius: this.radius,

            startAngle: this.startAngle,

            endAngle: this.endAngle

        };

    }

}