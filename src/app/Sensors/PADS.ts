import { GeneralSensor } from "./GeneralSensor";
import { Pressure } from "../Attributes/Pressure";
import { Temperature } from "../Attributes/Temparature";
import { SensorType } from "./SensorType";
import { Attribute } from "../Attributes/Attribute";
import { AttributeValue } from "../Attributes/AttributeValue";
import { AttributeType } from "../Attributes/AttributeType";
// import pressuredata from 'recordeddata/padspressure.json';
// import temperaturedata from 'recordeddata/padstemperature.json';

export class PADS extends GeneralSensor{
    protected tempaccuracy: number = 0;
    protected minupdateinterval: number = 1000;
    
    constructor(){
        super();
        this.attributes = new Map<AttributeType, Attribute>([
            [AttributeType.Pressure, new Pressure(this)],
            [AttributeType.Temperature, new Temperature(this)],
        ]);
        // pressuredata.forEach(press => {
        //     this.attributes[0].addValue(new AttributeValue(press.timestamp,press.data));
        // });  
        // temperaturedata.forEach(temp => {
        //     this.attributes[1].addValue(new AttributeValue(temp.timestamp,temp.data));
        // });  
    }

    getType(): SensorType {
        return SensorType.PADS;
    }

    getSensorName(): string {
        return "PADS";
    }

    parsedata(padsdata:DataView,offset:number){
        let timestamp:number = Date.now();
        this.getAttribute(AttributeType.Pressure).addValue(new AttributeValue(timestamp,padsdata.getInt32(offset,true)/100.0));
        this.getAttribute(AttributeType.Temperature).addValue(new AttributeValue(timestamp,padsdata.getInt32(offset+4,true)/100.0));
        this.onDataReceived.next();
    }
    
}
