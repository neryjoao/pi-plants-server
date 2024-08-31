import { Pot } from "./Pot";
import { getPotData} from "../helpers/dataHelper"
import { PlantDetailShort } from "../types";
import {ERRORS} from "../CONSTANTS"

const {RESOURCE_NOT_FOUND} = ERRORS;

export class PlantSystem {
    private pots: Pot[];
    
    constructor(pots: Pot[]) {
        this.pots = pots;
    };

    getPlantsDetails = (): PlantDetailShort[] => this.pots.map(pot => getPotData(pot));

    updateName = (plantId: string, updatedName: string) => {
        const pot = this.pots.find(pot => pot.getId() === plantId);

        if (pot) {
            pot.setName(updatedName);           
        } else {
            throw new Error(RESOURCE_NOT_FOUND)
        };

 
    }
}