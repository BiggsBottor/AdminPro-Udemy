import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';


const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'charts1', component: Charts1Component },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
