import { Feature } from "./Feature";
import { Solid } from "../../topology/core/Solid";
export declare class FeatureTree {
    name: string;
    private features;
    private activeFeature;
    constructor(name?: string);
    addFeature(feature: Feature): void;
    add(feature: Feature): void;
    removeFeature(id: string): boolean;
    remove(id: string): boolean;
    getFeature(id: string): Feature | undefined;
    find(id: string): Feature | undefined;
    getLastFeature(): Feature | null;
    setActiveFeature(id: string): boolean;
    getActiveFeature(): Feature | null;
    rebuild(): Solid | null;
    getOrdered(): Feature[];
    rollback(id: string): Solid | null;
    setEnd(feature: Feature): Solid | null;
    traverse(callback: (feature: Feature) => void): void;
    clear(): void;
    get count(): number;
}
