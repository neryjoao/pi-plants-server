import fs from 'fs';
import { PlantDetail, PlantDetailShort } from '../types';
import { Pot } from '../components/Pot';

export const getPlantDetails = (): PlantDetail[] => {
    const path = `./data/plantDetails.json`;
    const plantDetails = fs.readFileSync(path,  'utf8');
    return JSON.parse(plantDetails);
};

export const getPotData = (pot: Pot): PlantDetailShort => {
    return {
        waterThreshold: pot.getWaterThreshold(),
		wateringMode: pot.getWateringMode(),
        moistureLevel: pot.getMoistureLevel(),
		name: pot.getName(),
		isOn: pot.getIsOn()
    }
}