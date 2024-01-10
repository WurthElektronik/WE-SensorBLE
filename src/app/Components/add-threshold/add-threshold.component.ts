import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ThresholdType } from 'src/app/Attributes/ThresholdType';

@Component({
  selector: 'app-add-threshold',
  templateUrl: './add-threshold.component.html',
  styleUrls: ['./add-threshold.component.scss'],
})
export class AddThresholdComponent implements OnInit {
  public thresholds = Object.keys(ThresholdType).map(key => ThresholdType[key]).filter(value => typeof value === 'string') as string[];
  public selectedThresholdType:ThresholdType = ThresholdType.LowerThreshold;
  threshold:number;
  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async setThreshold() {
    return this.modalCtrl.dismiss({'thresholdType': this.selectedThresholdType, 'thresholdValue': this.threshold}, 'confirm');
  }

  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode != 46) && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  thresholdTypeChanged(event){
    this.selectedThresholdType = ThresholdType[event.detail.value as string];
  }

}
