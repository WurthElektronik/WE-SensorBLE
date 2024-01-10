import { GeneralSensor } from "../Sensors/GeneralSensor";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { ThresholdType } from "./ThresholdType";

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

    getAttributeType(): AttributeType {
        return AttributeType.FreeFall;
    }

    getAttributeValueString(attributeValue: AttributeValue): string {
        return (<number>attributeValue.getData()).toFixed(2);
    }
}
