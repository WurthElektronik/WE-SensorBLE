import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatherWingTab } from './FeatherWingTab';
import {  HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
import { FeatherWingRoutingModule } from './FeatherWing-routing.module';
import { EditUpdateRateComponent } from 'src/app/Components/edit-update-rate/edit-update-rate.component';
import { AddThresholdComponent } from 'src/app/Components/add-threshold/add-threshold.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FeatherWingRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [FeatherWingTab, EditUpdateRateComponent, AddThresholdComponent]
})
export class FeatherWingTabModule {}
