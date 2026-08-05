import { Document } from "../../persistence/core/Document";
export interface STLTriangle {
    normal: [number, number, number];
    vertices: [
        [
            number,
            number,
            number
        ],
        [
            number,
            number,
            number
        ],
        [
            number,
            number,
            number
        ]
    ];
}
export declare class STLReader {
    private readonly asciiReader;
    private readonly binaryReader;
    private readonly converter;
    read(data: string | ArrayBuffer): Document;
}
