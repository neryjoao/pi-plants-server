import { plantDetail } from "../types";
import { MoistureSensor } from "./MoistureSensor";

import {Pump} from './Pump'

export class Pot {
    private pump;
    private moistureSensor;
    
    constructor({moisturePin, pumpPin}:plantDetail) {
        this.pump = new Pump(pumpPin);
        this.moistureSensor = new MoistureSensor(moisturePin);
    }


}