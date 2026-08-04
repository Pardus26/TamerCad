// src/app/EngineBridge.ts

import {
    KernelBootstrap,
    KernelState
} from "./KernelBootstrap";

import { DocumentManager } from "../document/DocumentManager";
import { Renderer } from "../render/Renderer";
import { Scene } from "../render/Scene";

export class EngineBridge {

    private static initialized = false;

    /**
     * Kernel başlatılır
     */
    static initialize(): void {

        if (this.initialized) {
            return;
        }

        KernelBootstrap.initialize();

        this.initialized = true;
    }

    /**
     * Kernel durumu
     */
    static state(): KernelState {

        return KernelBootstrap.getState();

    }

    /**
     * Hazır mı?
     */
    static ready(): boolean {

        return KernelBootstrap.isReady();

    }

    /**
     * Renderer erişimi
     */
    static renderer(): Renderer {

        return KernelBootstrap
            .getSubsystems()
            .renderer;

    }

    /**
     * Scene erişimi
     */
    static scene(): Scene {

        return KernelBootstrap
            .getSubsystems()
            .scene;

    }

    /**
     * Document Manager erişimi
     */
    static documents(): DocumentManager {

        return KernelBootstrap
            .getSubsystems()
            .documents;

    }

    /**
     * Yeni proje
     */
    static newProject(): void {

        this.documents().createNewDocument();

    }

    /**
     * Render isteği
     */
    static render(): void {

        this.renderer().render();

    }

    /**
     * Güncelleme (Render Loop)
     */
    static update(deltaTime: number): void {

        this.renderer().update(deltaTime);

    }

    /**
     * Komut çalıştırma
     */
    static executeCommand(
        name: string,
        payload?: unknown
    ): void {

        console.log(
            "[Engine Command]",
            name,
            payload
        );

        // ileride CommandManager
    }

    /**
     * Dosya açma
     */
    static openDocument(path: string): void {

        console.log(
            "Opening:",
            path
        );

        // ileride Serializer
    }

    /**
     * Dosya kaydetme
     */
    static saveDocument(path: string): void {

        console.log(
            "Saving:",
            path
        );

        // ileride Serializer
    }

    /**
     * Kernel kapatma
     */
    static shutdown(): void {

        KernelBootstrap.shutdown();

        this.initialized = false;

    }
}