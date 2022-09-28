import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        loadChildren: () => import('../Pages/ScanTab/Scan.module').then(m => m.ScanTabModule)
      },
      {
        path: 'info',
        loadChildren: () => import('../Pages/InfoTab/Info.module').then(m => m.InfoModule)
      },
      {
        path: 'featherwing',
        loadChildren: () => import('../Pages/FeatherWingTab/FeatherWing.module').then(m => m.FeatherWingTabModule)
      },
      {
        path: 'attributegraph',
        loadChildren: () => import('../Pages/AttributeGraphTab/AttributeGraph.module').then(m => m.AttributeGraphTabModule)
      },
      {
        path: 'sensormodel',
        loadChildren: () => import('../Pages/SensorModelTab/SensorModel.module').then(m => m.SensorModelTabModule)
      },
      {
        path: '',
        redirectTo: '/tabs/scan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/scan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
