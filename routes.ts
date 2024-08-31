import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction, Express } from "express";

import {PLANT_FIELDS} from './CONSTANTS';
import {updateNameRecord} from './helpers/dataHelper';

const {NAME, WATERING_MODE, THRESHOLD, IS_ON} = PLANT_FIELDS;

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
    });

    //update: name, watering mode, water threshold
    app.post(`/:plantId/name/:updatedName`, (req: Request, res: Response) => {
        try {
            const {plantId, updatedName} = req.params;
            plantSystem.updateName(plantId, updatedName);
            const plantDetails = updateNameRecord(plantId, updatedName);


            res.json(plantDetails);
        }
        catch (error) {
            res.status(500).send();
        };
    });

    // POST update watering mode
    // POST update waterThreshold
    // POST turn on/off
    

}