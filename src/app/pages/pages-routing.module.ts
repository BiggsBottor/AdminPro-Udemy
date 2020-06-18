import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard, AdminGuard } from '../services';

import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { SearchComponent } from './search/search.component';


const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    canActivate: [ LoginGuard ],
    children: [
      // General
      { path: 'profile', component: ProfileComponent, data: { title: 'User Profile' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
      // paginas compartidas
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar' } },
      { path: 'charts1', component: Charts1Component, data: { title: 'Charts' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'search/:term', component: SearchComponent, data: { title: 'Buscador' } },
      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { title: 'Mantenimiento de Usuarios' }
      },
      { path: 'hospitales', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de Médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar Médicos' } },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
