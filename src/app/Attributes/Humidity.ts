import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { ThresholdType } from "./ThresholdType";

export class Humidity extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeName(): string {
        return "Humidity";
    }

    getAttributeType(): AttributeType {
        return AttributeType.Humidity;
    }

    getAttributeValueString(attributeValue: AttributeValue): string {
        return (<number>attributeValue.getData()).toFixed(2) + " %";
    }
}
