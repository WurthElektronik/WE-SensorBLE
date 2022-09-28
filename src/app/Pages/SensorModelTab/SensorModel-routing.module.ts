import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorModelTab } from './SensorModelTab';

const routes: Routes = [
  {
    path: '',
    component: SensorModelTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensorModelRoutingModule {}
