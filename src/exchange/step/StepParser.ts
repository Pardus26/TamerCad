export interface StepEntity {

    id: number;

    type: string;

    rawParameters: string;

}

export interface StepHeader {

    fileDescription?: string;

    fileName?: string;

    fileSchema?: string;

}

export interface StepModel {

    header: StepHeader;

    entities: StepEntity[];

    fileName?: string;

}

export class StepParser {

    parse(content: string): StepModel {

        const normalized =

            content.replace(/\r\n/g, "\n");

        const header =

            this.parseHeader(normalized);

        const entities =

            this.parseEntities(normalized);

        return {

            header,

            entities,

            fileName:

                this.extractFileName(

                    header.fileName

                )

        };

    }

    private parseHeader(

        text: string

    ): StepHeader {

        const header: StepHeader = {};

        const headerMatch =

            text.match(

                /HEADER;(.*?)ENDSEC;/s

            );

        if (!headerMatch) {

            return header;

        }

        const section =

            headerMatch[1];

        const desc =

            section.match(

                /FILE_DESCRIPTION\s*(.*?);/s

            );

        if (desc) {

            header.fileDescription =

                desc[1];

        }

        const fileName =

            section.match(

                /FILE_NAME\s*(.*?);/s

            );

        if (fileName) {

            header.fileName =

                fileName[1];

        }

        const schema =

            section.match(

                /FILE_SCHEMA\s*(.*?);/s

            );

        if (schema) {

            header.fileSchema =

                schema[1];

        }

        return header;

    }

    private parseEntities(

        text: string

    ): StepEntity[] {

        const result: StepEntity[] = [];

        const dataMatch =

            text.match(

                /DATA;(.*?)ENDSEC;/s

            );

        if (!dataMatch) {

            return result;

        }

        const data =

            dataMatch[1];

        const regex =

            /#(\d+)\s*=\s*([A-Z0-9_]+)\s*(.*?);/gs;

        let match:

            RegExpExecArray | null;

        while (

            (match = regex.exec(data))

            !== null

        ) {

            result.push({

                id:

                    Number(match[1]),

                type:

                    match[2],

                rawParameters:

                    match[3]

            });

        }

        return result;

    }

    private extractFileName(

        value?: string

    ): string | undefined {

        if (!value) {

            return undefined;

        }

        const match =

            value