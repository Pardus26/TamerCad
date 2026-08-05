export type CopilotMode = "CHAT" | "ASSIST" | "AUTONOMOUS";
export type CopilotCapability = "CAD" | "CAE" | "CAM" | "DFM" | "OPTIMIZATION";
export interface CopilotMessage {
    role: "USER" | "AI";
    text: string;
}
export interface CopilotCommand {
    command: string;
    parameters: any;
    executable: boolean;
}
export interface CopilotResponse {
    message: string;
    commands: CopilotCommand[];
    confidence: number;
}
export interface CopilotMemory {
    conversations: string[];
    executedCommands: string[];
    learnedPatterns: string[];
}
export declare class BRepEngineeringCopilot {
    mode: CopilotMode;
    capabilities: CopilotCapability[];
    messages: CopilotMessage[];
    memory: CopilotMemory;
    active: boolean;
    constructor();
    /**
     * Copilot modu
     */
    setMode(mode: CopilotMode): void;
    /**
     * Kullanıcı mesajı
     */
    receive(text: string): void;
    /**
     * Doğal dil anlama
     */
    understand(text: string): CopilotCommand[];
    /**
     * CAD yardımcısı
     */
    assistCAD(request: string): {
        action: string;
        suggestion: string;
        confidence: number;
    };
    /**
     * CAE yardımcısı
     */
    assistCAE(simulation: any): {
        issue: string;
        recommendation: string;
        confidence: number;
    };
    /**
     * CAM yardımcısı
     */
    assistCAM(geometry: any): {
        process: string;
        confidence: number;
    };
    /**
     * DFM kontrolü
     */
    assistDFM(design: any): {
        manufacturable: boolean;
        warnings: never[];
        confidence: number;
    };
    /**
     * AI cevap üretimi
     */
    respond(text: string): CopilotResponse;
    /**
     * Komut çalıştırma
     */
    execute(command: CopilotCommand): {
        success: boolean;
        command: string;
    } | {
        success: boolean;
        command?: undefined;
    };
    /**
     * Tasarım açıklaması
     */
    explainDesign(design: any): {
        explanation: string;
        factors: string[];
    };
    /**
     * Öğrenme
     */
    learn(pattern: string): void;
    /**
     * Hafıza
     */
    getMemory(): CopilotMemory;
    /**
     * Durum
     */
    status(): {
        mode: CopilotMode;
        capabilities: CopilotCapability[];
        messages: number;
        active: boolean;
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        mode: CopilotMode;
        status: string;
    };
}
