import { Pot } from "./Pot";
import { getPotData} from "../helpers/dataHelper"
import { PlantDetailForUi } from "../types";

export class PlantSystem {
    private pots: Pot[];
    
    constructor(pots: Pot[]) {
        this.pots = pots;
    };

    getPlantsDetails = (): PlantDetailForUi[] => this.pots.map(pot => getPotData(pot))
}