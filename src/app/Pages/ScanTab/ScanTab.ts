import { Component, NgZone } from '@angular/core';
import { BleService } from '../../Services/ble.service';
import { BleDevice, ScanResult } from '@capacitor-community/bluetooth-le';
import { Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-scantab',
  templateUrl: 'ScanTab.html',
  styleUrls: ['ScanTab.scss']
})
export class ScanTab {
  scanning:boolean = false;
  scantext:String = "startscantext";
  //custom board data {device:{deviceId:'3E65391D-2743-A606-DAB3-E5650FB8C912'},localName:'W-000111',rssi: -65}
  scanresults:ScanResult[] = [];
  paireddevice:BleDevice = undefined;
  constructor(private ble:BleService, private ngZone: NgZone, private router: Router,private loadingCtrl: LoadingController, public platform: Platform, private translateService: TranslateService) {}

  async ngOnInit(){
    await this.ble.initializeble();
  }

  ionViewDidEnter(){
      this.scanning = false;
      this.scantext = "startscantext";
  }

  async ionViewDidLeave(){
    if(!this.platform.is('desktop')){
      this.stopscan();
    }
  }

  scanclick(){
    this.scanning ? this.stopscan() : this.scan();
  }

  async scan(){
    this.scanning = true;
    this.scantext = "stopscantext";
    this.scanresults = [];
    this.paireddevice = undefined;
    if(this.platform.is('desktop')){
      this.ble.requestdevice((result) => {
        this.paireddevice = result;
        this.stopscan();
      })
    }else{
      this.ble.startscan((result) => {
        if(this.ble.checkmanufacturerdata(result.manufacturerData["794"])){
          this.ngZone.run(() => {
            this.scanresults.push(result);
          });
        }
      });
    }
  }

  async stopscan(){
    this.scanning = false;
    this.scantext = "startscantext";
    if(!this.platform.is('desktop')){
      await this.ble.stopscan();
    }
  }

  async scanitemclick(item:ScanResult){
    this.router.navigate(
      ['/tabs/featherwing'],
      { 
        queryParams: { deviceid: item.device.deviceId }
      }
    );
    const loading = await this.loadingCtrl.create({
      message: 'Connecting',
      spinner: 'crescent'
    });
    loading.present();
  }

  async paireddeviceclick(item:BleDevice){
    this.router.navigate(
      ['/tabs/featherwing'],
      { 
        queryParams: { deviceid: item.deviceId }
      }
    );
    this.translateService.get('ScanTab.connecting').subscribe(async (res: string) => {
      const loading = await this.loadingCtrl.create({
        message: res,
        spinner: 'crescent'
      });
      loading.present();
    });
  }

  async refresh(event){
    event.target.complete();
    setTimeout(async () => {
      await this.scan();
    },250);
  }

}
