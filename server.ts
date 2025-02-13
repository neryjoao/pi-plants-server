import express from 'express';
import * as five from 'johnny-five';

import { Pot } from './src/components/Pot';
import { PlantSystem } from './src/components/PlantSystem';
import { getPlantDetails } from './src/helpers/dataHelper';
import {init} from './src/routes'

const app = express();

// const board = new five.Board({port: "COM3"});
const board = new five.Board();

const createPlantSystem = (): void => {
    const plantDetails = getPlantDetails();
    const pots = plantDetails.map((plant) => {
        return new Pot(plant);
    });

    const plantSystem = new PlantSystem(pots);

    init(app, plantSystem);
}

board.on(`ready`, () => {
    createPlantSystem();

    const port = 3001;
    
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});

