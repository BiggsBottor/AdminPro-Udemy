import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// MÓDULOS
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

// -- ng2-charts -- //
import { ChartsModule } from 'ng2-charts';

// RUTAS
import { PagesRoutingModule } from './pages-routing.module';

// COMPONENTES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { IncrementorComponent } from '../components/incrementor/incrementor.component';
import { DoughnutGraphicComponent } from '../components/doughnut-graphic/doughnut-graphic.component';


@NgModule ({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Charts1Component,
    IncrementorComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    DoughnutGraphicComponent,
    AccountSettingsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Charts1Component
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})

export class PagesModule {}
