export type PlantDetail = PlantDetailShort & {
    pumpPin: number,
    moisturePin: number,
    frequency: number,
    index?: number
};

export type PlantDetailShort = {
    waterThreshold: number,
    wateringMode: WateringMode,
    name: string,
    isOn: boolean
};

export type PlantDetailForUi = PlantDetailShort & {
    moistureLevel?: number
}

export type WateringMode = "MANUAL" | "AUTOMATIC" | "SCHEDULED"