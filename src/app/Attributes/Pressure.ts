import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { ThresholdType } from "./ThresholdType";

export class Pressure extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeName(): string {
        return "Pressure";
    }
    
    getAttributeType(): AttributeType {
        return AttributeType.Pressure;
    }

    getAttributeValueString(attributeValue: AttributeValue): string {
        return (<number>attributeValue.getData()).toFixed(2) + " kPa";
    }
}
