import { GeneralSensor } from "./GeneralSensor";
import { Temperature } from "../Attributes/Temparature";
import { SensorType } from "./SensorType";
import { Attribute } from "../Attributes/Attribute";
import { AttributeValue } from "../Attributes/AttributeValue";
// import temperaturedata from 'recordeddata/tidstemperature.json';

export class TIDS extends GeneralSensor{
    protected tempaccuracy: number = 2;
    protected minupdateinterval: number = 1000;
    
    constructor(){
        super();
        this.attributes = [new Temperature(this)];
        // temperaturedata.forEach(temp => {
        //     this.attributes[0].addValue(new AttributeValue(temp.timestamp,temp.data));
        // });
    }

    getType(): SensorType {
        return SensorType.TIDS;
    }

    getTemperatureAttribute(): Attribute {
        return this.attributes[0];
    }

    getSensorName(): string {
        return "TIDS";
    }

    parsedata(tidsdata:DataView,offset:number){
        let timestamp:number = Date.now();
        this.getTemperatureAttribute().addValue(new AttributeValue(timestamp,tidsdata.getInt32(offset,true)/100.0));
      }
    
}