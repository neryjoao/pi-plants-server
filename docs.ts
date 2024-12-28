import swaggerParser from '@apidevtools/swagger-parser';
import express from 'express';
import path from 'path'
import { serve, setup} from 'swagger-ui-express';
import {read} from 'yaml-import';

export const initDocs = async (app: express.Application): Promise<void> => {
    const swaggerDocument = read(path.join(process.cwd(), `doc`, `root.yml`));
    const apiDocs = await swaggerParser.validate(swaggerDocument);
    const swaggerUI = setup(apiDocs, {
        swaggerOptions: {
            displayRequestDuration: true,
            filter: true
        }
    });
    app.use(`/swagger`, serve, swaggerUI);
}