import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-update-rate',
  templateUrl: './edit-update-rate.component.html',
  styleUrls: ['./edit-update-rate.component.scss'],
})
export class EditUpdateRateComponent implements OnInit {
  updaterate:number;
  minupdateinterval:number;
  constructor(private modalCtrl: ModalController,public toastController: ToastController, private translateService: TranslateService) { }
  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async edit() {
    if(this.updaterate >= this.minupdateinterval && Number.isInteger(this.updaterate)){
      return this.modalCtrl.dismiss(this.updaterate, 'confirm');
    }else{
      this.translateService.get('EditUpdateRate.invalidupdaterate',{mininterval: this.minupdateinterval}).subscribe(async (res: string) => {
        try {
          this.toastController.dismiss().then(() => {
          }).catch(() => {
          }).finally(() => {
          });
        } catch(e) {}
        const toast = await this.toastController.create({
          message: res,
          duration: 500,
          position: 'middle',
          cssClass: 'toastwidth'
        });
        toast.present();
      });
    }
  }

  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
}

}
