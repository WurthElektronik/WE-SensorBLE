import { GeneralSensor } from "./GeneralSensor";
import { SensorType } from "./SensorType";
import { Attribute } from "../Attributes/Attribute";
import { AttributeValue } from "../Attributes/AttributeValue";
import { SensorModelInterface } from "./SensorModel/SensorModelInterface";
import { SensorModel } from "./SensorModel/SensorModel";
import { DoubleTap } from "../Attributes/DoubleTap";
import { FreeFall } from "../Attributes/FreeFall";
import { AccelerationX } from "../Attributes/Acceleration/AccelerationX";
import { AccelerationY } from "../Attributes/Acceleration/AccelerationY";
import { AccelerationZ } from "../Attributes/Acceleration/AccelerationZ";
import { AttributeType } from "../Attributes/AttributeType";
import { Subject } from "rxjs";
// import accelerationdata from 'recordeddata/itdsacceleration.json';
// import temperaturedata from 'recordeddata/itdstemperature.json';

export class ITDS extends GeneralSensor implements SensorModelInterface{
    protected tempaccuracy: number = 0;
    protected minupdateinterval: number = 30;

    private model:SensorModel;
    
    constructor(){
        super();
        this.attributes = new Map<AttributeType, Attribute>([
            [AttributeType.AccelerationX, new AccelerationX(this)],
            [AttributeType.AccelerationY, new AccelerationY(this)],
            [AttributeType.AccelerationZ, new AccelerationZ(this)],
            [AttributeType.DoubleTap, new DoubleTap(this)],
            [AttributeType.FreeFall, new FreeFall(this)],
        ]);
        // accelerationdata.forEach(accel => {
        //     this.attributes[0].addValue(new AttributeValue(accel.timestamp,new AccelerationPoint(accel.data.x,accel.data.y,accel.data.z)));
        // });  
        // temperaturedata.forEach(temp => {
        //     this.attributes[1].addValue(new AttributeValue(temp.timestamp,temp.data));
        // });
        //this.attributes[2].addValue(new AttributeValue(1,true));
        this.createModel();
        this.onEventReceived = new Subject<any>();
    }

    getType(): SensorType {
        return SensorType.ITDS;
    }

    getSensorName(): string {
        return "ITDS";
    }

    parsedata(itdsdata:DataView,offset:number){
        let timestamp:number = Date.now();
        this.getAttribute(AttributeType.AccelerationX).addValue(new AttributeValue(timestamp,itdsdata.getInt32(offset,true)/1000.0));
        this.getAttribute(AttributeType.AccelerationY).addValue(new AttributeValue(timestamp,itdsdata.getInt32(offset+4,true)/1000.0));
        this.getAttribute(AttributeType.AccelerationZ).addValue(new AttributeValue(timestamp,itdsdata.getInt32(offset+8,true)/1000.0));
        this.onDataReceived.next();
    }

    parsedoubletap(){
        this.getAttribute(AttributeType.DoubleTap).informevent();
        this.onEventReceived.next();
    }

    parsefreefall(){
        this.getAttribute(AttributeType.FreeFall).informevent();
        this.onEventReceived.next();
    }

    createModel() {
        this.model = new SensorModel(this.getSensorName());
    }
    getModel(): SensorModel {
        return this.model;
    }
    
}
