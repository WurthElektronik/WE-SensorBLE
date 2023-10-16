import { GeneralSensor } from "./GeneralSensor";
import { SensorType } from "./SensorType";
import { Attribute } from "../Attributes/Attribute";
import { Acceleration } from "../Attributes/Acceleration/Acceleration";
import { Temperature } from "../Attributes/Temparature";
import { AccelerationPoint } from "../Attributes/Acceleration/AccelerationPoint";
import { AttributeValue } from "../Attributes/AttributeValue";
import { SensorModelInterface } from "./SensorModel/SensorModelInterface";
import { SensorModel } from "./SensorModel/SensorModel";
import { DoubleTap } from "../Attributes/DoubleTap";
import { FreeFall } from "../Attributes/FreeFall";
// import accelerationdata from 'recordeddata/itdsacceleration.json';
// import temperaturedata from 'recordeddata/itdstemperature.json';

export class ITDS extends GeneralSensor implements SensorModelInterface{
    protected tempaccuracy: number = 0;
    protected minupdateinterval: number = 30;

    private model:SensorModel;
    
    constructor(){
        super();
        this.attributes = [new Acceleration(this),new DoubleTap(this),new FreeFall(this)];
        // accelerationdata.forEach(accel => {
        //     this.attributes[0].addValue(new AttributeValue(accel.timestamp,new AccelerationPoint(accel.data.x,accel.data.y,accel.data.z)));
        // });  
        // temperaturedata.forEach(temp => {
        //     this.attributes[1].addValue(new AttributeValue(temp.timestamp,temp.data));
        // });
        //this.attributes[2].addValue(new AttributeValue(1,true));
        this.createModel();
    }

    getType(): SensorType {
        return SensorType.ITDS;
    }

    getAccelerationAttribute(): Attribute {
        return this.attributes[0];
    }
    
    getDoubleTapAttribute(): Attribute {
        return this.attributes[1];
    }

    getFreeFallAttribute(): Attribute {
        return this.attributes[2];
    }

    getSensorName(): string {
        return "ITDS";
    }

    parsedata(itdsdata:DataView,offset:number){
        let timestamp:number = Date.now();
        let newaccelpoint:AccelerationPoint = new AccelerationPoint(itdsdata.getInt32(offset,true)/1000.0,itdsdata.getInt32(offset+4,true)/1000.0,itdsdata.getInt32(offset+8,true)/1000.0);
        this.getAccelerationAttribute().addValue(new AttributeValue(timestamp,newaccelpoint));
    }

    parsedoubletap(){
        this.getDoubleTapAttribute().informevent();
    }

    parsefreefall(){
        this.getFreeFallAttribute().informevent();
    }

    createModel() {
        this.model = new SensorModel(this.getSensorName());
    }
    getModel(): SensorModel {
        return this.model;
    }
    
}
