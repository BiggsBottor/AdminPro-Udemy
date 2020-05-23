import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'charts1', component: Charts1Component, data: { title: 'Charts' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
