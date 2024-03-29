import { Subject } from "rxjs";
import { Attribute } from "../Attributes/Attribute";
import { AttributeType } from "../Attributes/AttributeType";
import { SensorType } from "./SensorType";

export abstract class GeneralSensor{
    protected attributes:Map<AttributeType, Attribute>;
    protected updateinterval:number;
    protected abstract minupdateinterval:number;
    protected abstract tempaccuracy:number;
    public onDataReceived: Subject<any> = new Subject<any>();
    public onEventReceived: Subject<any> = undefined;
    constructor(){

    }

    getAttributes():Map<AttributeType, Attribute> {
        return this.attributes;
    }

    getAttribute(attributeType:AttributeType): Attribute{
        return this.attributes.get(attributeType);
    }

    clearData(){
        this.attributes.forEach(attr => {
            attr.clearData();
        });
        this.updateinterval = undefined;
    }

    abstract getType():SensorType;

    abstract getSensorName():string;

    getUpdateInterval():number{
        return this.updateinterval;
    }

    getMinUpdateInterval():number{
        return this.minupdateinterval;
    }

    setUpdateInterval(updaterate:number){
        this.updateinterval = updaterate;
    }

    parseupdateinterval(data:DataView,offset:number){
        this.updateinterval = data.getInt32(offset,true);
    }

    abstract parsedata(padsdata:DataView,offset:number);

    getTemperatureAccuracy():number{
        return this.tempaccuracy;
    };

    formupdateratepacket():DataView{
        let packetheader = Uint8Array.from([1, 7, 1, this.getType()]);
        let updaterate = new Uint8Array(Int32Array.from([this.updateinterval]).buffer);
        let fulldata = new Uint8Array(packetheader.length + updaterate.length);
        fulldata.set(packetheader);
        fulldata.set(updaterate, packetheader.length);
        return new DataView(fulldata.buffer);
    }
}
