import { Relay } from "johnny-five";

export class Pump extends Relay {
    private isPumpOn: boolean;

    constructor(pin: number, isOn: boolean) {
        super(pin);
        this.isPumpOn = isOn;
        isOn ? super.open() : super.close();
    };

    getIsOn = (): boolean => {
        return this.isPumpOn;
    };

    setIsPumpOn = (isPumpOn: boolean) => {
        isPumpOn ? super.open() : super.close();
        this.isPumpOn = isPumpOn;
    };

    togglePump = () => {
        super.toggle();
        this.setIsPumpOn(!this.isPumpOn);
    };
}