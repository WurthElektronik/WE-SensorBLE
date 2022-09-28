import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";

export class Temperature extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeName(): string {
        return "Temperature";
    }
    getCurrentAttributeString(): string {
        if(this.values.length == 0){
            return "";
        }
        return (<number>this.values[this.values.length - 1].getData()).toFixed(this.getParentsensor().getTemperatureAccuracy()) + " °C";
    }
    getAttributeType(): AttributeType {
        return AttributeType.Temperature;
    }

}