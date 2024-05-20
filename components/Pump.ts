import { Relay } from "johnny-five";

export class Pump extends Relay {
    constructor(pin: number, isOn: boolean) {
        super(pin);
        isOn ? super.open() : super.close();
    };

    getIsOn = () => this.isOn;

}