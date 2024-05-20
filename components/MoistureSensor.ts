import { Sensor } from "johnny-five";

export class MoistureSensor extends Sensor {
    private moistureLevel?: number;

    constructor(pin: number) {
        super({
            pin,
            freq: 2000
        });

        let moisttureLevel;

        super.on(`data`, () => moisttureLevel = super.scaleTo(0, 100))
    };

    getMoistureLevel = () => this.moistureLevel

}