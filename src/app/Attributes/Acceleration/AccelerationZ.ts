import { AttributeType } from "../AttributeType";
import { Acceleration } from "./Acceleration";

export class AccelerationZ extends Acceleration{

    getAttributeName(): string {
        return "AccelerationZ";
    }

    getAttributeType(): AttributeType {
        return AttributeType.AccelerationZ;
    }

}
