import { GeneralSensor } from "../Sensors/GeneralSensor";
import { AttributeType } from "./AttributeType";
import { AttributeValue } from "./AttributeValue";
import { Subject } from 'rxjs';
import { ThresholdType } from "./ThresholdType";

export abstract class Attribute{
    public static maxattributevaluecount:number = 100;
    public onDataReceived: Subject<any> = new Subject<any>();
    protected values:AttributeValue[];
    protected parentsensor:GeneralSensor;
    private interval = undefined;
    public onThresholdExceeded: Subject<ThresholdType> = new Subject<ThresholdType>();
    protected thresholds: Map<ThresholdType, AttributeValue> = new Map<ThresholdType, AttributeValue>();
    constructor(sensor:GeneralSensor){
        this.values = [];
        this.parentsensor = sensor;
    }

    abstract getAttributeName():string;

    getCurrentAttributeString(): string {
        if(this.values.length == 0){
            return "";
        }
        return this.getAttributeValueString(this.values[this.values.length - 1]);
    }

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
        if(this.thresholds.size != 0){
            let exceedsThreshold = this.exceedsThreshold(newval);
            if(exceedsThreshold != undefined){
                this.onThresholdExceeded.next(exceedsThreshold);
            }
        }
        this.onDataReceived.next();
    }

    informevent(){
        this.values[0].setData(true);
        if(this.interval != undefined){
            clearTimeout(this.interval);
        }
        this.onThresholdExceeded.next(ThresholdType.UpperThreshold);
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

    exceedsThreshold(value: AttributeValue): ThresholdType {
        let newValue: number = value.getData();

        if(this.thresholds.has(ThresholdType.UpperThreshold)){
            let upperThresholdValue: number = this.thresholds.get(ThresholdType.UpperThreshold).getData();

            if(newValue >= upperThresholdValue){
                return ThresholdType.UpperThreshold;
            }
        }

        if(this.thresholds.has(ThresholdType.LowerThreshold)){
            let lowerThresholdValue: number = this.thresholds.get(ThresholdType.LowerThreshold).getData();

            if(newValue <= lowerThresholdValue){
                return ThresholdType.LowerThreshold;
            }
        }

        return undefined;
    }

    setThreshold(threholdType: ThresholdType,thresholdValue:AttributeValue){
        this.thresholds.set(threholdType, thresholdValue);
    }

    removeThreshold(threholdType: ThresholdType){
        this.thresholds.delete(threholdType);
    }

    abstract getAttributeValueString(attributeValue: AttributeValue):string;

    getThresholds(): Map<ThresholdType, AttributeValue>{
        return this.thresholds;
    }
}
