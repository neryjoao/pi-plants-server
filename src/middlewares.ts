import { WATERING_MODES } from "./CONSTANTS";
import { Request, Response, NextFunction } from "express";


export const isValidWateringMode = (req: Request, _res: Response, next: NextFunction) => {
    if (!!WATERING_MODES[req.params.wateringMode]) {
        next();
    } else {
        throw new Error(`Invalid Watering mode`) // todo fix error handeling, to avoid having it spread everywhere
    }
};