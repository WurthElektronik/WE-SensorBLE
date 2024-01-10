import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BleService } from 'src/app/Services/ble.service';
import { WebglService } from 'src/app/Services/webgl.service';
import { interval, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Attribute } from 'src/app/Attributes/Attribute';
import { SensorModelInterface } from 'src/app/Sensors/SensorModel/SensorModelInterface'
import { asin, atan2, Complex, complex, number, sqrt } from 'mathjs';
import { AttributeType } from 'src/app/Attributes/AttributeType';

@Component({
  selector: 'app-sensormodel',
  templateUrl: 'SensorModelTab.html',
  styleUrls: ['SensorModelTab.scss']
})
export class SensorModelTab {
  @ViewChild('model') webglmodel:ElementRef<HTMLCanvasElement>;
  private _60fpsInterval = 16.666666666666666667;
  private gl: WebGLRenderingContext;
  private intervalsubscription: Subscription;
  private accelerationattributes:Attribute[];
  private x:number = 0;
  private y:number = 0;
  private z:number = 0;
  public lowpassfilter:boolean = true;
  public offset:boolean = false;
  private lowpassedaccel:number[] = [0,0,0];
  public accelalpha:number = 15;
  constructor(private route: ActivatedRoute,private webglService: WebglService, public platform: Platform, private ble:BleService) {}
  ngOnInit(){
    this.route.queryParamMap
    .subscribe(async (params) => {
        let sensortype = Number(params.get("sensortype"));
        this.ble.sensors.forEach(sensor => {
          if(sensor.getType() == sensortype && sensor['getModel']){
            this.accelerationattributes = [
              sensor.getAttribute(AttributeType.AccelerationX),
              sensor.getAttribute(AttributeType.AccelerationY),
              sensor.getAttribute(AttributeType.AccelerationZ)
            ];
          }
        });
    });
  }

  ionViewWillEnter(){
    if(this.webglmodel != undefined){
      this.gl = this.webglService.initialiseWebGLContext(this.webglmodel.nativeElement);
      this.webglService.setsensormodel(this.ble.itdssensor.getModel());
      const drawSceneInterval = interval(this._60fpsInterval);
      this.intervalsubscription =  drawSceneInterval.subscribe(() => {
        this.drawScene();
      });
    }
  }

  ionViewWillLeave() {
    this.intervalsubscription && this.intervalsubscription.unsubscribe();
  }

  private drawScene() {
    if(this.accelerationattributes){
      // prepare the scene and update the viewport
      this.webglService.updateViewport();
      let pointx:number = this.accelerationattributes[0].getCurrentValue().getData();
      let pointy:number = this.accelerationattributes[1].getCurrentValue().getData();
      let pointz:number = this.accelerationattributes[2].getCurrentValue().getData();
      if(this.lowpassfilter){
        this.lowpassedaccel = this.lowPass([pointx,pointy,pointz], this.lowpassedaccel, this.accelalpha);
        if(!(asin(this.lowpassedaccel[1]) as Complex).toPolar){
          this.x = asin(this.lowpassedaccel[1]) as number;
        }
        this.z = atan2(this.lowpassedaccel[0], this.lowpassedaccel[2]);
      }else{
        if(!(asin(pointy) as Complex).toPolar){
          this.x = asin(pointy) as number;
        }
        this.z = atan2(pointx, pointz);
      }
      this.webglService.drawsensor(this.x,this.y,this.z,this.offset);
      this.gl.drawElements(this.gl.TRIANGLES, this.ble.itdssensor.getModel().getfaceslist().length * 3, this.gl.UNSIGNED_SHORT,0);
    }

    
  }

  private lowPass(input:number[] , output:number[], alpha:number):number[] {
    if ( output == null ) return input;

    for (let i=0; i<input.length; i++ ) {
        output[i] = output[i] + (alpha/100.0) * (input[i] - output[i]);
    }
    return output;
}

}
