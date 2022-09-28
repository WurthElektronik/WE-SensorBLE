import { GeneralSensor } from "../Sensors/GeneralSensor";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { Subject } from 'rxjs';

export abstract class Attribute{
    public static maxattributevaluecount:number = 100;
    public onDataReceived: Subject<any> = new Subject<any>();
    protected values:AttributeValue[];
    protected parentsensor:GeneralSensor;
    private interval = undefined;
    constructor(sensor:GeneralSensor){
        this.values = [];
        this.parentsensor = sensor;
    }

    abstract getAttributeName():string;

    abstract getCurrentAttributeString():string;

    abstract getAttributeType():AttributeType;

    abstract isEvent():Boolean;

    getValues():AttributeValue[]{
        return this.values;
    };

    getCurrentValue():AttributeValue{
        return (this.values.length==0) ? null : this.values[this.values.length - 1];
    }

    getParentsensor():GeneralSensor {
        return this.parentsensor;
    }

    addValue(newval:AttributeValue){
        this.values.push(newval);
        if(this.values.length > Attribute.maxattributevaluecount){
            this.values.shift();
        }
        this.onDataReceived.next();
    }

    informevent(){
        this.values[0].setData(true);
        if(this.interval != undefined){
            clearTimeout(this.interval);
        }
        this.onDataReceived.next();
        this.interval = setTimeout(() => {
            this.values[0].setData(false);
            this.onDataReceived.next();
            clearTimeout(this.interval);
        },250);
    }

    clearData(){
        this.values = [];
        if(this.isEvent()){
            this.values.push(new AttributeValue(0,false));
        }
    }
}