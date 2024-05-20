import { PlantDetail, WateringMode } from "../types";
import { MoistureSensor } from "./MoistureSensor";

import {Pump} from './Pump'

export class Pot {
    private pump: Pump;
    private moistureSensor: MoistureSensor;
    private wateringMode: WateringMode;
    private name: string;
    private waterThreshold: number
    
    constructor({moisturePin, pumpPin, wateringMode, name, waterThreshold, isOn}: PlantDetail) {
        this.pump = new Pump(pumpPin, isOn);
        this.moistureSensor = new MoistureSensor(moisturePin);

        this.wateringMode = wateringMode;
        this.name = name;
        this.waterThreshold = waterThreshold;
    };

    getWateringMode = (): WateringMode => this.wateringMode;

    getName = (): string => this.name;

    getWaterThreshold = (): number => this.waterThreshold;

    getIsOn = (): boolean => this.pump.getIsOn();

    getMoistureLevel = (): number | undefined => this.moistureSensor.getMoistureLevel();




}