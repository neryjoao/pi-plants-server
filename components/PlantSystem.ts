import { Pot } from "./Pot";
import { getPotData} from "../helpers/dataHelper"
import { PlantDetailShort } from "../types";

export class PlantSystem {
    private pots: Pot[];
    
    constructor(pots: Pot[]) {
        this.pots = pots;
    };

    getPlantsDetails = (): PlantDetailShort[] => this.pots.map(pot => getPotData(pot))
}