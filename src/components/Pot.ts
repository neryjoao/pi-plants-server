import { PlantDetail, WateringMode, WateringSchedule, CustomSchedule } from "../../types";
import { WATERING_MODES } from '../CONSTANTS';
import { MoistureSensor } from "./MoistureSensor";
import {DateTime, Interval} from 'luxon';

import {Pump} from './Pump'

export class Pot {
    private pump: Pump;
    private moistureSensor: MoistureSensor;
    private wateringMode: WateringMode;
    private name: string;
    private waterThreshold: number;
    private id: string;
    private wateringSchedule: WateringSchedule;
    
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
            case WATERING_MODES.AUTOMATIC:
                this.automaticWatering(moistureLevel);
                break;
            case WATERING_MODES.MANUAL:
                // do nothing
                break;
            case WATERING_MODES.SCHEDULED:
                this.scheduledWatering();
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
    };

    scheduledWatering = () => {
        const {regularWatering } = this.wateringSchedule;

        let shouldWater: boolean = false; // If I find a custom schedule where should be watering. If non is found, turn off pump

        if (regularWatering) {
            shouldWater = this.shouldWaterPlantsWithRegularWatering();
        } else {
            shouldWater = this.shouldWaterPlantsWithCustomWatering();
        }

        this.pump.setIsPumpOn(shouldWater);
    };

    shouldWaterPlantsWithRegularWatering = (): boolean => {
        const {repetitionPerDay, timeWateringInSec}  = this.wateringSchedule!;

        if (!repetitionPerDay || ! timeWateringInSec) {
            return false;
        };

        const now = DateTime.now();

        for(let i = 0; i < repetitionPerDay; i++) {
            const unformattedStartTime = i * 24 / repetitionPerDay;
            const hours = Math.floor(unformattedStartTime);
            const minutes = Math.floor((unformattedStartTime - hours) * 60);

            if (this.isWithinInterval(hours, minutes, timeWateringInSec, now)) {
                return true;
            }
        }        

        return false;
    };

    shouldWaterPlantsWithCustomWatering = (): boolean => {
        const {customSchedule}  = this.wateringSchedule!;
        const now = DateTime.now();
        const currentWeekday = now.weekdayLong.toUpperCase()

        customSchedule.forEach(watering => {
            const {everyDay, dayOfTheWeek, timeOfTheDay, timeWateringInSec} = watering;

            // todo quite ugly solution, check if its possible to do something with luxon
            const splitTime = timeOfTheDay.split(`:`);
            const hours = parseInt(splitTime[0]);
            const minutes = parseInt(splitTime[1]);

            const sameWeekDay = everyDay || currentWeekday === dayOfTheWeek?.toUpperCase();
        
            if (sameWeekDay) {
                if (this.isWithinInterval(hours, minutes, timeWateringInSec, now)) {
                    return true;
                }
            } 
        });

        return false;
    };

    isWithinInterval = (startHour: number, startMinute: number, duration: number, reference: DateTime): boolean => {
        const start = DateTime.now().set({hour: startHour, minute: startMinute, second: 0});
        const end = start.plus({seconds: duration});
        
        const interval = Interval.fromDateTimes(start, end);

        if (interval.contains(reference)) {
            return true;
        }
        return false
    }
};