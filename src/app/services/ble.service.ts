import { Injectable } from '@angular/core';
import { BleClient, BleDevice, ScanResult } from '@capacitor-community/bluetooth-le';
import { Subject } from 'rxjs';
import { GeneralSensor } from '../Sensors/GeneralSensor';
import { HIDS } from '../Sensors/HIDS';
import { ITDS } from '../Sensors/ITDS';
import { PADS } from '../Sensors/PADS';
import { SensorType } from '../Sensors/SensorType';
import { TIDS } from '../Sensors/TIDS';

const PROTEUS_BLE_SERVICE:string = "6e400001-c352-11e5-953d-0002a5d5c51b";
const PROTEUS_BLE_RX_CHARACTERISTIC:string = "6e400002-c352-11e5-953d-0002a5d5c51b";
const PROTEUS_BLE_TX_CHARACTERISTIC:string = "6e400003-c352-11e5-953d-0002a5d5c51b";
const manufacturerData:number[] = [0x1, 0x46, 0x57, 0x49, 0x4E, 0x47];


@Injectable({
  providedIn: 'root'
})

export class BleService {

  padssensor:PADS;
  itdssensor:ITDS;
  tidssensor:TIDS;
  hidssensor:HIDS;
  sensors:GeneralSensor[] = [];
  connected:Boolean = false;
  
  public onDataReceived: Subject<any> = new Subject<any>();
  public onDeviceDisconnected: Subject<any> = new Subject<any>();
  public onSensorAdded: Subject<GeneralSensor> = new Subject<GeneralSensor>();


  constructor() {
    this.padssensor = new PADS();
    this.itdssensor = new ITDS();
    this.tidssensor = new TIDS();
    this.hidssensor = new HIDS();
    this.sensors = [];
  }

  async initializeble(){
    try {
      await BleClient.initialize({ androidNeverForLocation: true });
    } catch (error) {
      console.error(error);
    }
  }

  async startscan(callback: (scanresult: ScanResult) => void){
    try {
      await BleClient.requestLEScan(
      {
        services:[PROTEUS_BLE_SERVICE],
        namePrefix: "W-"
      },
      (result) => {
        callback(result);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async requestdevice(callback: (paireddevice: BleDevice) => void){
    try {
      let device = await BleClient.requestDevice({
        services: [PROTEUS_BLE_SERVICE],
        namePrefix:"W-"
      });
      callback(device);
    } catch (error) {
      callback(undefined);
    }
  }

  async stopscan(){
    try {
      await BleClient.stopLEScan();
    } catch (error) {
      console.error(error);
    }
  }

  checkmanufacturerdata(data:DataView): boolean{
    if(data != undefined && data.byteLength == manufacturerData.length){
      for(let i = 0; i < manufacturerData.length; i++){
        if(data.getUint8(i) != manufacturerData[i]){
          return false;
        }
      }
      return true;
    }
    return false;
  }

  async connect(deviceid:string){
    await BleClient.disconnect(deviceid);
    await BleClient.connect(deviceid,() => {
      this.sensors.forEach(sensor => {
        sensor.clearData();
      });
      this.sensors = [];
      this.connected = false;
      this.onDeviceDisconnected.next();
    });
    while(!this.connected){
      await BleClient.getServices(deviceid).then((services) => {
        this.connected = services.length != 0;
      });
    }
  }

  async disconnect(deviceid:string){
    await BleClient.stopNotifications(deviceid,PROTEUS_BLE_SERVICE,PROTEUS_BLE_TX_CHARACTERISTIC);
    await BleClient.disconnect(deviceid);
    this.sensors.forEach(sensor => {
      sensor.clearData();
    });
    this.sensors = [];
    this.connected = false;
  }

  isconnected():Boolean{
    return this.connected;
  }
  //FIXME some phones require delay after connection
  async starttxnotifications(deviceid){
    setTimeout(async () => {
      await BleClient.startNotifications(
        deviceid,
        PROTEUS_BLE_SERVICE,
        PROTEUS_BLE_TX_CHARACTERISTIC,
        (value) => {
          this.parsedata(value);
          this.onDataReceived.next();
        }
      );
    },100);
  }

  parsedata(value: DataView){
    const dataflag = value.getUint8(0);
    var byteidx:number = 1;
    while(byteidx < value.byteLength){
      let packetlength = value.getUint8(byteidx);
      let packetfunction = value.getUint8(byteidx+1);
      let packetsensortype = value.getUint8(byteidx+2);
      switch(packetfunction){
        case 0:
          switch(packetsensortype){
            case SensorType.PADS:
              this.padssensor.parsedata(value,byteidx+3);
              break;
            case SensorType.ITDS:
              this.itdssensor.parsedata(value,byteidx+3);
              break;
            case SensorType.TIDS:
              this.tidssensor.parsedata(value,byteidx+3);
              break;
            case SensorType.HIDS:
              this.hidssensor.parsedata(value,byteidx+3);
              break;
          }
          break;
        case 1:
          switch(packetsensortype){
            case SensorType.PADS:
              if(!this.sensors.includes(this.padssensor)){
                this.sensors.push(this.padssensor);
                this.onSensorAdded.next(this.padssensor);
              }
              this.padssensor.parseupdateinterval(value,byteidx+3);
              break;
            case SensorType.ITDS:
              if(!this.sensors.includes(this.itdssensor)){
                this.sensors.push(this.itdssensor);
                this.onSensorAdded.next(this.itdssensor);
              }
              this.itdssensor.parseupdateinterval(value,byteidx+3);              
              break;
            case SensorType.TIDS:
              if(!this.sensors.includes(this.tidssensor)){
                this.sensors.push(this.tidssensor);
                this.onSensorAdded.next(this.tidssensor);
              }
              this.tidssensor.parseupdateinterval(value,byteidx+3);              
              break;
            case SensorType.HIDS:
              if(!this.sensors.includes(this.hidssensor)){
                this.sensors.push(this.hidssensor);
                this.onSensorAdded.next(this.hidssensor);
              }
              this.hidssensor.parseupdateinterval(value,byteidx+3);
              break;
          }
          break;
        case 2:
          switch(packetsensortype){
            case SensorType.ITDS:
              this.itdssensor.parsedoubletap();
              break;
          }
          break;
        case 3:
          switch(packetsensortype){
            case SensorType.ITDS:
              this.itdssensor.parsefreefall();
              break;
          }
          break;
      }
      byteidx += packetlength
    }
  }

  async senddata(deviceId:string, data:DataView){
    await BleClient.write(deviceId, PROTEUS_BLE_SERVICE, PROTEUS_BLE_RX_CHARACTERISTIC, data);
  }

}
