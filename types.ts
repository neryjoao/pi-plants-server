import { WATERING_MODES, DAYS_OF_THE_WEEK } from "./src/CONSTANTS";

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
    wateringSchedule: WateringSchedule
};

export type WateringSchedule = {
    regularWatering: boolean,
    repetitionPerDay?: number,	// if regularWatering is true
    timeWateringInSec?: number	// if regularWatering is true
    customSchedule: CustomSchedule[] // if regularWatering is false
};

export type CustomSchedule = {
    everyDay: boolean,
    dayOfTheWeek?: DayOfTheWeek,
    timeOfTheDay: string,
    timeWateringInSec: number
};

type DayOfTheWeek = typeof DAYS_OF_THE_WEEK[number];

export type WateringMode = typeof WATERING_MODES[number];