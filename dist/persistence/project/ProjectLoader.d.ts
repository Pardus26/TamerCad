import { Project } from "./Project";
import { PersistenceManager } from "../core/PersistenceManager";
import { FileReader } from "../io/FileReader";
export interface LoadProjectResult {
    success: boolean;
    project?: Project;
    path: string;
    error?: Error;
}
export declare class ProjectLoader {
    private persistence;
    private reader;
    constructor(persistence: PersistenceManager, reader: FileReader);
    load(path: string): Promise<LoadProjectResult>;
}
