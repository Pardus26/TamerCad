// src/render/Scene.ts

export interface SceneNode {

    id: string;

    name: string;

    visible: boolean;

    selectable: boolean;

    render(): void;

    update(deltaTime: number): void;
}

export class Scene {

    private nodes: Map<string, SceneNode>;

    constructor() {

        this.nodes = new Map();

        this.initializeDefaults();
    }

    /**
     * Varsayılan sahne
     */
    private initializeDefaults(): void {

        /*
            Future:

            Grid

            World Axis

            Origin

            Construction Plane
        */
    }

    /**
     * Node ekle
     */
    public add(node: SceneNode): void {

        this.nodes.set(
            node.id,
            node
        );
    }

    /**
     * Node kaldır
     */
    public remove(id: string): boolean {

        return this.nodes.delete(id);
    }

    /**
     * Node bul
     */
    public find(id: string): SceneNode | undefined {

        return this.nodes.get(id);
    }

    /**
     * Sahneyi güncelle
     */
    public update(deltaTime: number): void {

        for (const node of this.nodes.values()) {

            node.update(deltaTime);

        }
    }

    /**
     * Sahneyi render et
     */
    public render(): void {

        for (const node of this.nodes.values()) {

            if (!node.visible) {
                continue;
            }

            node.render();
        }
    }

    /**
     * Tüm node'lar
     */
    public getNodes(): SceneNode[] {

        return Array.from(
            this.nodes.values()
        );
    }

    /**
     * Temizle
     */
    public clear(): void {

        this.nodes.clear();

        this.initializeDefaults();
    }

    /**
     * Görünür node sayısı
     */
    public visibleCount(): number {

        let count = 0;

        for (const node of this.nodes.values()) {

            if (node.visible) {
                count++;
            }

        }

        return count;
    }

    /**
     * Toplam node sayısı
     */
    public size(): number {

        return this.nodes.size;
    }
}