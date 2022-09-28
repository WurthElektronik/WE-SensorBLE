import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChangeLanguageComponent } from 'src/app/Components/change-language/change-language.component';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-info',
  templateUrl: 'InfoTab.html',
  styleUrls: ['InfoTab.scss']
})
export class InfoTab {

  constructor(private router: Router, private modalCtrl: ModalController, private translate: TranslateService) {}

  async wirelesssensorsclick(){
    await Browser.open({ url: 'https://www.we-online.de/web/en/electronic_components/produkte_pb/produktinnovationen/wirelessconnectivitylandingpage.php' });
  }

  async usermanualsclick(){
    await Browser.open({ url: 'https://www.we-online.com/web/en/electronic_components/produkte_pb/service_pbs/wco/handbuecher/wco_handbuecher.php' });

  }

  async sourcecodeclick(){
    await Browser.open({ url: 'https://github.com/WurthElektronik' });
  }

  policyclick(){
    this.router.navigate(
      ['/policy']
    );
  }

  imprintclick(){
    this.router.navigate(
      ['/imprint']
    );
  }
  
  async languageclick(){
    const modal = await this.modalCtrl.create({
      component: ChangeLanguageComponent,
    });
    modal.cssClass = 'auto-height';
    modal.animated = false;
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await Preferences.set({
        key: 'preflang',
        value: data,
      });
      this.translate.use(data);
    }
  }

}
