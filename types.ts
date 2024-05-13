export type plantDetail = {
    pumpPin: number,
    moisturePin: number,
    frequency: number,
    waterThreshold: string,
    wateringMode: string,
    name: string,
    isOn: boolean,
    index?: number,
    five?: any
}

// TODO fix five type