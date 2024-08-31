import fs from 'fs';
import { PlantDetail, PlantDetailShort } from '../types';
import { Pot } from '../components/Pot';

import { ERRORS } from '../CONSTANTS';

const {WRITING_ERROR} = ERRORS;

const FILE_PATH = `./data/plantDetails.json`

export const getPlantDetails = (): PlantDetail[] => {
    const plantDetails = fs.readFileSync(FILE_PATH,  'utf8');
    return JSON.parse(plantDetails);
};

export const getPotData = (pot: Pot): PlantDetailShort => {
    return {
        id: pot.getId(),
        waterThreshold: pot.getWaterThreshold(),
		wateringMode: pot.getWateringMode(),
        moistureLevel: pot.getMoistureLevel(),
		name: pot.getName(),
		isOn: pot.getIsOn()
    }
};

export const updateNameRecord = (plantId: string, updatedName: string) => {
    const plantDetails = getPlantDetails();

    const plant = plantDetails.find(plant => plant.id === plantId);
    if (plant) {
        plant.name = updatedName;
        fs.writeFileSync(FILE_PATH, JSON.stringify(plantDetails));
        
        return plantDetails;
    } else {
        throw new Error(WRITING_ERROR);
    }
};

