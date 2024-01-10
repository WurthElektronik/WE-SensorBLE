import { Attribute } from "../Attribute";
import { AttributeType } from "../AttributeType";
import { AttributeValue } from "../AttributeValue";
import { ThresholdType } from "../ThresholdType";

export abstract class Acceleration extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeValueString(attributeValue: AttributeValue): string {
        return (<number>attributeValue.getData()).toFixed(3) + " g";
    }
}
