import { Component, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Attribute } from 'src/app/Attributes/Attribute';
import { BleService } from 'src/app/Services/ble.service';
import { Subscription } from 'rxjs';
import { AttributeType } from 'src/app/Attributes/AttributeType';
import { AccelerationPoint } from 'src/app/Attributes/Acceleration/AccelerationPoint';
import { AttributeValue } from 'src/app/Attributes/AttributeValue';

@Component({
  selector: 'app-attributegraph',
  templateUrl: 'AttributeGraphTab.html',
  styleUrls: ['AttributeGraphTab.scss']
})
export class AttributeGraphTab {
  @ViewChild('chart') lineCanvas;
  private attributedataReceivedSubscription: Subscription;
  attribute:Attribute;
  lineChart: any;

  constructor(private route: ActivatedRoute, public platform: Platform, private ble:BleService) {
    Chart.register(...registerables);
  }

  ngOnInit(){
    this.route.queryParamMap
    .subscribe(async (params) => {
        let sensortype = Number(params.get("sensortype"));
        let attributetype = Number(params.get("attributetype"));
        this.ble.sensors.forEach(sensor => {
          if(sensor.getType() == sensortype){
            sensor.getAttributes().forEach(attribute => {
              if(attribute.getAttributeType() == attributetype){
                this.attribute = attribute;
              }
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
    this.attribute.getValues().forEach(value => {
      this.parsedataplot(value.getData());
      this.lineChart.data.labels.push(new Date(value.getTimestamp()).toLocaleTimeString());
    });
    switch(this.attribute.getAttributeType()){
      case AttributeType.Acceleration:
        this.lineChart.options.scales.y.min = -2;
        this.lineChart.options.scales.y.max = 2;
        break;
      default:
        this.lineChart.options.scales.y.min = undefined;
        this.lineChart.options.scales.y.max = undefined;
        break;
    }
    this.lineChart.update();
    this.attributedataReceivedSubscription = this.attribute.onDataReceived.subscribe(() => {
      if(this.lineChart){
        this.lineChart.data.labels.push(new Date(this.attribute.getCurrentValue().getTimestamp()).toLocaleTimeString());
        this.parsedataplot(this.attribute.getCurrentValue().getData());
        if(this.lineChart.data.labels.length > Attribute.maxattributevaluecount){
          this.lineChart.data.labels.shift();
        }
        this.lineChart.update();
      }
    });
  }

  ionViewWillLeave() {
    this.attributedataReceivedSubscription && this.attributedataReceivedSubscription.unsubscribe();
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

  parsedataplot(data){
    switch (this.attribute.getAttributeType()) {
      case AttributeType.Acceleration:
        let accelpoint:AccelerationPoint = data;
        this.lineChart.data.datasets[0].data.push(accelpoint.x);
        this.lineChart.data.datasets[1].data.push(accelpoint.y);
        this.lineChart.data.datasets[2].data.push(accelpoint.z);
        if(this.lineChart.data.labels.length > Attribute.maxattributevaluecount){
          this.lineChart.data.datasets[0].data.shift();
          this.lineChart.data.datasets[1].data.shift();
          this.lineChart.data.datasets[2].data.shift();
        }
        break;
      default:
        this.lineChart.data.datasets[0].data.push(data);
        if(this.lineChart.data.labels.length > Attribute.maxattributevaluecount){
          this.lineChart.data.datasets[0].data.shift();
        }
        break;
    }
  }
  createdatasets(){
    switch(this.attribute.getAttributeType()){
      case AttributeType.Acceleration:
        this.lineChart.data.datasets.push(
          {
            label: "x",
            data: [],
            borderColor: 'rgba(0,0,255,1)'
          }
        );
        this.lineChart.data.datasets.push(
          {
            label: "y",
            data: [],
            borderColor: 'rgba(255,0,0,1)'
          }
        );
        this.lineChart.data.datasets.push(
          {
            label: "z",
            data: [],
            borderColor: 'rgba(0,255,0,1)'
          }
        );
        break;
        default:
          this.lineChart.data.datasets.push(
            {
              label: this.attribute.getAttributeName(),
              data: [],
              borderColor: 'rgba(227,0,11,1)',
            }
          );
    }
  }

}
