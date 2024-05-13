import { Sensor } from "johnny-five";

export class MoistureSensor extends Sensor {
    constructor(pin: number) {
        super(pin);
    }
}