import { WATERING_MODES } from "./CONSTANTS";

export type PlantDetail = PlantDetailShort & {
    pumpPin: number,
    moisturePin: number,
    frequency: number
};

export type PlantDetailShort = {
    id: string,
    waterThreshold: number,
    wateringMode: WateringMode,
    name: string,
    isOn: boolean,
    moistureLevel: number,
    wateringSchedule?: WateringSchedule
};

export type WateringSchedule = {
    constantPeriodicWatering: boolean,
    repetitionPerDay?: number,	// if constantPeriodicWatering is true
    timeWateringInSec?: number	// if constantPeriodicWatering is true
    customSchedule?: CustomSchedule[] // if constantPeriodicWatering is false
};

type CustomSchedule = {
    everyDay: boolean,
    dayOfTheWeek?: DayOfTheWeek,
    timeOfTheDay: string,
    timeWateringInSec: number
};

type DayOfTheWeek = `MONDAY` | `TUESDAY` | `WEDNESDAY` | `THURSDAY` | `FRIDAY` | `SATURDAY` | `SUNDAY`;

export type WateringMode = typeof WATERING_MODES[number];