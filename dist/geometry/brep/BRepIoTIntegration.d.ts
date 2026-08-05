export type IoTProtocol = "MQTT" | "HTTP" | "OPC_UA" | "WEBSOCKET";
export interface IoTDevice {
    id: string;
    name: string;
    protocol: IoTProtocol;
    connected: boolean;
}
export interface TelemetryData {
    device: string;
    sensor: string;
    value: number;
    unit: string;
    timestamp: number;
}
export interface IoTEvent {
    type: string;
    message: string;
    timestamp: number;
}
export interface IoTStatus {
    connectedDevices: number;
    dataPoints: number;
    online: boolean;
}
export declare class BRepIoTIntegration {
    devices: IoTDevice[];
    telemetry: TelemetryData[];
    events: IoTEvent[];
    protocol: IoTProtocol;
    connected: boolean;
    constructor();
    /**
     * IoT gateway bağlantısı
     */
    connect(protocol: IoTProtocol): void;
    /**
     * Device ekleme
     */
    registerDevice(device: IoTDevice): void;
    /**
     * Sensör verisi alma
     */
    receiveTelemetry(data: TelemetryData): void;
    /**
     * Veri işleme
     */
    processData(data: TelemetryData): void;
    /**
     * Digital Twin senkronizasyonu
     */
    syncDigitalTwin(twin: any): void;
    /**
     * Gerçek zamanlı stream
     */
    startStream(): {
        active: boolean;
        protocol: IoTProtocol;
    };
    /**
     * Edge processing
     */
    edgeCompute(): {
        processed: number;
        latency: string;
    };
    /**
     * Cloud senkronizasyonu
     */
    cloudSync(): {
        uploaded: number;
        status: string;
    };
    /**
     * Predictive analytics
     */
    analyze(): {
        average: number;
        anomaly: boolean;
    };
    /**
     * Event listesi
     */
    getEvents(): IoTEvent[];
    /**
     * Status
     */
    status(): IoTStatus;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        protocol: IoTProtocol;
        devices: number;
        status: string;
    };
}
