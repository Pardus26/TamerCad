// src/render/Scene.ts

export interface SceneObject {

    id: string;

    visible: boolean;

    selected: boolean;

    update(deltaTime: number): void;

    render(): void;
}

export class Scene {

    private readonly objects: SceneObject[] = [];

    private activeObject: SceneObject | null = null;

    private pointerPressed = false;

    public add(object: SceneObject): void {

        this.objects.push(object);
    }

    public remove(id: string): void {

        const index = this.objects.findIndex(o => o.id === id);

        if (index >= 0) {

            this.objects.splice(index, 1);
        }
    }

    public clear(): void {

        this.objects.length = 0;

        this.activeObject = null;
    }

    public getObjects(): readonly SceneObject[] {

        return this.objects;
    }

    public update(deltaTime: number): void {

        for (const object of this.objects) {

            if (!object.visible) continue;

            object.update(deltaTime);
        }
    }

    public render(): void {

        for (const object of this.objects) {

            if (!object.visible) continue;

            object.render();
        }
    }

    // -------------------------------------------------
    // Stylus / Pointer
    // -------------------------------------------------

    public pointerDown(
        x: number,
        y: number,
        pressure: number
    ): void {

        this.pointerPressed = true;

        console.debug(
            "PointerDown",
            x,
            y,
            pressure
        );
    }

    public pointerMove(
        x: number,
        y: number,
        pressure: number
    ): void {

        if (!this.pointerPressed) return;

        console.debug(
            "PointerMove",
            x,
            y,
            pressure
        );
    }

    public pointerUp(
        x: number,
        y: number
    ): void {

        this.pointerPressed = false;

        console.debug(
            "PointerUp",
            x,
            y
        );
    }

    // -------------------------------------------------
    // Selection
    // -------------------------------------------------

    public select(object: SceneObject | null): void {

        if (this.activeObject) {

            this.activeObject.selected = false;
        }

        this.activeObject = object;

        if (this.activeObject) {

            this.activeObject.selected = true;
        }
    }

    public getSelection(): SceneObject | null {

        return this.activeObject;
    }

}