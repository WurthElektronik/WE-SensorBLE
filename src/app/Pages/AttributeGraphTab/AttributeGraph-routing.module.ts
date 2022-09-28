import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeGraphTab } from './AttributeGraphTab';

const routes: Routes = [
  {
    path: '',
    component: AttributeGraphTab,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeGraphRoutingModule {}
