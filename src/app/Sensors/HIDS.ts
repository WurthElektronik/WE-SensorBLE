import { GeneralSensor } from "./GeneralSensor";
import { Humidity } from "../Attributes/Humidity";
import { Temperature } from "../Attributes/Temparature";
import { SensorType } from "./SensorType";
import { Attribute } from "../Attributes/Attribute";
import { AttributeValue } from "../Attributes/AttributeValue";
import { AttributeType } from "../Attributes/AttributeType";
// import humiditydata from 'recordeddata/hidshumidity.json';
// import temperaturedata from 'recordeddata/hidstemperature.json';

export class HIDS extends GeneralSensor{
    protected tempaccuracy: number = 2;
    protected minupdateinterval: number = 1000;
    
    constructor(){
        super();
        this.attributes = new Map<AttributeType, Attribute>([
            [AttributeType.Humidity, new Humidity(this)],
            [AttributeType.Temperature, new Temperature(this)]
        ]);
        // humiditydata.forEach(humd => {
        //     this.attributes[0].addValue(new AttributeValue(humd.timestamp,humd.data));
        // });  
        // temperaturedata.forEach(temp => {
        //     this.attributes[1].addValue(new AttributeValue(temp.timestamp,temp.data));
        // }); 
    }

    getType(): SensorType {
        return SensorType.HIDS;
    }

    getSensorName(): string {
        return "HIDS";
    }

    parsedata(hidsdata:DataView,offset:number){
        let timestamp:number = Date.now();
        this.getAttribute(AttributeType.Humidity).addValue(new AttributeValue(timestamp,hidsdata.getInt32(offset,true)/100.0));
        this.getAttribute(AttributeType.Temperature).addValue(new AttributeValue(timestamp,hidsdata.getInt32(offset+4,true)/100.0));
        this.onDataReceived.next();
      }
    
}
