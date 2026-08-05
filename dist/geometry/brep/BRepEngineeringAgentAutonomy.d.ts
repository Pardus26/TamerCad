export type AutonomyState = "OFFLINE" | "OBSERVING" | "REASONING" | "ACTING" | "LEARNING" | "AUTONOMOUS";
export interface AutonomousGoal {
    id: string;
    description: string;
    priority: number;
    generatedBy: string;
}
export interface AutonomousDecision {
    goal: string;
    decision: string;
    confidence: number;
    reasoning: string;
}
export interface EnvironmentState {
    conditions: any;
    constraints: any;
    opportunities: any;
}
export interface AutonomousAction {
    action: string;
    target: string;
    status: string;
}
export declare class BRepEngineeringAgentAutonomy {
    state: AutonomyState;
    goals: AutonomousGoal[];
    decisions: AutonomousDecision[];
    actions: AutonomousAction[];
    memory: any[];
    autonomous: boolean;
    constructor();
    /**
     * Otonom sistemi aç
     */
    activate(): {
        active: boolean;
        mode: "AUTONOMOUS";
    };
    /**
     * Çevre gözlemleme
     */
    observeEnvironment(environment: any): EnvironmentState;
    /**
     * Otonom hedef üretme
     */
    generateGoal(description: string): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        description: string;
        priority: number;
        generatedBy: string;
    };
    /**
     * Akıl yürütme
     */
    reason(goal: AutonomousGoal): AutonomousDecision;
    /**
     * Karar verme
     */
    decide(options: string[]): string;
    /**
     * Otonom aksiyon
     */
    executeAction(action: string): AutonomousAction;
    /**
     * Sürekli karar döngüsü
     */
    autonomyLoop(environment: any): {
        observation: EnvironmentState;
        goal: {
            id: `${string}-${string}-${string}-${string}-${string}`;
            description: string;
            priority: number;
            generatedBy: string;
        };
        decision: AutonomousDecision;
        action: AutonomousAction;
    };
    /**
     * Kendi kendini izleme
     */
    monitor(): {
        state: AutonomyState;
        goals: number;
        decisions: number;
        actions: number;
    };
    /**
     * Güvenlik kontrolü
     */
    safetyCheck(action: any): {
        approved: boolean;
        checkedBy: string;
    };
    /**
     * İnsan müdahalesi
     */
    humanOverride(command: string): {
        override: boolean;
        command: string;
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Otonomi raporu
     */
    report(): {
        state: AutonomyState;
        autonomous: boolean;
        goals: number;
        decisions: number;
        actions: number;
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
        state: AutonomyState;
    };
}
