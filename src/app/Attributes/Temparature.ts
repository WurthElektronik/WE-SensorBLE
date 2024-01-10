import { Attribute } from "./Attribute";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { ThresholdType } from "./ThresholdType";

export class Temperature extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeName(): string {
        return "Temperature";
    }

    getAttributeType(): AttributeType {
        return AttributeType.Temperature;
    }

    getAttributeValueString(attributeValue: AttributeValue): string {
        return (<number>attributeValue.getData()).toFixed(this.getParentsensor().getTemperatureAccuracy()) + " °C";
    }
}
