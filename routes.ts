import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, Express } from "express";

import { PlantSystem } from "./components/PlantSystem";

export const init = (app: Express, plantSystem: PlantSystem) => {
    app.use(bodyParser.json());
    app.use(cors<Request>());

    app.get('/ping', (_req: Request, res: Response) => {
        res.send(`pong`)
    });

}