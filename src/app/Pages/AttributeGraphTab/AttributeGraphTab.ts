import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Attribute } from 'src/app/Attributes/Attribute';
import { BleService } from 'src/app/Services/ble.service';
import { Subscription } from 'rxjs';
import { AttributeType } from 'src/app/Attributes/AttributeType';
import { TranslateService } from '@ngx-translate/core';
import { GeneralSensor } from 'src/app/Sensors/GeneralSensor';
import { SensorType } from 'src/app/Sensors/SensorType';

@Component({
  selector: 'app-attributegraph',
  templateUrl: 'AttributeGraphTab.html',
  styleUrls: ['AttributeGraphTab.scss']
})
export class AttributeGraphTab {
  @ViewChild('chart') lineCanvas;
  private sensordataReceivedSubscription: Subscription;
  sensor:GeneralSensor;
  attributes:Attribute[];
  lineChart: any;

  constructor(private route: ActivatedRoute, public platform: Platform, private ble:BleService,private translateService: TranslateService) {
    Chart.register(...registerables);
  }

  ngOnInit(){
    this.route.queryParamMap
    .subscribe(async (params) => {
        this.attributes = [];
        this.sensor = undefined;
        let sensortype = Number(params.get("sensortype"));
        this.ble.sensors.forEach(sensor => {
          if(sensor.getType() == sensortype){
            this.sensor = sensor;
            let attributeTypes = JSON.parse(params.get("attributetypes"));
            attributeTypes.forEach(attributeType => {
              this.attributes.push(sensor.getAttribute(attributeType));
            });
          }
        });
    });
  }

  ionViewWillEnter(){
    if(this.lineChart == undefined){
      this.createlinechart();
      this.createdatasets();
    }else{
      this.lineChart.data.labels = [];
      this.lineChart.data.datasets = [];
      this.createdatasets();
    }

    this.attributes.forEach((attribute, i) => {
      attribute.getValues().forEach( value => {
        if(i == 0)
        {
          this.lineChart.data.labels.push(new Date(value.getTimestamp()).toLocaleTimeString());
        }
        this.parsedataplot(value.getData(),i);
      });
    });

    switch(this.sensor.getType()){
      case SensorType.ITDS:
        this.lineChart.options.scales.y.min = -2;
        this.lineChart.options.scales.y.max = 2;
        break;
      default:
        this.lineChart.options.scales.y.min = undefined;
        this.lineChart.options.scales.y.max = undefined;
        break;
    }
    this.lineChart.update();
    this.sensordataReceivedSubscription = this.sensor.onDataReceived.subscribe(() => {
      if(this.lineChart){
        this.lineChart.data.labels.push(new Date(this.attributes[0].getCurrentValue().getTimestamp()).toLocaleTimeString());
        this.attributes.forEach((attribute, i) => {
          this.parsedataplot(attribute.getCurrentValue().getData(),i);
        })
        if(this.lineChart.data.labels.length > Attribute.maxattributevaluecount){
          this.lineChart.data.labels.shift();
        }
        this.lineChart.update();
      }
    });
  }

  ionViewWillLeave() {
    this.sensordataReceivedSubscription && this.sensordataReceivedSubscription.unsubscribe();
  }

  createlinechart() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options:{
        maintainAspectRatio: false,
        responsive: true,
        animation: false,
        elements: {
          point: {
              radius: 0 //remove points
          }
        },
        plugins: {
          legend: {
            labels: {
              color: window.matchMedia('(prefers-color-scheme: dark)').matches ? "white" : "black"
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: window.matchMedia('(prefers-color-scheme: dark)').matches ? "white" : "black"
            }
          },
          x: {
            ticks: {
              color: window.matchMedia('(prefers-color-scheme: dark)').matches ? "white" : "black"
            }
          }
        }
      }
    });
  }

  parsedataplot(data, i){
    this.lineChart.data.datasets[i].data.push(data);
    if(this.lineChart.data.labels.length > Attribute.maxattributevaluecount){
      this.lineChart.data.datasets[i].data.shift();
    }
  }
  createdatasets(){
    let colors = [
      'rgba(227,0,11,1)',
      'rgba(0,0,255,1)',
      'rgba(0,255,0,1)',
      'rgba(64,64,64,1)',
    ];
    this.attributes.forEach((attribute, i) => {
      this.translateService.get('SensorAttributes.' + attribute.getAttributeName()).subscribe(async (res:string) => 
      {
        this.lineChart.data.datasets.push(
          {
            label: res,
            data: [],
            borderColor: colors[i % colors.length],
          }
        );
      });
    });
  }

}
