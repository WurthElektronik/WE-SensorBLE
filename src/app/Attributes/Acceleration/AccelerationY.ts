import { AttributeType } from "../AttributeType";
import { Acceleration } from "./Acceleration";

export class AccelerationY extends Acceleration{

    getAttributeName(): string {
        return "AccelerationY";
    }

    getAttributeType(): AttributeType {
        return AttributeType.AccelerationY;
    }

}
