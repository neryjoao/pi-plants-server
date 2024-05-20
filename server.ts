import express from 'express';
import * as five from 'johnny-five';

import { Pot } from './components/Pot';
import { PlantSystem } from './components/PlantSystem';
import { getPlantDetails } from './helpers/dataHelper';
import {init} from './routes'


const app = express();

const board = new five.Board({port: "COM3"});

const createPlantSystem = () => {
    const plantDetails = getPlantDetails();
    const pots = plantDetails.map((plant, index) => {
        plant.index = index;
        return new Pot(plant);
    });

    const plantSystem = new PlantSystem(pots);

    init(app, plantSystem);
}

board.on('ready', () => {
    createPlantSystem();

    const port = 3001;
    
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});

