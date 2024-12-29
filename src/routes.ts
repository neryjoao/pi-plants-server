import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction, Express } from "express";

import {PLANT_FIELDS} from './CONSTANTS';
import {updatePlantRecords} from './helpers/dataHelper';
import {isValidWateringMode} from './middlewares';
import { wateringScheduleSchema } from "../doc/validations";

import { initDocs } from "./docs";

const {NAME, WATERING_MODE, THRESHOLD, IS_ON} = PLANT_FIELDS;

import { PlantSystem } from "./components/PlantSystem";

export const init = async (app: Express, plantSystem: PlantSystem) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors<Request>());

    await initDocs(app);

    app.get('/ping', (_req: Request, res: Response) => {
        res.send(`pong`)
    });

    const updateAndGetPlants = () => {
        const plantDetails = plantSystem.getPlantsDetails();
        updatePlantRecords(plantDetails);
        return plantDetails;
    };

    // To create server sent event:
    const useServerSentEventsMiddleware = (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next();
    };

    // GET stream of plant details
    app.get(`/plantDetails`, useServerSentEventsMiddleware, (req: Request, res: Response) => {
        setInterval(() => {
            const data = plantSystem.getPlantsDetails();
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        }, 5000)
    });

    // static GET plant details
    app.get(`/plantDetailsStatic`, (req: Request, res: Response) => {
        const data = plantSystem.getPlantsDetails();
        res.json(data);
    });


    //update: name, watering mode, water threshold
    app.post(`/:plantId/name/:updatedName`, (req: Request, res: Response): void => {
            const {plantId, updatedName} = req.params;
            plantSystem.updateName(plantId, updatedName);

            res.json(updateAndGetPlants());
    });

    // POST update watering mode
    app.post(`/:plantId/wateringMode/:wateringMode`, isValidWateringMode, (req: Request, res: Response): void => {
        const {plantId, wateringMode} = req.params;
        // validate wateringMode
        plantSystem.updateWateringMode(plantId, wateringMode);

        res.json(updateAndGetPlants());
    });


    // POST pump toggle
    app.post(`/:plantId/togglePump`, (req: Request, res: Response) => {
        const {plantId} = req.params;
        plantSystem.togglePump(plantId);

        res.json(updateAndGetPlants());
    });

    app.post(`/:plantId/setPumpOn`, (req: Request, res: Response) => {
        const {plantId} = req.params;
        plantSystem.setPumpOn(plantId, true);

        res.json(updateAndGetPlants());
    });

    app.post(`/:plantId/setPumpOff`, (req: Request, res: Response) => {
        const {plantId} = req.params;
        plantSystem.setPumpOn(plantId, false);

        res.json(updateAndGetPlants());
    });


    // POST update waterThreshold
    app.post(`/:plantId/setThreshold/:threshold`, (req: Request, res: Response) => {
        const {plantId, threshold} = req.params;
        plantSystem.setThreshold(plantId, parseInt(threshold));

        res.json(updateAndGetPlants());
    });

    // POST update watering schedule
    app.post(`/:plantId/setWateringSchedule`, (req: Request, res: Response) => {
        const {plantId} = req.params;
        const wateringSchedule = wateringScheduleSchema.parse(req.body);

        plantSystem.setWateringSchedule(plantId, wateringSchedule);

        res.json(updateAndGetPlants());
    });

    // todo add error handeler
    

}