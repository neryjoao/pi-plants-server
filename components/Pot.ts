import { PlantDetail, WateringMode } from "../types";
import { MoistureSensor } from "./MoistureSensor";

import {Pump} from './Pump'

export class Pot {
    private pump: Pump;
    private moistureSensor: MoistureSensor;
    private wateringMode: WateringMode;
    private name: string;
    private waterThreshold: number;
    private id: string;
    
    constructor({id, moisturePin, pumpPin, wateringMode, name, waterThreshold, isOn}: PlantDetail) {
        this.pump = new Pump(pumpPin, isOn);
        this.moistureSensor = new MoistureSensor(moisturePin);

        this.id = id;
        this.wateringMode = wateringMode;
        this.name = name;
        this.waterThreshold = waterThreshold;
    };

    getId = (): string => this.id;

    getWateringMode = (): WateringMode => this.wateringMode;

    getName = (): string => this.name;

    getWaterThreshold = (): number => this.waterThreshold;

    getIsOn = (): boolean => this.pump.getIsOn();

    getMoistureLevel = (): number => this.moistureSensor.getMoistureLevel();

    setName = (updatedName: string) => this.name = updatedName;
}