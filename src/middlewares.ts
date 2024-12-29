import { WATERING_MODES } from "./CONSTANTS";
import { Request, Response, NextFunction } from "express";


export const isValidWateringMode = (req: Request, res: Response, _next: NextFunction) => {
    return WATERING_MODES.indexOf(req.params.wateringMode) !== -1;
} 