import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction, Express } from "express";

import { PlantSystem } from "./components/PlantSystem";

export const init = (app: Express, plantSystem: PlantSystem) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors<Request>());

    app.get('/ping', (_req: Request, res: Response) => {
        res.send(`pong`)
    });

    // To create server sent event:
    const useServerSentEventsMiddleware = (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next();
    };

    app.get(`/plantDetails`, useServerSentEventsMiddleware, (req: Request, res: Response) => {
        setInterval(() => {
            const data = plantSystem.getPlantsDetails();
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }, 5000)
    })
    

}