import { Project } from "./Project";
import { PersistenceManager } from "../core/PersistenceManager";
import { FileWriter } from "../io/FileWriter";
export interface SaveProjectResult {
    success: boolean;
    path: string;
    bytesWritten: number;
    error?: Error;
}
export declare class ProjectSaver {
    private persistence;
    private writer;
    constructor(persistence: PersistenceManager, writer: FileWriter);
    save(project: Project, path: string): Promise<SaveProjectResult>;
    saveCopy(project: Project, path: string): Promise<SaveProjectResult>;
}
