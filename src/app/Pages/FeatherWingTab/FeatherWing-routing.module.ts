import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatherWingTab } from './FeatherWingTab';

const routes: Routes = [
  {
    path: '',
    component: FeatherWingTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatherWingRoutingModule {}
