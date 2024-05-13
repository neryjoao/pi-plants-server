import { Relay } from "johnny-five";

export class Pump extends Relay {
    constructor(pin: number) {
        super(pin);
    }
}