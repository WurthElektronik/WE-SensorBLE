import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Attribute } from 'src/app/Attributes/Attribute';
import { EditUpdateRateComponent } from 'src/app/Components/edit-update-rate/edit-update-rate.component';
import { GeneralSensor } from 'src/app/Sensors/GeneralSensor';
import { BleService } from '../../Services/ble.service';

@Component({
  selector: 'app-featherwing',
  templateUrl: 'FeatherWingTab.html',
  styleUrls: ['FeatherWingTab.scss']
})
export class FeatherWingTab {
  id:string = null;
  private attrssubscriptions: Subscription[];
  private disconnectsubscription: Subscription;
  constructor(private route: ActivatedRoute,public platform: Platform, private router: Router,public ble:BleService,private ngZone: NgZone,private modalCtrl: ModalController,private loadingCtrl: LoadingController,private toastController: ToastController,private translateService: TranslateService) {}

  async ngOnInit() {
    this.route.queryParamMap
    .subscribe(async (params) => {
      if(!this.ble.isconnected()){
        try {
          this.id = params.get("deviceid");
          await this.ble.connect(this.id);
          await this.ble.starttxnotifications(this.id);
          this.disconnectsubscription = this.ble.onDeviceDisconnected.subscribe(async () => {
            let loading = await this.loadingCtrl.getTop();
            if (loading)
              this.loadingCtrl.dismiss();
            this.disconnectsubscription  && this.disconnectsubscription.unsubscribe();
            this.translateService.get('FeatherWingTab.devicedisconnected').subscribe(async (res: string) => {
              const toast = await this.toastController.create({
                message: res,
                duration: 500,
                position: 'middle',
                cssClass: 'toastwidth'
              });
              toast.present();
            });
            this.router.navigate(
              ['/tabs/scan']
            );
          });
        } catch (error) {
          
        }
      }
    });
  }

  ionViewWillEnter(){
    this.attrssubscriptions = [];
    this.attrssubscriptions.push(this.ble.onDataReceived.subscribe(async () => {
      let loading = await this.loadingCtrl.getTop();
      if (loading)
        this.loadingCtrl.dismiss();
      this.ngZone.run(() => {}); // needed to make sure changes are reflected in the UI
    }));
    this.ble.sensors.forEach(sensor => {
      sensor.getAttributes().forEach(attribute => {
        if(attribute.isEvent()){
          this.attrssubscriptions.push(attribute.onDataReceived.subscribe(() => {
            this.ngZone.run(() => {}); // needed to make sure changes are reflected in the UI
          }));
        }
      });
    });
  }

  ionViewWillLeave() {
    this.attrssubscriptions.forEach(subscription => {
      subscription && subscription.unsubscribe();
    });
    this.attrssubscriptions = [];
  }

  async disconnectclick(){
    this.ble.disconnect(this.id);
    this.router.navigate(
      ['/tabs/scan']
    );
  }

  attributeclick(attribute:Attribute){
    if(!attribute.isEvent()){
      this.router.navigate(
        ['/tabs/attributegraph'],
        { 
          queryParams: { 
            sensortype: attribute.getParentsensor().getType(),
            attributetype: attribute.getAttributeType()
          }
        }
      );
    }
  }

  async editinterval(sensor:GeneralSensor){
    const modal = await this.modalCtrl.create({
      component: EditUpdateRateComponent,
      componentProps: { 
        updaterate: sensor.getUpdateInterval(),
        minupdateinterval: sensor.getMinUpdateInterval()
      }
    });
    modal.cssClass = 'auto-height';
    modal.animated = false;
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      sensor.setUpdateInterval(data);
      this.ble.senddata(this.id,sensor.formupdateratepacket());
    }
  }

  showmodel(sensor:GeneralSensor){
    this.router.navigate(
      ['/tabs/sensormodel'],
      { 
        queryParams: { 
          sensortype: sensor.getType(),
        }
      }
    );
  }

}
