import { GeneralSensor } from "../Sensors/GeneralSensor";
import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { ThresholdType } from "./ThresholdType";

export class DoubleTap extends Attribute{

    constructor(sensor:GeneralSensor){
        super(sensor);
        this.values.push(new AttributeValue(0,false));
    }

    isEvent(): Boolean {
        return true;
    }

    getAttributeName(): string {
        return "Double Tap";
    }
    
    getAttributeType(): AttributeType {
        return AttributeType.DoubleTap;
    }

    getAttributeValueString(attributeValue: AttributeValue): string {
        return (<number>attributeValue.getData()).toFixed(2);
    }
}
