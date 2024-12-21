import { Pot } from "./Pot";
import { getPotData} from "../helpers/dataHelper"
import { PlantDetailShort, WateringMode } from "../types";
import {ERRORS} from "../CONSTANTS"

const {RESOURCE_NOT_FOUND} = ERRORS;

export class PlantSystem {
    private pots: Pot[];
    
    constructor(pots: Pot[]) {
        this.pots = pots;
    };

    getPlantsDetails = (): PlantDetailShort[] => this.pots.map(pot => getPotData(pot));

    private findPot = (plantId: String) => this.pots.find(pot => pot.getId() === plantId)

    updateName = (plantId: string, updatedName: string) => {
        const pot = this.findPot(plantId);

        if (pot) {
            pot.setName(updatedName);           
        } else {
            throw new Error(RESOURCE_NOT_FOUND)
        };
    };

    updateWateringMode = (plantId: string, wateringMode: WateringMode) => {
        const pot = this.findPot(plantId);

        if (pot) {
            pot.setWateringMode(wateringMode);
        } else {
            throw new Error(RESOURCE_NOT_FOUND);
        }
    };
}