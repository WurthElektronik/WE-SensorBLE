import { GeneralSensor } from "../Sensors/GeneralSensor";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";

export class FreeFall extends Attribute{

    constructor(sensor:GeneralSensor){
        super(sensor);
        this.values.push(new AttributeValue(0,false));
    }

    isEvent(): Boolean {
        return true;
    }

    getAttributeName(): string {
        return "Free Fall";
    }
    getCurrentAttributeString(): string {
        if(this.values.length == 0){
            return "";
        }
        return (<number>this.values[this.values.length - 1].getData()).toFixed(2);
    }
    getAttributeType(): AttributeType {
        return AttributeType.FreeFall;
    }

}