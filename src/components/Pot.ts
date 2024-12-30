import { PlantDetail, WateringMode, WateringSchedule } from "../../types";
import { WATERING_MODES } from '../CONSTANTS';
import { MoistureSensor } from "./MoistureSensor";

import {Pump} from './Pump'

export class Pot {
    private pump: Pump;
    private moistureSensor: MoistureSensor;
    private wateringMode: WateringMode;
    private name: string;
    private waterThreshold: number;
    private id: string;
    private wateringSchedule?: WateringSchedule;
    
    constructor({id, moisturePin, pumpPin, wateringMode, name, waterThreshold, isOn, wateringSchedule}: PlantDetail) {
        this.pump = new Pump(pumpPin, isOn);
        this.moistureSensor = new MoistureSensor(moisturePin);

        this.id = id;
        this.wateringMode = wateringMode;
        this.name = name;
        this.waterThreshold = waterThreshold;
        this.wateringSchedule = wateringSchedule;

        this.moistureSensor.on(`data`, (data) => {
            // todo refine later the scale to
            const scaledData = this.moistureSensor.scaleTo(0, 100);
            console.log(`Scaled Data ${scaledData} from pot ${this.id}`);
            this.waterPlant(scaledData);
        });
    };

    getId = (): string => this.id;

    getWateringMode = (): WateringMode => this.wateringMode;

    getName = (): string => this.name;

    getWaterThreshold = (): number => this.waterThreshold;

    getIsOn = (): boolean => this.pump.getIsOn();

    getMoistureLevel = (): number => this.moistureSensor.getMoistureLevel();

    getWateringSchedule = (): WateringSchedule | undefined => this.wateringSchedule;

    setName = (updatedName: string) => this.name = updatedName;

    setWateringMode = (wateringMode: WateringMode) => this.wateringMode = wateringMode;

    setWateringSchedule = (wateringSchedule: WateringSchedule) => this.wateringSchedule = wateringSchedule;

    togglePump = () => {
        this.pump.togglePump();
    };

    setIsPumpOn = (isPumpOn: boolean) => {
        this.pump.setIsPumpOn(isPumpOn);
    };

    setWaterThreshold = (threshold: number) => {
        this.waterThreshold = threshold;
    };

    waterPlant = (moistureLevel: number) => {
        switch(this.wateringMode) {
            case WATERING_MODES[0]:
                this.automaticWatering(moistureLevel);
                break;
            case WATERING_MODES[1]:
                // do nothing
                break;
            case WATERING_MODES[1]:
                // todo
            default:
                console.log(`Invalid watering mode ${this.wateringMode}`);
        }
    }

    automaticWatering = (moistureLevel: number) => {
        if (moistureLevel < this.waterThreshold) {
            this.pump.setIsPumpOn(true);
        } else {
            this.pump.setIsPumpOn(false);
        }
    }
}