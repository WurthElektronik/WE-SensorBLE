import { AttributeType } from "../AttributeType";
import { Acceleration } from "./Acceleration";

export class AccelerationX extends Acceleration{

    getAttributeName(): string {
        return "AccelerationX";
    }

    getAttributeType(): AttributeType {
        return AttributeType.AccelerationX;
    }

}
