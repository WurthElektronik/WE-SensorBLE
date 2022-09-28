import { Attribute } from "../Attribute";
import { AttributeType } from "../AttributeType";
import { AccelerationPoint } from "./AccelerationPoint";

export class Acceleration extends Attribute{
    isEvent(): Boolean {
        return false;
    }

    getAttributeName(): string {
        return "Acceleration";
    }
    getCurrentAttributeString(): string {
        if(this.values.length == 0){
            return "\n\n\n\n\n";
        }
        let latestaccelpoint:AccelerationPoint = this.values[this.values.length - 1].getData();
        return `x: ${latestaccelpoint.x.toFixed(3)} g\n\ny: ${latestaccelpoint.y.toFixed(3)} g\n\nz: ${latestaccelpoint.z.toFixed(3)} g`;
    }
    getAttributeType(): AttributeType {
        return AttributeType.Acceleration;
    }

}