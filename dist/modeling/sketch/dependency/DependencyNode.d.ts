export declare enum DependencyNodeType {
    Sketch = "Sketch",
    Entity = "Entity",
    Constraint = "Constraint",
    Profile = "Profile",
    Feature = "Feature",
    Solid = "Solid"
}
export declare enum DependencyState {
    Clean = "Clean",
    Dirty = "Dirty",
    Updating = "Updating",
    Failed = "Failed"
}
export interface DependencyMetadata {
    createdAt?: Date;
    modifiedAt?: Date;
    source?: string;
    properties?: Record<string, any>;
}
export declare class DependencyNode {
    type: DependencyNodeType;
    data?: any | undefined;
    metadata: DependencyMetadata;
    readonly id: string;
    private dependencies;
    private dependents;
    private state;
    private version;
    constructor(id: string, type: DependencyNodeType, data?: any | undefined, metadata?: DependencyMetadata);
    addDependency(node: DependencyNode): void;
    removeDependency(node: DependencyNode): void;
    addDependent(node: DependencyNode): void;
    removeDependent(node: DependencyNode): void;
    getDependencies(): DependencyNode[];
    getDependents(): DependencyNode[];
    markDirty(): void;
    markClean(): void;
    isDirty(): boolean;
    getState(): DependencyState;
    getVersion(): number;
    update(): void;
    dependsOn(node: DependencyNode): boolean;
    toJSON(): object;
}
