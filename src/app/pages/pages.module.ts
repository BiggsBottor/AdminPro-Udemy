import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';


@NgModule ({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Charts1Component
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Charts1Component
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})

export class PagesModule {}
