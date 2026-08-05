export type AgentMessageType = "REQUEST" | "RESPONSE" | "INFORMATION" | "WARNING" | "CONSENSUS" | "NEGOTIATION";
export interface AgentMessage {
    id: string;
    sender: string;
    receiver: string;
    type: AgentMessageType;
    content: any;
    timestamp: number;
}
export interface SharedEngineeringContext {
    problem: string;
    geometry: any;
    simulation: any;
    decisions: any[];
}
export interface CommunicationEvent {
    message: AgentMessage;
    processed: boolean;
}
export interface NegotiationResult {
    agreement: boolean;
    decision: string;
    participants: string[];
}
export declare class BRepEngineeringAgentCommunication {
    messages: AgentMessage[];
    events: CommunicationEvent[];
    context: SharedEngineeringContext;
    memory: any[];
    constructor();
    /**
     * Mesaj gönderme
     */
    send(message: AgentMessage): AgentMessage;
    /**
     * Mesaj alma
     */
    receive(agent: string): AgentMessage[];
    /**
     * Agent cevabı
     */
    reply(sender: string, receiver: string, content: any): AgentMessage;
    /**
     * Bilgi paylaşımı
     */
    broadcast(sender: string, content: any): void;
    /**
     * Ortak mühendislik hafızası
     */
    updateContext(context: Partial<SharedEngineeringContext>): void;
    /**
     * Ortak bağlam okuma
     */
    getContext(): SharedEngineeringContext;
    /**
     * Uyarı gönderme
     */
    warn(sender: string, receiver: string, warning: string): AgentMessage;
    /**
     * Agent müzakeresi
     */
    negotiate(participants: string[]): NegotiationResult;
    /**
     * Consensus mesajı
     */
    createConsensus(decision: any): AgentMessage;
    /**
     * Mesaj önceliği
     */
    prioritize(): AgentMessage[];
    /**
     * Event işleme
     */
    processEvents(): {
        processed: number;
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    status(): {
        messages: number;
        events: number;
        memory: number;
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
        status: string;
    };
}
