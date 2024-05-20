export type PlantDetail = PlantDetailShort & {
    pumpPin: number,
    moisturePin: number,
    frequency: number
};

export type PlantDetailShort = {
    waterThreshold: number,
    wateringMode: WateringMode,
    name: string,
    isOn: boolean,
    moistureLevel?: number
};

export type WateringMode = "MANUAL" | "AUTOMATIC" | "SCHEDULED"