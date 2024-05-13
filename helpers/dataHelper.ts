import fs from 'fs';
import { plantDetail } from '../types';

export const getPlantDetails = (): plantDetail[] => {
    const path = `./data/plantDetails.json`;
    const plantDetails = fs.readFileSync(path,  'utf8');
    return JSON.parse(plantDetails);
}