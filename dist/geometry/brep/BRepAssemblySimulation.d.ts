export interface Transform {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
}
export interface SimulationComponent {
    id: string;
    transform: Transform;
    active: boolean;
}
export interface MotionStep {
    component: string;
    target: Transform;
    duration: number;
}
export interface CollisionEvent {
    componentA: string;
    componentB: string;
    time: number;
}
export interface AssemblySimulationResult {
    success: boolean;
    duration: number;
    collisions: number;
    completed: boolean;
}
export declare class BRepAssemblySimulation {
    components: SimulationComponent[];
    motions: MotionStep[];
    collisions: CollisionEvent[];
    currentTime: number;
    running: boolean;
    constructor();
    /**
     * Simülasyon komponenti ekleme
     */
    addComponent(component: SimulationComponent): void;
    /**
     * Hareket adımı ekleme
     */
    addMotion(motion: MotionStep): void;
    /**
     * Simülasyonu başlatma
     */
    start(): void;
    /**
     * Simülasyon döngüsü
     */
    step(deltaTime: number): void;
    /**
     * Hareket güncelleme
     */
    updateMotion(): void;
    /**
     * Çarpışma kontrolü
     */
    detectCollisions(): void;
    /**
     * Geometrik kesişim
     */
    checkIntersection(a: SimulationComponent, b: SimulationComponent): boolean;
    /**
     * Kısıt çözümü
     */
    solveConstraints(): boolean;
    /**
     * Montaj animasyonu
     */
    animate(): {
        frames: number;
        playing: boolean;
    };
    /**
     * Digital twin snapshot
     */
    snapshot(): {
        time: number;
        components: {
            id: string;
            transform: Transform;
        }[];
    };
    /**
     * Validation
     */
    validate(): {
        valid: boolean;
        collisionCount: number;
    };
    /**
     * Simülasyon bitirme
     */
    stop(): void;
    /**
     * Sonuç
     */
    result(): AssemblySimulationResult;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        components: number;
        motions: number;
        status: string;
    };
}
