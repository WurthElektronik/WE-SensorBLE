import { GeneralSensor } from "./GeneralSensor";
import { Temperature } from "../Attributes/Temparature";
import { SensorType } from "./SensorType";
import { Attribute } from "../Attributes/Attribute";
import { AttributeValue } from "../Attributes/AttributeValue";
import { AttributeType } from "../Attributes/AttributeType";
// import temperaturedata from 'recordeddata/tidstemperature.json';

export class TIDS extends GeneralSensor{
    protected tempaccuracy: number = 2;
    protected minupdateinterval: number = 1000;
    
    constructor(){
        super();
        this.attributes = new Map<AttributeType, Attribute>([
            [AttributeType.Temperature, new Temperature(this)],
        ]);
        // temperaturedata.forEach(temp => {
        //     this.attributes[0].addValue(new AttributeValue(temp.timestamp,temp.data));
        // });
    }

    getType(): SensorType {
        return SensorType.TIDS;
    }

    getSensorName(): string {
        return "TIDS";
    }

    parsedata(tidsdata:DataView,offset:number){
        let timestamp:number = Date.now();
        this.getAttribute(AttributeType.Temperature).addValue(new AttributeValue(timestamp,tidsdata.getInt32(offset,true)/100.0));
      }
    
}
