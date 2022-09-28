import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";

export class Pressure extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeName(): string {
        return "Pressure";
    }
    getCurrentAttributeString(): string {
        if(this.values.length == 0){
            return "";
        }
        return (<number>this.values[this.values.length - 1].getData()).toFixed(2) + " kPa";
    }
    getAttributeType(): AttributeType {
        return AttributeType.Pressure;
    }

}